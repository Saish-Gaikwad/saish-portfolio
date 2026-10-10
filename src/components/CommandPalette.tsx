import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, FolderGit2, FileText, Moon, Sun, Volume2, VolumeX, Mail, ExternalLink, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { sound } from '../utils/audio'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onOpenResume: () => void
}

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'Projects' | 'Navigation' | 'Actions' | 'Social'
  icon: React.ReactNode
  action: () => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenResume }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, toggleTheme } = useTheme()
  const [soundOn, setSoundOn] = useState(sound.isEnabled())
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
      sound.playClick()
    }
  }, [isOpen])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('saishgaikwad85@gmail.com')
    setCopiedEmail(true)
    sound.playChime()
    setTimeout(() => {
      setCopiedEmail(false)
      onClose()
    }, 1200)
  }

  const handleToggleSound = () => {
    const next = sound.toggle()
    setSoundOn(next)
  }

  const scrollTo = (id: string) => {
    onClose()
    sound.playClick()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const items: CommandItem[] = [
    {
      id: 'artha',
      title: 'ARTHA : FinTech Intelligence',
      subtitle: 'Code Icon 2026 Winner (12h offline build)',
      category: 'Projects',
      icon: <Sparkles className="w-4 h-4 text-[#fbbf24]" />,
      action: () => scrollTo('work'),
    },
    {
      id: 'chaakshu',
      title: 'ChaakShu AI : Edge Vision Sentinel',
      subtitle: 'YOLOv8 multimodal policy enforcement',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-[#60a5fa]" />,
      action: () => scrollTo('work'),
    },
    {
      id: 'careermitra',
      title: 'CareerMitra AI',
      subtitle: 'Resume parsing & vector gap intelligence',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-[#10b981]" />,
      action: () => scrollTo('shipped'),
    },
    {
      id: 'phishing',
      title: 'Phishing URL Threat Radar',
      subtitle: 'Sub-8ms zero-day cybersecurity defense',
      category: 'Projects',
      icon: <FolderGit2 className="w-4 h-4 text-[#f43f5e]" />,
      action: () => scrollTo('shipped'),
    },
    {
      id: 'resume',
      title: 'View Verified Resume / Dossier',
      subtitle: 'Printable engineering sheet with full credentials',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-[#fbbf24]" />,
      action: () => {
        onClose()
        onOpenResume()
      },
    },
    {
      id: 'experience',
      title: 'Experience & Academics',
      subtitle: 'Kaya Limited intern, KJSIT Mumbai (9.19 CGPA)',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-[#94a3b8]" />,
      action: () => scrollTo('experience'),
    },
    {
      id: 'theme',
      title: `Switch Theme to ${theme === 'dark' ? 'Warm Linen (Light)' : 'Obsidian Noir (Dark)'}`,
      subtitle: 'Toggle between midnight obsidian and editorial linen',
      category: 'Actions',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-[#fbbf24]" /> : <Moon className="w-4 h-4 text-[#60a5fa]" />,
      action: () => {
        toggleTheme()
        sound.playClick()
        onClose()
      },
    },
    {
      id: 'sound',
      title: soundOn ? 'Mute Tactile Sound FX' : 'Enable Tactile Sound FX',
      subtitle: 'Web Audio API haptic synthesized feedback',
      category: 'Actions',
      icon: soundOn ? <VolumeX className="w-4 h-4 text-[#94a3b8]" /> : <Volume2 className="w-4 h-4 text-[#10b981]" />,
      action: handleToggleSound,
    },
    {
      id: 'email',
      title: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
      subtitle: 'saishgaikwad85@gmail.com',
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-[#fbbf24]" />,
      action: handleCopyEmail,
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      subtitle: 'github.com/Saish-Gaikwad',
      category: 'Social',
      icon: <ExternalLink className="w-4 h-4 text-[#94a3b8]" />,
      action: () => {
        window.open('https://github.com/Saish-Gaikwad', '_blank')
        onClose()
      },
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/saish-gaikwad-9590a6265',
      category: 'Social',
      icon: <ExternalLink className="w-4 h-4 text-[#60a5fa]" />,
      action: () => {
        window.open('https://linkedin.com/in/saish-gaikwad-9590a6265', '_blank')
        onClose()
      },
    },
  ]

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
      sound.playHover()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1))
      sound.playHover()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-2xl glass-panel border border-white/15 overflow-hidden shadow-2xl z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
              <Search className="w-5 h-5 text-[var(--gold)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or jump to project... (↑↓ to navigate)"
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none font-body"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 text-[var(--text-muted)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono-code text-[var(--text-muted)]">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--text-primary)]'
                          : 'hover:bg-white/5 border border-transparent text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-1.5 rounded-lg bg-black/20 shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate font-body text-[var(--text-primary)]">
                            {item.title}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] truncate font-body">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono-code text-[var(--text-muted)] uppercase tracking-wider px-2 py-0.5 rounded bg-black/20 shrink-0">
                        {item.category}
                      </span>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-4 py-2 border-t border-white/10 bg-black/20 flex items-center justify-between text-[11px] font-mono-code text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <span>[↑↓] navigate</span>
                <span>[↵] select</span>
                <span>[esc] close</span>
              </div>
              <span>Saish Gaikwad // OS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
