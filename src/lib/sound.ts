let ctx: AudioContext | null = null;
let ctxFailed = false;

function getCtx(): AudioContext | null {
  if (ctxFailed) return null;
  if (ctx) {
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  try {
    const AudioContextCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      ctxFailed = true;
      return null;
    }
    ctx = new AudioContextCtor();
    return ctx;
  } catch {
    ctxFailed = true;
    return null;
  }
}

function playTone(freq: number, startMs: number, durationMs: number, gainPeak = 0.15) {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  try {
    const startTime = audioCtx.currentTime + startMs / 1000;
    const duration = durationMs / 1000;

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = freq;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainPeak, startTime + duration * 0.15);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.02);
  } catch {
    // ignore — audio is a nice-to-have, never let it break the game
  }
}

export function playCorrectSound(): void {
  playTone(523.25, 0, 90);
  playTone(659.25, 80, 90);
  playTone(783.99, 160, 140);
}

export function playIncorrectSound(): void {
  playTone(220, 0, 150, 0.12);
  playTone(180, 130, 180, 0.12);
}

export function playSelectSound(): void {
  playTone(440, 0, 60, 0.08);
}
