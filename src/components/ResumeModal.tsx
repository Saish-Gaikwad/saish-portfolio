import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Printer, ArrowUpRight } from 'lucide-react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-4xl bg-[#131218] border border-[#292735] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col font-sans"
        >
          {/* Header Controls */}
          <div className="px-6 py-4 border-b border-[#292735] bg-[#16151c] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#fbbf24]">
              <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
              <span className="font-semibold tracking-wider">SAISH VIJAY GAIKWAD // RESUME</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#292735] bg-[#1a1922] text-[#f5f3f0] hover:border-[#fbbf24] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full border border-[#292735] text-[#9b96a4] hover:text-white hover:border-[#ff758f] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Formatted Clean Document Sheet */}
          <div className="p-6 md:p-10 overflow-y-auto bg-[#0e0d11] text-[#f5f3f0] space-y-6 select-text text-sm">
            {/* Header */}
            <div className="border-b border-[#292735] pb-5 text-center md:text-left">
              <h1 className="font-display text-3xl font-bold tracking-tight text-[#f5f3f0]">
                SAISH VIJAY GAIKWAD
              </h1>
              <p className="text-xs text-[#9b96a4] mt-1 font-mono">
                Mumbai, Maharashtra, India • +91 9022252218 •{' '}
                <a href="mailto:saishgaikwad90@gmail.com" className="text-[#fbbf24] hover:underline">
                  saishgaikwad90@gmail.com
                </a>
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-xs font-mono text-[#9b96a4]">
                <a
                  href="https://linkedin.com/in/saish-gaikwad-9590a6265"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#fbbf24] hover:underline flex items-center gap-1"
                >
                  LinkedIn: linkedin.com/in/saish-gaikwad <ArrowUpRight className="w-3 h-3" />
                </a>
                <span>•</span>
                <a
                  href="https://github.com/Saish-Gaikwad"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#fbbf24] hover:underline flex items-center gap-1"
                >
                  GitHub: github.com/Saish-Gaikwad <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Objective */}
            <div>
              <h2 className="text-xs font-mono tracking-wider uppercase text-[#fbbf24] font-bold border-b border-[#292735] pb-1 mb-2">
                OBJECTIVE
              </h2>
              <p className="text-xs text-[#9b96a4] leading-relaxed">
                Artificial Intelligence and Data Science undergraduate passionate about Data Science,
                Artificial Intelligence, Cybersecurity, and software development. Motivated to apply
                technical skills, build scalable AI-powered solutions, and continuously learn
                emerging technologies while contributing to impactful projects.
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono tracking-wider uppercase text-[#fbbf24] font-bold border-b border-[#292735] pb-1 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xs text-[#f5f3f0]">
                      K. J. Somaiya Institute of Technology, Mumbai
                    </h3>
                    <p className="text-xs text-[#9b96a4]">B.Tech - Artificial Intelligence &amp; Data Science</p>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <span className="text-[#9b96a4]">2025 – 2028</span>
                    <span className="block text-[#fbbf24] font-bold">CGPA: 9.19</span>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xs text-[#f5f3f0]">
                      Government Polytechnic Mumbai, Bandra
                    </h3>
                    <p className="text-xs text-[#9b96a4]">Diploma in Information Technology</p>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <span className="text-[#9b96a4]">2025</span>
                    <span className="block text-[#fbbf24] font-bold">91.75% Distinction</span>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xs text-[#f5f3f0]">
                      Shailendra Education Society, Dahisar
                    </h3>
                    <p className="text-xs text-[#9b96a4]">SSC</p>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <span className="text-[#9b96a4]">2022</span>
                    <span className="block text-[#9b96a4]">90.40%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-mono tracking-wider uppercase text-[#fbbf24] font-bold border-b border-[#292735] pb-1 mb-2">
                TECHNICAL SKILLS
              </h2>
              <div className="text-xs text-[#9b96a4] space-y-1 font-mono">
                <div><span className="text-[#f5f3f0]">Languages:</span> Python, Java, JavaScript, TypeScript</div>
                <div><span className="text-[#f5f3f0]">Web:</span> HTML, CSS, React.js, Next.js, Node.js, Express.js</div>
                <div><span className="text-[#f5f3f0]">Database:</span> MongoDB, SQLite</div>
                <div><span className="text-[#f5f3f0]">AI / Tools:</span> Machine Learning, Data Science, Git, GitHub, Generative AI, PyTorch, YOLOv8, OpenCV</div>
                <div><span className="text-[#f5f3f0]">Other:</span> Application Support, Incident Management, CRM, POS Systems</div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-mono tracking-wider uppercase text-[#fbbf24] font-bold border-b border-[#292735] pb-1 mb-3">
                INTERNSHIP &amp; EXPERIENCE
              </h2>
              <div>
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <h3 className="font-semibold text-xs text-[#f5f3f0]">Kaya Limited</h3>
                    <p className="text-xs text-[#9b96a4] italic">Application Support Engineer Intern</p>
                  </div>
                  <span className="text-xs font-mono text-[#9b96a4]">Jan 2025 – Jul 2025</span>
                </div>
                <ul className="list-disc list-inside text-xs text-[#9b96a4] space-y-1">
                  <li>Provided application support for CRM, POS, and enterprise systems.</li>
                  <li>Resolved production support tickets while maintaining strict SLA compliance.</li>
                  <li>Diagnosed billing, transaction, and system access issues.</li>
                  <li>Coordinated with cross-functional teams to resolve critical incidents and root cause analysis.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-mono tracking-wider uppercase text-[#fbbf24] font-bold border-b border-[#292735] pb-1 mb-3">
                FEATURED PROJECTS
              </h2>
              <div className="space-y-3 text-xs">
                <div>
                  <h3 className="font-semibold text-[#f5f3f0]">CareerMitra AI : Career Path &amp; Resume Intelligence</h3>
                  <p className="text-[#9b96a4]">Analyzes resumes and recommends personalized career paths using NLP and machine learning.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#f5f3f0]">ChaakShu AI : Multimodal Video Policy Violation Detection</h3>
                  <p className="text-[#9b96a4]">Video policy violation detection platform using computer vision, YOLOv8, OCR, and explainable AI.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#f5f3f0]">ARTHA : Autonomous FinTech Intelligence Platform</h3>
                  <p className="text-[#9b96a4]">Platform for risk analysis, debt forecasting, and portfolio optimization. Winner of Code Icon 2026 Hackathon.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#f5f3f0]">Phishing URL Detection System : Threat Radar</h3>
                  <p className="text-[#9b96a4]">ML-based phishing detection engine with 30-feature structural URL analysis and real-time APIs.</p>
                </div>
              </div>
            </div>

            {/* Achievements & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xs font-mono tracking-wider uppercase text-[#fbbf24] font-bold border-b border-[#292735] pb-1 mb-2">
                  ACHIEVEMENTS
                </h2>
                <p className="text-xs text-[#9b96a4]">
                  <span className="text-[#f5f3f0] font-semibold">First Prize Winner</span> – Code Icon 2026 Hackathon: Built "ARTHA" FinTech Platform in a 12-hour offline hackathon.
                </p>
              </div>

              <div>
                <h2 className="text-xs font-mono tracking-wider uppercase text-[#fbbf24] font-bold border-b border-[#292735] pb-1 mb-2">
                  CERTIFICATIONS
                </h2>
                <ul className="text-xs text-[#9b96a4] space-y-1 list-disc list-inside">
                  <li>Data Analyst 101: Simplilearn / Microsoft (Jan 2025)</li>
                  <li>Introduction to GenAI: Simplilearn / Google Cloud (Apr 2025)</li>
                  <li>Data Science Certification: Acmegrade (Jul 2024)</li>
                  <li>Deloitte Australia Cyber Job Simulation: Forage (Aug 2025)</li>
                </ul>
              </div>
            </div>

            {/* Reference */}
            <div className="border-t border-[#292735] pt-3 text-xs text-[#9b96a4]">
              <span className="text-[#f5f3f0] font-semibold">Academic Reference:</span> Dr. Milind Nemade (Head of Department, Artificial Intelligence &amp; Data Science, K. J. Somaiya Institute of Technology) • mnemade@somaiya.edu • 9987014288
            </div>
          </div>

          {/* Footer Action */}
          <div className="px-6 py-4 border-t border-[#292735] bg-[#16151c] flex items-center justify-between text-xs font-mono">
            <span className="text-[#9b96a4]">PRESS ESC TO CLOSE</span>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full bg-[#fbbf24] text-[#0e0d11] font-semibold flex items-center gap-1.5 hover:bg-[#f59e0b] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Save PDF</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
