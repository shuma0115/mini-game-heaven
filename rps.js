initHeader("route.rps");

const RPS_KEY = 'mini_rps_v2';
const rpsMap = {
  scissors: { label: t('rps.choice.scissors'), emoji: '✌️' },
  rock:     { label: t('rps.choice.rock'), emoji: '✊' },
  paper:    { label: t('rps.choice.paper'), emoji: '🖐️' }
};

const CHOICE_KEY_BY_LABEL = {
  "가위": "scissors",
  "바위": "rock",
  "보": "paper",
  "Scissors": "scissors",
  "Rock": "rock",
  "Paper": "paper"
};
const OUTCOME_KEY_BY_LABEL = {
  "승": "win",
  "무": "draw",
  "패": "lose",
  "W": "win",
  "D": "draw",
  "L": "lose"
};

function syncRpsLabels(){
  rpsMap.scissors.label = t('rps.choice.scissors');
  rpsMap.rock.label = t('rps.choice.rock');
  rpsMap.paper.label = t('rps.choice.paper');
}

const beats = { scissors: 'paper', rock: 'scissors', paper: 'rock' };

const myChoiceEl = document.getElementById('myChoice');
const cpuChoiceEl = document.getElementById('cpuChoice');
const rpsResultEl = document.getElementById('rpsResult');
const winEl = document.getElementById('win');
const drawEl = document.getElementById('draw');
const loseEl = document.getElementById('lose');
const histList = document.getElementById('histList');
const rpsButtons = [...document.querySelectorAll('[data-rps]')];

let rpsBusy = false;

function renderRpsResult(){
  const state = rpsResultEl.dataset.state || "prompt";
  if(state === "wait"){
    rpsResultEl.textContent = t('rps.result.wait');
    return;
  }
  if(state === "win"){
    rpsResultEl.textContent = t('rps.result.win');
    return;
  }
  if(state === "draw"){
    rpsResultEl.textContent = t('rps.result.draw');
    return;
  }
  if(state === "lose"){
    rpsResultEl.textContent = t('rps.result.lose');
    return;
  }
  rpsResultEl.textContent = t('rps.result.prompt');
}

window.addEventListener("langchange", () => {
  syncRpsLabels();
  renderRps();
  renderRpsResult();
});

function parseHistoryLine(line){
  const match = line.match(/^\[(.+?)\]\s*([^:]+):\s*(.+?)\s*\/\s*([^:]+):\s*(.+?)\s*→\s*(.+)$/);
  if (!match) return null;
  const time = match[1].trim();
  const meLabel = match[3].trim();
  const cpuLabel = match[5].trim();
  const outcomeLabel = match[6].trim();
  const me = CHOICE_KEY_BY_LABEL[meLabel];
  const cpu = CHOICE_KEY_BY_LABEL[cpuLabel];
  const outcome = OUTCOME_KEY_BY_LABEL[outcomeLabel];
  if (!me || !cpu || !outcome) return null;
  return { time, me, cpu, outcome };
}

function loadRps(){
  try{
    const raw = localStorage.getItem(RPS_KEY);
    if(!raw) return { w:0, d:0, l:0, hist:[] };
    const data = JSON.parse(raw);
    let migrated = false;
    const hist = Array.isArray(data.hist) ? data.hist.slice(0, 50).map(item => {
      if (typeof item === "string") {
        const parsed = parseHistoryLine(item);
        if (parsed) {
          migrated = true;
          return parsed;
        }
        return item;
      }
      return item;
    }) : [];
    if (migrated) {
      localStorage.setItem(RPS_KEY, JSON.stringify({
        w: Number(data.w||0),
        d: Number(data.d||0),
        l: Number(data.l||0),
        hist
      }));
    }
    return {
      w: Number(data.w||0),
      d: Number(data.d||0),
      l: Number(data.l||0),
      hist
    };
  }catch(_){
    return { w:0, d:0, l:0, hist:[] };
  }
}
function saveRps(state){ localStorage.setItem(RPS_KEY, JSON.stringify(state)); }

function formatHistory(item){
  if (typeof item === "string") return item;
  if (!item || typeof item !== "object") return "";
  const meLabel = rpsMap[item.me]?.label || item.me;
  const cpuLabel = rpsMap[item.cpu]?.label || item.cpu;
  const outcomeLabel = item.outcome === "win" ? t('rps.log.win') : item.outcome === "draw" ? t('rps.log.draw') : t('rps.log.lose');
  return `[${item.time}] ${t('rps.log.me')}: ${meLabel} / ${t('rps.log.cpu')}: ${cpuLabel} → ${outcomeLabel}`;
}

function renderRps(){
  const st = loadRps();
  winEl.textContent = st.w;
  drawEl.textContent = st.d;
  loseEl.textContent = st.l;
  histList.innerHTML = '';
  if(st.hist.length === 0){
    const li = document.createElement('li');
    li.textContent = t('rps.history.empty');
    histList.appendChild(li);
    return;
  }
  st.hist.forEach(line => {
    const li = document.createElement('li');
    li.textContent = formatHistory(line);
    histList.appendChild(li);
  });
}

function judge(me, cpu){
  if(me === cpu) return 'draw';
  if(beats[me] === cpu) return 'win';
  return 'lose';
}
function randomRps(){
  const keys = Object.keys(rpsMap);
  return keys[Math.floor(Math.random()*keys.length)];
}

async function playRps(me){
  if(rpsBusy) return;
  rpsBusy = true;

  await ensureAudio();

  rpsButtons.forEach(b => b.disabled = true);
  rpsResultEl.className = 'result';
  rpsResultEl.dataset.state = "wait";
  renderRpsResult();

  myChoiceEl.textContent = rpsMap[me].emoji;

  try{ sfxRpsStart(); }catch{}

  const startAt = performance.now();
  let lastTick = 0;
  const order = ['scissors','rock','paper'];
  let idx = 0;

  await new Promise(resolve => {
    const timer = setInterval(() => {
      const now = performance.now();
      if(now - startAt >= 2000){
        clearInterval(timer);
        resolve();
        return;
      }
      if(now - lastTick >= 90){
        lastTick = now;
        const cur = order[idx % order.length];
        idx++;
        cpuChoiceEl.textContent = rpsMap[cur].emoji;
        try{ sfxRpsTick(); }catch{}
      }
    }, 20);
  });

  const cpu = randomRps();
  cpuChoiceEl.textContent = rpsMap[cpu].emoji;

  const outcome = judge(me, cpu);
  rpsResultEl.className = 'result ' + outcome;
  rpsResultEl.dataset.state = outcome;
  renderRpsResult();

  if(outcome === 'win') { try{ sfxWinFanfare(); }catch{} }
  if(outcome === 'lose'){ try{ sfxLoseSad(); }catch{} }

  const st = loadRps();
  if(outcome === 'win') st.w++;
  if(outcome === 'draw') st.d++;
  if(outcome === 'lose') st.l++;

  const ts = new Date();
  const locale = document.documentElement.getAttribute("data-lang") === "en" ? "en-US" : "ko-KR";
  const timeLabel = ts.toLocaleTimeString(locale, { hour:'2-digit', minute:'2-digit' });
  const line = { time: timeLabel, me, cpu, outcome };
  st.hist.unshift(line);
  st.hist = st.hist.slice(0, 50);
  saveRps(st);
  renderRps();

  rpsButtons.forEach(b => b.disabled = false);
  rpsBusy = false;
}

function resetRps(){
  localStorage.removeItem(RPS_KEY);
  myChoiceEl.textContent = '—';
  cpuChoiceEl.textContent = '—';
  rpsResultEl.className = 'result';
  rpsResultEl.dataset.state = "prompt";
  renderRpsResult();
  renderRps();
}

rpsButtons.forEach(btn => btn.addEventListener('click', () => playRps(btn.getAttribute('data-rps'))));
document.getElementById('rpsReset').addEventListener('click', resetRps);

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if(key === 'r'){ e.preventDefault(); resetRps(); }
});

if(!rpsResultEl.dataset.state){
  rpsResultEl.dataset.state = "prompt";
}
renderRpsResult();
renderRps();
