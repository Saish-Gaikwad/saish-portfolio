// Web Audio API Micro-Synthesizer for Tactile Haptic Sound FX
// Zero external files, ultra-low latency, pure Web Audio oscillators

class SoundFX {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  constructor() {
    // Check localStorage preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sg_sound_enabled')
      this.enabled = stored === 'true'
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public setEnabled(val: boolean) {
    this.enabled = val
    if (typeof window !== 'undefined') {
      localStorage.setItem('sg_sound_enabled', val ? 'true' : 'false')
      if (val) this.initContext()
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled)
    if (this.enabled) {
      this.playChime()
    }
    return this.enabled
  }

  // Soft tactile click for buttons, tabs, links
  public playClick() {
    if (!this.enabled) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const now = this.ctx.currentTime
      osc.frequency.setValueAtTime(600, now)
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.04)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.045)
    } catch {
      // ignore audio context failures
    }
  }

  // Soft micro-blip for hover
  public playHover() {
    if (!this.enabled) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      const now = this.ctx.currentTime
      osc.frequency.setValueAtTime(950, now)
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.02)

      gain.gain.setValueAtTime(0.025, now)
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.025)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.03)
    } catch {
      // ignore
    }
  }

  // Success chime for copy / actions
  public playChime() {
    if (!this.enabled) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const freqs = [523.25, 659.25, 783.99] // C5, E5, G5 triad

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        const startTime = now + idx * 0.04
        osc.frequency.setValueAtTime(freq, startTime)

        gain.gain.setValueAtTime(0.04, startTime)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(startTime)
        osc.stop(startTime + 0.19)
      })
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundFX()
