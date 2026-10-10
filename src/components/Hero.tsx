import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, FileText, Sparkles, Activity, ShieldAlert, Sliders, ExternalLink } from 'lucide-react'
import { sound } from '../utils/audio'

interface HeroProps {
  onOpenResume: () => void
}

const rotatingWords = ['sees,', 'reasons,', 'scales,', 'ships,']

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'vision' | 'fintech' | 'threat'>('vision')
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(94)
  const [heatMapActive, setHeatMapActive] = useState<boolean>(true)
  const [marketStress, setMarketStress] = useState<number>(1.8)
  const [testUrlType, setTestUrlType] = useState<'malicious' | 'legitimate'>('malicious')
  const [istTime, setIstTime] = useState<string>('')
  const [cyclingWordIndex, setCyclingWordIndex] = useState<number>(0)
  const [liveConfidence, setLiveConfidence] = useState<number>(94.6)
  const [liveLatency, setLiveLatency] = useState<number>(18)

  // 3D Tilt state for Terminal Card
  const [cardTilt, setCardTilt] = useState<{ x: number; y: number; glareX: number; glareY: number }>({
    x: 0,
    y: 0,
    glareX: 50,
    glareY: 50,
  })
  const cardRef = useRef<HTMLDivElement>(null)

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setIstTime(timeStr)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Word Cycling (sees, reasons, scales, ships)
  useEffect(() => {
    const interval = setInterval(() => {
      setCyclingWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  // Live Fluctuating Telemetry (Confidence & Latency)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveConfidence(+(93.8 + Math.random() * 1.4).toFixed(1))
      setLiveLatency(Math.floor(16 + Math.random() * 5))
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  // Handle 3D Tilt on Terminal Card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -7
    const tiltY = ((x - centerX) / centerX) * 7

    setCardTilt({
      x: tiltX,
      y: tiltY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    })
  }

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0, glareX: 50, glareY: 50 })
  }

  // Name splitting for staggered char reveal
  const firstName = 'Saish'
  const lastName = 'Gaikwad'

  return (
    <section id="top" className="relative min-h-[92vh] pt-32 pb-20 px-5 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Monumental Editorial Statement */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Status & Location Pill with Ripple Ring */}
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono-code bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]" />
              </span>
              <span>Available for AI &amp; Software Roles</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-code bg-black/15 text-[var(--text-muted)] border border-white/10 backdrop-blur-md">
              <span>📍 Mumbai, IN</span>
              <span className="text-[var(--text-secondary)] font-medium">({istTime || 'IST'})</span>
            </span>
          </div>

          {/* Staggered Masked Text Reveal on Name */}
          <div className="space-y-3 mb-6">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.04] overflow-hidden flex flex-wrap gap-x-4">
              {/* First Name Characters */}
              <span className="inline-flex">
                {firstName.split('').map((char, i) => (
                  <motion.span
                    key={`fn-${i}`}
                    initial={{ y: 70, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Last Name Characters with Italic Serif */}
              <span className="inline-flex font-serif-editorial font-normal italic text-[var(--gold)]">
                {lastName.split('').map((char, i) => (
                  <motion.span
                    key={`ln-${i}`}
                    initial={{ y: 70, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Tagline with Rotating Cycling Word */}
            <p className="font-display text-2xl sm:text-3xl text-[var(--text-primary)] font-medium leading-snug tracking-tight flex items-center gap-2 flex-wrap">
              <span>Engineering software that</span>
              <span className="inline-block min-w-[120px] font-serif-editorial italic text-[var(--gold)] font-normal relative h-9 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[cyclingWordIndex]}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute left-0 top-0 text-3xl"
                  >
                    {rotatingWords[cyclingWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>with real-world impact.</span>
            </p>
          </div>

          {/* Simple, Grounded, Approachable Narrative (as requested) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8"
          >
            I build full-stack web applications, AI &amp; Machine Learning systems, and production platforms.
            Undergraduate at K. J. Somaiya (9.19 CGPA) and{' '}
            <strong className="text-[var(--gold)] font-semibold">1st Prize Winner at Code Icon 2026</strong>.
          </motion.p>

          {/* Magnetic CTA Buttons with Shine Sweep */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              onClick={() => sound.playClick()}
              data-cursor="Explore"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[var(--gold)] text-black font-display font-semibold text-sm hover:brightness-105 hover:shadow-[0_0_25px_rgba(251,191,36,0.4)] transition-all overflow-hidden cursor-pointer"
            >
              {/* Shine Sweep Layer */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Explore Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => {
                sound.playClick()
                onOpenResume()
              }}
              data-cursor="Resume"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl glass-panel text-sm font-mono-code text-[var(--text-primary)] hover:border-[var(--gold)]/50 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[var(--gold)]" />
              <span>Dossier / CV</span>
              <span className="text-[10px] text-[var(--text-muted)]">↗</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: 3D Tilting Terminal Card with Conic Border & Live Mockups */}
        <div className="lg:col-span-5 w-full relative z-10 perspective-[1000px]">
          {/* Subtle Float Animation Wrapper */}
          <motion.div
            animate={{ y: [-4, 5, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
            className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-[var(--gold)]/40 via-amber-500/20 to-[var(--gold)]/40 shadow-2xl overflow-hidden"
          >
            {/* Rotating Conic Gradient Border Highlight */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,var(--gold)_360deg)] animate-[spin_8s_linear_infinite] opacity-60 pointer-events-none" />

            {/* Inner Content Card */}
            <div className="relative rounded-[23px] glass-panel p-5 sm:p-6 overflow-hidden">
              {/* Moving Glare Highlight Layer */}
              <div
                style={{
                  background: `radial-gradient(circle at ${cardTilt.glareX}% ${cardTilt.glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                }}
                className="absolute inset-0 pointer-events-none z-20"
              />

              {/* Top Bar with OS Controls and Live Indicator */}
              <div className="flex items-center justify-between border-b border-[var(--sim-border)] pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span className="text-xs font-mono-code text-[var(--text-muted)] ml-2">
                    model_sentinel.py // active
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full border border-[#10b981]/30 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                  LIVE INFERENCE
                </span>
              </div>

              {/* Sliding Pill Tab Switcher */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[var(--sim-control-bg)] border border-[var(--sim-border)] mb-5 font-mono-code text-[11px] relative">
                {(['vision', 'fintech', 'threat'] as const).map((tab) => {
                  const isActive = activeTab === tab
                  const labels = {
                    vision: 'Vision AI',
                    fintech: 'FinTech AI',
                    threat: 'Threat Radar',
                  }
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        sound.playClick()
                        setActiveTab(tab)
                      }}
                      className={`relative py-2 rounded-lg transition-all text-center cursor-pointer z-10 ${
                        isActive
                          ? 'text-black font-bold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabPill"
                          className="absolute inset-0 bg-[var(--gold)] rounded-lg shadow-sm"
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{labels[tab]}</span>
                    </button>
                  )
                })}
              </div>

              {/* TAB CONTENT CONTAINER with Crossfade & Vertical Slide */}
              <AnimatePresence mode="wait">
                {/* TAB 1: VISION SENTINEL */}
                {activeTab === 'vision' && (
                  <motion.div
                    key="tab-vision"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="relative rounded-2xl bg-[var(--sim-screen-bg)] border border-[var(--sim-border)] p-4 overflow-hidden min-h-[195px] flex flex-col justify-between">
                      {/* Scanning Line Sweeping Vertically */}
                      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-75 animate-[scan_3s_ease-in-out_infinite] pointer-events-none z-10" />

                      {/* Header */}
                      <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--text-muted)]">
                        <span className="flex items-center gap-1.5 text-[#10b981] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                          CAM_01 // 1080p @ 32 FPS
                        </span>
                        <span className="font-semibold text-[var(--gold)]">
                          LATENCY: {liveLatency}ms
                        </span>
                      </div>

                      {/* Detection Bounding Box with Corner Brackets */}
                      <div className="relative my-3 p-3.5 rounded-xl border border-dashed border-[var(--gold)]/60 bg-[var(--gold)]/10 flex flex-col gap-1.5 transition-all">
                        {/* Corner Brackets */}
                        <span className="absolute top-1 left-1.5 text-xs text-[var(--gold)] font-mono font-bold leading-none">⌜</span>
                        <span className="absolute top-1 right-1.5 text-xs text-[var(--gold)] font-mono font-bold leading-none">⌝</span>
                        <span className="absolute bottom-1 left-1.5 text-xs text-[var(--gold)] font-mono font-bold leading-none">⌞</span>
                        <span className="absolute bottom-1 right-1.5 text-xs text-[var(--gold)] font-mono font-bold leading-none">⌟</span>

                        {heatMapActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-red-500/10 to-emerald-500/10 pointer-events-none rounded-xl animate-pulse" />
                        )}

                        <div className="flex items-center justify-between text-[11px] font-mono-code">
                          <span className="text-[var(--gold)] font-bold">
                            OBJECT: COMPLIANCE_SENTINEL
                          </span>
                          <span className="text-[var(--gold)] font-mono-code bg-[var(--gold)]/20 px-1.5 py-0.5 rounded font-bold">
                            {liveConfidence}% CONF
                          </span>
                        </div>
                        <div className="text-[10px] font-mono-code text-[#10b981] flex items-center gap-1 font-semibold">
                          <span>✓ OCR VERIFIED</span>
                          <span>•</span>
                          <span>ZERO POLICY BREACH</span>
                        </div>
                      </div>

                      {/* Bottom Model Details */}
                      <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--text-muted)] border-t border-[var(--sim-border)] pt-2 font-medium">
                        <span>MODEL: YOLOv8-XAI</span>
                        <span>PRECISION: {confidenceThreshold}.6%</span>
                      </div>
                    </div>

                    {/* Interactive Slider */}
                    <div className="p-3 rounded-xl bg-[var(--sim-control-bg)] border border-[var(--sim-border)] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono-code">
                        <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-[var(--gold)]" />
                          Confidence Threshold
                        </span>
                        <span className="text-[var(--gold)] font-bold">{confidenceThreshold}%</span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="99"
                        value={confidenceThreshold}
                        onChange={(e) => {
                          sound.playClick()
                          setConfidenceThreshold(Number(e.target.value))
                        }}
                        className="w-full accent-[var(--gold)] cursor-pointer"
                      />
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => {
                            sound.playClick()
                            setHeatMapActive(!heatMapActive)
                          }}
                          className="text-[11px] font-mono-code text-[var(--text-secondary)] hover:text-[var(--gold)] cursor-pointer flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3 h-3 text-[var(--gold)]" />
                          <span>XAI Activation Heatmap: {heatMapActive ? 'ON' : 'OFF'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: FINTECH ARTHA */}
                {activeTab === 'fintech' && (
                  <motion.div
                    key="tab-fintech"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl bg-[var(--sim-screen-bg)] border border-[var(--sim-border)] p-4 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--text-muted)] font-medium">
                        <span className="text-[var(--gold)] font-bold">TRANSACTION ANOMALY RADAR</span>
                        <span className="text-[#10b981] font-semibold">ANOMALY: 0.02%</span>
                      </div>

                      {/* Animated Sparkline Path */}
                      <div className="h-24 w-full relative flex items-center justify-center overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                          <path
                            d={`M 0,60 Q 75,${60 - marketStress * 12} 150,${45 - marketStress * 8} T 300,${20 - marketStress * 4}`}
                            fill="none"
                            stroke="var(--gold)"
                            strokeWidth="2.5"
                          />
                          <path
                            d={`M 0,70 Q 80,${70 - marketStress * 8} 160,${55 - marketStress * 6} T 300,${35 - marketStress * 5}`}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                          />
                        </svg>
                        <span className="absolute bottom-1 right-2 text-[10px] font-mono-code text-[var(--gold)] font-bold">
                          Monte Carlo Stress: {marketStress}x
                        </span>
                      </div>

                      {/* Live Telemetry */}
                      <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-[var(--sim-border)]">
                        <div className="p-2 rounded-lg bg-[var(--sim-control-bg)]">
                          <span className="text-[10px] font-mono-code text-[var(--text-muted)] block">SHARPE</span>
                          <span className="text-xs font-mono-code font-bold text-[#10b981]">2.84</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--sim-control-bg)]">
                          <span className="text-[10px] font-mono-code text-[var(--text-muted)] block">LATENCY</span>
                          <span className="text-xs font-mono-code font-bold text-[var(--gold)]">178ms</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[var(--sim-control-bg)]">
                          <span className="text-[10px] font-mono-code text-[var(--text-muted)] block">RECOVERY</span>
                          <span className="text-xs font-mono-code font-bold text-[#60a5fa]">94.2%</span>
                        </div>
                      </div>
                    </div>

                    {/* Stress Slider */}
                    <div className="p-3 rounded-xl bg-[var(--sim-control-bg)] border border-[var(--sim-border)] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono-code">
                        <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[var(--gold)]" />
                          Volatility Stress Factor
                        </span>
                        <span className="text-[var(--gold)] font-bold">{marketStress}x</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="3.0"
                        step="0.2"
                        value={marketStress}
                        onChange={(e) => {
                          sound.playClick()
                          setMarketStress(Number(e.target.value))
                        }}
                        className="w-full accent-[var(--gold)] cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: THREAT RADAR */}
                {activeTab === 'threat' && (
                  <motion.div
                    key="tab-threat"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl bg-[var(--sim-screen-bg)] border border-[var(--sim-border)] p-4 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono-code text-[var(--text-muted)] font-medium">
                        <span>ZERO-DAY DEFENSE</span>
                        <span className="text-[#10b981] font-semibold">SUB-8MS INFERENCE</span>
                      </div>

                      {/* URL Preset Selector */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            sound.playClick()
                            setTestUrlType('malicious')
                          }}
                          className={`flex-1 py-1.5 px-2 text-[10px] font-mono-code rounded-lg cursor-pointer border ${
                            testUrlType === 'malicious'
                              ? 'border-[#ef4444] bg-[#ef4444]/15 text-[#ef4444] font-bold'
                              : 'border-[var(--sim-border)] text-[var(--text-muted)]'
                          }`}
                        >
                          Sample Phishing URL
                        </button>
                        <button
                          onClick={() => {
                            sound.playClick()
                            setTestUrlType('legitimate')
                          }}
                          className={`flex-1 py-1.5 px-2 text-[10px] font-mono-code rounded-lg cursor-pointer border ${
                            testUrlType === 'legitimate'
                              ? 'border-[#10b981] bg-[#10b981]/15 text-[#10b981] font-bold'
                              : 'border-[var(--sim-border)] text-[var(--text-muted)]'
                          }`}
                        >
                          Legitimate Somaiya URL
                        </button>
                      </div>

                      {/* URL Display */}
                      <div className="p-2.5 rounded-lg bg-[var(--sim-control-bg)] border border-[var(--sim-border)] font-mono-code text-[11px] truncate text-[var(--text-primary)]">
                        {testUrlType === 'malicious'
                          ? 'https://login-somaiya-verify-account-gate.top/session?id=92'
                          : 'https://kjsit.somaiya.edu/en/view-admission/2026'}
                      </div>

                      {/* Threat Verdict */}
                      <div
                        className={`p-3 rounded-xl border flex items-center justify-between ${
                          testUrlType === 'malicious'
                            ? 'border-[#ef4444]/50 bg-[#ef4444]/10 text-[#ef4444]'
                            : 'border-[#10b981]/50 bg-[#10b981]/10 text-[#10b981]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <div>
                            <p className="text-xs font-mono-code font-bold">
                              {testUrlType === 'malicious' ? 'HIGH RISK PHISHING DETECTED' : 'VERIFIED SAFE DOMAIN'}
                            </p>
                            <p className="text-[10px] opacity-80">
                              {testUrlType === 'malicious' ? 'Entropy: 4.88 • Lexical anomaly' : 'Official institutional certificate'}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-mono-code font-extrabold">
                          {testUrlType === 'malicious' ? '98.6%' : '0.2%'}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono-code text-[var(--text-muted)] text-center">
                      Trained on 50,000+ malicious vectors with 30 heuristic dimensions.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom GitHub Link */}
              <div className="mt-4 pt-3 border-t border-[var(--sim-border)] flex items-center justify-between text-xs font-mono-code">
                <span className="text-[var(--text-muted)]">Verified on GitHub:</span>
                <a
                  href="https://github.com/Saish-Gaikwad"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  data-cursor="GitHub"
                  className="text-[var(--gold)] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>github.com/Saish-Gaikwad</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
