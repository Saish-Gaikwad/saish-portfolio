import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, ArrowUpRight, Sun, Moon, Volume2, VolumeX, Command } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { sound } from '../utils/audio'

interface NavbarProps {
  onOpenResume: () => void
  onOpenCommandPalette: () => void
}

const navLinks = [
  { id: 'work', label: '// Work' },
  { id: 'shipped', label: '// Shipped' },
  { id: 'experience', label: '// Experience' },
  { id: 'stats', label: '// Stats' },
  { id: 'notes', label: '// Notes' },
  { id: 'contact', label: '// Contact' },
]

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenCommandPalette }) => {
  const { theme, toggleTheme } = useTheme()
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled())
  const [activeSection, setActiveSection] = useState<string>('work')
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  // Scroll Progress and Sticky Navbar tightening
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      setScrollProgress(totalScroll > 0 ? (current / totalScroll) * 100 : 0)
      setIsScrolled(current > 40)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' }
    )

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleSoundToggle = () => {
    const next = sound.toggle()
    setSoundEnabled(next)
  }

  const handleNavClick = (id: string) => {
    sound.playClick()
    setActiveSection(id)
  }

  return (
    <>
      {/* Scroll Progress Bar at the Very Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[var(--gold)] via-[#f59e0b] to-[var(--gold)] shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--bg-base)]/90 backdrop-blur-2xl py-3 border-b border-white/[0.08] shadow-lg'
            : 'bg-[var(--bg-base)]/60 backdrop-blur-md py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#top"
            onClick={() => sound.playClick()}
            data-cursor="Home"
            className="group flex items-center gap-3 font-display text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors"
          >
            <span className="w-9 h-9 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center text-sm font-serif-editorial text-[var(--gold)] group-hover:border-[var(--gold)]/50 group-hover:scale-105 transition-all">
              sg
            </span>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-[var(--text-primary)]">
                Saish Gaikwad
              </span>
              <span className="text-[10px] font-mono-code text-[var(--text-muted)] -mt-0.5">
                AI &amp; Data Science
              </span>
            </div>
          </a>

          {/* Section Links with Sliding Underline */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-mono-code text-[var(--text-secondary)] uppercase tracking-wider relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-3 py-1.5 rounded-lg transition-colors relative cursor-pointer ${
                    isActive ? 'text-[var(--gold)] font-bold' : 'hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--gold)] rounded-full shadow-[0_0_8px_#fbbf24]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                sound.playClick()
                onOpenCommandPalette()
              }}
              title="Search and Quick Jump (Cmd+K)"
              data-cursor="Search"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 bg-black/15 hover:border-[var(--gold)]/50 text-[11px] font-mono-code text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              <Command className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="text-[10px] bg-white/10 px-1 py-0.2 rounded text-[var(--text-primary)]">⌘K</kbd>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Tactile Sound FX'}
              data-cursor="Sound"
              className="p-2 rounded-xl border border-white/10 bg-black/15 hover:border-[var(--gold)]/50 text-[var(--text-muted)] hover:text-[var(--gold)] transition-all cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[var(--gold)]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                sound.playClick()
                toggleTheme()
              }}
              title={`Switch to ${theme === 'dark' ? 'Warm Linen' : 'Dark Obsidian'}`}
              data-cursor="Theme"
              className="p-2 rounded-xl border border-white/10 bg-black/15 hover:border-[var(--gold)]/50 text-[var(--text-muted)] hover:text-[var(--gold)] transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[var(--gold)]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-blue-500" />
              )}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                sound.playClick()
                onOpenResume()
              }}
              data-cursor="Resume"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 text-xs font-mono-code text-[var(--gold)] transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="font-semibold">Resume</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
