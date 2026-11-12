// Optional workshop sounds, synthesised with Web Audio: no audio files and silent until the player turns them on.
let context = null;
let enabled = false;

export function setSound(value) {
  enabled = Boolean(value);
  if (!enabled) return;
  try {
    context ??= new (window.AudioContext || window.webkitAudioContext)();
    void context.resume();
  } catch { enabled = false; }
}

function tone(start, from, to, duration, type = 'sine', volume = 0.05) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

const SOUNDS = {
  // A leaf dropping into the cauldron.
  drop: now => tone(now, 620, 240, 0.16, 'sine', 0.06),
  // Turning to another section.
  page: now => tone(now, 300, 380, 0.09, 'triangle', 0.025),
  // Bubbling brew.
  brew: now => { for (let n = 0; n < 9; n++) { const pitch = 180 + ((n * 137) % 260); tone(now + n * 0.13, pitch, pitch * 1.9, 0.11, 'sine', 0.045); } },
  // A completed commission.
  success: now => [523.25, 659.25, 783.99, 1046.5].forEach((pitch, n) => tone(now + n * 0.11, pitch, pitch, 0.5, 'triangle', 0.05)),
};

export function play(name) {
  if (!enabled || !context || !SOUNDS[name]) return;
  try { SOUNDS[name](context.currentTime + 0.01); } catch { /* Sound is decorative. */ }
}
