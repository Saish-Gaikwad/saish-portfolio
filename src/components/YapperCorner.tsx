import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Pin, Clock } from 'lucide-react'
import { portfolioData } from '../data/portfolio'
import { sound } from '../utils/audio'

export const YapperCorner: React.FC = () => {
  const { stickyNotes } = portfolioData
  const [resetKey, setResetKey] = useState<number>(0)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const noteStyles: Record<string, { bg: string; border: string; text: string; tag: string; tape: string }> = {
    amber: {
      bg: 'bg-gradient-to-br from-[#241e12] to-[#1a160c]',
      border: 'border-[#fbbf24]/30',
      text: 'text-[#fef3c7]',
      tag: 'text-[#fbbf24] bg-[#fbbf24]/10 border-[#fbbf24]/20',
      tape: 'bg-[#fbbf24]/25 border-[#fbbf24]/40',
    },
    rose: {
      bg: 'bg-gradient-to-br from-[#27141d] to-[#1c0d13]',
      border: 'border-[#fb7185]/30',
      text: 'text-[#ffe4e6]',
      tag: 'text-[#fb7185] bg-[#fb7185]/10 border-[#fb7185]/20',
      tape: 'bg-[#fb7185]/25 border-[#fb7185]/40',
    },
    paper: {
      bg: 'bg-gradient-to-br from-[#1a1b24] to-[#111218]',
      border: 'border-[#94a3b8]/30',
      text: 'text-[#f1f5f9]',
      tag: 'text-[#cbd5e1] bg-white/10 border-white/20',
      tape: 'bg-white/20 border-white/30',
    },
    emerald: {
      bg: 'bg-gradient-to-br from-[#0f231a] to-[#091710]',
      border: 'border-[#34d399]/30',
      text: 'text-[#d1fae5]',
      tag: 'text-[#34d399] bg-[#34d399]/10 border-[#34d399]/20',
      tape: 'bg-[#34d399]/25 border-[#34d399]/40',
    },
  }

  const filters = [
    { id: 'all', label: 'All Memos' },
    { id: 'learning', label: 'Learning' },
    { id: 'daily', label: 'Day / Night' },
    { id: 'insights', label: 'Insights & Fun' },
  ]

  const filteredNotes = stickyNotes.filter((note) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'learning') return note.title.toLowerCase().includes('learning')
    if (activeFilter === 'daily') return note.title.toLowerCase().includes('day') || note.title.toLowerCase().includes('night')
    if (activeFilter === 'insights') return note.title.toLowerCase().includes('part') || note.title.toLowerCase().includes('fun') || note.title.toLowerCase().includes('down')
    return true
  })

  const handleReset = () => {
    sound.playChime()
    setResetKey((prev) => prev + 1)
  }

  return (
    <section id="notes" className="py-28 px-5 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono-code text-[var(--gold)] uppercase tracking-widest block mb-3 font-semibold">
            // CANDID DEVELOPER MEMOS
          </span>
          <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Notes from the{' '}
            <span className="font-serif-editorial font-normal italic text-[var(--gold)]">
              builder's desk
            </span>
          </h3>
          <p className="font-body text-base text-[var(--text-secondary)] mt-3 max-w-xl leading-relaxed">
            Unfiltered thoughts from late-night debugging and hackathon sprints. (On desktop, drag and toss them around!)
          </p>
        </div>

        {/* Filter Pills + Reset Physics Button */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                sound.playClick()
                setActiveFilter(f.id)
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono-code cursor-pointer transition-all ${
                activeFilter === f.id
                  ? 'bg-[var(--gold)] text-black font-bold shadow-sm'
                  : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={handleReset}
            title="Reset note positions"
            className="p-2 rounded-xl glass-panel text-[var(--text-muted)] hover:text-[var(--gold)] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Interactive Sticky Notes with Layout Transitions */}
      <motion.div layout key={resetKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredNotes.map((note, idx) => {
            const style = noteStyles[note.color] || noteStyles.paper
            return (
              <motion.div
                layout
                key={`${resetKey}-${note.title}`}
                drag
                dragConstraints={{ left: -140, right: 140, top: -140, bottom: 140 }}
                dragElastic={0.25}
                onDragStart={() => sound.playHover()}
                onDragEnd={() => sound.playClick()}
                data-cursor="Drag"
                whileDrag={{ scale: 1.06, zIndex: 50, cursor: 'grabbing', rotate: 0 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.03, zIndex: 30, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', damping: 18 }}
                className={`p-7 rounded-3xl border ${style.border} ${style.bg} shadow-2xl relative cursor-grab active:cursor-grabbing select-none backdrop-blur-md group`}
              >
                {/* Washi Tape Strip */}
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 rounded-sm ${style.tape} backdrop-blur-sm border border-dashed shadow-sm transform -rotate-1 pointer-events-none`}
                />

                {/* Pin Detail */}
                <div className="absolute top-4 right-4 text-[var(--text-muted)] opacity-40 group-hover:opacity-80 transition-opacity">
                  <Pin className="w-3.5 h-3.5" />
                </div>

                {/* Category Tag + Reading Time Chip */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-block text-[10px] font-mono-code uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${style.tag}`}
                  >
                    {note.title}
                  </span>

                  <span className="flex items-center gap-1 text-[10px] font-mono-code text-[var(--text-muted)]">
                    <Clock className="w-3 h-3" />
                    <span>1 min read</span>
                  </span>
                </div>

                {/* Note Body */}
                <p className={`font-body text-base sm:text-lg leading-relaxed ${style.text} font-medium`}>
                  {note.body}
                </p>

                {/* Bottom Identifier */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-code text-[var(--text-muted)] opacity-60">
                  <span>MEMO_0{idx + 1}</span>
                  <span>// SAISH GAIKWAD</span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
