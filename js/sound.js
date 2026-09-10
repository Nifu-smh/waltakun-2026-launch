/**
 * WALTAKUN 2026 - Classical & Deep Bass Audio Synthesizer
 * --------------------------------------------------------
 * Native Web Audio API implementation providing:
 * 1. Classical Clockwork Metronome & Orchestral Tension Ticks
 * 2. Deep Cinematic Sub-Bass Drop / Explosion Boom
 * 3. Grand Classical Brass & Chime Victory Fanfare
 * 4. Ambient Energy Reactor Charge
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem("waltakun_sound_muted") === "true";
    this.chargeOscs = [];
    this.chargeGain = null;
    this.tensionDrone = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("waltakun_sound_muted", this.isMuted);
    return this.isMuted;
  }

  // Soft crystal acoustic tap on hover
  playHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, t); // D5
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.07);

    gain.gain.setValueAtTime(0.035, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Crisp mechanical-classical click
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(740, t);
    osc.frequency.exponentialRampToValueAtTime(1480, t + 0.09);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Classical Metronome Tick & Tension Countdown (for 5, 4, 3, 2, 1)
  playClassicalTick(number) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Classical Wooden Metronome Knock
    const knockOsc = this.ctx.createOscillator();
    const knockGain = this.ctx.createGain();
    const knockFilter = this.ctx.createBiquadFilter();

    knockOsc.type = "square";
    knockOsc.frequency.setValueAtTime(180, t);
    knockOsc.frequency.exponentialRampToValueAtTime(60, t + 0.04);

    knockFilter.type = "bandpass";
    knockFilter.frequency.setValueAtTime(700 + (6 - number) * 120, t);
    knockFilter.Q.setValueAtTime(3.5, t);

    knockGain.gain.setValueAtTime(0.3, t);
    knockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    knockOsc.connect(knockFilter);
    knockFilter.connect(knockGain);
    knockGain.connect(this.ctx.destination);

    knockOsc.start(t);
    knockOsc.stop(t + 0.05);

    // 2. High Resonant Classical Bell Chime (harmonically aligned)
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    // Scale frequencies musically (Tension rises from 5 down to 1)
    const pitches = { 5: 523.25, 4: 587.33, 3: 659.25, 2: 783.99, 1: 1046.50 };
    const pitch = pitches[number] || 880;

    bellOsc.type = "sine";
    bellOsc.frequency.setValueAtTime(pitch, t);

    // Damped natural bell decay
    bellGain.gain.setValueAtTime(0.18, t);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

    bellOsc.connect(bellGain);
    bellGain.connect(this.ctx.destination);

    bellOsc.start(t);
    bellOsc.stop(t + 0.45);

    // 3. Cinematic Orchestral Tension Thump
    const subThump = this.ctx.createOscillator();
    const subThumpGain = this.ctx.createGain();
    subThump.type = "sine";
    subThump.frequency.setValueAtTime(110 + (6 - number) * 15, t);
    subThump.frequency.exponentialRampToValueAtTime(45, t + 0.25);

    subThumpGain.gain.setValueAtTime(0.25, t);
    subThumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    subThump.connect(subThumpGain);
    subThumpGain.connect(this.ctx.destination);
    subThump.start(t);
    subThump.stop(t + 0.25);
  }

  // Reactor Charge-Up Hum (when user holds launch button)
  startCharging() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    this.stopCharging();

    const t = this.ctx.currentTime;
    this.chargeGain = this.ctx.createGain();
    this.chargeGain.gain.setValueAtTime(0.01, t);
    this.chargeGain.gain.linearRampToValueAtTime(0.2, t + 2.0);
    this.chargeGain.connect(this.ctx.destination);

    // Dual oscillator drone
    const osc1 = this.ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(65, t);
    osc1.frequency.exponentialRampToValueAtTime(360, t + 2.0);

    const osc2 = this.ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(130, t);
    osc2.frequency.exponentialRampToValueAtTime(720, t + 2.0);

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(180, t);
    filter.frequency.exponentialRampToValueAtTime(2200, t + 2.0);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.chargeGain);

    osc1.start(t);
    osc2.start(t);

    this.chargeOscs = [osc1, osc2];
  }

  stopCharging() {
    if (this.chargeGain && this.ctx) {
      try {
        const t = this.ctx.currentTime;
        this.chargeGain.gain.cancelScheduledValues(t);
        this.chargeGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        this.chargeOscs.forEach(o => o.stop(t + 0.1));
      } catch (e) {}
      this.chargeOscs = [];
      this.chargeGain = null;
    }
  }

  // Grand Deep Sub-Bass Drop & Cinematic Unveiling Blast
  playBassDropAndExplosion() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // --- 1. HEAVY SUB-BASS DROP (140Hz -> 28Hz) ---
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(145, t);
    // Exponential dive for that movie-theater chest thump
    subOsc.frequency.exponentialRampToValueAtTime(28, t + 2.2);

    subGain.gain.setValueAtTime(0.55, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 2.4);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + 2.4);

    // --- 2. PUNCHY KICK TRANSIENT (The Impact Click) ---
    const punchOsc = this.ctx.createOscillator();
    const punchGain = this.ctx.createGain();
    punchOsc.type = "triangle";
    punchOsc.frequency.setValueAtTime(220, t);
    punchOsc.frequency.exponentialRampToValueAtTime(45, t + 0.08);

    punchGain.gain.setValueAtTime(0.4, t);
    punchGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    punchOsc.connect(punchGain);
    punchGain.connect(this.ctx.destination);
    punchOsc.start(t);
    punchOsc.stop(t + 0.1);

    // --- 3. PYRO / ATMOSPHERIC NOISE WASH ---
    const bufferSize = this.ctx.sampleRate * 2.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(2200, t);
    noiseFilter.frequency.exponentialRampToValueAtTime(250, t + 2.0);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 2.0);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noiseSource.start(t);
    noiseSource.stop(t + 2.0);

    // --- 4. GRAND CLASSICAL VICTORY CHORDS (Delayed 0.35s) ---
    setTimeout(() => this.playClassicalFanfare(), 350);
  }

  // Classical Triumphant Fanfare (Harmonic C-Major 9th chords)
  playClassicalFanfare() {
    if (this.isMuted || !this.ctx) return;

    const t = this.ctx.currentTime;
    // Majestic notes: C4, G4, C5, E5, G5, C6
    const chord = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50];

    chord.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? "sawtooth" : "sine";
      osc.frequency.value = freq;

      // Filter to soften brass into warm classical tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1600;

      const noteStart = t + i * 0.08;
      gain.gain.setValueAtTime(0.001, noteStart);
      gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 1.6);
    });
  }
}

window.soundEngine = new SoundEngine();
