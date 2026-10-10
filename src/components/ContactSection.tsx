import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, FileText, Copy, Check, ExternalLink, Send, Sparkles } from 'lucide-react'
import { portfolioData } from '../data/portfolio'
import { sound } from '../utils/audio'

interface ContactSectionProps {
  onOpenResume: () => void
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const { contact } = portfolioData
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email)
    sound.playChime()
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return
    sound.playChime()
    setFormSubmitted(true)
  }

  return (
    <section id="contact" className="pt-32 pb-16 px-5 sm:px-6 max-w-7xl mx-auto border-t border-white/10 relative">
      {/* Toast Notification for Clipboard Copy */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-panel border border-[var(--gold)]/40 text-[var(--gold)] shadow-2xl backdrop-blur-xl"
          >
            <Check className="w-4 h-4 text-[#10b981]" />
            <span className="text-xs font-mono-code font-bold">Email copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 mb-20">
        <div className="inline-block">
          <p className="font-mono-code text-xs uppercase tracking-widest text-[var(--gold)] bg-[var(--gold)]/10 border border-[var(--gold)]/20 px-4 py-1.5 rounded-full font-semibold">
            ● AVAILABLE FOR FULL-STACK &amp; AI ENGINEERING ROLES
          </p>
        </div>

        {/* Large Headline with Gradient Text Shimmer */}
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-[var(--text-primary)]">
          Let's build something that{' '}
          <span className="bg-gradient-to-r from-[var(--gold)] via-amber-300 to-[var(--gold)] bg-clip-text text-transparent font-serif-editorial italic">
            scales.
          </span>
        </h2>

        {/* Magnetic Email Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={`mailto:${contact.email}`}
            onClick={() => sound.playClick()}
            data-cursor="Email"
            className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors underline decoration-1 underline-offset-8 decoration-white/20 hover:decoration-[var(--gold)] font-bold"
          >
            {contact.email}
          </a>

          <button
            onClick={handleCopyEmail}
            title="Copy email to clipboard"
            data-cursor="Copy"
            className="p-3 rounded-2xl glass-panel text-[var(--text-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)]/40 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <p className="font-body text-sm sm:text-base text-[var(--text-secondary)]">
          {contact.location} • {contact.phone}
        </p>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            data-cursor="LinkedIn"
            className="px-6 py-3 rounded-2xl bg-[var(--gold)] text-black font-display font-bold text-sm hover:brightness-110 hover:shadow-[0_0_20px_rgba(251,191,36,0.35)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            data-cursor="GitHub"
            className="px-6 py-3 rounded-2xl glass-panel text-[var(--text-primary)] font-display font-bold text-sm hover:border-[var(--gold)]/50 hover:text-[var(--gold)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              sound.playClick()
              onOpenResume()
            }}
            data-cursor="Resume"
            className="px-6 py-3 rounded-2xl glass-panel text-[var(--text-primary)] font-display font-bold text-sm hover:border-[var(--gold)]/50 hover:text-[var(--gold)] transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <FileText className="w-4 h-4 text-[var(--gold)]" />
            <span>Full Dossier / CV</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Interactive Contact Form */}
        <div className="max-w-xl mx-auto pt-10 text-left">
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h4 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">
              Send a quick message
            </h4>
            <p className="text-xs font-mono-code text-[var(--text-muted)] mb-6">
              Straight to Saish's inbox
            </p>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h5 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  Message Sent Successfully!
                </h5>
                <p className="text-xs text-[var(--text-muted)] font-mono-code">
                  Thank you, Saish will reply shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-[var(--text-muted)] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Engineering Recruiter / Lead"
                    className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] font-body transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[var(--text-muted)] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] font-body transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[var(--text-muted)] mb-1.5">
                    Project / Role Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about the engineering opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] font-body transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onClick={() => sound.playClick()}
                  data-cursor="Send"
                  className="w-full py-3.5 rounded-xl bg-[var(--gold)] text-black font-display font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Dispatch</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Giant Outlined Name in Footer that Fills with Gold on Hover */}
      <div className="pt-16 pb-8 border-t border-white/10 overflow-hidden">
        <div className="w-full text-center">
          <span
            style={{ WebkitTextStroke: '1.5px rgba(251, 191, 36, 0.35)' }}
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] text-transparent tracking-tighter hover:text-[var(--gold)] transition-colors duration-500 cursor-default select-none block"
          >
            SAISH GAIKWAD
          </span>
        </div>

        {/* Footer Monogram & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-code text-[var(--text-muted)] gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-black/20 border border-white/10 flex items-center justify-center font-serif-editorial text-[var(--gold)] text-xs">
              sg
            </span>
            <span>Saish Vijay Gaikwad © 2026</span>
          </div>
          <div>
            <span>Engineered for 60fps &amp; low latency</span>
          </div>
        </div>
      </div>
    </section>
  )
}
