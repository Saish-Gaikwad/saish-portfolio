import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Trophy, Zap, ShieldCheck } from 'lucide-react'
import { portfolioData } from '../data/portfolio'
import { sound } from '../utils/audio'

export const ResearchWork: React.FC = () => {
  const { caseStudies } = portfolioData
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setHoveredCard(id)
  }

  return (
    <section id="work" className="py-28 px-5 sm:px-6 max-w-7xl mx-auto">
      {/* Section Heading with Editorial Typography */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-xs font-mono-code text-[var(--gold)] uppercase tracking-widest block mb-3 font-semibold">
          // FEATURED SYSTEMS &amp; REAL IMPACT
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
          Featured{' '}
          <span className="font-serif-editorial font-normal italic text-[var(--gold)]">
            projects
          </span>
        </h2>
        <p className="font-body text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Deep-dive case studies spanning autonomous FinTech engines, edge computer vision sentinels, and zero-day cybersecurity infrastructure.
        </p>
      </motion.div>

      {/* Case Study Cards Stack */}
      <div className="space-y-16">
        {caseStudies.map((study, index) => {
          const isCardHovered = hoveredCard === study.id

          return (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => handleMouseMove(e, study.id)}
              onMouseLeave={() => setHoveredCard(null)}
              data-cursor="View"
              className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden group cursor-pointer"
            >
              {/* Dynamic Mouse Spotlight inside Card */}
              {isCardHovered && (
                <div
                  style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                  }}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl transition-opacity duration-300"
                />
              )}

              {/* Left Column: Narrative & Architecture (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6 relative z-10">
                <div>
                  {/* Year & Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/20 border border-white/10 text-xs font-mono-code text-[var(--gold)] mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                    <span>{study.yearAndGuide}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors leading-[1.15] mb-4">
                    {study.title}
                  </h3>

                  {/* Inquiry Quote */}
                  <div className="border-l-2 border-[var(--gold)] pl-4 py-2.5 mb-6 bg-black/15 rounded-r-xl">
                    <p className="font-serif-editorial italic text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
                      "{study.question}"
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-3 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                    {study.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="text-[var(--gold)] mt-1 text-xs shrink-0 font-bold">✦</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack Pills & Direct Repository Button */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((tag, tIdx) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + tIdx * 0.05 }}
                        className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 text-xs font-mono-code text-[var(--text-muted)] group-hover:border-[var(--gold)]/30 transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <a
                    href={study.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    data-cursor="Code"
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold)] text-black font-display font-bold text-xs sm:text-sm hover:brightness-110 hover:shadow-[0_0_20px_rgba(251,191,36,0.35)] transition-all cursor-pointer"
                  >
                    <span>View Repository</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover/btn:rotate-45 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Right Column: Telemetry Showcase Card (5 cols) */}
              <div className="lg:col-span-5 h-full flex flex-col justify-center relative z-10">
                <div className="rounded-3xl bg-black/40 border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group-hover:border-[var(--gold)]/40 transition-all shadow-xl group-hover:scale-[1.02] duration-300">
                  {study.id === 'artha' && (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] mb-3 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                        <Trophy className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-mono-code uppercase tracking-wider text-[var(--gold)] font-bold mb-1">
                        1ST PRIZE · CODE ICON 2026
                      </span>
                      <span className="font-display text-4xl sm:text-5xl text-[var(--text-primary)] font-extrabold leading-tight my-2">
                        {study.stat.value}
                      </span>
                      <p className="text-xs font-body text-[var(--text-secondary)] max-w-xs mt-1 mb-4">
                        12-Hour Offline Hackathon · Autonomous Debt Amortization &amp; Monte Carlo Modeling
                      </p>
                      <div className="grid grid-cols-2 gap-2 w-full pt-3 border-t border-white/10 text-left font-mono-code text-[11px]">
                        <div className="p-2 rounded-lg bg-black/30">
                          <span className="text-[var(--text-muted)] block text-[10px]">INFERENCE</span>
                          <span className="text-[var(--gold)] font-bold">178ms Vector API</span>
                        </div>
                        <div className="p-2 rounded-lg bg-black/30">
                          <span className="text-[var(--text-muted)] block text-[10px]">STACK</span>
                          <span className="text-[var(--text-primary)] font-bold">FastAPI + React</span>
                        </div>
                      </div>
                    </>
                  )}

                  {study.id === 'chaakshu' && (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-[#60a5fa]/10 border border-[#60a5fa]/30 flex items-center justify-center text-[#60a5fa] mb-3 shadow-[0_0_20px_rgba(96,165,250,0.2)]">
                        <Zap className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#60a5fa] font-bold mb-1">
                        MULTIMODAL EDGE SENTINEL
                      </span>
                      <span className="font-display text-4xl sm:text-5xl text-[var(--text-primary)] font-extrabold leading-tight my-2">
                        {study.stat.value}
                      </span>
                      <p className="text-xs font-body text-[var(--text-secondary)] max-w-xs mt-1 mb-4">
                        Real-Time Frame Ingestion at 94.6% Precision with Custom YOLOv8 Weights
                      </p>
                      <div className="grid grid-cols-2 gap-2 w-full pt-3 border-t border-white/10 text-left font-mono-code text-[11px]">
                        <div className="p-2 rounded-lg bg-black/30">
                          <span className="text-[var(--text-muted)] block text-[10px]">EXPLAINABILITY</span>
                          <span className="text-[#60a5fa] font-bold">XAI Activation Bounds</span>
                        </div>
                        <div className="p-2 rounded-lg bg-black/30">
                          <span className="text-[var(--text-muted)] block text-[10px]">OCR ENGINE</span>
                          <span className="text-[var(--text-primary)] font-bold">Multi-Font Verified</span>
                        </div>
                      </div>
                    </>
                  )}

                  {study.id === 'phishing' && (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center text-[#10b981] mb-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#10b981] font-bold mb-1">
                        CYBER DEFENSE BENCHMARK
                      </span>
                      <span className="font-display text-4xl sm:text-5xl text-[var(--text-primary)] font-extrabold leading-tight my-2">
                        {study.stat.value}
                      </span>
                      <p className="text-xs font-body text-[var(--text-secondary)] max-w-xs mt-1 mb-4">
                        Trained on 50,000+ Malicious URLs with &lt;1.8% False Positive Rate
                      </p>
                      <div className="grid grid-cols-2 gap-2 w-full pt-3 border-t border-white/10 text-left font-mono-code text-[11px]">
                        <div className="p-2 rounded-lg bg-black/30">
                          <span className="text-[var(--text-muted)] block text-[10px]">LATENCY</span>
                          <span className="text-[#10b981] font-bold">&lt;8ms Endpoint</span>
                        </div>
                        <div className="p-2 rounded-lg bg-black/30">
                          <span className="text-[var(--text-muted)] block text-[10px]">FEATURES</span>
                          <span className="text-[var(--text-primary)] font-bold">30 Lexical Vectors</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
