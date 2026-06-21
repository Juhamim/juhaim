"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useSound } from "@/lib/sounds"

const HERO_LETTERS_FIRST = "JUHAIM".split("")
const HERO_LETTERS_LAST = "MOHAMMED M T_".split("")

function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[1] top-0 left-0 w-[400px] h-[400px] rounded-full opacity-25 transition-transform duration-75"
      style={{
        background: "radial-gradient(circle, rgba(230,0,0,0.3) 0%, rgba(0,243,255,0.08) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
      aria-hidden="true"
    />
  )
}

// 3D tilt effect on mouse movement for the name card
function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const rx = ((e.clientY - cy) / rect.height) * -strength
      const ry = ((e.clientX - cx) / rect.width) * strength
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`
    }
    const onLeave = () => {
      el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)"
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [strength])

  return ref
}

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const tiltRef = useTilt(6)
  const { play } = useSound()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const onScroll = () => {
      const scrollY = window.scrollY
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
        parallaxRef.current.style.opacity = `${Math.max(1 - scrollY / 600, 0)}`
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.15}px)`
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [mounted])

  const letterVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: {
        delay: 0.3 + i * 0.07,
        duration: 0.8,
        type: "spring" as const,
        stiffness: 180,
        damping: 12,
      }
    })
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.8 }
    }
  }

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  }

  return (
    <>
      <MouseGlow />
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ zIndex: 1 }}
      >
        {/* Parallax background layers */}
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, willChange: "transform" }}
          aria-hidden="true"
        >
          {/* Ambient Orbs */}
          <div
            className="orb orb-red"
            style={{ width: 500, height: 500, top: "-10%", left: "10%", opacity: 0.25 }}
          />
          <div
            className="orb orb-magenta"
            style={{ width: 400, height: 400, bottom: "10%", right: "5%", opacity: 0.18 }}
          />
          <div
            className="orb orb-cyan"
            style={{ width: 300, height: 300, top: "40%", right: "25%", opacity: 0.15 }}
          />

          {/* Cyber grid overlays */}
          <div className="absolute inset-0 bg-grid-cyber-fine opacity-20" />
        </div>

        {/* Hero content - parallax mid-layer */}
        <div
          ref={parallaxRef}
          className="relative w-full"
          style={{ zIndex: 2, willChange: "transform, opacity" }}
        >
          <div className="section-container py-32 md:py-40">
            <div className="max-w-5xl mx-auto text-center">

              {/* Technical availability badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center gap-2 mb-8"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-black border border-white/20 shadow-[3px_3px_0px_#e60000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                  <span className="w-2.5 h-2.5 bg-brand-red glow-red animate-pulse" />
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white font-bold">
                    SYSTEM_STATUS // ONLINE_
                  </span>
                </div>
              </motion.div>

              {/* 3D tilt name card */}
              <div
                ref={tiltRef}
                className="mb-8 inline-block"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease" }}
              >
                {/* Name - First line (Juhaim) */}
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 overflow-visible">
                  {HERO_LETTERS_FIRST.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black tracking-tight leading-none text-brand-red glow-red inline-block font-display"
                      style={{ transformStyle: "preserve-3d" }}
                      onMouseEnter={() => play("hover")}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {/* Name - Second line (Mohammed M T) */}
                <div className="flex items-center justify-center gap-1.5 md:gap-2.5 overflow-visible flex-wrap">
                  {HERO_LETTERS_LAST.map((letter, i) => {
                    const isUnderscore = letter === "_"
                    return (
                      <motion.span
                        key={i}
                        custom={i + 6}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none inline-block font-display ${
                          isUnderscore
                            ? "text-brand-red glow-red animate-pulse"
                            : letter === " "
                            ? "w-4 md:w-6"
                            : "text-white"
                        }`}
                        onMouseEnter={() => play("hover")}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    )
                  })}
                </div>
              </div>

              {/* Subtitle & CTA */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Role tags */}
                <motion.div variants={slideUp} className="flex flex-wrap items-center justify-center gap-3">
                  {["Cybersecurity Engineer", "Full-Stack Developer", "Cloud Security Architect"].map((role, i) => (
                    <span key={role} className="flex items-center gap-3 font-mono">
                      <span className="text-xs md:text-sm text-text-secondary font-black tracking-widest uppercase">{role}</span>
                      {i < 2 && <span className="text-brand-red font-bold text-xs">//</span>}
                    </span>
                  ))}
                </motion.div>

                {/* Tagline */}
                <motion.div variants={slideUp} className="flex items-center justify-center gap-3">
                  <div className="font-mono text-sm md:text-base text-white/90 max-w-2xl leading-relaxed text-center bg-white/5 border border-white/10 px-6 py-3">
                    <span className="text-brand-red font-black">&gt; </span>
                    "Securing code. Building futures. Defending tomorrow's threats today."
                    <span className="cursor-blink" />
                  </div>
                </motion.div>

                {/* Geography details */}
                <motion.div variants={slideUp} className="flex justify-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-text-secondary font-mono tracking-widest uppercase">Kozhikode, Kerala</span>
                    <span className="w-1.5 h-1.5 bg-brand-red glow-red animate-pulse" />
                    <span className="text-xs text-text-secondary font-mono tracking-widest uppercase">India</span>
                  </div>
                </motion.div>

                {/* Brutalist CTA Buttons */}
                <motion.div
                  variants={slideUp}
                  className="flex flex-wrap items-center justify-center gap-6 pt-4"
                >
                  <a
                    href="#projects"
                    className="btn-brutalist-red"
                    onMouseEnter={() => play("hover")}
                    onClick={() => play("click")}
                  >
                    <span>Explore Work_</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="#contact"
                    className="btn-brutalist-ghost"
                    onMouseEnter={() => play("hover")}
                    onClick={() => play("click")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Get In Touch_</span>
                  </a>
                </motion.div>

                {/* Quick stats widgets with gaming lobby aesthetic */}
                <motion.div
                  variants={slideUp}
                  className="flex flex-wrap items-center justify-center gap-8 pt-8"
                >
                  {[
                    { label: "Selected Projects", value: "4+" },
                    { label: "Active Users Served", value: "10K+" },
                    { label: "Systems Uptime", value: "99.5%" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center px-4 py-2 border border-white/5 bg-white/[0.02] min-w-[140px] shadow-[2px_2px_0px_rgba(255,255,255,0.1)]">
                      <div className="text-2xl font-black text-brand-red glow-red font-display">{stat.value}</div>
                      <div className="text-[10px] text-text-secondary font-mono tracking-wider uppercase mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Brutalist scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 3 }}
        >
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-text-secondary">SCROLL // DOWN_</span>
          <div className="w-5 h-8 border border-white/30 flex items-start justify-center pt-1.5 bg-black">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-2 bg-brand-red glow-red"
            />
          </div>
        </motion.div>
      </section>
    </>
  )
}
