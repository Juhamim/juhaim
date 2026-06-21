"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, GitBranch, Users, Zap, Shield } from "lucide-react"
import AnimatedSection from "./AnimatedSection"
import { useSound } from "@/lib/sounds"

const projects = [
  {
    id: "threathunter",
    title: "ThreatHunter AI",
    headline: "AI-Powered Security Operations Center",
    tagline: "Real-time threat detection. Intelligent alert correlation.",
    description:
      "Advanced SOC platform using ML to detect threats across enterprise environments. Reduced false positives by 60% through intelligent log analysis, behavioral pattern recognition, and automated alert triage.",
    metrics: ["60% false positive reduction", "Real-time dashboards", "AI-powered triage"],
    tech: ["Python", "TensorFlow", "React.js", "WebSocket", "PostgreSQL"],
    gradient: "#050507",
    accentGradient: "linear-gradient(135deg, #e60000, #ff00ff)",
    color: "#e60000",
    pattern: "cyber",
    icon: Shield,
  },
  {
    id: "hermindmate",
    title: "HerMindMate",
    headline: "Healthcare Wellness Platform",
    tagline: "Secure appointments. Trusted healthcare.",
    description:
      "Full-stack wellness platform connecting patients with care providers. Serves 10,000+ monthly users with secure, HIPAA-compliant architecture. 40% faster load times via edge caching and SSR optimization.",
    metrics: ["10,000+ monthly users", "99.5% uptime", "40% load time reduction"],
    tech: ["React.js", "Next.js", "PostgreSQL", "Razorpay", "AWS"],
    gradient: "#050507",
    accentGradient: "linear-gradient(135deg, #00f3ff, #ff00ff)",
    color: "#00f3ff",
    pattern: "health",
    icon: Users,
  },
  {
    id: "soc-bot",
    title: "SOC Automation Bot",
    headline: "Incident Response Automation",
    tagline: "AI-powered alert correlation and triage.",
    description:
      "Python automation framework that cuts manual alert processing by 60%. Implements intelligent workflows for alert enrichment, correlation, and automated playbook execution for faster incident response.",
    metrics: ["60% faster response time", "Automated triage", "Alert enrichment"],
    tech: ["Python", "Automation", "Security Orchestration", "REST APIs"],
    gradient: "#050507",
    accentGradient: "linear-gradient(135deg, #ff00ff, #e60000)",
    color: "#ff00ff",
    pattern: "terminal",
    icon: Zap,
  },
  {
    id: "cloud-print",
    title: "Cloud Printing System",
    headline: "Secure Cloud Document Management",
    tagline: "Upload. Manage. Print anywhere.",
    description:
      "Cloud-native document management platform with remote printing capabilities. Built with zero-trust architecture, Cloudflare R2 storage, and modern APIs for global scale and enterprise security.",
    metrics: ["Zero-trust printing", "Secure cloud storage", "Global scale"],
    tech: ["Next.js", "Cloudflare R2", "Cloud APIs", "TypeScript"],
    gradient: "#050507",
    accentGradient: "linear-gradient(135deg, #ffffff, #00f3ff)",
    color: "#ffffff",
    pattern: "cloud",
    icon: GitBranch,
  },
]

// Animated project background patterns
function ProjectPattern({ pattern, color }: { pattern: string; color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {pattern === "cyber" && (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 400 300">
            <path d="M0 50 H150 V100 H300 V50 H400" stroke={color} strokeWidth="1" fill="none" />
            <path d="M0 150 H80 V80 H200 V150 H350 V200 H400" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="150" cy="100" r="4" fill={color} />
            <circle cx="300" cy="50" r="3" fill={color} />
            <circle cx="200" cy="150" r="4" fill={color} />
          </svg>
          <div className="absolute inset-0 bg-grid-cyber-fine opacity-20" />
        </>
      )}
      {pattern === "health" && (
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${color} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${color} 0%, transparent 50%)`,
        }} />
      )}
      {pattern === "terminal" && (
        <div className="absolute inset-0 font-mono text-[7px] leading-3 p-3 overflow-hidden opacity-[0.07]" style={{ color }}>
          {`$ python soc_bot.py --mode auto\n[INFO] Connecting to SIEM...\n[INFO] Loading ML models...\n[ALERT] Threat detected: 192.168.1.105\n[AUTO] Blocking IP...\n[AUTO] Creating incident ticket...\n[INFO] Response time: 0.8s\n$ _`}
        </div>
      )}
      {pattern === "cloud" && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 400 300">
          <circle cx="200" cy="120" r="60" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="200" cy="120" r="90" stroke={color} strokeWidth="0.5" fill="none" />
          <line x1="200" y1="180" x2="200" y2="280" stroke={color} strokeWidth="1" />
        </svg>
      )}

      {/* Universal subtle bottom overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: `linear-gradient(to top, ${color}05, transparent)`,
        }}
      />
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { play } = useSound()
  const [isExpanded, setIsExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const rx = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -4
      const ry = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 4
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const onLeave = () => {
      el.style.transform = "perspective(1200px) rotateX(0) rotateY(0)"
    }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave) }
  }, [])

  const Icon = project.icon

  return (
    <>
      <AnimatedSection delay={index * 0.1}>
        <div
          ref={cardRef}
          onMouseEnter={() => { setHovered(true); play("hover") }}
          onMouseLeave={() => setHovered(false)}
          className="relative clipped-corner min-h-[440px] flex flex-col cursor-pointer bg-[#050507]/75 backdrop-blur-md border border-white/10 transition-all duration-300 group hover:translate-x-2 hover:translate-y-2"
          onClick={() => { setIsExpanded(true); play("chime") }}
          style={{
            boxShadow: hovered ? `0px 0px 0px ${project.color}` : `8px 8px 0px ${project.color}`,
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsExpanded(true)}
          aria-label={`View ${project.title} case study`}
        >
          <ProjectPattern pattern={project.pattern} color={project.color} />

          {/* Cyber corner brackets */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/20 transition-all duration-200" style={{ borderColor: hovered ? project.color : undefined }} />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/20 transition-all duration-200" style={{ borderColor: hovered ? project.color : undefined }} />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/20 transition-all duration-200" style={{ borderColor: hovered ? project.color : undefined }} />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/20 transition-all duration-200" style={{ borderColor: hovered ? project.color : undefined }} />

          {/* Dynamic grid texture overlay on hover */}
          <div className="absolute inset-0 bg-grid-cyber-fine opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none" />

          <div className="relative z-10 p-6 md:p-8 flex flex-col h-full flex-1">
            {/* Top: icon + tag */}
            <div className="flex items-center justify-between mb-6">
              <div
                className="w-10 h-10 border flex items-center justify-center text-white transition-colors duration-300"
                style={{
                  background: hovered ? `${project.color}18` : `${project.color}0c`,
                  borderColor: hovered ? project.color : `${project.color}35`,
                }}
              >
                <Icon size={20} style={{ color: project.color }} />
              </div>
              <div
                className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 border font-bold transition-colors duration-300"
                style={{
                  background: `${project.color}05`,
                  color: project.color,
                  borderColor: hovered ? project.color : `${project.color}20`,
                }}
              >
                {project.tech[0]}
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-lg md:text-xl font-black text-white mb-2 font-display tracking-wider transition-all duration-300"
              style={{ textShadow: hovered ? `0 0 20px ${project.color}35` : `0 0 10px ${project.color}15` }}
            >
              {project.title}
            </h3>
            <p className="text-xs mb-4 font-mono uppercase tracking-wide" style={{ color: project.color }}>
              {project.tagline}
            </p>

            {/* Description */}
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-6 flex-1 font-sans">
              {project.description}
            </p>

            {/* Metrics list */}
            <div className="space-y-2.5 mb-6 border-t border-white/5 pt-4">
              {project.metrics.map((m) => (
                <div key={m} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 flex-shrink-0"
                    style={{ background: project.color }}
                  />
                  <span className="text-[11px] font-mono tracking-wide uppercase text-text-secondary">{m}</span>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 border text-[9px] font-mono font-bold uppercase tracking-wider bg-black/40"
                  style={{
                    borderColor: `${project.color}25`,
                    color: project.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Click details */}
            <div
              className="flex items-center gap-2 text-xs font-black tracking-widest uppercase transition-all duration-300 group-hover:gap-3 font-display mt-auto pt-2"
              style={{ color: project.color }}
            >
              <span>CASE_STUDY // EXPLORE_</span>
              <ExternalLink size={12} />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Case Study Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="clipped-corner bg-black border p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
              style={{ borderColor: project.color }}
            >
              {/* Radial gradient background behind modal */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${project.color}, transparent 60%)`,
                }}
              />

              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 border flex items-center justify-center text-white"
                    style={{ background: `${project.color}15`, borderColor: `${project.color}35` }}
                  >
                    <Icon size={20} style={{ color: project.color }} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-black text-white font-display uppercase tracking-wider">{project.title}</h3>
                    <p className="text-xs font-mono uppercase tracking-wider mt-0.5" style={{ color: project.color }}>{project.headline}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsExpanded(false); play("click") }}
                  className="p-1.5 border border-white/10 hover:border-brand-red transition-colors text-text-secondary hover:text-white"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-6 relative z-10 font-sans">
                {project.description}
              </p>

              {/* Tech Stack list */}
              <div className="mb-6 relative z-10">
                <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-text-secondary mb-3">TECH_STACK // MODULES</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 border text-xs font-mono font-bold uppercase tracking-wider bg-black"
                      style={{
                        borderColor: `${project.color}25`,
                        color: project.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact Metrics box */}
              <div className="border border-white/10 bg-white/[0.01] p-5 mb-6 relative z-10 shadow-[2px_2px_0px_rgba(255,255,255,0.05)]">
                <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-text-secondary mb-3">IMPACT_METRICS // TELEMETRY</h4>
                <div className="space-y-3">
                  {project.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-3">
                      <div className="w-2 h-2" style={{ background: project.color }} />
                      <span className="text-xs text-white font-mono tracking-wide uppercase">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 relative z-10 pt-2">
                <button
                  className="flex-1 py-2.5 bg-brand-red border border-white/20 text-white font-black text-xs tracking-widest uppercase transition-all shadow-[3px_3px_0px_#00f3ff] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                  onClick={() => play("click")}
                >
                  EXPLORE // REPO_
                </button>
                <button
                  className="flex-1 py-2.5 border border-white/10 hover:border-white text-white font-black text-xs tracking-widest uppercase transition-colors"
                  onClick={() => { setIsExpanded(false); play("click") }}
                >
                  CLOSE_
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-grid-cyber opacity-10" aria-hidden="true" />
      <div
        className="orb orb-red"
        style={{ width: 500, height: 500, top: "20%", right: "-10%", opacity: 0.08 }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="section-title-wrap">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-brand-red font-black">
              PORTFOLIO // LABS_
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white font-display">
            FEATURED <span className="text-brand-red glow-red">PROJECTS_</span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-xl mx-auto font-mono">
            Real-world systems engineered to scale, secure, and automate operations.
          </p>
        </AnimatedSection>

        {/* 2x2 brutalist columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
