"use client"

import { useEffect, useRef, useState } from "react"

interface ThreeDObject {
  x: number
  y: number
  z: number
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

const PALETTE = [
  "rgba(230,0,0,",
  "rgba(0,243,255,",
  "rgba(255,0,255,",
  "rgba(255,255,255,",
]

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Detect mobile
    const checkMobile = () => window.innerWidth < 768
    setIsMobile(checkMobile())

    let W = window.innerWidth, H = window.innerHeight
    let animId: number
    let mouse = { x: W / 2, y: H / 2 }
    let scrollYVal = 0
    let smoothScrollY = 0
    let lastScrollY = 0
    let scrollSpeed = 0
    let lastMouseMoveTime = 0
    let lastScrollTime = 0

    const isMobileDevice = checkMobile()
    const THROTTLE_DELAY = isMobileDevice ? 50 : 16
    const OBJECT_COUNT = isMobileDevice ? 12 : 30
    const STAR_COUNT = isMobileDevice ? 40 : 80

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseMoveTime < THROTTLE_DELAY) return
      lastMouseMoveTime = now
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime < THROTTLE_DELAY) return
      lastScrollTime = now
      scrollYVal = window.scrollY
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.0 + 0.2,
      alpha: Math.random() * 0.4 + 0.1,
      twinkleSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
    }))

    const blobs: Blob[] = isMobileDevice
      ? [
          {
            x: W * 0.5, y: H * 0.5, vx: 0.05, vy: 0.04,
            r: 200, color: "rgba(230,0,0,", opacity: 0.03,
            phase: 0, phaseSpeed: 0.001,
          },
        ]
      : [
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

    const pageHeightEstimate = 6000
    const objects: ThreeDObject[] = Array.from({ length: OBJECT_COUNT }, (_, i) => {
      const shapeType = Math.random() > 0.5 ? ("cube" as const) : ("pyramid" as const)
      return {
        x: Math.random() * (W - 200) + 100,
        y: (i / OBJECT_COUNT) * pageHeightEstimate + Math.random() * 200,
        z: Math.random() * 0.6 + 0.3,
        shape: shapeType,
        size: isMobileDevice ? Math.random() * 20 + 10 : Math.random() * 30 + 15,
        color: pick(),
        opacity: Math.random() * 0.14 + 0.04,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
      }
    })

    const project = (x: number, y: number, z: number, size: number) => {
      const focalLength = 300
      const scale = focalLength / (focalLength + z)
      return { x: x * scale, y: y * scale, scale }
    }

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
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ]

      ctx.beginPath()
      edges.forEach(([p1, p2]) => {
        ctx.moveTo(pts[p1].x, pts[p1].y)
        ctx.lineTo(pts[p2].x, pts[p2].y)
      })
      ctx.stroke()
    }

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

    let frameCount = 0
    const draw = () => {
      frameCount++
      const skip = isMobileDevice ? 2 : 1
      if (frameCount % skip !== 0) {
        animId = requestAnimationFrame(draw)
        return
      }

      smoothScrollY += (scrollYVal - smoothScrollY) * 0.08
      scrollSpeed = smoothScrollY - lastScrollY
      lastScrollY = smoothScrollY

      ctx.clearRect(0, 0, W, H)

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

      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed
        if (s.alpha > 0.6 || s.alpha < 0.1) s.twinkleSpeed *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.fill()
      })

      if (!isMobileDevice) {
        ctx.strokeStyle = "rgba(230, 0, 0, 0.03)"
        ctx.lineWidth = 0.5
        const gridY = H * 0.75
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const lineY = gridY + i * 25
          ctx.moveTo(0, lineY)
          ctx.lineTo(W, lineY)
        }
        const centerX = W / 2
        for (let i = -10; i <= 10; i++) {
          ctx.moveTo(centerX, gridY - 20)
          ctx.lineTo(centerX + i * 150, H)
        }
        ctx.stroke()
      }

      objects.forEach((obj) => {
        const screenY = obj.y - smoothScrollY
        if (screenY > -100 && screenY < H + 100) {
          const spinFactor = 1.0 + Math.abs(scrollSpeed) * 0.03
          obj.rotX += obj.rotSpeedX * spinFactor
          obj.rotY += obj.rotSpeedY * spinFactor
          obj.rotZ += 0.002 * spinFactor

          if (!isMobileDevice) {
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
          } else {
            if (obj.shape === "cube") {
              draw3DCube(obj, obj.x, screenY)
            } else {
              draw3DPyramid(obj, obj.x, screenY)
            }
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
