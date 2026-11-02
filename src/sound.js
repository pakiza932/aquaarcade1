// All sounds are generated in the browser with the Web Audio API (no audio files needed).
let ctx = null;
let master = null;
let bubbleTimer = null;
let on = false;

function pad(freq, lfoRate, detune, dest) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.detune.value = detune;
  const g = ctx.createGain();
  g.gain.value = 0.05;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = lfoRate;
  const lfoAmt = ctx.createGain();
  lfoAmt.gain.value = 0.03;
  lfo.connect(lfoAmt);
  lfoAmt.connect(g.gain);
  osc.connect(g);
  g.connect(dest);
  osc.start();
  lfo.start();
}

function setup() {
  if (ctx) return;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // 1) Deep ocean rumble: brown noise + slow "swell" on a low-pass filter
  const len = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 500;
  lp.Q.value = 0.7;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.4;
  const swell = ctx.createOscillator();
  swell.frequency.value = 0.12;
  const swellAmt = ctx.createGain();
  swellAmt.gain.value = 250;
  swell.connect(swellAmt);
  swellAmt.connect(lp.frequency);
  noise.connect(lp);
  lp.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();
  swell.start();

  // 2) Dreamy underwater pad (soft chord, each note fades in and out slowly)
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = "lowpass";
  padFilter.frequency.value = 900;
  padFilter.connect(master);
  [[110, 0.07, -5], [164.81, 0.09, 4], [246.94, 0.06, -3], [277.18, 0.11, 6], [329.63, 0.05, 2]]
    .forEach(([f, r, d]) => pad(f, r, d, padFilter));
}

// 3) Random bubble "bloops"
function bubble() {
  if (!on) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const f = 300 + Math.random() * 500;
  o.type = "sine";
  o.frequency.setValueAtTime(f, t);
  o.frequency.exponentialRampToValueAtTime(f * 2.2, t + 0.12);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.09, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 0.2);
  bubbleTimer = setTimeout(bubble, 1200 + Math.random() * 3500);
}

export async function startAmbient() {
  setup();
  if (ctx.state === "suspended") await ctx.resume();
  on = true;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(0.5, t + 2); // gentle fade-in
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(bubble, 800);
}

export function stopAmbient() {
  if (!ctx) return;
  on = false;
  clearTimeout(bubbleTimer);
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(0, t + 0.8); // fade-out
}

// 4) Arcade "coin" sound when something is added to the cart
export function playCoin() {
  if (!on || !ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "square";
  o.frequency.setValueAtTime(988, t);
  o.frequency.setValueAtTime(1319, t + 0.08);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(t);
  o.stop(t + 0.4);
}
