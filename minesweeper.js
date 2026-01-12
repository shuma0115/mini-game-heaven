initHeader("route.minesweeper");

const boardEl = document.getElementById("msBoard");
const minesEl = document.getElementById("msMines");
const flagsEl = document.getElementById("msFlags");
const timeEl = document.getElementById("msTime");
const statusEl = document.getElementById("msStatus");
const resetBtn = document.getElementById("msReset");
const levelEl = document.getElementById("msLevel");

const LEVELS = {
  easy: { rows: 8, cols: 8, mines: 10 },
  normal: { rows: 10, cols: 10, mines: 18 },
  hard: { rows: 12, cols: 14, mines: 28 }
};
const DEFAULT_LEVEL = "easy";
const MS_LEVEL_KEY = "minesweeper_level_v1";
const MS_LEVEL_SET_KEY = "minesweeper_level_set_v1";

let rows = 0;
let cols = 0;
let mines = 0;
let grid = [];
let revealedCount = 0;
let flagsCount = 0;
let started = false;
let gameOver = false;
let timerId = null;
let elapsed = 0;

function buildCell(r, c) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "ms-cell";
  btn.dataset.r = String(r);
  btn.dataset.c = String(c);
  btn.addEventListener("pointerdown", (e) => {
    if (e.button !== 2) return;
    e.preventDefault();
    primeAudio();
    toggleFlag(r, c);
  });
  btn.addEventListener("click", () => {
    primeAudio();
    onReveal(r, c);
  });
  btn.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  return btn;
}

function buildBoard() {
  boardEl.style.setProperty("--ms-cols", String(cols));
  boardEl.innerHTML = "";
  const frag = document.createDocumentFragment();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      frag.appendChild(buildCell(r, c));
    }
  }
  boardEl.appendChild(frag);
}

function createGrid() {
  grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      count: 0
    }))
  );
}

function inBounds(r, c) {
  return r >= 0 && c >= 0 && r < rows && c < cols;
}

function neighbors(r, c) {
  const list = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (inBounds(nr, nc)) list.push([nr, nc]);
    }
  }
  return list;
}

function placeMines(excludeR, excludeC) {
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if ((r === excludeR && c === excludeC) || grid[r][c].mine) continue;
    grid[r][c].mine = true;
    placed++;
  }
}

function calcCounts() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].mine) continue;
      let count = 0;
      neighbors(r, c).forEach(([nr, nc]) => {
        if (grid[nr][nc].mine) count++;
      });
      grid[r][c].count = count;
    }
  }
}

function startTimer() {
  if (timerId) return;
  timerId = setInterval(() => {
    elapsed++;
    timeEl.textContent = String(elapsed);
  }, 1000);
}

function stopTimer() {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
}

function resetGame() {
  const level = LEVELS[levelEl.value] || LEVELS.easy;
  rows = level.rows;
  cols = level.cols;
  mines = level.mines;
  revealedCount = 0;
  flagsCount = 0;
  started = false;
  gameOver = false;
  elapsed = 0;
  stopTimer();
  boardEl.classList.remove("finished");

  minesEl.textContent = String(mines);
  flagsEl.textContent = String(flagsCount);
  timeEl.textContent = "0";
  statusEl.textContent = t("minesweeper.status.ready");

  createGrid();
  buildBoard();
}

function getCellEl(r, c) {
  return boardEl.querySelector(`.ms-cell[data-r="${r}"][data-c="${c}"]`);
}

function revealCell(r, c) {
  const cell = grid[r][c];
  if (cell.revealed || cell.flagged) return;
  cell.revealed = true;
  revealedCount++;
  const el = getCellEl(r, c);
  if (!el) return;
  el.classList.add("revealed");
  if (cell.mine) {
    el.classList.add("mine");
    el.textContent = "💥";
    return;
  }
  if (cell.count > 0) {
    el.textContent = String(cell.count);
    el.dataset.count = String(cell.count);
  }
}

function revealWave(startR, startC) {
  const queue = [[startR, startC]];
  while (queue.length) {
    const [r, c] = queue.shift();
    const cell = grid[r][c];
    if (cell.revealed || cell.flagged) continue;
    revealCell(r, c);
    if (cell.count !== 0) continue;
    neighbors(r, c).forEach(([nr, nc]) => {
      if (!grid[nr][nc].revealed && !grid[nr][nc].flagged) {
        queue.push([nr, nc]);
      }
    });
  }
}

function revealAllMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].mine) {
        const el = getCellEl(r, c);
        if (!el) continue;
        el.classList.add("revealed", "mine");
        el.textContent = "💣";
      }
    }
  }
}

function checkWin() {
  const safeCells = rows * cols - mines;
  if (revealedCount >= safeCells) {
    gameOver = true;
    stopTimer();
    statusEl.textContent = t("minesweeper.status.win");
    boardEl.classList.add("finished");
    try{ sfxWinFanfare(); }catch{}
  }
}

function primeAudio() {
  if (typeof getAudioCtx !== "function") return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
}

function onReveal(r, c) {
  if (gameOver) return;
  const cell = grid[r][c];
  if (cell.flagged) return;

  if (!started) {
    started = true;
    placeMines(r, c);
    calcCounts();
    startTimer();
    statusEl.textContent = t("minesweeper.status.play");
  }

  if (cell.mine) {
    try{ sfxLoseSad(); }catch{}
    try{ sfxMsExplode(); }catch{}
    revealCell(r, c);
    gameOver = true;
    stopTimer();
    statusEl.textContent = t("minesweeper.status.lose");
    revealAllMines();
    boardEl.classList.add("finished");
    return;
  }

  try{ sfxMsReveal(); }catch{}
  if (cell.count === 0) {
    revealWave(r, c);
  } else {
    revealCell(r, c);
  }
  checkWin();
}

function toggleFlag(r, c) {
  if (gameOver) return;
  const cell = grid[r][c];
  if (cell.revealed) return;
  cell.flagged = !cell.flagged;
  flagsCount += cell.flagged ? 1 : -1;
  flagsEl.textContent = String(flagsCount);
  const el = getCellEl(r, c);
  if (!el) return;
  el.classList.toggle("flagged", cell.flagged);
  el.textContent = cell.flagged ? "🚩" : "";
  try{ sfxMsFlag(); }catch{}
}

function applyMinesweeperLevelDefault(){
  const savedLevel = localStorage.getItem(MS_LEVEL_KEY);
  const levelSet = localStorage.getItem(MS_LEVEL_SET_KEY) === "1";
  if (levelSet && savedLevel && LEVELS[savedLevel]) {
    levelEl.value = savedLevel;
  } else {
    levelEl.value = DEFAULT_LEVEL;
  }
}
applyMinesweeperLevelDefault();

resetBtn.addEventListener("click", resetGame);
levelEl.addEventListener("change", () => {
  localStorage.setItem(MS_LEVEL_KEY, levelEl.value);
  localStorage.setItem(MS_LEVEL_SET_KEY, "1");
  resetGame();
});

window.addEventListener("pageshow", () => {
  if(localStorage.getItem(MS_LEVEL_SET_KEY) !== "1"){
    applyMinesweeperLevelDefault();
    resetGame();
  }
});

window.addEventListener("langchange", () => {
  const levelLabel = levelEl.value;
  if (gameOver) return;
  if (!started) {
    statusEl.textContent = t("minesweeper.status.ready");
  } else {
    statusEl.textContent = t("minesweeper.status.play");
  }
  if (levelLabel === "easy") levelEl.title = t("minesweeper.level.easy");
  if (levelLabel === "normal") levelEl.title = t("minesweeper.level.normal");
  if (levelLabel === "hard") levelEl.title = t("minesweeper.level.hard");
});

resetGame();
