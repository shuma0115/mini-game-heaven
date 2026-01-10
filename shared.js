/* shared.js: Theme + Global SFX + Audio utilities (멀티페이지 공용) */

const THEME_KEY = "theme";
const SFX_ON_KEY = "mini_sfx_on_v1";
const SFX_VOL_KEY = "mini_sfx_vol_v1";

const htmlEl = document.documentElement;

let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}
async function ensureAudio(){
  const ctx = getAudioCtx();
  if(!ctx) return null;
  if(ctx.state === "suspended"){
    try{ await ctx.resume(); }catch{}
  }
  return ctx;
}

let SFX_ENABLED = (localStorage.getItem(SFX_ON_KEY) ?? "1") === "1";
let SFX_VOL = Number(localStorage.getItem(SFX_VOL_KEY) ?? "70"); // 0~100

function vol(x){
  if(!SFX_ENABLED) return 0;
  const v = Math.max(0, Math.min(1, SFX_VOL/100));
  return x * v;
}

function applyTheme(theme){
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const label = theme === "dark" ? "☀️ 화이트모드" : "🌙 다크모드";
  document.querySelectorAll("[data-theme-toggle]").forEach(btn => btn.textContent = label);
}
function toggleTheme(){
  const current = htmlEl.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
}

/* header init: 페이지별 route 이름과 버튼들을 연결 */
function initHeader(routeName){
  const routeNameEl = document.getElementById("routeName");
  if(routeNameEl) routeNameEl.textContent = routeName;

  const themeBtn = document.getElementById("themeToggle");
  if(themeBtn){
    themeBtn.setAttribute("data-theme-toggle","1");
    themeBtn.addEventListener("click", toggleTheme);
  }
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  const sfxToggleEl = document.getElementById("sfxToggle");
  const sfxVolEl = document.getElementById("sfxVol");

  if(sfxToggleEl){
    sfxToggleEl.checked = SFX_ENABLED;
    sfxToggleEl.addEventListener("change", () => {
      SFX_ENABLED = sfxToggleEl.checked;
      localStorage.setItem(SFX_ON_KEY, SFX_ENABLED ? "1" : "0");
    });
  }
  if(sfxVolEl){
    sfxVolEl.value = String(SFX_VOL);
    sfxVolEl.addEventListener("input", () => {
      SFX_VOL = Number(sfxVolEl.value);
      localStorage.setItem(SFX_VOL_KEY, String(SFX_VOL));
    });
  }
}

/***********************
 * SFX (공용)
 ************************/
function sfxRpsStart(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.20), t);
  master.connect(ctx.destination);

  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate*0.18), ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * (1 - i/d.length);

  const noise = ctx.createBufferSource(); noise.buffer = noiseBuf;
  const hp = ctx.createBiquadFilter(); hp.type="highpass"; hp.frequency.setValueAtTime(600, t);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol(0.18), t+0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t+0.18);

  noise.connect(hp); hp.connect(g); g.connect(master);
  noise.start(t); noise.stop(t+0.19);
  master.gain.linearRampToValueAtTime(0.0001, t+0.22);
}
function sfxRpsTick(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.09), t);
  master.connect(ctx.destination);

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "square";
  o.frequency.setValueAtTime(520 + Math.random()*120, t);

  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol(0.14), t+0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t+0.04);

  o.connect(g); g.connect(master);
  o.start(t); o.stop(t+0.05);
  master.gain.linearRampToValueAtTime(0.0001, t+0.06);
}

function sfxWinFanfare(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.20), t);
  master.connect(ctx.destination);

  function tone(freq, start, dur, type="sine", amp=0.14){
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol(amp), start+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start+dur);
    o.connect(g); g.connect(master);
    o.start(start); o.stop(start+dur+0.03);
  }
  tone(523.25, t, 0.18, "square", 0.10);
  tone(659.25, t+0.08, 0.20, "square", 0.10);
  tone(783.99, t+0.16, 0.25, "square", 0.10);
  tone(1046.5, t+0.24, 0.30, "triangle", 0.09);

  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate*0.35), ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * (1 - i/d.length);
  const noise = ctx.createBufferSource(); noise.buffer = noiseBuf;
  const bp = ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.setValueAtTime(2500, t); bp.Q.setValueAtTime(1.1, t);
  const ng = ctx.createGain(); ng.gain.setValueAtTime(0.0001, t); ng.gain.exponentialRampToValueAtTime(vol(0.10), t+0.02); ng.gain.exponentialRampToValueAtTime(0.0001, t+0.35);
  noise.connect(bp); bp.connect(ng); ng.connect(master);
  noise.start(t); noise.stop(t+0.36);

  master.gain.linearRampToValueAtTime(0.0001, t+0.7);
}

function sfxLoseSad(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.22), t);
  master.connect(ctx.destination);

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(380, t);
  o.frequency.exponentialRampToValueAtTime(180, t+0.45);

  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol(0.18), t+0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t+0.50);

  const lp = ctx.createBiquadFilter();
  lp.type="lowpass";
  lp.frequency.setValueAtTime(900, t);
  lp.frequency.exponentialRampToValueAtTime(420, t+0.45);

  o.connect(lp); lp.connect(g); g.connect(master);
  o.start(t); o.stop(t+0.52);
  master.gain.linearRampToValueAtTime(0.0001, t+0.6);
}

function sfxStonePlace(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.40), t);
  master.connect(ctx.destination);

  const o1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  o1.type="sine";
  o1.frequency.setValueAtTime(190, t);
  o1.frequency.exponentialRampToValueAtTime(95, t+0.09);
  g1.gain.setValueAtTime(0.0001, t);
  g1.gain.exponentialRampToValueAtTime(vol(0.28), t+0.008);
  g1.gain.exponentialRampToValueAtTime(0.0001, t+0.16);
  o1.connect(g1); g1.connect(master);
  o1.start(t); o1.stop(t+0.18);

  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type="square";
  o2.frequency.setValueAtTime(1400 + Math.random()*260, t);
  g2.gain.setValueAtTime(0.0001, t);
  g2.gain.exponentialRampToValueAtTime(vol(0.14), t+0.002);
  g2.gain.exponentialRampToValueAtTime(0.0001, t+0.045);
  o2.connect(g2); g2.connect(master);
  o2.start(t); o2.stop(t+0.06);

  master.gain.linearRampToValueAtTime(0.0001, t+0.22);
}

/* LOTTO SFX */
function startRollingSound(durationSec = 5.0, volumeBase = 0.32) {
  const ctx = getAudioCtx();
  if (!ctx) return null;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const t0 = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(volumeBase), t0);
  master.connect(ctx.destination);

  const rumble = ctx.createOscillator();
  const rumbleGain = ctx.createGain();
  rumble.type = "sine";
  rumble.frequency.setValueAtTime(55, t0);
  rumble.frequency.linearRampToValueAtTime(62, t0 + durationSec);

  rumbleGain.gain.setValueAtTime(0.0, t0);
  rumbleGain.gain.linearRampToValueAtTime(vol(0.22), t0 + 0.15);
  rumbleGain.gain.linearRampToValueAtTime(vol(0.12), t0 + durationSec);
  rumbleGain.gain.linearRampToValueAtTime(0.0001, t0 + durationSec + 0.12);

  rumble.connect(rumbleGain);
  rumbleGain.connect(master);

  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * durationSec), ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuf;

  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(1200, t0);
  band.Q.setValueAtTime(0.7, t0);

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(2.2, t0);
  lfoGain.gain.setValueAtTime(320, t0);

  lfo.connect(lfoGain);
  lfoGain.connect(band.frequency);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0, t0);
  noiseGain.gain.linearRampToValueAtTime(vol(0.20), t0 + 0.2);
  noiseGain.gain.linearRampToValueAtTime(vol(0.14), t0 + durationSec);
  noiseGain.gain.linearRampToValueAtTime(0.0001, t0 + durationSec + 0.12);

  noise.connect(band);
  band.connect(noiseGain);
  noiseGain.connect(master);

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(vol(0.55), t0);
  clickGain.connect(master);

  const clickInterval = setInterval(() => {
    if(!SFX_ENABLED) return;
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(220 + Math.random() * 180, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(vol(0.12), now + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    o.connect(g);
    g.connect(clickGain);
    o.start(now);
    o.stop(now + 0.04);
  }, 70 + Math.floor(Math.random() * 60));

  rumble.start(t0);
  noise.start(t0);
  lfo.start(t0);

  const stopAt = t0 + durationSec;
  rumble.stop(stopAt + 0.2);
  noise.stop(stopAt + 0.2);
  lfo.stop(stopAt + 0.2);

  const stopTimer = setTimeout(() => {
    clearInterval(clickInterval);
    clearTimeout(stopTimer);
  }, Math.ceil((durationSec + 0.3) * 1000));

  return {
    stop: () => {
      try { clearInterval(clickInterval); } catch {}
      try { master.gain.cancelScheduledValues(ctx.currentTime); } catch {}
      try { master.gain.setValueAtTime(master.gain.value, ctx.currentTime); } catch {}
      try { master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.08); } catch {}
    }
  };
}

function playTick() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.38), t);
  master.connect(ctx.destination);

  const o1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  o1.type = "square";
  o1.frequency.setValueAtTime(760, t);

  g1.gain.setValueAtTime(0.0001, t);
  g1.gain.exponentialRampToValueAtTime(vol(0.22), t + 0.003);
  g1.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);

  o1.connect(g1);
  g1.connect(master);

  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = "triangle";
  o2.frequency.setValueAtTime(1500, t);

  g2.gain.setValueAtTime(0.0001, t);
  g2.gain.exponentialRampToValueAtTime(vol(0.10), t + 0.002);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

  o2.connect(g2);
  g2.connect(master);

  o1.start(t); o2.start(t);
  o1.stop(t + 0.07);
  o2.stop(t + 0.05);

  master.gain.linearRampToValueAtTime(0.0001, t + 0.09);
}

function playFinishChime() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.22), t);
  master.connect(ctx.destination);

  function ding(freq, start, dur) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol(0.18), start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g); g.connect(master);
    o.start(start);
    o.stop(start + dur + 0.02);
  }

  ding(1046.5, t, 0.22);
  ding(1318.5, t + 0.08, 0.22);
}

/* 유틸 */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function cryptoRandomId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "id_" + Math.random().toString(16).slice(2) + "_" + Date.now(); // 확실한게 아니야
}

/* 공용 단축키: ESC -> index */
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // 같은 폴더 기준
    window.location.href = "index.html";
  }
});
