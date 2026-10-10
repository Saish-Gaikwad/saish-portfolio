import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { ResearchWork } from './components/ResearchWork'
import { ShippedList } from './components/ShippedList'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { OffTheLaptop } from './components/OffTheLaptop'
import { YapperCorner } from './components/YapperCorner'
import { ContactSection } from './components/ContactSection'
import { ResumeModal } from './components/ResumeModal'
import { Preloader } from './components/Preloader'
import { AmbientEffects } from './components/AmbientEffects'
import { CommandPalette } from './components/CommandPalette'
import { CustomCursor } from './components/CustomCursor'
import { EasterEggs } from './components/EasterEggs'

export const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-400">
      {/* Custom Trailing Gold Cursor */}
      <CustomCursor />

      {/* Easter Egg Overlay (Typing 'sentinel' or Konami code) */}
      <EasterEggs />

      {/* Initial 0-100% Preloader Sequence */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Ambient Neural Particle Mesh & Cursor Spotlight */}
      <AmbientEffects />

      {/* Top Navigation with Scroll Progress Bar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section with Interactive 3D Tilting Terminal */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Infinite Tech Stack Marquee */}
        <Marquee />

        {/* Narrative Research & Projects */}
        <ResearchWork />

        {/* Things I've Shipped */}
        <ShippedList />

        {/* Where I've Worked & Studied with Self-Drawing Timeline */}
        <ExperienceTimeline />

        {/* Bento Grid: Academic Distinctions, Heatmap & Hackathon Wins */}
        <OffTheLaptop />

        {/* Candid Notes from the Builder's Desk (Tactile Washi Sticky Notes) */}
        <YapperCorner />

        {/* Say Hi / Contact Section with Floating Form & Giant Footer */}
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Command Palette Spotlight (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Interactive In-Page Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
