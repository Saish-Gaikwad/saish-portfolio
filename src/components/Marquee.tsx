import React from 'react'

const techs = [
  'Python',
  'PyTorch',
  'YOLOv8',
  'FastAPI',
  'OpenCV',
  'React.js',
  'LangChain',
  'Docker',
  'Scikit-Learn',
  'MongoDB',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
]

export const Marquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/20 py-4 select-none group">
      {/* Side Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max items-center gap-8 animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...techs, ...techs, ...techs].map((tech, idx) => (
          <div key={idx} className="flex items-center gap-8 text-xs font-mono-code text-[var(--text-muted)] uppercase tracking-widest font-semibold hover:text-[var(--gold)] transition-colors">
            <span>{tech}</span>
            <span className="text-[var(--gold)]/40">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
