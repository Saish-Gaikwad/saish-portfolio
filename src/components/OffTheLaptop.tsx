import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Award, GraduationCap, BadgeCheck, Code2, GitCommit } from 'lucide-react'
import { portfolioData } from '../data/portfolio'
import { sound } from '../utils/audio'

// Animated Count-Up Hook
function useCounter(target: number, isVisible: boolean, duration: number = 1.5, decimals: number = 0) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const stepTime = 16
    const totalSteps = (duration * 1000) / stepTime
    const increment = target / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setVal(target)
        clearInterval(timer)
      } else {
        setVal(+start.toFixed(decimals))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isVisible, target, duration, decimals])

  return val
}

export const OffTheLaptop: React.FC = () => {
  const { bentoStats } = portfolioData
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  // Animated counters for stats
  const countCgpa = useCounter(9.19, isInView, 1.6, 2)
  const countDiploma = useCounter(91.75, isInView, 1.8, 2)
  const countCerts = useCounter(4, isInView, 1.2, 0)

  const techArsenalWithProficiency = [
    { name: 'Python', level: 'Expert · Core' },
    { name: 'PyTorch', level: 'Advanced · Model Dev' },
    { name: 'YOLOv8', level: 'Fine-tuning & Vision' },
    { name: 'OpenCV', level: 'Frame Processing' },
    { name: 'FastAPI', level: 'Async Microservices' },
    { name: 'React.js', level: 'Interactive Frontends' },
    { name: 'Scikit-Learn', level: 'Ensemble ML' },
    { name: 'MongoDB', level: 'NoSQL Schemas' },
    { name: 'Docker', level: 'Containerization' },
    { name: 'TypeScript', level: 'Production Code' },
  ]

  // Simulated 52-week GitHub Contribution Activity Heatmap Matrix
  const heatmapWeeks = Array.from({ length: 36 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const active = (w * 7 + d) % 3 !== 0 && (w * 7 + d) % 7 !== 6
      const intensity = active ? ((w * 13 + d * 7) % 4) + 1 : 0
      return intensity
    })
  )

  const intensityColors = [
    'bg-white/5',
    'bg-[#fbbf24]/25',
    'bg-[#fbbf24]/50',
    'bg-[#fbbf24]/75',
    'bg-[#fbbf24]',
  ]

  return (
    <section id="stats" ref={sectionRef} className="py-28 px-5 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <span className="text-xs font-mono-code text-[var(--gold)] uppercase tracking-widest block mb-3 font-semibold">
          // COMPETITIVE &amp; ACADEMIC BENCHMARKS
        </span>
        <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Off the{' '}
          <span className="font-serif-editorial font-normal italic text-[var(--gold)]">
            laptop
          </span>
        </h3>
        <p className="font-body text-base text-[var(--text-secondary)] mt-3 max-w-xl leading-relaxed">
          Hackathon championships, academic honors, and continuous engineering consistency.
        </p>
      </motion.div>

      {/* Bento Grid with Animated Counters and Radial Rings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 1: 1st Prize Gold */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          onMouseEnter={() => sound.playHover()}
          className="p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[var(--gold)]/20 transition-all" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                <Trophy className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <span className="text-[11px] font-mono-code text-[var(--gold)] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                12-HR OFFLINE
              </span>
            </div>
            <div className="mb-2">
              <span className="font-display text-5xl sm:text-6xl text-[var(--text-primary)] font-extrabold leading-none tracking-tight block group-hover:text-[var(--gold)] transition-colors">
                1st
              </span>
            </div>
            <h4 className="font-display text-lg text-[var(--text-primary)] font-bold mb-2">
              Code Icon 2026 Winner
            </h4>
          </div>
          <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-4 border-t border-white/10">
            {bentoStats[0]?.description}
          </p>
        </motion.div>

        {/* Card 2: 9.19 CGPA with Radial Ring */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          transition={{ delay: 0.1 }}
          onMouseEnter={() => sound.playHover()}
          className="p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                <GraduationCap className="w-6 h-6 text-[#10b981]" />
              </div>
              {/* Radial Progress Ring */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeDasharray="91.9, 100"
                  />
                </svg>
                <span className="absolute text-[8px] font-mono font-bold text-[#10b981]">92%</span>
              </div>
            </div>
            <div className="mb-2">
              <span className="font-display text-5xl sm:text-6xl text-[var(--text-primary)] font-extrabold leading-none tracking-tight block group-hover:text-[#10b981] transition-colors">
                {countCgpa.toFixed(2)}
              </span>
            </div>
            <h4 className="font-display text-lg text-[var(--text-primary)] font-bold mb-2">
              Academic Distinction
            </h4>
          </div>
          <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-4 border-t border-white/10">
            {bentoStats[1]?.description}
          </p>
        </motion.div>

        {/* Card 3: 91.75% Diploma */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          transition={{ delay: 0.2 }}
          onMouseEnter={() => sound.playHover()}
          className="p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                <Award className="w-6 h-6 text-[#60a5fa]" />
              </div>
              <span className="text-[11px] font-mono-code text-[#60a5fa] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#60a5fa]/10 border border-[#60a5fa]/20">
                DISTINCTION
              </span>
            </div>
            <div className="mb-2">
              <span className="font-display text-5xl sm:text-6xl text-[var(--text-primary)] font-extrabold leading-none tracking-tight block group-hover:text-[#60a5fa] transition-colors">
                {countDiploma.toFixed(1)}%
              </span>
            </div>
            <h4 className="font-display text-lg text-[var(--text-primary)] font-bold mb-2">
              Govt. Polytechnic
            </h4>
          </div>
          <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-4 border-t border-white/10">
            {bentoStats[2]?.description}
          </p>
        </motion.div>

        {/* Card 4: 4+ Accreditations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          transition={{ delay: 0.3 }}
          onMouseEnter={() => sound.playHover()}
          className="p-7 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                <BadgeCheck className="w-6 h-6 text-[#f43f5e]" />
              </div>
              <span className="text-[11px] font-mono-code text-[#f43f5e] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#f43f5e]/10 border border-[#f43f5e]/20">
                VERIFIED
              </span>
            </div>
            <div className="mb-2">
              <span className="font-display text-5xl sm:text-6xl text-[var(--text-primary)] font-extrabold leading-none tracking-tight block group-hover:text-[#f43f5e] transition-colors">
                {countCerts}+
              </span>
            </div>
            <h4 className="font-display text-lg text-[var(--text-primary)] font-bold mb-2">
              Industry Certifications
            </h4>
          </div>
          <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-4 border-t border-white/10">
            {bentoStats[3]?.description}
          </p>
        </motion.div>
      </div>

      {/* GitHub Contribution Heatmap Style Graphic */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-3xl glass-panel mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5 text-xs font-mono-code text-[var(--text-primary)] font-semibold">
            <GitCommit className="w-4 h-4 text-[var(--gold)]" />
            <span>GitHub Contribution &amp; Code Cadence</span>
          </div>
          <span className="text-[11px] font-mono-code text-[var(--text-muted)]">
            500+ commits · Active across PyTorch &amp; Full-Stack repos
          </span>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1.5 min-w-[620px]">
            {heatmapWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((level, dIdx) => (
                  <div
                    key={dIdx}
                    title={`Day activity level: ${level}`}
                    className={`w-3 h-3 rounded-[3px] ${intensityColors[level]} transition-colors hover:scale-125`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tech Arsenal with Hover Tooltips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-3xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)]">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-display font-bold text-sm text-[var(--text-primary)]">
              Core Technical Arsenal
            </h5>
            <p className="text-xs text-[var(--text-muted)] font-mono-code">
              Hover to view proficiency depth
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {techArsenalWithProficiency.map((tech) => (
            <div key={tech.name} className="relative group/tag">
              <span className="px-3 py-1.5 rounded-xl bg-black/25 border border-white/10 text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--gold)] hover:border-[var(--gold)]/40 transition-colors cursor-help block">
                {tech.name}
              </span>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-black/90 border border-white/15 text-[10px] font-mono-code text-[var(--gold)] whitespace-nowrap pointer-events-none opacity-0 group-hover/tag:opacity-100 transition-opacity shadow-lg z-20">
                {tech.level}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
