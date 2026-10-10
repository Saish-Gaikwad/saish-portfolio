export interface ProjectCaseStudy {
  id: string
  yearAndGuide: string
  title: string
  question: string
  bullets: string[]
  stat: {
    value: string
    label: string
  }
  dashboardImage?: string
  codeUrl: string
  demoUrl?: string
  tags: string[]
}

export interface ShippedProject {
  id: string
  name: string
  what: string
  detail: string
  stack: string[]
  url: string
}

export interface ExperienceItem {
  period: string
  role: string
  org: string
  location?: string
  description: string
  highlights?: string[]
}

export interface StickyNote {
  title: string
  body: string
  color: 'amber' | 'rose' | 'paper' | 'emerald'
  rotation: number
}

export interface PortfolioData {
  hero: {
    eyebrow: string
    nameFirst: string
    nameLast: string
    punchline: string
    punchlineEm: string
    sub: string
    polaroidCaption: string
    imagePlaceholder: string
  }
  marqueeItems: string[]
  caseStudies: ProjectCaseStudy[]
  shipped: ShippedProject[]
  experience: ExperienceItem[]
  education: ExperienceItem[]
  bentoStats: {
    id: string
    bigText: string
    unit?: string
    title: string
    description: string
  }[]
  stickyNotes: StickyNote[]
  contact: {
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    resumePdfUrl: string
  }
}
