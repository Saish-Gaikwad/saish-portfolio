import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '../utils/audio'

export const EasterEggs: React.FC = () => {
  const [showSentinelGrid, setShowSentinelGrid] = useState(false)
  const [isHackerMode, setIsHackerMode] = useState(false)

  useEffect(() => {
    let keyBuffer = ''
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      // Sentinel Easter Egg
      keyBuffer += e.key.toLowerCase()
      if (keyBuffer.length > 20) {
        keyBuffer = keyBuffer.slice(-20)
      }
      if (keyBuffer.includes('sentinel')) {
        keyBuffer = ''
        setShowSentinelGrid(true)
        sound.playChime()
        setTimeout(() => setShowSentinelGrid(false), 4500)
      }

      // Konami Code Easter Egg
      if (e.key === konamiSequence[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiSequence.length) {
          konamiIndex = 0
          setIsHackerMode((prev) => {
            const next = !prev
            document.documentElement.classList.toggle('hacker-mode', next)
            sound.playChime()
            return next
          })
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Full-screen Sentinel Detection HUD Overlay */}
      <AnimatePresence>
        {showSentinelGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-8 bg-black/80 backdrop-blur-sm"
          >
            {/* Top HUD */}
            <div className="flex items-center justify-between text-xs font-mono-code text-[#fbbf24] border-b border-[#fbbf24]/40 pb-3">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                // SENTINEL PROTOCOL ACTIVATED
              </span>
              <span>GRID RESOLUTION: 3840x2160</span>
            </div>

            {/* Center Crosshair and Targeting Matrix */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-72 h-72 border border-dashed border-[#fbbf24]/50 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                <div className="w-48 h-48 border border-[#fbbf24]/30 rounded-full" />
              </div>

              {/* Target Bounding Reticle */}
              <div className="absolute w-64 h-64 border-2 border-[#fbbf24] flex flex-col justify-between p-3">
                <div className="flex justify-between text-[11px] font-mono-code text-[#fbbf24]">
                  <span>TARGET: USER_AGENT</span>
                  <span>99.8%</span>
                </div>
                <div className="text-[11px] font-mono-code text-[#10b981]">
                  STATUS: ZERO BREACH
                </div>
              </div>
            </div>

            {/* Bottom HUD */}
            <div className="flex items-center justify-between text-xs font-mono-code text-[#fbbf24] border-t border-[#fbbf24]/40 pt-3">
              <span>SAISH GAIKWAD // CHAAKSHU AI ENGINE</span>
              <span>PRESS ANY KEY TO STAND DOWN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hacker Mode Floating Badge */}
      {isHackerMode && (
        <div className="fixed bottom-4 left-4 z-50 px-3 py-1.5 rounded-xl bg-black border border-[#10b981] text-[#10b981] text-xs font-mono-code shadow-2xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span>HACKER MODE (KONAMI ACTIVE)</span>
        </div>
      )}
    </>
  )
}
