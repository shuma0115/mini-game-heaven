initHeader("로또");

const lottoSetsEl = document.getElementById("lottoSets");
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

function pickOneSet() {
  const s = new Set();
  while (s.size < 6) s.add(Math.floor(Math.random() * 45) + 1);
  return [...s].sort((a, b) => a - b);
}
function generateFiveSets() { return Array.from({ length: 5 }, pickOneSet); }

function renderPlaceholders() {
  lottoSetsEl.innerHTML = "";
  for (let setIdx = 0; setIdx < 5; setIdx++) {
    const div = document.createElement("div");
    div.className = "lotto-set";
    div.innerHTML = `
      <div class="lotto-set-title">
        <span>SET ${setIdx + 1}</span>
        <span class="lotto-badge" id="lotto-badge-${setIdx}">대기</span>
      </div>
      <div class="lotto-balls" id="lotto-balls-${setIdx}">
        ${Array.from({length: 6}).map((_, nIdx) => `
          <div class="lotto-ball pending" id="lotto-ball-${setIdx}-${nIdx}">•</div>
        `).join("")}
      </div>
    `;
    lottoSetsEl.appendChild(div);
  }
}
function setBadge(setIdx, text) {
  const el = document.getElementById(`lotto-badge-${setIdx}`);
  if (el) el.textContent = text;
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
function setToast(msg) { lottoToastEl.textContent = msg || ""; }

function formatNow() {
  return new Date().toLocaleString(); // 환경별 포맷 차이 있을 수 있음(확실한게 아니야)
}
function formatFiveSetsForCopy(fiveSets) {
  return fiveSets.map((set, i) => `SET ${i + 1}: ${set.join(", ")}`).join("\n");
}

async function runDrawSequence() {
  if (lottoIsDrawing) return;
  lottoIsDrawing = true;

  await ensureAudio();

  lottoBtnPick.disabled = true;
  lottoBtnReset.disabled = true;
  lottoBtnCopy.disabled = true;
  setToast("추첨 중… 🔄");

  const result = generateFiveSets();
  renderPlaceholders();

  const totalNumbers = 5 * 6;
  const perNumberMs = 140;
  const perSetGapMs = 260;
  const totalMs = (totalNumbers * perNumberMs) + (4 * perSetGapMs) + 500;
  const rollingSec = Math.max(5.0, totalMs / 1000);

  const rolling = startRollingSound(rollingSec, 0.34);

  for (let s = 0; s < 5; s++) {
    setBadge(s, "추첨 중");
    await sleep(180);

    for (let n = 0; n < 6; n++) {
      try { playTick(); } catch {}
      revealBall(s, n, result[s][n]);
      await sleep(perNumberMs);
    }
    setBadge(s, "완료");
    if (s < 4) await sleep(perSetGapMs);
  }

  try { rolling?.stop?.(); } catch {}
  try { playFinishChime(); } catch {}

  lottoLastResult = result;

  const ts = formatNow();
  lottoMetaEl.textContent = `생성 시간: ${ts}`;
  setToast("완료! 🎉");

  addHistory({ id: cryptoRandomId(), createdAt: ts, sets: lottoLastResult });

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
    setToast("오류가 발생했어요. 다시 시도해주세요.");
  });
});

lottoBtnCopy.addEventListener("click", async () => {
  if (!lottoLastResult.length) return;
  const text = formatFiveSetsForCopy(lottoLastResult);
  try {
    await navigator.clipboard.writeText(text);
    setToast("현재 결과 5세트가 복사되었습니다.");
  } catch {
    setToast("복사 실패. 브라우저 권한 설정을 확인하거나 수동으로 복사해주세요.");
  }
});

lottoBtnReset.addEventListener("click", () => {
  if (lottoIsDrawing) return;
  lottoSetsEl.innerHTML = "";
  lottoLastResult = [];
  lottoBtnCopy.disabled = true;
  lottoMetaEl.textContent = "아직 생성되지 않았습니다.";
  setToast("");
});

const STORAGE_KEY = "lotto_history_v1";
renderHistory();

lottoBtnCopyHistory.addEventListener("click", async () => {
  const history = loadHistory();
  if (!history.length) return;

  const text = history.map((item, idx) => {
    const header = `#${history.length - idx} (${item.createdAt})`;
    return header + "\n" + formatFiveSetsForCopy(item.sets);
  }).join("\n\n");

  try {
    await navigator.clipboard.writeText(text);
    setToast("생성 기록 전체가 복사되었습니다.");
  } catch {
    setToast("복사 실패. 브라우저 권한 설정을 확인하거나 수동으로 복사해주세요.");
  }
});

lottoBtnClearHistory.addEventListener("click", () => {
  const ok = confirm("생성 기록을 전부 삭제할까요? (되돌릴 수 없음)");
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
  setToast("생성 기록이 모두 삭제되었습니다.");
});

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
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

    card.innerHTML = `
      <div class="lotto-history-meta">
        <span>${numberLabel}</span>
        <span>${escapeHtml(item.createdAt)}</span>
      </div>

      <div class="lotto-history-sets">
        ${item.sets.map((set, i) => `
          <div class="lotto-mini-set">
            <div class="label">SET ${i + 1}</div>
            <div class="lotto-mini-balls">
              ${set.map(n => `<div class="lotto-mini-ball">${n}</div>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="lotto-row-actions">
        <button class="lotto-btn secondary" type="button" data-action="copy" data-id="${item.id}">📋 이 기록 복사</button>
        <button class="lotto-btn secondary" type="button" data-action="delete" data-id="${item.id}">🗑️ 삭제</button>
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
        setToast("기록 1개를 삭제했습니다.");
        return;
      }

      if (action === "copy") {
        const text = `(${item.createdAt})\n` + formatFiveSetsForCopy(item.sets);
        try {
          await navigator.clipboard.writeText(text);
          setToast("선택한 기록이 복사되었습니다.");
        } catch {
          setToast("복사 실패. 브라우저 권한 설정을 확인하거나 수동으로 복사해주세요.");
        }
      }
    });
  });
}

renderPlaceholders();
