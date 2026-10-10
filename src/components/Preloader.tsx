import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState<number>(0)
  const [phaseText, setPhaseText] = useState<string>('INITIALIZING TENSORS...')

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onComplete()
      return
    }

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev < 100) {
          const next = prev + Math.floor(Math.random() * 6) + 3
          const clamped = Math.min(next, 100)

          if (clamped < 35) {
            setPhaseText('CALIBRATING NEURAL MODELS...')
          } else if (clamped < 70) {
            setPhaseText('MOUNTING VISION PIPELINES...')
          } else if (clamped < 95) {
            setPhaseText('SYNCING VERIFIED CREDENTIALS...')
          } else {
            setPhaseText('SYSTEM ONLINE')
          }

          if (clamped === 100) {
            clearInterval(interval)
            setTimeout(() => {
              onComplete()
            }, 600)
          }
          return clamped
        }
        return 100
      })
    }, 45)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          y: '-100%',
          transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
        }}
        className="fixed inset-0 z-50 bg-[#0a090d] text-[#f5f3f0] flex flex-col items-center justify-center p-6 select-none font-sans overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#fbbf24]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
          {/* Monogram Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-[#16151c] border border-[#292735] flex items-center justify-center mb-8 shadow-2xl relative"
          >
            <span className="font-serif italic text-2xl text-[#fbbf24] font-bold">
              sg
            </span>
            <div className="absolute inset-0 rounded-2xl border border-[#fbbf24]/30 animate-pulse pointer-events-none" />
          </motion.div>

          {/* Big Number Percentage */}
          <div className="font-display font-normal text-7xl sm:text-8xl md:text-9xl text-[#f5f3f0] tracking-tighter leading-none mb-4">
            <span className="text-[#fbbf24]">{percent}</span>
            <span className="text-3xl sm:text-4xl text-[#9b96a4] font-light ml-1">%</span>
          </div>

          {/* Micro Status Label */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9b96a4] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-ping" />
            <span>{phaseText}</span>
          </div>

          {/* Ultra-thin Minimalist Progress Bar */}
          <div className="w-full bg-[#1c1a24] h-[2px] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#ff758f]"
              style={{ width: `${percent}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Skip CTA */}
          <button
            onClick={onComplete}
            className="mt-8 text-[11px] font-mono text-[#9b96a4] hover:text-[#fbbf24] transition-colors uppercase tracking-widest cursor-pointer underline underline-offset-4"
          >
            Skip Intro
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
