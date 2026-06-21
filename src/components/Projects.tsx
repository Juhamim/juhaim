"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Shield, Users, Zap, Cloud, Github } from "lucide-react"
import AnimatedSection from "./AnimatedSection"

const projects = [
  {
    id: "threathunter",
    title: "ThreatHunter AI",
    headline: "AI-Powered Security Operations Center",
    tagline: "Real-time threat detection & alert triage",
    description:
      "An advanced SOC platform leveraging machine learning to detect anomalous events across enterprise logs. By automating alert enrichment and behavioral pattern analysis, the platform reduces manual verification workflows and minimizes alert fatigue.",
    metrics: ["60% reduction in false positives", "Real-time log ingestion", "Automated alert playbooks"],
    tech: ["Python", "TensorFlow", "React.js", "WebSockets", "PostgreSQL"],
    color: "#e60000",
    icon: Shield,
    span: "md:col-span-2",
    github: "https://github.com/Juhamim",
    live: "#"
  },
  {
    id: "hermindmate",
    title: "HerMindMate",
    headline: "Healthcare Wellness Platform",
    tagline: "HIPAA-compliant patient care network",
    description:
      "A scalable wellness application serving 10,000+ monthly users with secure therapist matching, appointment booking, and real-time chat. Built with a focus on privacy, data encryption, and low-latency performance.",
    metrics: ["10,000+ monthly active users", "99.5% service uptime", "40% load time reduction via edge caching"],
    tech: ["React.js", "Next.js", "PostgreSQL", "AWS S3", "Razorpay"],
    color: "#00f3ff",
    icon: Users,
    span: "md:col-span-1",
    github: "https://github.com/Juhamim",
    live: "#"
  },
  {
    id: "soc-bot",
    title: "SOC Automation Bot",
    headline: "Incident Triage & Playbooks",
    tagline: "Intelligent alert enrichment",
    description:
      "An automated playbook script engine that integrates with SIEM platforms to triage alerts, fetch threat intelligence (IP reputation, domain age), and isolate compromised assets instantly.",
    metrics: ["60% faster incident response", "Automated playbook execution", "Threat intelligence correlation"],
    tech: ["Python", "SIEM API", "Docker", "REST APIs"],
    color: "#ff00ff",
    icon: Zap,
    span: "md:col-span-1",
    github: "https://github.com/Juhamim",
    live: "#"
  },
  {
    id: "cloud-print",
    title: "Cloud Printing System",
    headline: "Zero-Trust Cloud Document Printing",
    tagline: "Upload, manage, and print securely anywhere",
    description:
      "A secure cloud document repository with global print dispatching capabilities. Built using a zero-trust model where every upload and print job is cryptographically verified and securely stored in encrypted buckets.",
    metrics: ["Zero-trust architecture", "Encrypted document storage", "Cloudflare R2 edge caching"],
    tech: ["Next.js", "Cloudflare R2", "Node.js", "Tailwind CSS"],
    color: "#00f3ff",
    icon: Cloud,
    span: "md:col-span-2",
    github: "https://github.com/Juhamim",
    live: "#"
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="section-container relative z-10">
        <AnimatedSection className="mb-20 text-center">
          <span className="section-label">Projects</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-2">
            Featured <span className="text-primary font-display uppercase tracking-wider">Engineering Labs</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-lg font-comic tracking-wider">
            A showcase of systems engineered for scale, zero-trust security, and high performance.
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <AnimatedSection
                key={project.id}
                delay={i * 0.05}
                className={project.span}
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className="glass-card p-6 md:p-8 h-full flex flex-col justify-between group cursor-pointer hover:border-primary/20 transition-all duration-300"
                  style={{
                    "--shadow-color": project.color,
                  } as React.CSSProperties}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedProject(project)}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-10 h-10 flex items-center justify-center transition-colors"
                        style={{
                          background: `${project.color}15`,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        <Icon size={20} style={{ color: project.color }} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-text-dim uppercase">
                        {project.tech[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p
                      className="text-xs font-mono font-medium mb-4 uppercase tracking-wider"
                      style={{ color: project.color }}
                    >
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-text-muted leading-relaxed mb-6 font-comic tracking-wide">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Key Metrics preview */}
                    <div className="space-y-2 mb-6 border-t border-border pt-4">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                          <span className="text-xs text-text-muted font-mono">{m}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer link */}
                    <div
                      className="flex items-center gap-1.5 text-xs font-mono font-semibold transition-all group-hover:gap-2.5"
                      style={{ color: project.color }}
                    >
                      <span>Explore Case Study</span>
                      <ExternalLink size={12} />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="glass-card relative w-full max-w-lg bg-[#000000]/95 p-6 md:p-8 max-h-[85vh] overflow-y-auto border border-primary/40 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Title & Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: `${selectedProject.color}15`,
                    border: `1px solid ${selectedProject.color}25`,
                  }}
                >
                  {(() => {
                    const Icon = selectedProject.icon
                    return <Icon size={24} style={{ color: selectedProject.color }} />
                  })()}
                </div>
                <div>
                  <h3 className="font-display text-3xl uppercase tracking-wider text-white leading-tight">{selectedProject.title}</h3>
                  <span className="text-xs font-mono font-medium block mt-0.5" style={{ color: selectedProject.color }}>
                    {selectedProject.headline}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-4 text-sm text-text-muted leading-relaxed mb-6 font-comic tracking-wide">
                <p>{selectedProject.description}</p>
              </div>

              {/* Metrics Box */}
              <div className="p-4 bg-white/[0.02] border border-border mb-6">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-dim mb-3">
                  Impact &amp; Telemetry
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: selectedProject.color }} />
                      <span className="text-sm font-mono text-white">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-dim mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs font-medium border border-border bg-white/[0.02] text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs flex-1 py-3"
                >
                  <Github size={14} />
                  Code Repository
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-secondary text-xs flex-1 py-3"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
