"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import AnimatedSection from "./AnimatedSection"
import { useSound } from "@/lib/sounds"
import { Shield, Terminal, Server, Network } from "lucide-react"

const iconsMap = {
  Shield: Shield,
  Terminal: Terminal,
  Server: Server,
  Network: Network,
}

function use3DTiltBadge() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const rx = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -12
      const ry = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 12
      el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.08)`
    }
    const onLeave = () => {
      el.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)"
    }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])
  return ref
}

const skillCategories = [
  {
    id: "cyber",
    title: "Cybersecurity",
    label: "CRITICAL // CORE",
    iconName: "Shield" as const,
    color: "#e60000",
    shadowClass: "shadow-brutalist-red hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
    borderClass: "clipped-border-red",
    skills: [
      "Threat Detection", "Vulnerability Assessment", "Penetration Testing",
      "Incident Response", "SOC Concepts", "Log Analysis",
      "Digital Forensics", "Cryptography", "Security Auditing",
    ],
  },
  {
    id: "dev",
    title: "Development",
    label: "FULL-STACK // SYSTEMS",
    iconName: "Terminal" as const,
    color: "#ff00ff",
    shadowClass: "shadow-brutalist-magenta hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
    borderClass: "clipped-border-magenta",
    skills: [
      "React.js", "Next.js", "JavaScript", "Python",
      "PostgreSQL", "REST APIs", "Full-Stack Development",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    label: "DEVOPS // CLOUD_SEC",
    iconName: "Server" as const,
    color: "#00f3ff",
    shadowClass: "shadow-brutalist-cyan hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
    borderClass: "clipped-border-cyan",
    skills: [
      "AWS", "Cloud Security", "DevSecOps", "Linux Administration",
      "Cloudflare R2", "Supabase", "Vercel", "Git",
    ],
  },
  {
    id: "net",
    title: "Networking",
    label: "PROTOCOLS // ANALYSIS",
    iconName: "Network" as const,
    color: "#ffffff",
    shadowClass: "shadow-brutalist-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
    borderClass: "clipped-border",
    skills: [
      "TCP/IP", "DNS", "Packet Analysis",
      "Wireshark", "Nmap", "Network Monitoring",
    ],
  },
]

function SkillBadge({ skill, color, delay }: { skill: string; color: string; delay: number }) {
  const ref = use3DTiltBadge()
  const { play } = useSound()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
      viewport={{ once: true }}
      onMouseEnter={() => { setHovered(true); play("hover") }}
      onMouseLeave={() => setHovered(false)}
      className="clipped-corner-sm border px-3.5 py-2 text-xs font-mono font-black uppercase tracking-wider bg-black cursor-default transition-all duration-200"
      style={{
        color: hovered ? color : "rgba(255,255,255,0.85)",
        borderColor: hovered ? color : "rgba(255,255,255,0.12)",
        boxShadow: hovered ? `0 0 15px ${color}40` : "none",
      }}
    >
      {skill}
    </motion.div>
  )
}

function SkillCategoryCard({ cat, catIdx }: { cat: typeof skillCategories[0]; catIdx: number }) {
  const { play } = useSound()
  const [hovered, setHovered] = useState(false)
  const IconComponent = iconsMap[cat.iconName]

  return (
    <AnimatedSection
      key={cat.id}
      delay={catIdx * 0.08}
      direction={catIdx % 2 === 0 ? "left" : "right"}
    >
      <div
        className={`relative clipped-corner clipped-border ${cat.borderClass} p-6 md:p-8 h-full bg-[#050507]/75 backdrop-blur-md border border-white/5 transition-all duration-300 cursor-pointer hover:translate-x-2 hover:translate-y-2`}
        onMouseEnter={() => {
          setHovered(true)
          play("hover")
        }}
        onMouseLeave={() => setHovered(false)}
        style={{
          boxShadow: hovered ? `0px 0px 0px ${cat.color}` : `8px 8px 0px ${cat.color}`,
        }}
      >
        {/* Dynamic scanline pattern overlay on hover */}
        <div className="absolute inset-0 bg-grid-cyber-fine opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

        {/* Cyber corner brackets */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/20 transition-all duration-200" style={{ borderColor: hovered ? cat.color : undefined }} />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/20 transition-all duration-200" style={{ borderColor: hovered ? cat.color : undefined }} />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/20 transition-all duration-200" style={{ borderColor: hovered ? cat.color : undefined }} />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/20 transition-all duration-200" style={{ borderColor: hovered ? cat.color : undefined }} />

        {/* Category Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 border flex items-center justify-center text-white"
              style={{
                background: `${cat.color}15`,
                borderColor: `${cat.color}40`,
              }}
            >
              <IconComponent size={20} style={{ color: cat.color }} />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-wider uppercase text-white font-display">{cat.title}</h3>
              <span
                className="text-[9px] font-mono tracking-[0.15em] uppercase font-bold"
                style={{ color: cat.color }}
              >
                {cat.label}
              </span>
            </div>
          </div>
          <div
            className="text-[10px] font-mono px-3 py-1 border"
            style={{
              background: `${cat.color}08`,
              color: cat.color,
              borderColor: `${cat.color}25`,
            }}
          >
            {cat.skills.length} MODULES
          </div>
        </div>

        {/* Skill Badges Wrapper */}
        <div className="flex flex-wrap gap-2.5 relative z-10">
          {cat.skills.map((skill, skillIdx) => (
            <SkillBadge
              key={skill}
              skill={skill}
              color={cat.color}
              delay={catIdx * 0.04 + skillIdx * 0.03}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-15" aria-hidden="true" />
      <div
        className="orb orb-magenta"
        style={{ width: 500, height: 500, bottom: "-10%", right: "-5%", opacity: 0.08 }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="section-title-wrap">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-brand-red font-black">
              EXPERTISE // STACK_
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
            SKILLS &amp; <span className="text-brand-red glow-red">TOOLING_</span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-xl mx-auto font-mono">
            A full-spectrum offensive, defensive, and engineering arsenal.
          </p>
        </AnimatedSection>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((cat, catIdx) => (
            <SkillCategoryCard key={cat.id} cat={cat} catIdx={catIdx} />
          ))}
        </div>
      </div>
    </section>
  )
}
