"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768

    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: isMobile ? 0.85 : 0.95,
      touchMultiplier: isMobile ? 1.5 : 1.8,
    })

    let animId: number
    let lastTime = 0
    function raf(time: number) {
      if (time - lastTime >= 16) {
        lenis.raf(time)
        lastTime = time
      }
      animId = requestAnimationFrame(raf)
    }
    animId = requestAnimationFrame(raf)

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")
      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        const targetId = anchor.getAttribute("href")?.slice(1)
        if (targetId) {
          const el = document.getElementById(targetId)
          if (el) {
            e.preventDefault()
            lenis.scrollTo(el, { offset: isMobile ? -60 : -80 })
          }
        }
      }
    }
    document.addEventListener("click", handleAnchorClick)

    return () => {
      cancelAnimationFrame(animId)
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}
