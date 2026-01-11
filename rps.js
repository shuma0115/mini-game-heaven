initHeader("route.rps");

const RPS_KEY = 'mini_rps_v2';
const rpsMap = {
  scissors: { label: t('rps.choice.scissors'), emoji: '✌️' },
  rock:     { label: t('rps.choice.rock'), emoji: '✊' },
  paper:    { label: t('rps.choice.paper'), emoji: '🖐️' }
};

function syncRpsLabels(){
  rpsMap.scissors.label = t('rps.choice.scissors');
  rpsMap.rock.label = t('rps.choice.rock');
  rpsMap.paper.label = t('rps.choice.paper');
}

window.addEventListener("langchange", () => {
  syncRpsLabels();
  renderRps();
  if(myChoiceEl.textContent === '—' && cpuChoiceEl.textContent === '—'){
    rpsResultEl.textContent = t('rps.result.prompt');
  }
});
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

function loadRps(){
  try{
    const raw = localStorage.getItem(RPS_KEY);
    if(!raw) return { w:0, d:0, l:0, hist:[] };
    const data = JSON.parse(raw);
    return {
      w: Number(data.w||0),
      d: Number(data.d||0),
      l: Number(data.l||0),
      hist: Array.isArray(data.hist) ? data.hist.slice(0, 50) : []
    };
  }catch(_){
    return { w:0, d:0, l:0, hist:[] };
  }
}
function saveRps(state){ localStorage.setItem(RPS_KEY, JSON.stringify(state)); }

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
    li.textContent = line;
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
  rpsResultEl.textContent = t('rps.result.wait');

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
  rpsResultEl.textContent = outcome === 'win' ? t('rps.result.win') : outcome === 'draw' ? t('rps.result.draw') : t('rps.result.lose');

  if(outcome === 'win') { try{ sfxWinFanfare(); }catch{} }
  if(outcome === 'lose'){ try{ sfxLoseSad(); }catch{} }

  const st = loadRps();
  if(outcome === 'win') st.w++;
  if(outcome === 'draw') st.d++;
  if(outcome === 'lose') st.l++;

  const ts = new Date();
  const locale = document.documentElement.getAttribute("data-lang") === "en" ? "en-US" : "ko-KR";
  const timeLabel = ts.toLocaleTimeString(locale, { hour:'2-digit', minute:'2-digit' });
  const line = `[${timeLabel}] ${t('rps.log.me')}: ${rpsMap[me].label} / ${t('rps.log.cpu')}: ${rpsMap[cpu].label} → ${outcome === 'win' ? t('rps.log.win') : outcome === 'draw' ? t('rps.log.draw') : t('rps.log.lose')}`;
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
  rpsResultEl.textContent = t('rps.result.prompt');
  renderRps();
}

rpsButtons.forEach(btn => btn.addEventListener('click', () => playRps(btn.getAttribute('data-rps'))));
document.getElementById('rpsReset').addEventListener('click', resetRps);

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if(key === 'r'){ e.preventDefault(); resetRps(); }
});

renderRps();
