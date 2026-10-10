import type { PortfolioData } from '../types/portfolio'

export const portfolioData: PortfolioData = {
  hero: {
    eyebrow: 'AI & Data Science, KJSIT Mumbai',
    nameFirst: 'Saish',
    nameLast: 'Gaikwad',
    punchline: 'Code Icon Winner.',
    punchlineEm: 'model architect.',
    sub: 'I build computer vision sentinels, FinTech AI pipelines, and scalable backend platforms, then deploy them into production.',
    polaroidCaption: 'fuelled by cold brew + PyTorch',
    imagePlaceholder: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=880&q=80',
  },

  marqueeItems: [
    'Code Icon 2026 Winner',
    '9.19 CGPA',
    'Computer Vision',
    'YOLOv8',
    'FinTech AI',
    'Kaya Limited Intern',
    '91.75% Diploma Distinction',
    'Explainable AI',
    'Deep Learning',
    'FastAPI & React',
    'Zero-Day Threat Defense',
  ],

  caseStudies: [
    {
      id: 'artha',
      yearAndGuide: '2026 · First Prize Winner, Code Icon 2026 Hackathon',
      title: 'ARTHA : Autonomous FinTech Intelligence',
      question: 'Can autonomous machine learning forecast debt risk and rebalance portfolios under macroeconomic stress in sub-second latency?',
      bullets: [
        'Built real-time Monte Carlo simulations for macroeconomic debt amortization and stress-testing under market shocks.',
        'Engineered an autonomous portfolio allocation engine factoring personal risk tolerance and predictive liquidity curves.',
        'Developed end-to-end FastAPI microservice delivering sub-180ms vector computation pipeline during a 12-hour offline sprint.',
      ],
      stat: {
        value: '1st Prize',
        label: 'Code Icon 2026 Hackathon Winner (12-hour offline build)',
      },
      codeUrl: 'https://github.com/Saish-Gaikwad',
      tags: ['React.js', 'Python', 'FastAPI', 'Machine Learning', 'MongoDB', 'Scikit-Learn'],
    },
    {
      id: 'chaakshu',
      yearAndGuide: '2026 · Research & Edge Vision Sentinel',
      title: 'ChaakShu AI : Multimodal Video Policy Sentinel',
      question: 'How reliably can edge computer vision detect safety and policy violations in real-time video streams?',
      bullets: [
        'Frame-by-frame object, action, and illicit artifact localization powered by custom fine-tuned YOLOv8 neural weights.',
        'Integrated Optical Character Recognition (OCR) scanning on-screen typography, brand violations, and illicit messaging.',
        'Explainable AI (XAI) activation heatmaps providing transparent visual attribution bounds for compliance officers.',
      ],
      stat: {
        value: '30+ FPS',
        label: 'Real-time video ingestion at 94.6% model precision',
      },
      codeUrl: 'https://github.com/Saish-Gaikwad',
      tags: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'FastAPI', 'Explainable AI'],
    },
    {
      id: 'phishing',
      yearAndGuide: '2025 · Cybersecurity Threat Intelligence',
      title: 'Phishing URL Threat Radar : Zero-Day Defense',
      question: 'Can a 30-feature structural heuristic engine neutralize zero-day phishing attacks before page rendering?',
      bullets: [
        'Engineered 30 lexical, entropy, and domain heuristic features extracted directly from inbound raw URL strings.',
        'Ensemble gradient boosted classifier benchmarked on 50,000+ threat vectors achieving 97.4% accuracy with <1.8% false positives.',
        'Sub-8ms REST inference endpoint engineered for high-throughput firewall gatekeeping or browser extension hooks.',
      ],
      stat: {
        value: '97.4%',
        label: 'Accuracy with sub-8ms feature extraction latency',
      },
      codeUrl: 'https://github.com/Saish-Gaikwad/Phishing-detector',
      tags: ['Python', 'Machine Learning', 'Scikit-Learn', 'Feature Engineering', 'FastAPI'],
    },
  ],

  shipped: [
    {
      id: 'careermitra',
      name: 'CareerMitra AI',
      what: 'AI-Powered Career Intelligence & Resume Vector Engine',
      detail: 'Semantic resume parsing analyzing candidate dossiers across 50+ dimensions, computing skill gap distances, and recommending personalized trajectories.',
      stack: ['Python', 'NLP', 'Scikit-Learn', 'FastAPI', 'React.js', 'MongoDB'],
      url: 'https://github.com/Saish-Gaikwad/CareerMitra-AI',
    },
    {
      id: 'phishing-shipped',
      name: 'Phishing URL Threat Radar',
      what: 'Real-Time Heuristic Zero-Day Cyber Defense',
      detail: 'Lightweight heuristic engine with 30-feature vector extraction and sub-8ms REST APIs trained on 50,000+ malicious URLs.',
      stack: ['Python', 'Machine Learning', 'Scikit-Learn', 'FastAPI'],
      url: 'https://github.com/Saish-Gaikwad/Phishing-detector',
    },
    {
      id: 'kaya-enterprise',
      name: 'Enterprise Support Toolkit',
      what: 'Production Incident Diagnostics & SLA Management',
      detail: 'Internal diagnostic tooling and automated query scripts for diagnosing distributed CRM, POS, and transaction database discrepancies at Kaya Limited.',
      stack: ['Python', 'SQL', 'MongoDB', 'Incident Triage', 'SLA Automation'],
      url: 'https://github.com/Saish-Gaikwad',
    },
    {
      id: 'artha-client',
      name: 'ARTHA Analytics Dashboard',
      what: 'Interactive Wealth Telemetry Interface',
      detail: 'High-density dark responsive analytics frontend featuring interactive Monte Carlo distribution curves and wealth stress-testing graphs.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      url: 'https://github.com/Saish-Gaikwad',
    },
  ],

  experience: [
    {
      period: 'Jan 2025 – Jul 2025',
      role: 'Application Support Engineer Intern',
      org: 'Kaya Limited',
      location: 'Mumbai, India',
      description: 'Provided application support for mission-critical CRM, POS, and enterprise transaction systems. Resolved production tickets while maintaining strict SLA compliance, diagnosed distributed database and billing issues, and coordinated root cause analyses with cross-functional engineering teams.',
      highlights: [
        'Diagnosed billing, transaction, and system access issues across high-volume retail systems.',
        'Collaborated with engineering to resolve critical incidents and document permanent fixes.',
        'Maintained SLA compliance and authored standard incident triage SOPs.',
      ],
    },
  ],

  education: [
    {
      period: '2025 – 2028',
      role: 'B.Tech in Artificial Intelligence & Data Science',
      org: 'K. J. Somaiya Institute of Technology',
      location: 'Mumbai',
      description: 'Maintaining a 9.19 CGPA. Specializing in Deep Learning, Computer Vision pipelines, and Scalable Machine Intelligence under guidance of Dr. Milind Nemade (HOD).',
    },
    {
      period: '2022 – 2025',
      role: 'Diploma in Information Technology',
      org: 'Government Polytechnic Mumbai',
      location: 'Bandra, Mumbai',
      description: 'Graduated with First Class with Distinction (91.75%). Strong core foundation in Java, Database Architecture, Networking, and Systems.',
    },
    {
      period: '2022',
      role: 'Secondary School Certificate (SSC)',
      org: 'Shailendra Education Society',
      location: 'Dahisar, Mumbai',
      description: 'Scored 90.40% High Distinction with excellence in Mathematics and Sciences.',
    },
  ],

  bentoStats: [
    {
      id: 'bento-hackathon',
      bigText: '1st',
      unit: 'Prize Gold',
      title: 'Code Icon 2026 Winner',
      description: 'Built the ARTHA FinTech AI platform in a 12-hour offline hackathon against top regional engineering teams.',
    },
    {
      id: 'bento-gpa',
      bigText: '9.19',
      unit: 'CGPA',
      title: 'Academic Distinction',
      description: 'B.Tech Artificial Intelligence & Data Science at K. J. Somaiya Institute of Technology.',
    },
    {
      id: 'bento-diploma',
      bigText: '91.75%',
      unit: 'Distinction',
      title: 'Government Polytechnic Mumbai',
      description: 'Diploma in Information Technology with First Class with Distinction.',
    },
    {
      id: 'bento-certs',
      bigText: '4+',
      unit: 'Accreditations',
      title: 'Industry Certifications',
      description: 'Microsoft Data Analyst 101, Google Cloud Generative AI, Deloitte Australia Cyber Simulation, and Acmegrade Data Science.',
    },
  ],

  stickyNotes: [
    {
      title: 'currently learning',
      body: 'AI agents, LangGraph, and vision-language model fine-tuning so autonomous pipelines run end-to-end.',
      color: 'amber',
      rotation: -2.5,
    },
    {
      title: 'by day',
      body: 'training YOLOv8 models, extracting feature vectors, and arguing with validation curves.',
      color: 'rose',
      rotation: 2,
    },
    {
      title: 'by night',
      body: 'building hackathon prototypes, testing FastAPI endpoints, and sipping black coffee.',
      color: 'paper',
      rotation: -1.5,
    },
    {
      title: 'best part of a project',
      body: 'the exact moment messy validation loss finally converges and predictions turn sharp.',
      color: 'emerald',
      rotation: 3,
    },
    {
      title: 'always down for',
      body: 'a 24-hour hackathon, dark roast coffee, or debugging distributed production pipelines.',
      color: 'amber',
      rotation: -2,
    },
    {
      title: 'fun fact',
      body: 'quiet until you ask me about model latency, computer vision architectures, or FinTech algorithms.',
      color: 'rose',
      rotation: 1.5,
    },
  ],

  contact: {
    email: 'saishgaikwad90@gmail.com',
    phone: '+91 9022252218',
    location: 'Mumbai, Maharashtra, India',
    linkedin: 'https://linkedin.com/in/saish-gaikwad-9590a6265',
    github: 'https://github.com/Saish-Gaikwad',
    resumePdfUrl: '/Saish_Gaikwad_Resume.pdf',
  },
}
