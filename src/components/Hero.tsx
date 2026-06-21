"use client"

import { useEffect, useRef, useState } from "react"
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

  const [activeTab, setActiveTab] = useState<"stats" | "soc">("stats")
  const [logs, setLogs] = useState<string[]>([
    "SYSTEM: Initialization sequence complete. Monitoring active interfaces...",
    "AUDIT: Checking integrity of /sys/bin/auth... OK (SHA256 verified).",
    "IDS: Network audit started. Checking port 22, 80, 443, 8080..."
  ])
  const consoleEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll console
  useEffect(() => {
    if (activeTab === "soc") {
      consoleEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs, activeTab])

  // Interval to add mock logs
  useEffect(() => {
    const mockLogTemplates = [
      "IPS: Alert! Port scan detected from external IP 185.220.101.4.",
      "PLAYBOOK: Initiating firewall intrusion counter-measure playbook...",
      "FIREWALL: Blocking source IP 185.220.101.4 on WAN interface...",
      "FIREWALL: Port 22 rate-limiting rule applied: 3 requests/min max.",
      "IDS: Intrusion blocked. Threat level returned to 0.00%.",
      "SYSTEM: DB transaction logs audited. 0 anomalies detected.",
      "AUDIT: Checking TLS certificates... Valid until Sep 2026.",
      "SYSTEM: Automated patch check complete. All packages secure.",
      "IDS: DDoS threshold warning on WAN0. Packet count: 450/sec (limit 2000).",
      "PLAYBOOK: Rerouting suspicious packets to honey-pot...",
      "HONEYPOT: Connection telemetry logged from 92.223.109.112.",
      "SYSTEM: CPU load: 12.4%, Memory: 42.1%, Anomaly Score: 0.001.",
      "IDS: Scanning local Docker bridge interfaces... All containers secure."
    ]

    const interval = setInterval(() => {
      const nextLog = mockLogTemplates[Math.floor(Math.random() * mockLogTemplates.length)]
      const timeString = new Date().toLocaleTimeString()
      setLogs((prev) => [...prev.slice(-30), `[${timeString}] ${nextLog}`])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Manual Trigger functions
  const runAudit = () => {
    const timeString = new Date().toLocaleTimeString()
    setLogs((prev) => [
      ...prev,
      `[${timeString}] > Initiating manual system audit...`,
      `[${timeString}] AUDIT: Scanning cryptographic signatures...`,
      `[${timeString}] AUDIT: Verification SUCCESS. 0 modified system files.`
    ])
  }

  const strengthenFirewall = () => {
    const timeString = new Date().toLocaleTimeString()
    setLogs((prev) => [
      ...prev,
      `[${timeString}] > Triggering Zero-Trust firewall lockdown...`,
      `[${timeString}] FIREWALL: Enforcing TLS v1.3 strict mode...`,
      `[${timeString}] FIREWALL: System shields reinforced. Integrity score: 100%.`
    ])
  }

  const refreshSensor = () => {
    const timeString = new Date().toLocaleTimeString()
    setLogs((prev) => [
      ...prev,
      `[${timeString}] > Re-initializing IDS sensor networks...`,
      `[${timeString}] IDS: Honey-pots deployed on ports 21, 22, 80, 443.`,
      `[${timeString}] IDS: Operational. Listening for payloads...`
    ])
  }

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
            className="block w-full lg:max-w-md lg:ml-auto mt-12 lg:mt-0"
          >
            <div className="relative">
              {/* Main floating card */}
              <div
                className="glass-card p-6 md:p-8 animate-float border border-white/10"
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

                {/* Tabs toggler */}
                <div className="grid grid-cols-2 gap-2 mb-6 border border-white/10 p-1 bg-black/45">
                  <button
                    onClick={() => setActiveTab("stats")}
                    className={`py-2 px-3 text-xs font-mono uppercase font-black transition-all cursor-pointer ${
                      activeTab === "stats"
                        ? "bg-primary text-white border border-white/30"
                        : "text-text-muted hover:text-white bg-transparent"
                    }`}
                  >
                    [ STATS ]
                  </button>
                  <button
                    onClick={() => setActiveTab("soc")}
                    className={`py-2 px-3 text-xs font-mono uppercase font-black transition-all cursor-pointer ${
                      activeTab === "soc"
                        ? "bg-secondary text-black border border-white/30"
                        : "text-text-muted hover:text-white bg-transparent"
                    }`}
                  >
                    [ SOC CONSOLE ]
                  </button>
                </div>

                {/* Tab content */}
                {activeTab === "stats" ? (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
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
                  </motion.div>
                ) : (
                  <motion.div
                    key="soc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col space-y-4"
                  >
                    {/* Live Terminal Box */}
                    <div className="bg-black/90 border border-white/10 p-4 font-mono text-[10px] leading-relaxed h-52 overflow-y-auto relative">
                      <div className="absolute top-2 right-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] text-red-500 uppercase font-black">Live Feed</span>
                      </div>
                      
                      <div className="space-y-1.5 pr-8">
                        {logs.map((log, index) => {
                          let colorClass = "text-[#00ff66]" // default cyber green
                          if (log.includes("ALERT") || log.includes("IDS:") || log.includes("intrusion") || log.includes("Blocked")) {
                            colorClass = "text-[#ff0055]"
                          } else if (log.includes("PLAYBOOK:")) {
                            colorClass = "text-[#ff00ff]"
                          } else if (log.includes("FIREWALL:")) {
                            colorClass = "text-[#ff9900]"
                          } else if (log.includes("AUDIT:")) {
                            colorClass = "text-[#00f3ff]"
                          } else if (log.includes("SYSTEM:")) {
                            colorClass = "text-[#94a3b8]"
                          } else if (log.includes(">")) {
                            colorClass = "text-white font-bold"
                          }
                          return (
                            <div key={index} className={colorClass}>
                              {log}
                            </div>
                          )
                        })}
                        <div ref={consoleEndRef} />
                      </div>
                    </div>

                    {/* Manual Threat Playbooks */}
                    <div>
                      <p className="text-[10px] text-text-dim font-mono mb-2 uppercase tracking-widest font-black">Manual Threat Playbooks</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={runAudit}
                          className="px-2 py-2.5 text-[9px] font-mono font-black uppercase tracking-wider bg-black border border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer active:translate-y-0.5"
                        >
                          [ Audit ]
                        </button>
                        <button
                          onClick={strengthenFirewall}
                          className="px-2 py-2.5 text-[9px] font-mono font-black uppercase tracking-wider bg-black border border-white/20 text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black hover:border-[#ff00ff] transition-all cursor-pointer active:translate-y-0.5"
                        >
                          [ Secure ]
                        </button>
                        <button
                          onClick={refreshSensor}
                          className="px-2 py-2.5 text-[9px] font-mono font-black uppercase tracking-wider bg-black border border-white/20 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black hover:border-[#00f3ff] transition-all cursor-pointer active:translate-y-0.5"
                        >
                          [ Reboot ]
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
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
