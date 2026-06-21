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

// 3D Rotating Canvas Threat Globe & Network Map
function CyberGlobe({ logs }: { logs: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = canvas.width = canvas.offsetWidth || 300
    let height = canvas.height = canvas.offsetHeight || 210

    // Fibonacci sphere distribution
    const numPoints = 80
    const points: { x: number; y: number; z: number }[] = []
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(1 - 2 * (i + 0.5) / numPoints)
      const phi = Math.sqrt(numPoints * Math.PI) * theta
      points.push({
        x: Math.sin(theta) * Math.cos(phi) * 65,
        y: Math.sin(theta) * Math.sin(phi) * 65,
        z: Math.cos(theta) * 65,
      })
    }

    // Active connection arcs
    interface Arc {
      startIdx: number
      endIdx: number
      progress: number
      speed: number
    }
    const arcs: Arc[] = []
    for (let i = 0; i < 4; i++) {
      arcs.push({
        startIdx: Math.floor(Math.random() * numPoints),
        endIdx: Math.floor(Math.random() * numPoints),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      })
    }

    let angleY = 0
    let angleX = 0.3

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width || 300
        height = canvas.height = entry.contentRect.height || 210
      }
    })
    resizeObserver.observe(canvas)

    const render = () => {
      // Semi-transparent background for long neon trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)"
      ctx.fillRect(0, 0, width, height)

      // Faint background radar ring
      ctx.strokeStyle = "rgba(0, 243, 255, 0.04)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 90, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(width / 2, height / 2, 45, 0, Math.PI * 2)
      ctx.stroke()

      angleY += 0.006
      angleX = 0.2 + Math.sin(angleY * 0.5) * 0.1

      const fov = 150
      const cx = width / 2
      const cy = height / 2

      // Project points to 2D
      const projected = points.map((p) => {
        // Y-axis rotation
        const x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY)
        const z1 = p.x * Math.sin(angleY) + p.z * Math.cos(angleY)
        
        // X-axis rotation
        const y2 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX)
        const z2 = p.y * Math.sin(angleX) + z1 * Math.cos(angleX)

        const scale = fov / (fov + z2 + 80)
        return {
          x: cx + x1 * scale * 1.5,
          y: cy + y2 * scale * 1.5,
          z: z2,
        }
      })

      // Draw cyber mesh lines (connect nearby points)
      ctx.lineWidth = 0.5
      for (let i = 0; i < numPoints; i++) {
        const p1 = projected[i]
        for (let j = i + 1; j < numPoints; j++) {
          const p2 = projected[j]
          
          // Compute 3D distance
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const dz = points[i].z - points[j].z
          const distSq = dx*dx + dy*dy + dz*dz
          
          if (distSq < 1300) { // connect close points
            const depthAlpha = Math.max(0.02, (65 - (p1.z + p2.z) / 2) / 130)
            ctx.strokeStyle = `rgba(0, 243, 255, ${depthAlpha * 0.45})`
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Draw attack paths (bezier arcs) and packet signals
      arcs.forEach((arc) => {
        const pStart = projected[arc.startIdx]
        const pEnd = projected[arc.endIdx]

        // Control point for arc height
        const midX = (pStart.x + pEnd.x) / 2
        const midY = (pStart.y + pEnd.y) / 2 - 35
        
        // Draw the trace arc path
        ctx.strokeStyle = "rgba(255, 0, 255, 0.08)"
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(pStart.x, pStart.y)
        ctx.quadraticCurveTo(midX, midY, pEnd.x, pEnd.y)
        ctx.stroke()

        // Draw the glowing signal particle
        const t = arc.progress
        const mt = 1 - t
        // Quadratic bezier interpolation: (1-t)^2 * p0 + 2*(1-t)*t * p1 + t^2 * p2
        const px = mt * mt * pStart.x + 2 * mt * t * midX + t * t * pEnd.x
        const py = mt * mt * pStart.y + 2 * mt * t * midY + t * t * pEnd.y
        
        const isFront = (pStart.z + pEnd.z) / 2 < 10
        ctx.fillStyle = isFront ? "#ff00ff" : "rgba(255, 0, 255, 0.4)"
        ctx.beginPath()
        ctx.arc(px, py, isFront ? 2.5 : 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Update arc progress
        arc.progress += arc.speed
        if (arc.progress >= 1) {
          arc.startIdx = Math.floor(Math.random() * numPoints)
          arc.endIdx = Math.floor(Math.random() * numPoints)
          arc.progress = 0
          arc.speed = 0.008 + Math.random() * 0.012
        }
      })

      // Draw rotating sphere nodes
      projected.forEach((p) => {
        // Dim points in background, highlight points in front
        const alpha = Math.max(0.1, (65 - p.z) / 130)
        ctx.fillStyle = p.z < 0 ? `rgba(0, 243, 255, ${alpha})` : `rgba(230, 0, 0, ${alpha * 0.7})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.z < 0 ? 1.8 : 1, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className="relative w-full h-[210px] overflow-hidden bg-black/95 border border-white/10 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Real-time floating log HUD overlays (auto-scrolling feed) */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 flex flex-col h-[75px] justify-end pointer-events-none">
        <div className="font-mono text-[8px] uppercase tracking-widest text-[#00f3ff]/40 mb-1 font-bold">
          [// THREAT_FEED_SCANNER]
        </div>
        <div className="overflow-hidden h-[36px] flex flex-col justify-end text-[8.5px] font-mono leading-tight space-y-0.5">
          {logs.slice(-3).map((log, idx) => {
            let color = "text-[#00ff66]" // default cyber green
            if (log.includes("ALERT") || log.includes("IDS:") || log.includes("intrusion") || log.includes("Blocked")) {
              color = "text-[#ff0055]"
            } else if (log.includes("PLAYBOOK:")) {
              color = "text-[#ff00ff]"
            } else if (log.includes("FIREWALL:")) {
              color = "text-[#ff9900]"
            } else if (log.includes("AUDIT:")) {
              color = "text-[#00f3ff]"
            } else if (log.includes("SYSTEM:")) {
              color = "text-[#94a3b8]"
            }
            // Strip timestamp from log display in overlays to fit width
            const cleanLog = log.replace(/^\[\d+:\d+:\d+ [AP]M\]\s*/i, "").replace(/^\[\d+:\d+:\d+\]\s*/i, "")
            return (
              <div key={idx} className={`${color} truncate opacity-90`}>
                &gt; {cleanLog}
              </div>
            )
          })}
        </div>
      </div>

      {/* Cyber radar scan overlay line */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
        <span className="text-[7.5px] font-mono font-bold tracking-widest text-red-500 uppercase">SYS_GRID // ONLINE</span>
      </div>
    </div>
  )
}

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
                    {/* Live 3D Radar Threat Globe */}
                    <CyberGlobe logs={logs} />

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
