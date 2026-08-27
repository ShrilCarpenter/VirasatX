// Web Audio API ambient museum soundscape synthesizer
// Creates a soothing, authentic Indian acoustic drone (Sa-Pa tanpura resonance & temple ambient reverb)

class SoundscapeService {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private masterVolume: number = 0.15;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.stop(); // Clear previous nodes

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(this.masterVolume, now + 3);
      this.gainNode.connect(this.ctx.destination);

      // Root fundamental frequencies for meditative Indian Tanpura drone in C# (138.59 Hz)
      // Pa (G#3 - 207.65 Hz), Sa (C#4 - 277.18 Hz), Sa octave (C#3 - 138.59 Hz), Kharja Sa (C#2 - 69.30 Hz)
      const frequencies = [69.3, 138.59, 207.65, 277.18, 415.3, 554.37];

      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        // Subtle sine + triangle mix for warm woody resonance
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle natural pitch beating / chorus simulation
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 0.1 + idx * 0.05;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 0.4;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        const baseVol = 0.18 / (idx + 1);
        oscGain.gain.setValueAtTime(baseVol, now);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode);
        osc.start();
        this.oscillators.push(osc);
      });

      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext ambient synthesis not supported or user gesture needed', e);
    }
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1600);
    } else {
      this.isPlaying = false;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }
}

export const soundscapeService = new SoundscapeService();
