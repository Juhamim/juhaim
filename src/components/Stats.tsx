"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import AnimatedSection from "./AnimatedSection"
import { useSound } from "@/lib/sounds"
import { Rocket, Users, Activity, ShieldAlert, Zap } from "lucide-react"

const iconsMap = {
  Rocket: Rocket,
  Users: Users,
  Activity: Activity,
  ShieldAlert: ShieldAlert,
  Zap: Zap,
}

const stats = [
  {
    value: 4, suffix: "+", label: "Production Apps",
    iconName: "Rocket" as const, color: "#e60000", desc: "Deployed & live",
    borderClass: "clipped-border-red", shadowClass: "shadow-brutalist-red hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
  {
    value: 10000, suffix: "+", label: "Active Users",
    iconName: "Users" as const, color: "#00f3ff", desc: "Trusting my systems",
    borderClass: "clipped-border-cyan", shadowClass: "shadow-brutalist-cyan hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
  {
    value: 99.5, suffix: "%", label: "Uptime Rate",
    decimals: 1, iconName: "Activity" as const, color: "#ff00ff", desc: "Solid reliability",
    borderClass: "clipped-border-magenta", shadowClass: "shadow-brutalist-magenta hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
  {
    value: 60, suffix: "%", label: "Alert Triage",
    iconName: "ShieldAlert" as const, color: "#ffffff", desc: "Automated pipelines",
    borderClass: "clipped-border", shadowClass: "shadow-brutalist-white hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
  {
    value: 40, suffix: "%", label: "UX Load Optimization",
    iconName: "Zap" as const, color: "#e60000", desc: "SSR edge caching",
    borderClass: "clipped-border-red", shadowClass: "shadow-brutalist-red hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
  },
]

function AnimatedCounter({
  value, suffix, decimals = 0, color, isRunning
}: {
  value: number; suffix: string; decimals?: number; color: string; isRunning: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isRunning) return
    const duration = 1500
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress) * Math.cos(progress * Math.PI)
      setCount(eased * value)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isRunning, value])

  const displayValue = count >= 1000
    ? (count / 1000).toFixed(1) + "K"
    : count.toFixed(decimals)

  return (
    <span
      className="tabular-nums font-black text-3xl sm:text-4xl md:text-5xl font-display"
      style={{ color, textShadow: `0 0 20px ${color}35` }}
    >
      {displayValue}{suffix}
    </span>
  )
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { play } = useSound()
  const [started, setStarted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const IconComponent = iconsMap[stat.iconName]

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true)
      play("scan")
    }
  }, [isInView, started, play])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.6, type: "spring", stiffness: 150, damping: 15 }}
      viewport={{ once: true }}
      onMouseEnter={() => { setHovered(true); play("hover") }}
      onMouseLeave={() => setHovered(false)}
      className={`relative clipped-corner clipped-border ${stat.borderClass} p-5 text-center bg-[#050507]/75 backdrop-blur-md border border-white/5 transition-all duration-300 cursor-pointer hover:translate-x-1.5 hover:translate-y-1.5`}
      style={{
        boxShadow: hovered ? `0px 0px 0px ${stat.color}` : `6px 6px 0px ${stat.color}`,
      }}
    >
      {/* Cyber corner brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 transition-all duration-200" style={{ borderColor: hovered ? stat.color : undefined }} />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/20 transition-all duration-200" style={{ borderColor: hovered ? stat.color : undefined }} />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/20 transition-all duration-200" style={{ borderColor: hovered ? stat.color : undefined }} />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 transition-all duration-200" style={{ borderColor: hovered ? stat.color : undefined }} />

      {/* Icon */}
      <div className="flex justify-center mb-4 text-white relative z-10">
        <IconComponent size={20} style={{ color: stat.color }} />
      </div>

      {/* Counter */}
      <div className="relative z-10">
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          decimals={stat.decimals}
          color={stat.color}
          isRunning={started}
        />
      </div>

      {/* Label */}
      <div className="mt-4 relative z-10">
        <p className="text-xs font-black tracking-wide uppercase text-white font-display">{stat.label}</p>
        <p className="text-[10px] text-text-secondary font-mono tracking-wider uppercase mt-1">{stat.desc}</p>
      </div>

      {/* Bottom decorative glow bar */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-500"
        style={{
          width: started ? "60%" : "0%",
          background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
        }}
      />
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="relative py-24 md:py-28 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-grid-cyber opacity-10" aria-hidden="true" />
      <div
        className="orb orb-cyan"
        style={{ width: 600, height: 300, top: "0", left: "20%", opacity: 0.08 }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="section-title-wrap">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-brand-red font-black">
              IMPACT // METRICS_
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            BY THE <span className="text-brand-red glow-red">NUMBERS_</span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-lg mx-auto font-mono">
            Validated telemetry from active production servers.
          </p>
        </AnimatedSection>

        {/* Responsive Grid layout for brutalist columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
