"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
    })

    // Setup RequestAnimationFrame loop
    let animId: number
    function raf(time: number) {
      lenis.raf(time)
      animId = requestAnimationFrame(raf)
    }
    animId = requestAnimationFrame(raf)

    // Ensure scrolling behaves well with anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")
      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        const targetId = anchor.getAttribute("href")?.slice(1)
        if (targetId) {
          const el = document.getElementById(targetId)
          if (el) {
            e.preventDefault()
            lenis.scrollTo(el, { offset: -80 })
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
