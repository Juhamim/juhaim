"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, Download, Shield, Code, Cloud, Cpu } from "lucide-react"

const techBadges = [
  { label: "Python", color: "#e60000" },
  { label: "React", color: "#00f3ff" },
  { label: "Next.js", color: "#FFFFFF" },
  { label: "AWS", color: "#FF9900" },
  { label: "TypeScript", color: "#3178C6" },
  { label: "PostgreSQL", color: "#336791" },
]

const roleIcons = [
  { Icon: Shield, label: "Security" },
  { Icon: Code, label: "Full-Stack" },
  { Icon: Cloud, label: "Cloud" },
  { Icon: Cpu, label: "AI" },
]

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  // CSS-only mouse spotlight via custom properties
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.innerWidth < 768) return

    let lastTime = 0
    const onMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < 32) return
      lastTime = now
      const rect = hero.getBoundingClientRect()
      hero.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
      hero.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
    }
    hero.addEventListener("mousemove", onMove, { passive: true })
    return () => hero.removeEventListener("mousemove", onMove)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    }),
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-glow-primary" aria-hidden="true" />
      <div className="absolute inset-0 bg-glow-secondary" aria-hidden="true" />

      <div className="section-container relative z-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="badge badge-primary py-1 px-4 text-[9px] uppercase font-black">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse mr-1" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Hi, I&apos;m
              </h1>
              <div className="py-2">
                <span className="spider-hero-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl">Juhaim</span>
              </div>
              <p className="text-text-muted font-display text-xl sm:text-2xl tracking-widest uppercase">
                Mohammed M T
              </p>
            </motion.div>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base md:text-lg text-text-muted max-w-lg leading-relaxed font-comic tracking-wider"
            >
              Cybersecurity Engineer & Full-Stack Developer crafting{" "}
              <span className="text-white font-bold">AI-powered security solutions</span> and
              scalable platforms from Kerala, India.
            </motion.p>

            {/* Role badges */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              {roleIcons.map(({ Icon, label }) => (
                <span key={label} className="badge px-3.5 py-1.5 font-black uppercase text-[9px]">
                  <Icon size={12} className="text-secondary" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#projects"
                className="btn-primary shadow-[4px_4px_0px_#00f3ff] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                View Projects
                <ArrowRight size={16} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary shadow-[4px_4px_0px_#ff00ff] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                <Download size={16} />
                Resume
              </a>
              <a href="#contact" className="btn-ghost text-xs tracking-wider">
                <MessageSquare size={16} />
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Right: Floating Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main floating card */}
              <div
                className="glass-card p-8 animate-float border border-white/10"
                style={{
                  "--shadow-color": "#e60000",
                } as React.CSSProperties}
              >
                {/* Profile area */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent-magenta-dim border border-primary/30 flex items-center justify-center text-3xl font-display text-white">
                    JM
                  </div>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wider text-white">Juhaim Mohammed</h3>
                    <p className="text-xs font-mono text-text-muted uppercase tracking-widest mt-0.5">Cybersecurity × Full-Stack</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { value: "4+", label: "Projects" },
                    { value: "10K+", label: "Users" },
                    { value: "99.5%", label: "Uptime" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-3 bg-white/[0.02] border border-border">
                      <div className="text-2xl font-display text-primary leading-none">{stat.value}</div>
                      <div className="text-[9px] text-text-dim font-mono mt-1.5 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div>
                  <p className="text-[10px] text-text-dim font-mono mb-3 uppercase tracking-widest font-black">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techBadges.map((tech) => (
                      <span
                        key={tech.label}
                        className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider border border-border bg-white/[0.01] transition-colors hover:border-primary/40"
                        style={{ color: tech.color }}
                      >
                        {tech.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative floating badges */}
              <div className="absolute -top-4 -right-4 badge badge-primary py-1.5 px-3.5 text-[9px] font-black uppercase shadow-[3px_3px_0_black]">
                🔒 Secure by default
              </div>
              <div className="absolute -bottom-4 -left-4 badge badge-secondary py-1.5 px-3.5 text-[9px] font-black uppercase shadow-[3px_3px_0_black]">
                ⚡ Performance focused
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
