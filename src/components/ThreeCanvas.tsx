"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number; y: number; vx: number; vy: number
  r: number; alpha: number; color: string; pulse: number; pulseSpeed: number
}
interface Cube {
  x: number; y: number; z: number; rotX: number; rotY: number; size: number
  speed: number; color: string; opacity: number
}
interface Star {
  x: number; y: number; r: number; alpha: number; twinkleSpeed: number
}
interface Blob {
  x: number; y: number; vx: number; vy: number; r: number
  color: string; opacity: number; phase: number; phaseSpeed: number
}

// Chill Pill theme palette: Brand Red, Neon Cyan, Neon Magenta, and Pure White
const PALETTE = [
  "rgba(230,0,0,",    // Brand Red
  "rgba(0,243,255,",  // Neon Cyan
  "rgba(255,0,255,",  // Neon Magenta
  "rgba(255,255,255,",// White
]

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = window.innerWidth, H = document.body.scrollHeight || window.innerHeight
    let animId: number
    let mouse = { x: W / 2, y: H / 2 }

    const resize = () => {
      W = window.innerWidth
      H = Math.max(document.body.scrollHeight, window.innerHeight)
      canvas.width = W
      canvas.height = H
    }
    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY + window.scrollY })

    // Stars (Subtle background details)
    const stars: Star[] = Array.from({ length: 160 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: (Math.random() * 0.012 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
    }))

    // Particles (Cyberpunk network theme)
    const pick = () => PALETTE[Math.floor(Math.random() * PALETTE.length)]
    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.15,
      color: pick(),
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    }))

    // Pseudo-3D wireframe cubes
    const cubes: Cube[] = Array.from({ length: 14 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      z: Math.random() * 0.6 + 0.2,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      size: Math.random() * 28 + 14,
      speed: (Math.random() - 0.5) * 0.3,
      color: pick(),
      opacity: Math.random() * 0.12 + 0.04,
    }))

    // Ambient floating glow blobs (Slow cyberpunk mood setting)
    const blobs: Blob[] = [
      {
        x: W * 0.15, y: H * 0.25, vx: 0.18, vy: 0.12,
        r: 320, color: "rgba(230,0,0,", opacity: 0.06,
        phase: 0, phaseSpeed: 0.004,
      },
      {
        x: W * 0.85, y: H * 0.45, vx: -0.14, vy: 0.1,
        r: 280, color: "rgba(0,243,255,", opacity: 0.05,
        phase: Math.PI, phaseSpeed: 0.003,
      },
      {
        x: W * 0.5, y: H * 0.75, vx: 0.1, vy: -0.16,
        r: 240, color: "rgba(255,0,255,", opacity: 0.05,
        phase: Math.PI / 2, phaseSpeed: 0.005,
      },
    ]

    const drawCube = (c: Cube, t: number) => {
      const cx = c.x + Math.sin(t * 0.00045 + c.rotX) * 30
      const cy = c.y + Math.cos(t * 0.0004 + c.rotY) * 22
      const s = c.size * c.z
      const rx = Math.sin(t * 0.0006 + c.rotX) * Math.PI
      const ry = Math.cos(t * 0.0005 + c.rotY) * Math.PI
      const ox = Math.cos(ry) * s * 0.5
      const oy = Math.sin(rx) * s * 0.5

      ctx.save()
      ctx.strokeStyle = c.color + c.opacity + ")"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.rect(cx - s / 2, cy - s / 2, s, s)
      ctx.stroke()
      ctx.beginPath()
      ctx.rect(cx - s / 2 + ox, cy - s / 2 - oy, s, s)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx - s / 2, cy - s / 2)
      ctx.lineTo(cx - s / 2 + ox, cy - s / 2 - oy)
      ctx.moveTo(cx + s / 2, cy - s / 2)
      ctx.lineTo(cx + s / 2 + ox, cy - s / 2 - oy)
      ctx.moveTo(cx + s / 2, cy + s / 2)
      ctx.lineTo(cx + s / 2 + ox, cy + s / 2 - oy)
      ctx.moveTo(cx - s / 2, cy + s / 2)
      ctx.lineTo(cx - s / 2 + ox, cy + s / 2 - oy)
      ctx.stroke()
      ctx.restore()
    }

    let t = 0
    const draw = () => {
      t++
      ctx.clearRect(0, 0, W, H)

      // Ambient blobs (slow oscillation)
      blobs.forEach((b) => {
        b.phase += b.phaseSpeed
        const bx = b.x + Math.sin(b.phase) * 120
        const by = b.y + Math.cos(b.phase * 0.7) * 80
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r)
        grad.addColorStop(0, b.color + b.opacity + ")")
        grad.addColorStop(1, "transparent")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(bx, by, b.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Stars
      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed
        if (s.alpha > 0.7 || s.alpha < 0.05) s.twinkleSpeed *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.fill()
      })

      // Cubes
      cubes.forEach((c) => {
        c.rotX += c.speed * 0.008
        c.rotY += c.speed * 0.006
        drawCube(c, t)
      })

      // Particles with mouse interaction
      const CONNECT_DIST = 130
      particles.forEach((p, i) => {
        p.pulse += p.pulseSpeed
        p.alpha = 0.15 + Math.sin(p.pulse) * 0.25
        const scrollY = window.scrollY
        const dx = mouse.x - p.x, dy = (mouse.y - scrollY) - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          p.vx += dx * 0.000025
          p.vy += dy * 0.000025
        }
        p.vx *= 0.985; p.vy *= 0.985
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5)
        glow.addColorStop(0, p.color + p.alpha + ")")
        glow.addColorStop(1, "transparent")
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = glow; ctx.fill()

        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.min(p.alpha * 2, 1) + ")"
        ctx.fill()

        // Connections (cyber lines using brand red)
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j]
          const ex = p.x - o.x, ey = p.y - o.y
          const d = Math.sqrt(ex * ex + ey * ey)
          if (d < CONNECT_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y)
            ctx.strokeStyle = `rgba(230,0,0,${((CONNECT_DIST - d) / CONNECT_DIST) * 0.15})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
