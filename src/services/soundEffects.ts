class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    const saved = localStorage.getItem('prl_adventure_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('prl_adventure_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.playClick();
    }
    return this.isMuted;
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.12, delay: number = 0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      }, delay);
    } catch {
      // Audio fallback safe
    }
  }

  public playClick() {
    this.playTone(600, 0.04, 'triangle', 0.05);
  }

  public playCorrect() {
    this.playTone(523.25, 0.08, 'triangle', 0.12, 0);   // C5
    this.playTone(659.25, 0.08, 'triangle', 0.12, 70);  // E5
    this.playTone(783.99, 0.16, 'triangle', 0.14, 140); // G5
    this.playTone(1046.50, 0.22, 'sine', 0.16, 210);    // C6
  }

  public playWrong() {
    this.playTone(220, 0.12, 'sawtooth', 0.12, 0);
    this.playTone(164.81, 0.25, 'sawtooth', 0.14, 110);
  }

  public playShieldBlock() {
    this.playTone(320, 0.08, 'square', 0.1, 0);
    this.playTone(480, 0.18, 'triangle', 0.14, 60);
  }

  public playShieldRestore() {
    this.playTone(440, 0.08, 'sine', 0.1, 0);
    this.playTone(660, 0.08, 'sine', 0.12, 80);
    this.playTone(880, 0.20, 'sine', 0.14, 160);
  }

  public playLifeGain() {
    this.playTone(392, 0.08, 'triangle', 0.1, 0);
    this.playTone(523.25, 0.08, 'triangle', 0.12, 80);
    this.playTone(659.25, 0.24, 'triangle', 0.15, 160);
  }

  public playVictory() {
    const melody = [
      { f: 523.25, d: 0.1, t: 0 },
      { f: 659.25, d: 0.1, t: 100 },
      { f: 783.99, d: 0.1, t: 200 },
      { f: 1046.50, d: 0.35, t: 300 },
      { f: 880.00, d: 0.15, t: 500 },
      { f: 1046.50, d: 0.5, t: 650 },
    ];
    melody.forEach(m => this.playTone(m.f, m.d, 'triangle', 0.15, m.t));
  }

  public playGameOver() {
    const loss = [
      { f: 293.66, d: 0.18, t: 0 },
      { f: 277.18, d: 0.18, t: 180 },
      { f: 261.63, d: 0.22, t: 360 },
      { f: 246.94, d: 0.5, t: 580 },
    ];
    loss.forEach(m => this.playTone(m.f, m.d, 'sawtooth', 0.14, m.t));
  }
}

export const soundManager = new SoundEffectsManager();
