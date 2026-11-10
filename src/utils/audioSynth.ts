/**
 * Web Audio API synthesizer fallback for Happy Birthday melody
 */
export class BirthdaySynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTimeout: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playMelody(onEnd?: () => void) {
    this.stop();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    const ctx = this.ctx;

    // Happy birthday notes & durations
    // C4, C4, D4, C4, F4, E4 ...
    const notes: [number, number][] = [
      [261.63, 0.35], // Hap-
      [261.63, 0.35], // py
      [293.66, 0.7],  // Birth-
      [261.63, 0.7],  // day
      [349.23, 0.7],  // to
      [329.63, 1.2],  // you
      [0, 0.3],

      [261.63, 0.35], // Hap-
      [261.63, 0.35], // py
      [293.66, 0.7],  // Birth-
      [261.63, 0.7],  // day
      [392.00, 0.7],  // to
      [349.23, 1.2],  // you
      [0, 0.3],

      [261.63, 0.35], // Hap-
      [261.63, 0.35], // py
      [523.25, 0.7],  // Birth-
      [440.00, 0.7],  // day
      [349.23, 0.7],  // dear
      [329.63, 0.7],  // [friend]
      [293.66, 1.0],  // ...
      [0, 0.3],

      [466.16, 0.35], // Hap-
      [466.16, 0.35], // py
      [440.00, 0.7],  // Birth-
      [349.23, 0.7],  // day
      [392.00, 0.7],  // to
      [349.23, 1.4],  // you!
    ];

    let time = ctx.currentTime + 0.1;

    for (const [freq, duration] of notes) {
      if (freq > 0) {
        // Oscillator for warm chime / marimba tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        // Gentle pluck envelope
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.25, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + duration);
      }
      time += duration * 0.95;
    }

    const totalDuration = (time - ctx.currentTime) * 1000;
    this.currentTimeout = window.setTimeout(() => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    }, totalDuration);
  }

  stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  isCurrentlyPlaying() {
    return this.isPlaying;
  }
}

export const synthPlayer = new BirthdaySynth();
