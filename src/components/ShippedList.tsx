import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, FolderGit2 } from 'lucide-react'
import { portfolioData } from '../data/portfolio'
import { sound } from '../utils/audio'

export const ShippedList: React.FC = () => {
  const { shipped } = portfolioData

  return (
    <section id="shipped" className="py-24 px-5 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="text-xs font-mono-code text-[var(--gold)] uppercase tracking-widest block mb-3 font-semibold">
          // PRODUCTION DEPLOYMENTS &amp; CODEBASES
        </span>
        <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Things I've{' '}
          <span className="font-serif-editorial font-normal italic text-[var(--gold)]">
            shipped
          </span>
        </h3>
        <p className="font-body text-base text-[var(--text-secondary)] mt-2">
          Production tools, models, and repositories engineered for speed, low latency, and real utility.
        </p>
      </motion.div>

      {/* Row List of Shipped Tools */}
      <div className="space-y-4">
        {shipped.map((item, idx) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.012, x: 6 }}
            transition={{ duration: 0.3, delay: idx * 0.08, type: 'spring', damping: 20 }}
            className="block p-6 sm:p-7 rounded-2xl glass-panel group shadow-lg cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-[var(--gold)] shrink-0" />
                    <span className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono-code text-[var(--gold)] px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 font-medium">
                    {item.what}
                  </span>
                </div>
                <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed max-w-4xl">
                  {item.detail}
                </p>
              </div>

              {/* Stack Pills & External Arrow */}
              <div className="flex items-center gap-4 shrink-0 pt-2 lg:pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-black/20 border border-white/10 text-xs font-mono-code text-[var(--text-muted)] group-hover:border-[var(--gold)]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="w-9 h-9 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--gold)] group-hover:border-[var(--gold)]/50 group-hover:scale-105 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
