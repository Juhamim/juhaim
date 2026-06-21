"use client"

import { useRef, useEffect, ReactNode } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
  threshold?: number
  once?: boolean
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.15,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const hidden = {
    opacity: 0,
    ...(direction === "up" ? { y: 40 } : {}),
    ...(direction === "left" ? { x: -40 } : {}),
    ...(direction === "right" ? { x: 40 } : {}),
  }

  const visible = {
    opacity: 1, y: 0, x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{ hidden, visible }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
