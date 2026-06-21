"use client"

import AnimatedSection from "./AnimatedSection"
import { Bot, Rocket, Zap, Cloud, GraduationCap, Code } from "lucide-react"

const cards = [
  {
    icon: GraduationCap,
    label: "Student",
    title: "B.Tech CSE (Cybersecurity)",
    desc: "Final year Computer Science Engineering student specializing in Cybersecurity. Combining academic foundations with real-world building.",
    span: "md:col-span-2",
    color: "#e60000",
  },
  {
    icon: Code,
    label: "Developer",
    title: "Full-Stack Developer",
    desc: "Building scalable applications with React, Next.js, Python, and PostgreSQL. 10,000+ users trust my production systems.",
    span: "",
    color: "#00f3ff",
  },
  {
    icon: Bot,
    label: "AI Builder",
    title: "AI-Powered Solutions",
    desc: "Designing ML pipelines for threat detection that reduced false positives by 60% through behavioral analytics.",
    span: "",
    color: "#ff00ff",
  },
  {
    icon: Rocket,
    label: "Builder",
    title: "Scaling to 10K+ Users",
    desc: "Architected HerMindMate to serve 10,000+ monthly users with 99.5% uptime. Optimized load times by 40% using SSR and edge caching.",
    span: "",
    color: "#00f3ff",
  },
  {
    icon: Zap,
    label: "Automation",
    title: "SOC Automation",
    desc: "Engineered Python automation frameworks that cut incident response time by 60% through intelligent alert triage.",
    span: "",
    color: "#e60000",
  },
  {
    icon: Cloud,
    label: "Cloud",
    title: "Cloud-Native Architecture",
    desc: "Designing secure-by-default cloud systems using AWS, Supabase, and Cloudflare. Every decision starts with a threat model.",
    span: "md:col-span-2",
    color: "#ff00ff",
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="section-container">
        <AnimatedSection className="mb-12">
          <span className="section-label">About</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            From threat hunter to{" "}
            <span className="text-primary font-display uppercase tracking-wider">builder</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl text-lg font-comic tracking-wider">
            I&apos;m obsessed with one thing: building systems that are unbreakable.
            Every line of code I write begins with a threat model.
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <AnimatedSection
                key={card.title}
                delay={i * 0.05}
                className={card.span}
              >
                <div
                  className="glass-card p-6 md:p-8 h-full group hover:border-primary/20 transition-all duration-300 relative"
                  style={{
                    "--shadow-color": card.color,
                  } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center transition-colors"
                      style={{
                        background: `${card.color}15`,
                        border: `1px solid ${card.color}25`,
                      }}
                    >
                      <Icon size={20} style={{ color: card.color }} />
                    </div>
                    <span
                      className="text-[9px] font-mono font-black px-2.5 py-1 rounded-md uppercase"
                      style={{
                        color: card.color,
                        background: `${card.color}10`,
                      }}
                    >
                      {card.label}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed font-comic tracking-wide">{card.desc}</p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
