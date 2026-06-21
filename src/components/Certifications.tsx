"use client"

import AnimatedSection from "./AnimatedSection"
import { Cloud, Zap, Shield, Wrench, Cpu, CheckCircle } from "lucide-react"

const certifications = [
  {
    title: "Google Cloud Arcade Participant",
    category: "Cloud Infrastructure",
    icon: Cloud,
    color: "#00f3ff",
    desc: "Hands-on cloud architecture, deployment, serverless operations, and system training labs.",
    year: "2024",
  },
  {
    title: "AWS Cloud Learning Programs",
    category: "Cloud Security & Architecture",
    icon: Zap,
    color: "#e60000",
    desc: "Amazon Web Services security mechanisms, deployment models, database optimization, and cloud architecture design.",
    year: "2024",
  },
  {
    title: "Cybersecurity Training & Workshops",
    category: "Security Operations",
    icon: Shield,
    color: "#e60000",
    desc: "Vulnerability analysis, threat intelligence gathering, penetration testing methodologies, and network traffic forensics.",
    year: "2024",
  },
  {
    title: "AI-Powered Security Solutions",
    category: "AI & Log Auditing",
    icon: Cpu,
    color: "#ff00ff",
    desc: "Designed and trained ML classification models for anomaly detection and automated alert triage across system log events.",
    year: "2024",
  },
  {
    title: "NSQF Certification (Field Tech)",
    category: "Systems & Hardware",
    icon: Wrench,
    color: "#00f3ff",
    desc: "National Skills Qualification Framework standards for hardware systems maintenance, network troubleshooting, and field service.",
    year: "2023",
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSection className="mb-20 text-center">
          <span className="section-label">Credentials</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-2">
            Certifications &amp; <span className="text-primary font-display uppercase tracking-wider">Recognition</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-lg font-comic tracking-wider">
            Professional verification and structured training in cloud systems, security operations, and developer toolkits.
          </p>
        </AnimatedSection>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, i) => {
            const Icon = cert.icon
            return (
              <AnimatedSection key={cert.title} delay={i * 0.05}>
                <div
                  className="glass-card p-6 md:p-8 h-full flex flex-col justify-between group hover:border-primary/20 transition-all duration-300"
                  style={{
                    "--shadow-color": cert.color,
                  } as React.CSSProperties}
                >
                  <div>
                    {/* Icon & Category Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-10 h-10 flex items-center justify-center transition-colors"
                        style={{
                          background: `${cert.color}15`,
                          border: `1px solid ${cert.color}25`,
                        }}
                      >
                        <Icon size={20} style={{ color: cert.color }} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-text-dim uppercase">
                        {cert.year}
                      </span>
                    </div>

                    {/* Content */}
                    <span
                      className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md mb-3 inline-block"
                      style={{
                        color: cert.color,
                        background: `${cert.color}10`,
                        border: `1px solid ${cert.color}20`,
                      }}
                    >
                      {cert.category}
                    </span>
                    <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-6 font-comic tracking-wide">
                      {cert.desc}
                    </p>
                  </div>

                  {/* Verification footer */}
                  <div className="flex items-center gap-2 border-t border-border pt-4 mt-auto">
                    <CheckCircle size={14} className="text-primary opacity-80" />
                    <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                      Verified Credential
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
