initHeader("route.lotto");

const lottoBtnPick = document.getElementById("lottoBtnPick");
const lottoBtnCopy = document.getElementById("lottoBtnCopy");
const lottoBtnReset = document.getElementById("lottoBtnReset");
const lottoMetaEl = document.getElementById("lottoMeta");
const lottoToastEl = document.getElementById("lottoToast");

const lottoHistoryListEl = document.getElementById("lottoHistoryList");
const lottoBtnCopyHistory = document.getElementById("lottoBtnCopyHistory");
const lottoBtnClearHistory = document.getElementById("lottoBtnClearHistory");

let lottoLastResult = [];
let lottoIsDrawing = false;
let lottoLastCreatedAt = 0;

function getLottoSetsEl() {
  return document.getElementById("lottoSets");
}

function pickOneSet() {
  const s = new Set();
  while (s.size < 6) s.add(Math.floor(Math.random() * 45) + 1);
  return [...s].sort((a, b) => a - b);
}
function generateFiveSets() { return Array.from({ length: 5 }, pickOneSet); }

function renderPlaceholders() {
  const container = getLottoSetsEl();
  if (!container) return;
  container.innerHTML = "";
  for (let setIdx = 0; setIdx < 5; setIdx++) {
    const div = document.createElement("div");
    div.className = "lotto-set";
    div.innerHTML = `
      <div class="lotto-set-title">
        <span>${t("lotto.set")} ${setIdx + 1}</span>
        <span class="lotto-badge" id="lotto-badge-${setIdx}" data-state="wait">${t("lotto.badge.wait")}</span>
      </div>
      <div class="lotto-balls" id="lotto-balls-${setIdx}">
        ${Array.from({length: 6}).map((_, nIdx) => `
          <div class="lotto-ball pending" id="lotto-ball-${setIdx}-${nIdx}">•</div>
        `).join("")}
      </div>
    `;
    container.appendChild(div);
  }
}
function renderResultSets(result) {
  const container = getLottoSetsEl();
  if (!container) return;
  container.innerHTML = "";
  result.forEach((set, setIdx) => {
    const div = document.createElement("div");
    div.className = "lotto-set";
    div.innerHTML = `
      <div class="lotto-set-title">
        <span>${t("lotto.set")} ${setIdx + 1}</span>
        <span class="lotto-badge" id="lotto-badge-${setIdx}" data-state="done">${t("lotto.badge.done")}</span>
      </div>
      <div class="lotto-balls" id="lotto-balls-${setIdx}">
        ${set.map((value, nIdx) => `
          <div class="lotto-ball" id="lotto-ball-${setIdx}-${nIdx}">${value}</div>
        `).join("")}
      </div>
    `;
    container.appendChild(div);
  });
}
function setBadge(setIdx, state) {
  const el = document.getElementById(`lotto-badge-${setIdx}`);
  if (!el) return;
  el.dataset.state = state;
  el.textContent = t(`lotto.badge.${state}`);
}
function refreshBadges() {
  for (let s = 0; s < 5; s++) {
    const badge = document.getElementById(`lotto-badge-${s}`);
    if (!badge) continue;
    const state = badge.dataset.state || "wait";
    badge.textContent = t(`lotto.badge.${state}`);
  }
}
function revealBall(setIdx, numIdx, value) {
  const el = document.getElementById(`lotto-ball-${setIdx}-${numIdx}`);
  if (!el) return;
  el.classList.remove("pending");
  el.classList.add("reveal");
  el.textContent = value;
  setTimeout(() => el.classList.remove("reveal"), 260);
}
function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }
function setToast(msg, key = "") {
  lottoToastEl.textContent = msg || "";
  if (key) {
    lottoToastEl.dataset.i18nKey = key;
  } else {
    delete lottoToastEl.dataset.i18nKey;
  }
}

function formatTime(ts) {
  const lang = document.documentElement.getAttribute("data-lang") || "ko";
  const locale = lang === "en" ? "en-US" : "ko-KR";
  return new Date(ts).toLocaleString(locale);
}
function formatFiveSetsForCopy(fiveSets) {
  return fiveSets.map((set, i) => `${t("lotto.set")} ${i + 1}: ${set.join(", ")}`).join("\n");
}

async function runDrawSequence() {
  if (lottoIsDrawing) return;
  lottoIsDrawing = true;

  await ensureAudio();

  lottoBtnPick.disabled = true;
  lottoBtnReset.disabled = true;
  lottoBtnCopy.disabled = true;
  setToast(t("lotto.toast.drawing"), "lotto.toast.drawing");

  const result = generateFiveSets();
  renderPlaceholders();

  const totalNumbers = 5 * 6;
  const perNumberMs = 140;
  const perSetGapMs = 260;
  const totalMs = (totalNumbers * perNumberMs) + (4 * perSetGapMs) + 500;
  const rollingSec = Math.max(5.0, totalMs / 1000);

  const rolling = startRollingSound(rollingSec, 0.34);

  for (let s = 0; s < 5; s++) {
    setBadge(s, "drawing");
    await sleep(180);

    for (let n = 0; n < 6; n++) {
      try { playTick(); } catch {}
      revealBall(s, n, result[s][n]);
      await sleep(perNumberMs);
    }
    setBadge(s, "done");
    if (s < 4) await sleep(perSetGapMs);
  }

  try { rolling?.stop?.(); } catch {}
  try { playFinishChime(); } catch {}

  lottoLastResult = result;

  const now = Date.now();
  lottoLastCreatedAt = now;
  const tsLabel = formatTime(now);
  lottoMetaEl.textContent = t("lotto.meta.time", { time: tsLabel });
  setToast(t("lotto.toast.done"), "lotto.toast.done");

  addHistory({ id: cryptoRandomId(), createdAt: tsLabel, createdAtTs: now, sets: lottoLastResult });

  lottoBtnPick.disabled = false;
  lottoBtnReset.disabled = false;
  lottoBtnCopy.disabled = false;
  lottoIsDrawing = false;
}

lottoBtnPick.addEventListener("click", () => {
  runDrawSequence().catch(() => {
    lottoIsDrawing = false;
    lottoBtnPick.disabled = false;
    lottoBtnReset.disabled = false;
    setToast(t("lotto.toast.error"), "lotto.toast.error");
  });
});

lottoBtnCopy.addEventListener("click", async () => {
  if (!lottoLastResult.length) return;
  const text = formatFiveSetsForCopy(lottoLastResult);
  try {
    await navigator.clipboard.writeText(text);
    setToast(t("lotto.toast.copyCurrent"), "lotto.toast.copyCurrent");
  } catch {
    setToast(t("lotto.toast.copyFail"), "lotto.toast.copyFail");
  }
});

lottoBtnReset.addEventListener("click", () => {
  if (lottoIsDrawing) return;
  renderPlaceholders();
  lottoLastResult = [];
  lottoLastCreatedAt = 0;
  lottoBtnCopy.disabled = true;
  lottoMetaEl.textContent = t("lotto.meta.empty");
  setToast("");
});

const STORAGE_KEY = "lotto_history_v1";
renderHistory();

lottoBtnCopyHistory.addEventListener("click", async () => {
  const history = loadHistory();
  if (!history.length) return;

  const text = history.map((item, idx) => {
    const label = typeof item.createdAtTs === "number" ? formatTime(item.createdAtTs) : item.createdAt;
    const header = `#${history.length - idx} (${label})`;
    return header + "\n" + formatFiveSetsForCopy(item.sets);
  }).join("\n\n");

  try {
    await navigator.clipboard.writeText(text);
    setToast(t("lotto.toast.copied"), "lotto.toast.copied");
  } catch {
    setToast(t("lotto.toast.copyFail"), "lotto.toast.copyFail");
  }
});

lottoBtnClearHistory.addEventListener("click", () => {
  const ok = confirm(t("lotto.confirm.clear"));
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
  setToast(t("lotto.toast.cleared"), "lotto.toast.cleared");
});

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    let migrated = false;
    const normalized = parsed.map(item => {
      if (!item || typeof item !== "object") return item;
      if (typeof item.createdAtTs === "number") return item;
      const ts = Date.parse(item.createdAt);
      if (Number.isFinite(ts)) {
        migrated = true;
        return { ...item, createdAtTs: ts };
      }
      return item;
    });
    if (migrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return [];
  }
}
function saveHistory(history) { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); }
function addHistory(item) {
  const history = loadHistory();
  history.unshift(item);
  saveHistory(history.slice(0, 50));
  renderHistory();
}
function deleteHistory(id) {
  const history = loadHistory().filter(x => x.id !== id);
  saveHistory(history);
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  lottoHistoryListEl.innerHTML = "";
  history.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "lotto-history-item";
    const numberLabel = `#${history.length - index}`;

    const createdLabel = typeof item.createdAtTs === "number" ? formatTime(item.createdAtTs) : item.createdAt;
    card.innerHTML = `
      <div class="lotto-history-meta">
        <span>${numberLabel}</span>
        <span>${escapeHtml(createdLabel)}</span>
      </div>

      <div class="lotto-history-sets">
        ${item.sets.map((set, i) => `
          <div class="lotto-mini-set">
            <div class="label">${t("lotto.set")} ${i + 1}</div>
            <div class="lotto-mini-balls">
              ${set.map(n => `<div class="lotto-mini-ball">${n}</div>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="lotto-row-actions">
        <button class="lotto-btn secondary" type="button" data-action="copy" data-id="${item.id}">${t("lotto.btn.copyItem")}</button>
        <button class="lotto-btn secondary" type="button" data-action="delete" data-id="${item.id}">${t("lotto.btn.deleteItem")}</button>
      </div>
    `;
    lottoHistoryListEl.appendChild(card);
  });

  const hasHistory = history.length > 0;
  lottoBtnCopyHistory.disabled = !hasHistory;
  lottoBtnClearHistory.disabled = !hasHistory;

  lottoHistoryListEl.querySelectorAll("button[data-action]").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const action = e.currentTarget.getAttribute("data-action");
      const id = e.currentTarget.getAttribute("data-id");
      const history = loadHistory();
      const item = history.find(x => x.id === id);
      if (!item) return;

      if (action === "delete") {
        deleteHistory(id);
        setToast(t("lotto.toast.deletedOne"), "lotto.toast.deletedOne");
        return;
      }

      if (action === "copy") {
        const label = typeof item.createdAtTs === "number" ? formatTime(item.createdAtTs) : item.createdAt;
        const text = `(${label})\n` + formatFiveSetsForCopy(item.sets);
        try {
          await navigator.clipboard.writeText(text);
          setToast(t("lotto.toast.copiedOne"), "lotto.toast.copiedOne");
        } catch {
          setToast(t("lotto.toast.copyFail"), "lotto.toast.copyFail");
        }
      }
    });
  });
}

renderPlaceholders();

window.addEventListener("langchange", () => {
  const toastKey = lottoToastEl.dataset.i18nKey;
  if (toastKey) {
    lottoToastEl.textContent = t(toastKey);
  }
  renderHistory();
  if (lottoIsDrawing) {
    refreshBadges();
    return;
  }
  if (!lottoLastResult.length) {
    lottoMetaEl.textContent = t("lotto.meta.empty");
    renderPlaceholders();
    return;
  }
  renderResultSets(lottoLastResult);
  if (lottoLastCreatedAt) {
    lottoMetaEl.textContent = t("lotto.meta.time", { time: formatTime(lottoLastCreatedAt) });
  }
});
