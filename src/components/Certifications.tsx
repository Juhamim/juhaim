"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedSection from "./AnimatedSection"
import { useSound } from "@/lib/sounds"
import { Cloud, Zap, Shield, Wrench, Cpu } from "lucide-react"

const iconsMap = {
  Cloud: Cloud,
  Zap: Zap,
  Shield: Shield,
  Wrench: Wrench,
  Cpu: Cpu,
}

const certifications = [
  {
    title: "Google Cloud Arcade Participant",
    category: "CLOUD // INFRA",
    iconName: "Cloud" as const,
    color: "#00f3ff",
    desc: "Hands-on cloud infrastructure, serverless operations, and system training modules.",
    year: "2024",
    borderClass: "clipped-border-cyan",
    shadowClass: "shadow-brutalist-cyan hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
  {
    title: "AWS Cloud Learning Programs",
    category: "AWS // ARCHITECTURE",
    iconName: "Zap" as const,
    color: "#ff00ff",
    desc: "Amazon Web Services cloud security, deployment architectures, and compute models.",
    year: "2024",
    borderClass: "clipped-border-magenta",
    shadowClass: "shadow-brutalist-magenta hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
  {
    title: "Cybersecurity Training & Workshops",
    category: "SECURITY // DEFENSE",
    iconName: "Shield" as const,
    color: "#e60000",
    desc: "Advanced vulnerability discovery, threat intelligence gathering, and packet triage.",
    year: "2024",
    borderClass: "clipped-border-red",
    shadowClass: "shadow-brutalist-red hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
  {
    title: "NSQF Certification (Field Tech)",
    category: "HARDWARE // SYSTEMS",
    iconName: "Wrench" as const,
    color: "#ffffff",
    desc: "National Skills Qualification Framework certified technician engineering standards.",
    year: "2023",
    borderClass: "clipped-border",
    shadowClass: "shadow-brutalist-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
  {
    title: "AI-Powered Security Solutions",
    category: "AI // OPERATIONS",
    iconName: "Cpu" as const,
    color: "#e60000",
    desc: "Designing ML classification models for anomalous event logs and automated response.",
    year: "2024",
    borderClass: "clipped-border-red",
    shadowClass: "shadow-brutalist-red hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
]

function CertificationCard({ cert, index }: { cert: typeof certifications[0]; index: number }) {
  const { play } = useSound()
  const [hovered, setHovered] = useState(false)
  const IconComponent = iconsMap[cert.iconName]

  return (
    <AnimatedSection delay={index * 0.08}>
      <div
        onMouseEnter={() => { setHovered(true); play("hover") }}
        onMouseLeave={() => setHovered(false)}
        className="relative p-6 h-full flex flex-col gap-5 bg-[#050507]/75 backdrop-blur-md border border-white transition-all duration-300 cursor-pointer hover:translate-x-2 hover:translate-y-2"
        style={{
          boxShadow: hovered ? `0px 0px 0px ${cert.color}` : `8px 8px 0px ${cert.color}`,
        }}
      >


        {/* Icon & badge */}
        <div className="flex items-center justify-between relative z-10">
          <div
            className="w-10 h-10 border flex items-center justify-center text-white"
            style={{
              background: `${cert.color}15`,
              borderColor: `${cert.color}40`,
            }}
          >
            <IconComponent size={18} style={{ color: cert.color }} />
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 border font-bold"
              style={{
                background: `${cert.color}08`,
                color: cert.color,
                borderColor: `${cert.color}20`,
              }}
            >
              {cert.category}
            </span>
            <span className="text-[10px] text-text-secondary font-mono font-bold">{cert.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative z-10">
          <h3 className="text-sm font-black text-white mb-2 leading-tight font-display tracking-wide">
            {cert.title}
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed font-sans">{cert.desc}</p>
        </div>

        {/* Verification telemetry */}
        <div className="flex items-center gap-2 border-t border-white/5 pt-3 relative z-10">
          <span className="w-2 h-2 bg-brand-red glow-red animate-pulse" />
          <span className="text-[9px] font-mono text-brand-red/80 uppercase tracking-widest font-black">
            SYSTEM_VERIFIED // SECURE_
          </span>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-grid-cyber-fine opacity-15" aria-hidden="true" />
      <div
        className="orb orb-red"
        style={{ width: 400, height: 400, top: "-10%", left: "-5%", opacity: 0.08 }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="section-title-wrap">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-brand-red font-black">
              CREDENTIALS // PROOF_
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white font-display">
            CERTIFICATIONS &amp; <span className="text-brand-red glow-red">RECOGNITION_</span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-xl mx-auto font-mono">
            Continuous system telemetry upgrades. Always compiling.
          </p>
        </AnimatedSection>

        {/* Grid layout for brutalist cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
