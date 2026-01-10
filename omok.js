/* omok.js */
initHeader("오목");

const OMOK_LEVEL_KEY = "omok_ai_level_v1";

const SIZE = 15;
const EMPTY = 0, BLACK = 1, WHITE = 2;

const canvas = document.getElementById('omokCanvas');
const omokCanvasWrap = document.getElementById('omokCanvasWrap');
const ctx = canvas.getContext('2d');

const turnDot = document.getElementById('turnDot');
const turnText = document.getElementById('turnText');
const omokStatus = document.getElementById('omokStatus');
const moveList = document.getElementById('moveList');
const aiLevelEl = document.getElementById('aiLevel');

const savedLevel = localStorage.getItem(OMOK_LEVEL_KEY);
if(savedLevel && ["easy","normal","hard"].includes(savedLevel)){
  aiLevelEl.value = savedLevel;
}
aiLevelEl.addEventListener("change", () => {
  localStorage.setItem(OMOK_LEVEL_KEY, aiLevelEl.value);
  omokStatus.textContent = `난이도: ${aiLevelEl.value === "easy" ? "쉬움" : aiLevelEl.value === "normal" ? "보통" : "어려움"}`;
  setTimeout(() => { if(!gameOver) omokStatus.textContent = ""; }, 900);
});

let board = [];
let turn = BLACK;
let moves = [];
let gameOver = false;
let winner = EMPTY;
let lastMove = null;
let aiBusy = false;

let omokDrawQueued = false;
function scheduleOmokDraw(force=false){
  if(omokDrawQueued) return;
  omokDrawQueued = true;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      omokDrawQueued = false;
      drawOmok(force);
    });
  });
}

if(window.ResizeObserver){
  const ro = new ResizeObserver(() => scheduleOmokDraw());
  ro.observe(omokCanvasWrap);
}else{
  window.addEventListener('resize', () => scheduleOmokDraw());
}

function newBoard(){
  board = Array.from({length: SIZE}, () => Array.from({length: SIZE}, () => EMPTY));
  turn = BLACK;
  moves = [];
  gameOver = false;
  winner = EMPTY;
  lastMove = null;
  aiBusy = false;
  omokStatus.textContent = '';
  renderTurn();
  renderMoves();
  scheduleOmokDraw(true);
}

function renderTurn(){
  const isUserTurn = turn === BLACK;
  turnDot.className = 'turn-dot ' + (isUserTurn ? 'black' : 'white');
  turnText.textContent = isUserTurn ? '내 차례(흑)' : 'AI 차례(백)';
}

function renderMoves(){
  moveList.innerHTML = '';
  if(moves.length === 0){
    const li = document.createElement('li');
    li.textContent = '아직 착수 없음';
    moveList.appendChild(li);
    return;
  }
  moves.forEach((m, idx) => {
    const li = document.createElement('li');
    const p = m.player === BLACK ? '흑(나)' : '백(AI)';
    const col = String.fromCharCode('A'.charCodeAt(0) + m.x);
    const row = (m.y + 1);
    li.textContent = `${idx+1}. ${p} — ${col}${row}`;
    moveList.appendChild(li);
  });
}

function drawOmok(_force=false){
  const rect = omokCanvasWrap.getBoundingClientRect();
  const cw = Math.floor(rect.width);
  const ch = Math.floor(rect.height);

  if(!cw || !ch){
    scheduleOmokDraw(true);
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(1, Math.floor(cw * dpr));
  const h = Math.max(1, Math.floor(ch * dpr));

  if(canvas.width !== w || canvas.height !== h){
    canvas.width = w;
    canvas.height = h;
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const pad = canvas.width * 0.06;
  const gridSize = canvas.width - pad*2;
  const cell = gridSize / (SIZE - 1);

  ctx.save();
  ctx.lineWidth = Math.max(1, canvas.width * 0.002);
  ctx.strokeStyle = 'rgba(0,0,0,.55)';
  for(let i=0;i<SIZE;i++){
    const x = pad + i*cell;
    const y = pad + i*cell;
    ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(pad + (SIZE-1)*cell, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, pad + (SIZE-1)*cell); ctx.stroke();
  }
  const stars = [3, 7, 11];
  ctx.fillStyle = 'rgba(0,0,0,.55)';
  stars.forEach(sx => stars.forEach(sy => {
    const x = pad + sx*cell;
    const y = pad + sy*cell;
    ctx.beginPath(); ctx.arc(x, y, cell*0.10, 0, Math.PI*2); ctx.fill();
  }));
  ctx.restore();

  for(let y=0;y<SIZE;y++){
    for(let x=0;x<SIZE;x++){
      const v = board[y][x];
      if(v === EMPTY) continue;
      const cx = pad + x*cell;
      const cy = pad + y*cell;
      const r = cell*0.40;

      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(cx + r*0.10, cy + r*0.12, r*1.02, 0, Math.PI*2); ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
      if(v === BLACK){
        const g = ctx.createRadialGradient(cx - r*0.35, cy - r*0.35, r*0.2, cx, cy, r);
        g.addColorStop(0, 'rgba(255,255,255,.10)');
        g.addColorStop(1, 'rgba(0,0,0,.95)');
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.12)';
        ctx.lineWidth = Math.max(1, canvas.width * 0.0015);
        ctx.stroke();
      }else{
        const g = ctx.createRadialGradient(cx - r*0.35, cy - r*0.35, r*0.2, cx, cy, r);
        g.addColorStop(0, 'rgba(255,255,255,.98)');
        g.addColorStop(1, 'rgba(210,210,210,.95)');
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,.20)';
        ctx.lineWidth = Math.max(1, canvas.width * 0.0015);
        ctx.stroke();
      }
      ctx.restore();

      if(lastMove && lastMove.x === x && lastMove.y === y){
        ctx.save();
        ctx.strokeStyle = 'rgba(122,162,255,.95)';
        ctx.lineWidth = Math.max(2, canvas.width * 0.003);
        ctx.beginPath(); ctx.arc(cx, cy, r*0.55, 0, Math.PI*2); ctx.stroke();
        ctx.restore();
      }
    }
  }

  if(gameOver){
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,.95)';
    ctx.font = `900 ${Math.floor(canvas.width*0.055)}px ui-sans-serif, system-ui`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const msg = winner === BLACK ? '내가 승리!' : 'AI 승리!';
    ctx.fillText(msg, canvas.width/2, canvas.height/2);
    ctx.restore();
  }
}

function inside(x,y){ return x>=0 && y>=0 && x<SIZE && y<SIZE; }

function checkWinFrom(x, y, player){
  const dirs = [{dx:1,dy:0},{dx:0,dy:1},{dx:1,dy:1},{dx:1,dy:-1}];
  for(const d of dirs){
    let count = 1;
    let nx = x + d.dx, ny = y + d.dy;
    while(inside(nx,ny) && board[ny][nx] === player){ count++; nx+=d.dx; ny+=d.dy; }
    nx = x - d.dx; ny = y - d.dy;
    while(inside(nx,ny) && board[ny][nx] === player){ count++; nx-=d.dx; ny-=d.dy; }
    if(count >= 5) return true;
  }
  return false;
}

function isBoardFull(){
  for(let y=0;y<SIZE;y++) for(let x=0;x<SIZE;x++) if(board[y][x] === EMPTY) return false;
  return true;
}

async function endGame(winPlayer){
  gameOver = true;
  winner = winPlayer;
  omokStatus.textContent = '게임 종료';
  scheduleOmokDraw();
  if(winPlayer === BLACK){ try{ sfxWinFanfare(); }catch{} }
  if(winPlayer === WHITE){ try{ sfxLoseSad(); }catch{} }
}

function placeStoneCore(x,y,player, playSfx=true){
  if(!inside(x,y)) return false;
  if(board[y][x] !== EMPTY) return false;
  board[y][x] = player;
  moves.push({x,y,player});
  lastMove = {x,y};
  if(playSfx){ try{ sfxStonePlace(); }catch{} }
  renderMoves();
  scheduleOmokDraw();
  return true;
}

function patternScore(len, openEnds){
  if(len >= 5) return 1000000;
  if(len === 4 && openEnds === 2) return 200000;
  if(len === 4 && openEnds === 1) return 50000;
  if(len === 3 && openEnds === 2) return 12000;
  if(len === 3 && openEnds === 1) return 2500;
  if(len === 2 && openEnds === 2) return 600;
  if(len === 2 && openEnds === 1) return 150;
  if(len === 1 && openEnds === 2) return 40;
  return 10;
}

function evaluateAt(x,y,player){
  const dirs = [{dx:1,dy:0},{dx:0,dy:1},{dx:1,dy:1},{dx:1,dy:-1}];
  let score = 0;

  for(const d of dirs){
    let a=0, b=0;
    let nx=x+d.dx, ny=y+d.dy;
    while(inside(nx,ny) && board[ny][nx]===player){ a++; nx+=d.dx; ny+=d.dy; }
    const openA = inside(nx,ny) && board[ny][nx]===EMPTY;

    nx=x-d.dx; ny=y-d.dy;
    while(inside(nx,ny) && board[ny][nx]===player){ b++; nx-=d.dx; ny-=d.dy; }
    const openB = inside(nx,ny) && board[ny][nx]===EMPTY;

    const len = 1 + a + b;
    const openEnds = (openA?1:0) + (openB?1:0);
    score += patternScore(len, openEnds);
  }

  const cx=7, cy=7;
  const dist = Math.abs(x-cx)+Math.abs(y-cy);
  const level = aiLevelEl.value;
  const centerBonus = level === "easy" ? 18 : level === "normal" ? 28 : 40;
  score += Math.max(0, centerBonus - dist);

  return score;
}

function wouldWinAt(x,y,p){
  board[y][x] = p;
  const ok = checkWinFrom(x,y,p);
  board[y][x] = EMPTY;
  return ok;
}

function getAiParams(){
  const level = aiLevelEl.value;
  if(level === "easy"){
    return { noise: 900, radius: 1, wAttack: 0.85, wDefend: 0.90, thinkDelay: 220 };
  }
  if(level === "hard"){
    return { noise: 0, radius: 2, wAttack: 1.18, wDefend: 1.30, thinkDelay: 260 };
  }
  return { noise: 220, radius: 2, wAttack: 1.0, wDefend: 1.08, thinkDelay: 240 };
}

function candidateCellsByRadius(radius){
  const hasAny = moves.length > 0;
  if(!hasAny) return [{x:7,y:7}];

  const cand = [];
  for(let y=0;y<SIZE;y++){
    for(let x=0;x<SIZE;x++){
      if(board[y][x] !== EMPTY) continue;
      let near = 0;
      for(let dy=-radius;dy<=radius;dy++){
        for(let dx=-radius;dx<=radius;dx++){
          const nx=x+dx, ny=y+dy;
          if(!inside(nx,ny)) continue;
          if(board[ny][nx] !== EMPTY) near++;
        }
      }
      if(near>0) cand.push({x,y});
    }
  }
  return cand.length ? cand : [{x:7,y:7}];
}

function findBestMoveAI(){
  const me = WHITE;
  const opp = BLACK;
  const {noise, radius, wAttack, wDefend} = getAiParams();

  const cand = candidateCellsByRadius(radius);
  if(cand.length === 0) return null;

  for(const c of cand) if(wouldWinAt(c.x,c.y,me)) return c;
  for(const c of cand) if(wouldWinAt(c.x,c.y,opp)) return c;

  let best = cand[0], bestScore = -Infinity;

  for(const c of cand){
    const attack = evaluateAt(c.x,c.y,me) * wAttack;
    const defend = evaluateAt(c.x,c.y,opp) * wDefend;
    let s = attack + defend;

    if(noise > 0) s += (Math.random() * noise) - (noise/2);

    if(s > bestScore){
      bestScore = s;
      best = c;
    }
  }
  return best;
}

async function aiTurn(){
  if(gameOver) return;
  aiBusy = true;
  turn = WHITE;
  renderTurn();

  await ensureAudio();

  const {thinkDelay} = getAiParams();
  await new Promise(r => setTimeout(r, thinkDelay));

  const move = findBestMoveAI();
  if(!move){
    aiBusy = false;
    return;
  }
  placeStoneCore(move.x, move.y, WHITE, true);

  if(checkWinFrom(move.x, move.y, WHITE)){
    await endGame(WHITE);
    aiBusy = false;
    return;
  }
  if(isBoardFull()){
    omokStatus.textContent = "무승부";
    gameOver = true;
    scheduleOmokDraw();
    aiBusy = false;
    return;
  }

  turn = BLACK;
  renderTurn();
  aiBusy = false;
}

async function userPlace(x,y){
  if(gameOver) return;
  if(aiBusy) return;
  if(turn !== BLACK) return;

  const ok = placeStoneCore(x,y,BLACK,true);
  if(!ok) return;

  if(checkWinFrom(x,y,BLACK)){
    await endGame(BLACK);
    return;
  }
  if(isBoardFull()){
    omokStatus.textContent = "무승부";
    gameOver = true;
    scheduleOmokDraw();
    return;
  }

  await aiTurn();
}

function undo(){
  if(moves.length === 0) return;
  if(aiBusy) return;

  function popOne(){
    const m = moves.pop();
    if(!m) return;
    board[m.y][m.x] = EMPTY;
  }

  if(gameOver){
    gameOver = false; winner = EMPTY; omokStatus.textContent = '';
  }

  if(moves.length){
    const last = moves[moves.length-1];
    if(last.player === WHITE){
      popOne();
      if(moves.length) popOne();
    }else{
      popOne();
    }
  }

  lastMove = moves.length ? {x:moves[moves.length-1].x, y:moves[moves.length-1].y} : null;
  turn = BLACK;
  renderTurn();
  renderMoves();
  scheduleOmokDraw();
}

function canvasToGrid(ev){
  const rect = canvas.getBoundingClientRect();
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;

  const size = rect.width;
  const pad = size * 0.06;
  const cell = (size - pad*2) / (SIZE - 1);

  const gx = Math.round((x - pad)/cell);
  const gy = Math.round((y - pad)/cell);
  return {gx, gy};
}

canvas.addEventListener('click', async (ev) => {
  await ensureAudio();
  const {gx, gy} = canvasToGrid(ev);
  userPlace(gx, gy);
});

document.getElementById('omokReset').addEventListener('click', newBoard);
document.getElementById('omokUndo').addEventListener('click', undo);

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if(key === 'u'){ e.preventDefault(); undo(); }
  if(key === 'n'){ e.preventDefault(); newBoard(); }
});

newBoard();
scheduleOmokDraw(true);
