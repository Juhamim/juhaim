"use client"

import AnimatedSection from "./AnimatedSection"
import { GraduationCap, Code, ShieldAlert, Cloud } from "lucide-react"

const timelineEntries = [
  {
    date: "2024 - Present",
    title: "Threat Hunter & AI Tool Builder",
    company: "Personal & Open Source Projects",
    desc: "Engineered ThreatHunter AI and SOC Automation Bot, reducing alert response times by 60% and false positives by 60% through ML log analysis and automated playbook execution.",
    icon: ShieldAlert,
    color: "#e60000",
  },
  {
    date: "2023 - Present",
    title: "Full-Stack Developer & Scaling",
    company: "HerMindMate",
    desc: "Architected a HIPAA-compliant healthcare wellness platform connecting users with providers. Scaled to 10,000+ monthly active users with 99.5% uptime and optimized load times by 40%.",
    icon: Code,
    color: "#00f3ff",
  },
  {
    date: "2024",
    title: "Cloud & DevSecOps Practitioner",
    company: "AWS & Google Cloud Programs",
    desc: "Acquired certifications and practical training in cloud architecture, network security, and zero-trust systems. Implemented secure cloud-native architectures using Cloudflare R2 and AWS.",
    icon: Cloud,
    color: "#ff00ff",
  },
  {
    date: "2022 - Present",
    title: "B.Tech in CSE (Cybersecurity)",
    company: "Engineering University",
    desc: "Final year Computer Science Engineering student specializing in cybersecurity. Blending theoretical foundations of network security, cryptography, and operating systems with practical development.",
    icon: GraduationCap,
    color: "#00f3ff",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSection className="mb-20 text-center">
          <span className="section-label">Experience</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-2">
            My Journey &amp; <span className="text-primary font-display uppercase tracking-wider">Timeline</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-lg font-comic tracking-wider">
            A chronological timeline of my academic background, developer building, and cybersecurity initiatives.
          </p>
        </AnimatedSection>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEntries.map((entry, i) => {
              const Icon = entry.icon
              const isEven = i % 2 === 0
              return (
                <div key={i} className={`flex flex-col md:flex-row items-stretch ${isEven ? "md:flex-row-reverse" : ""}`}>
                  {/* Left/Right space taker on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Icon Node in the Center */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-bg-deep border-2 border-border flex items-center justify-center -translate-x-1/2 z-10 transition-colors">
                    <Icon size={16} style={{ color: entry.color }} />
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <AnimatedSection delay={i * 0.1}>
                      <div
                        className="glass-card p-6 md:p-8 hover:border-primary/20 transition-all duration-300 relative group"
                        style={{
                          "--shadow-color": entry.color,
                        } as React.CSSProperties}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <span
                            className="text-[9px] font-mono font-black px-2.5 py-1 rounded-md uppercase"
                            style={{
                              color: entry.color,
                              background: `${entry.color}10`,
                              border: `1px solid ${entry.color}20`,
                            }}
                          >
                            {entry.date}
                          </span>
                          <span className="text-xs text-text-dim font-mono">{entry.company}</span>
                        </div>

                        <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-2 group-hover:text-primary transition-colors">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed font-comic tracking-wide">
                          {entry.desc}
                        </p>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
