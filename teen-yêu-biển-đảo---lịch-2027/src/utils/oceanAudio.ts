// Web Audio API pure synthesized gentle ocean waves generator
class OceanSoundManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const sampleRate = this.audioCtx.sampleRate;
      const bufferSize = sampleRate * 5; // 5-second looping pinkish noise buffer
      const buffer = this.audioCtx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Pink/Brown noise generator algorithm
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Low pass filter
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      this.filterNode.Q.setValueAtTime(2.5, this.audioCtx.currentTime);

      // LFO to simulate rolling wave swells (around 0.12 Hz = ~8 seconds per swell)
      this.lfoNode = this.audioCtx.createOscillator();
      this.lfoNode.type = 'sine';
      this.lfoNode.frequency.setValueAtTime(0.12, this.audioCtx.currentTime);

      const lfoGain = this.audioCtx.createGain();
      lfoGain.gain.setValueAtTime(240, this.audioCtx.currentTime);

      this.lfoNode.connect(lfoGain);
      lfoGain.connect(this.filterNode.frequency);

      // Master volume gain
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
      // Gentle fade in to avoid pops
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.audioCtx.currentTime + 1.2);

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.audioCtx.destination);

      this.lfoNode.start();
      this.noiseNode.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext autoplay blocked or unsupported:', e);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.masterGain && this.audioCtx) {
      try {
        this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.5);
        setTimeout(() => {
          if (this.noiseNode) {
            try { this.noiseNode.stop(); } catch { /* ignore */ }
            this.noiseNode.disconnect();
            this.noiseNode = null;
          }
          if (this.lfoNode) {
            try { this.lfoNode.stop(); } catch { /* ignore */ }
            this.lfoNode.disconnect();
            this.lfoNode = null;
          }
          this.isPlaying = false;
        }, 550);
      } catch {
        this.isPlaying = false;
      }
    } else {
      this.isPlaying = false;
    }
  }
}

export const oceanSound = new OceanSoundManager();
