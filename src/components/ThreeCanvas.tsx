"use client"

import { useEffect, useRef } from "react"

interface ThreeDObject {
  x: number          // Absolute page X coordinate
  y: number          // Absolute page Y coordinate
  z: number          // Depth scaling factor
  shape: "cube" | "pyramid"
  size: number
  color: string
  opacity: number
  rotX: number
  rotY: number
  rotZ: number
  rotSpeedX: number
  rotSpeedY: number
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

// 3D rotation helper
function rotateX(x: number, y: number, z: number, angle: number) {
  const rad = angle
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  return { x, y: y * cos - z * sin, z: y * sin + z * cos }
}

function rotateY(x: number, y: number, z: number, angle: number) {
  const rad = angle
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  return { x: x * cos + z * sin, y, z: -x * sin + z * cos }
}

function rotateZ(x: number, y: number, z: number, angle: number) {
  const rad = angle
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  return { x: x * cos - y * sin, y: x * sin + y * cos, z }
}

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = window.innerWidth, H = window.innerHeight
    let animId: number
    let mouse = { x: W / 2, y: H / 2 }
    let scrollYVal = 0
    let smoothScrollY = 0
    let lastScrollY = 0
    let scrollSpeed = 0

    // Set canvas dimensions to viewport size (never document scrollHeight) to solve performance lag
    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleScroll = () => {
      scrollYVal = window.scrollY
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Generate stars fixed in viewport space
    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.0 + 0.2,
      alpha: Math.random() * 0.4 + 0.1,
      twinkleSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
    }))

    // Ambient floating glow blobs (fixed inside viewport but slowly moving)
    const blobs: Blob[] = [
      {
        x: W * 0.2, y: H * 0.3, vx: 0.1, vy: 0.08,
        r: 300, color: "rgba(230,0,0,", opacity: 0.05,
        phase: 0, phaseSpeed: 0.002,
      },
      {
        x: W * 0.8, y: H * 0.6, vx: -0.08, vy: 0.06,
        r: 260, color: "rgba(0,243,255,", opacity: 0.04,
        phase: Math.PI, phaseSpeed: 0.0015,
      },
    ]

    const pick = () => PALETTE[Math.floor(Math.random() * PALETTE.length)]

    // Create 3D objects distributed along the absolute page height
    const pageHeightEstimate = 6000
    const objects: ThreeDObject[] = Array.from({ length: 30 }, (_, i) => {
      const shapeType = Math.random() > 0.5 ? ("cube" as const) : ("pyramid" as const)
      return {
        x: Math.random() * (W - 200) + 100,
        // Distribute objects throughout the page height sections
        y: (i / 30) * pageHeightEstimate + Math.random() * 200,
        z: Math.random() * 0.6 + 0.3, // Depth: closer objects spin/move faster
        shape: shapeType,
        size: Math.random() * 30 + 15,
        color: pick(),
        opacity: Math.random() * 0.14 + 0.04,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
      }
    })

    // Project 3D coordinate to 2D screen coordinate
    const project = (x: number, y: number, z: number, size: number) => {
      const focalLength = 300
      const scale = focalLength / (focalLength + z)
      return {
        x: x * scale,
        y: y * scale,
        scale
      }
    }

    // Draw 3D Cube
    const draw3DCube = (obj: ThreeDObject, cx: number, cy: number) => {
      const s = obj.size
      const vertices = [
        { x: -s, y: -s, z: -s },
        { x: s, y: -s, z: -s },
        { x: s, y: s, z: -s },
        { x: -s, y: s, z: -s },
        { x: -s, y: -s, z: s },
        { x: s, y: -s, z: s },
        { x: s, y: s, z: s },
        { x: -s, y: s, z: s },
      ]

      // Apply rotations
      const rotated = vertices.map(v => {
        let r = rotateX(v.x, v.y, v.z, obj.rotX)
        r = rotateY(r.x, r.y, r.z, obj.rotY)
        r = rotateZ(r.x, r.y, r.z, obj.rotZ)
        return r
      })

      // Project vertices to screen
      const pts = rotated.map(v => {
        const proj = project(v.x, v.y, v.z + 100, s)
        return { x: cx + proj.x, y: cy + proj.y }
      })

      // Draw edges
      ctx.strokeStyle = obj.color + obj.opacity + ")"
      ctx.lineWidth = 0.8

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Back face
        [4, 5], [5, 6], [6, 7], [7, 4], // Front face
        [0, 4], [1, 5], [2, 6], [3, 7]  // Connector edges
      ]

      ctx.beginPath()
      edges.forEach(([p1, p2]) => {
        ctx.moveTo(pts[p1].x, pts[p1].y)
        ctx.lineTo(pts[p2].x, pts[p2].y)
      })
      ctx.stroke()
    }

    // Draw 3D Pyramid (Tetrahedron)
    const draw3DPyramid = (obj: ThreeDObject, cx: number, cy: number) => {
      const s = obj.size
      const vertices = [
        { x: 0, y: -s, z: 0 },
        { x: -s, y: s, z: -s },
        { x: s, y: s, z: -s },
        { x: 0, y: s, z: s },
      ]

      const rotated = vertices.map(v => {
        let r = rotateX(v.x, v.y, v.z, obj.rotX)
        r = rotateY(r.x, r.y, r.z, obj.rotY)
        r = rotateZ(r.x, r.y, r.z, obj.rotZ)
        return r
      })

      const pts = rotated.map(v => {
        const proj = project(v.x, v.y, v.z + 100, s)
        return { x: cx + proj.x, y: cy + proj.y }
      })

      ctx.strokeStyle = obj.color + obj.opacity + ")"
      ctx.lineWidth = 0.8

      const edges = [
        [0, 1], [0, 2], [0, 3],
        [1, 2], [2, 3], [3, 1]
      ]

      ctx.beginPath()
      edges.forEach(([p1, p2]) => {
        ctx.moveTo(pts[p1].x, pts[p1].y)
        ctx.lineTo(pts[p2].x, pts[p2].y)
      })
      ctx.stroke()
    }

    // Main render loop
    const draw = () => {
      // Lerp smooth scroll for elegant scrolling inertia
      smoothScrollY += (scrollYVal - smoothScrollY) * 0.08
      scrollSpeed = smoothScrollY - lastScrollY
      lastScrollY = smoothScrollY

      ctx.clearRect(0, 0, W, H)

      // 1. Ambient Background Glow Blobs
      blobs.forEach((b) => {
        b.phase += b.phaseSpeed
        const bx = b.x + Math.sin(b.phase) * 60
        const by = b.y + Math.cos(b.phase * 0.8) * 40
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r)
        grad.addColorStop(0, b.color + b.opacity + ")")
        grad.addColorStop(1, "transparent")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(bx, by, b.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // 2. Stars (static in background)
      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed
        if (s.alpha > 0.6 || s.alpha < 0.1) s.twinkleSpeed *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.fill()
      })

      // 3. Cyber grid lines at the bottom of the active viewport (depth perspective)
      ctx.strokeStyle = "rgba(230, 0, 0, 0.03)"
      ctx.lineWidth = 0.5
      const gridY = H * 0.75
      ctx.beginPath()
      // Horizontal lines
      for (let i = 0; i < 6; i++) {
        const lineY = gridY + i * 25
        ctx.moveTo(0, lineY)
        ctx.lineTo(W, lineY)
      }
      // Perspective perspective lines radiating from center
      const centerX = W / 2
      for (let i = -10; i <= 10; i++) {
        ctx.moveTo(centerX, gridY - 20)
        ctx.lineTo(centerX + i * 150, H)
      }
      ctx.stroke()

      // 4. Render 3D Objects with Scroll Velocity Interaction
      objects.forEach((obj) => {
        // Calculate coordinate in viewport space based on smoothScrollY
        const screenY = obj.y - smoothScrollY

        // Only draw if within viewport range (with 100px padding)
        if (screenY > -100 && screenY < H + 100) {
          // Increase rotation speed in response to scroll velocity (3D parallax scrolling)
          const spinFactor = 1.0 + Math.abs(scrollSpeed) * 0.05
          obj.rotX += obj.rotSpeedX * spinFactor
          obj.rotY += obj.rotSpeedY * spinFactor
          obj.rotZ += 0.002 * spinFactor

          // Subtle cursor tracking reaction
          const dx = mouse.x - obj.x
          const dy = mouse.y - screenY
          const dist = Math.sqrt(dx * dx + dy * dy)
          let offsetX = 0
          let offsetY = 0
          if (dist < 300) {
            const pull = (300 - dist) * 0.03 * obj.z
            offsetX = -(dx / dist) * pull
            offsetY = -(dy / dist) * pull
          }

          if (obj.shape === "cube") {
            draw3DCube(obj, obj.x + offsetX, screenY + offsetY)
          } else {
            draw3DPyramid(obj, obj.x + offsetX, screenY + offsetY)
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
