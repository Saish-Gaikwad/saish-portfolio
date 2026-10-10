import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { MapPin, Briefcase, GraduationCap } from 'lucide-react'
import { portfolioData } from '../data/portfolio'
import { sound } from '../utils/audio'

export const ExperienceTimeline: React.FC = () => {
  const { experience, education } = portfolioData
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="experience" ref={containerRef} className="py-28 px-5 sm:px-6 max-w-7xl mx-auto border-t border-white/10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left: Experience (6 cols) */}
        <div className="lg:col-span-6 space-y-8 relative">
          <div>
            <span className="text-xs font-mono-code text-[var(--gold)] uppercase tracking-widest block mb-3 font-semibold">
              // INDUSTRY PRACTICE
            </span>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Where I've{' '}
              <span className="font-serif-editorial font-normal italic text-[var(--gold)]">
                worked
              </span>
            </h3>
            <p className="font-body text-base text-[var(--text-secondary)] mt-2">
              Production application engineering, enterprise system triage, and SLA management.
            </p>
          </div>

          <div className="space-y-6 relative pl-6 sm:pl-8">
            {/* Self-drawing Gold Timeline Line */}
            <div className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-white/10" />
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-[var(--gold)] shadow-[0_0_8px_#fbbf24]"
            />

            {experience.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => sound.playHover()}
                className="p-7 rounded-3xl glass-panel relative group"
              >
                {/* Pulsing Node Dot on Timeline */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-8 w-4 h-4 rounded-full bg-[var(--bg-base)] border-2 border-[var(--gold)] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] group-hover:scale-150 transition-transform" />
                </span>

                <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono-code text-[var(--gold)]">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[var(--text-muted)]">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </span>
                </div>
                <h4 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">
                  {item.role}
                </h4>
                <p className="text-sm font-semibold text-[var(--gold)] mb-3">{item.org}</p>
                <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.highlights && (
                  <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-body pt-3 border-t border-white/10">
                    {item.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[var(--gold)] mt-0.5">✦</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Education & Foundations (6 cols) */}
        <div className="lg:col-span-6 space-y-8 relative">
          <div>
            <span className="text-xs font-mono-code text-[#10b981] uppercase tracking-widest block mb-3 font-semibold">
              // ACADEMIC FOUNDATIONS
            </span>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Where I've{' '}
              <span className="font-serif-editorial font-normal italic text-[var(--gold)]">
                studied
              </span>
            </h3>
            <p className="font-body text-base text-[var(--text-secondary)] mt-2">
              B.Tech Artificial Intelligence, Diploma in IT, and honors distinction.
            </p>
          </div>

          <div className="space-y-6 relative pl-6 sm:pl-8">
            {/* Timeline Line */}
            <div className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-white/10" />
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-[#10b981] shadow-[0_0_8px_#10b981]"
            />

            {education.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => sound.playHover()}
                className="p-7 rounded-3xl glass-panel relative group"
              >
                {/* Pulsing Node Dot */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-8 w-4 h-4 rounded-full bg-[var(--bg-base)] border-2 border-[#10b981] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] group-hover:scale-150 transition-transform" />
                </span>

                <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono-code text-[#10b981]">
                  <span className="flex items-center gap-1.5 font-bold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </span>
                  <span className="text-[var(--text-muted)]">{item.location}</span>
                </div>
                <h4 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-1">
                  {item.role}
                </h4>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">{item.org}</p>
                <p className="text-sm font-body text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
