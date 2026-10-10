import React, { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mouseX = useSpring(0, { stiffness: 600, damping: 35 })
  const mouseY = useSpring(0, { stiffness: 600, damping: 35 })
  const ringX = useSpring(0, { stiffness: 220, damping: 25 })
  const ringY = useSpring(0, { stiffness: 220, damping: 25 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Check hovered elements for cursor hints
    const handleElementHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      if (target) {
        setCursorText(target.getAttribute('data-cursor') || '')
        setIsHovered(true)
      } else {
        const interactive = (e.target as HTMLElement)?.closest('button, a, input, [role="button"]')
        if (interactive) {
          setIsHovered(true)
          setCursorText('')
        } else {
          setIsHovered(false)
          setCursorText('')
        }
      }
    }

    window.addEventListener('mouseover', handleElementHover)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleElementHover)
    }
  }, [mouseX, mouseY, ringX, ringY, isVisible])

  if (isTouchDevice || !isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center Gold Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] shadow-[0_0_10px_#fbbf24] fixed top-0 left-0"
      />

      {/* Trailing Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? (cursorText ? 2.5 : 1.7) : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={`fixed top-0 left-0 rounded-full border border-[#fbbf24]/60 flex items-center justify-center backdrop-blur-[1px] transition-colors ${
          cursorText ? 'bg-[#fbbf24]/20 w-16 h-16' : isHovered ? 'bg-[#fbbf24]/10 w-10 h-10' : 'w-8 h-8'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono-code font-bold uppercase tracking-wider text-[#fbbf24]">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  )
}
