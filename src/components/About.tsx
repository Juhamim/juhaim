"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedSection from "./AnimatedSection"
import { useSound } from "@/lib/sounds"
import { Bot, Rocket, Zap, Cloud } from "lucide-react"

const iconsMap = {
  Bot: Bot,
  Rocket: Rocket,
  Zap: Zap,
  Cloud: Cloud,
}

function use3DTilt(strength = 8) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const rx = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -strength
      const ry = ((e.clientX - rect.left - rect.width / 2) / rect.width) * strength
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
    }
    const onLeave = () => {
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
    }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave) }
  }, [strength])
  return ref
}

const narrativePoints = [
  {
    iconName: "Bot" as const,
    tag: "AI_DETECTION // THREAT",
    title: "Threat Hunter",
    headline: "AI-Powered Threat Detection_",
    stat: "60%",
    statLabel: "False positive reduction",
    desc: "Built ML pipelines that learn attacker patterns. My ThreatHunter AI platform slashed false positives by 60% through log correlation and behavioral analytics.",
    color: "#e60000",
    shadowClass: "shadow-brutalist-red hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
    borderClass: "clipped-border-red",
  },
  {
    iconName: "Rocket" as const,
    tag: "SCALE // OPTIMIZATION",
    title: "Builder at Scale",
    headline: "Scaling to 10,000+ Users_",
    stat: "10K+",
    statLabel: "Monthly active users",
    desc: "Architected HerMindMate to serve 10,000+ monthly users with 99.5% uptime. Optimized load time by 40% using Next.js SSR and edge caching strategies.",
    color: "#00f3ff",
    shadowClass: "shadow-brutalist-cyan hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
    borderClass: "clipped-border-cyan",
  },
  {
    iconName: "Zap" as const,
    tag: "AUTOMATION // PIPELINES",
    title: "SOC Engineer",
    headline: "Automating Security Response_",
    stat: "60%",
    statLabel: "Faster incident response",
    desc: "Engineered Python automation frameworks that eliminate SOC fatigue. Intelligent alert triage and enrichment workflows free analysts for threat hunting.",
    color: "#ff00ff",
    shadowClass: "shadow-brutalist-magenta hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
    borderClass: "clipped-border-magenta",
  },
  {
    iconName: "Cloud" as const,
    tag: "CLOUD // SECURE_ARCH",
    title: "Cloud Architect",
    headline: "Cloud-Native Architecture_",
    stat: "4+",
    statLabel: "Production applications",
    desc: "Designing secure-by-default cloud systems using AWS, Supabase, and Cloudflare. Every architectural decision starts with a threat model.",
    color: "#ffffff",
    shadowClass: "shadow-brutalist-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
    borderClass: "clipped-border",
  },
]

function NarrativeCard({ item, index }: { item: typeof narrativePoints[0]; index: number }) {
  const ref = use3DTilt(6)
  const { play } = useSound()
  const isEven = index % 2 === 0
  const IconComponent = iconsMap[item.iconName]

  return (
    <AnimatedSection
      delay={index * 0.1}
      direction={isEven ? "left" : "right"}
    >
      <div
        ref={ref}
        className={`clipped-corner clipped-border ${item.borderClass} ${item.shadowClass} p-6 md:p-8 h-full bg-[#050507] border border-white/5 transition-all duration-200 cursor-pointer`}
        onMouseEnter={() => play("hover")}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 border border-white/10 flex items-center justify-center text-white"
              style={{ background: `${item.color}15`, borderColor: `${item.color}40` }}
            >
              <IconComponent size={20} style={{ color: item.color }} />
            </div>
            <div>
              <span
                className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 border font-bold"
                style={{ background: `${item.color}08`, color: item.color, borderColor: `${item.color}30` }}
              >
                {item.tag}
              </span>
            </div>
          </div>
          {/* Stat */}
          <div className="text-right">
            <div className="text-3xl font-black font-display tracking-tight" style={{ color: item.color }}>{item.stat}</div>
            <div className="text-[9px] text-text-secondary font-mono tracking-wider uppercase">{item.statLabel}</div>
          </div>
        </div>

        <h3 className="text-base md:text-lg font-black text-white mb-3 tracking-wider font-display">
          {item.headline}
        </h3>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">{item.desc}</p>

        {/* Bottom decorative bar */}
        <div
          className="mt-6 h-0.5 w-12"
          style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
        />
      </div>
    </AnimatedSection>
  )
}

export default function About() {
  const { play } = useSound()
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-cyber opacity-15" aria-hidden="true" />

      <div
        className="orb orb-red"
        style={{ width: 400, height: 400, top: "30%", left: "-10%", opacity: 0.1 }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section header */}
        <AnimatedSection className="text-center mb-20">
          <div className="section-title-wrap">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-brand-red font-black">
              ABOUT // DETAILS_
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            FROM <span className="text-brand-red glow-red">THREAT HUNTER</span> TO BUILDER_
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed font-mono">
            I am obsessed with one thing: <span className="text-white font-black">BUILDING SYSTEMS THAT ARE UNBREAKABLE.</span> Every line of code I write begins with a threat model.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-0.5 w-12 bg-white/20" />
            <div className="w-2 h-2 bg-brand-red glow-red animate-pulse" />
            <div className="h-0.5 w-12 bg-white/20" />
          </div>
        </AnimatedSection>

        {/* 2×2 narrative grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {narrativePoints.map((item, i) => (
            <NarrativeCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Quote */}
        <AnimatedSection delay={0.4} className="mt-20 text-center">
          <div className="inline-block px-8 py-5 border border-white/10 bg-white/[0.02] max-w-2xl mx-auto shadow-[3px_3px_0px_rgba(255,255,255,0.05)]">
            <p className="text-xs md:text-sm text-text-secondary italic leading-relaxed font-mono">
              "SECURITY IS NOT A PRODUCT, BUT A PROCESS — AND I BUILD BOTH."
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-6 h-px bg-brand-red/40" />
              <span className="text-[10px] font-mono tracking-widest text-brand-red font-bold uppercase">Juhaim Mohammed M T</span>
              <div className="w-6 h-px bg-brand-red/40" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
