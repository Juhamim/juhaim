"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useSound } from "@/lib/sounds"

const HERO_LETTERS_FIRST = "JUHAIM".split("")
const HERO_LETTERS_LAST = "MOHAMMED M T_".split("")

function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    if (isMobile) return

    let lastTime = 0
    const onMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < 16) return
      lastTime = now
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  if (isMobile) return null

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[1] top-0 left-0 w-[400px] h-[400px] rounded-full opacity-25 transition-transform duration-75 will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(230,0,0,0.3) 0%, rgba(0,243,255,0.08) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
      aria-hidden="true"
    />
  )
}

function useTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    if (isMobile) return

    const el = ref.current
    if (!el) return

    let lastTime = 0
    const onMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < 16) return
      lastTime = now
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const rx = ((e.clientY - cy) / rect.height) * -strength
      const ry = ((e.clientX - cx) / rect.width) * strength
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const onLeave = () => {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
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

function CyberCore() {
  const [scrollY, setScrollY] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    let lastScrollTime = 0
    let lastMouseTime = 0

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime < 16) return
      lastScrollTime = now
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseTime < 16) return
      lastMouseTime = now
      setMouseOffset({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className="relative w-64 h-64 md:w-72 md:h-72 lg:w-[350px] lg:h-[350px] mx-auto flex items-center justify-center select-none will-change-transform"
      style={{ perspective: "1000px" }}
    >
      {/* Outer tech rings rotating on separate axes */}
      <div
        className="absolute w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 border border-brand-red/30 rounded-full transition-transform ease-out duration-100 will-change-transform"
        style={{
          transform: isMobile
            ? `rotateX(${65}deg) rotateY(${scrollY * 0.08}deg) rotateZ(${scrollY * 0.02}deg)`
            : `rotateX(${65 + mouseOffset.y}deg) rotateY(${scrollY * 0.15 + mouseOffset.x}deg) rotateZ(${scrollY * 0.05}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 border border-neon-cyan/20 rounded-full transform rotateY(90deg)" />
        <div className="absolute inset-0 border border-neon-magenta/20 rounded-full transform rotateX(90deg)" />
      </div>

      {/* Secondary orbital ring */}
      <div
        className="absolute w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 border border-neon-cyan/30 rounded-full transition-transform ease-out duration-100 will-change-transform"
        style={{
          transform: isMobile
            ? `rotateX(${-45}deg) rotateY(${scrollY * -0.05}deg)`
            : `rotateX(${-45 - mouseOffset.y}deg) rotateY(${scrollY * -0.1 + mouseOffset.x}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 border border-brand-red/10 rounded-full transform rotateY(90deg)" />
      </div>

      {/* Inner cyber matrix core */}
      <div
        className="absolute w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 border border-white/20 transition-transform ease-out duration-100 bg-brand-red/5 flex items-center justify-center shadow-[0_0_50px_rgba(230,0,0,0.2)] will-change-transform"
        style={{
          transform: isMobile
            ? `rotateX(${-20}deg) rotateY(${scrollY * -0.15}deg) rotateZ(${scrollY * -0.05}deg)`
            : `rotateX(${-20 - mouseOffset.y}deg) rotateY(${scrollY * -0.25 - mouseOffset.x}deg) rotateZ(${scrollY * -0.1}deg)`,
          transformStyle: "preserve-3d",
          clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
        }}
      >
        <div className="w-4 h-4 md:w-5 md:h-5 bg-brand-red glow-red animate-pulse" style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }} />
        <div className="absolute top-1 left-1 w-1.5 h-1.5 md:w-2 md:h-2 border-t border-l border-brand-red" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 border-b border-r border-brand-red" />
      </div>

      <div className="absolute top-2 left-2 font-mono text-[7px] md:text-[9px] text-brand-red/60 uppercase tracking-widest">SEC_CORE</div>
      <div className="absolute bottom-2 right-2 font-mono text-[7px] md:text-[9px] text-neon-cyan/60 uppercase tracking-widest hidden sm:block">ROT {Math.round(scrollY * 0.25) % 360}°</div>

      <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
  )
}

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const tiltRef = useTilt(5)
  const { play } = useSound()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (!mounted) return
    let lastTime = 0
    const onScroll = () => {
      const now = Date.now()
      if (now - lastTime < 16) return
      lastTime = now
      const scrollY = window.scrollY
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.25}px)`
        parallaxRef.current.style.opacity = `${Math.max(1 - scrollY / 600, 0)}`
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.12}px)`
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [mounted])

  const letterVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.6 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: {
        delay: 0.2 + i * 0.04,
        duration: 0.5,
        type: "spring" as const,
        stiffness: 180,
        damping: 16,
      }
    })
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 }
    }
  }

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
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
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1, willChange: "transform" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-grid-cyber-fine opacity-20" />
        </div>

        <div
          ref={parallaxRef}
          className="relative w-full"
          style={{ zIndex: 2, willChange: "transform, opacity" }}
        >
          <div className="section-container py-16 md:py-32 lg:py-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
              <div ref={tiltRef} className="lg:col-span-7 text-left space-y-4 md:space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05, duration: 0.4, type: "spring", stiffness: 200 }}
                  className="inline-flex"
                >
                  <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-black border border-white/20 shadow-[2px_2px_0px_#e60000] md:shadow-[3px_3px_0px_#e60000] hover:shadow-none hover:translate-x-[2px] md:hover:translate-x-[3px] hover:translate-y-[2px] md:hover:translate-y-[3px]">
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-brand-red glow-red animate-pulse" />
                    <span className="text-[8px] md:text-[10px] font-mono tracking-[0.15em] md:tracking-[0.2em] uppercase text-white font-bold">
                      ONLINE_
                    </span>
                  </div>
                </motion.div>

                <div className="space-y-1">
                  <div className="flex items-center justify-start gap-1 md:gap-1.5 lg:gap-3 overflow-visible flex-wrap">
                    {HERO_LETTERS_FIRST.map((letter, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black tracking-tight leading-none text-brand-red glow-red inline-block font-display"
                        style={{ transformStyle: "preserve-3d" }}
                        onMouseEnter={() => play("hover")}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex items-center justify-start gap-0.5 md:gap-1 lg:gap-2.5 overflow-visible flex-wrap">
                    {HERO_LETTERS_LAST.map((letter, i) => {
                      const isUnderscore = letter === "_"
                      return (
                        <motion.span
                          key={i}
                          custom={i + 6}
                          variants={letterVariants}
                          initial="hidden"
                          animate="visible"
                          className={`text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tight leading-none inline-block font-display ${
                            isUnderscore
                              ? "text-brand-red glow-red animate-pulse"
                              : letter === " "
                              ? "w-2 md:w-3 lg:w-5"
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

                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 md:space-y-6"
                >
                  <motion.div variants={slideUp} className="flex flex-wrap items-center justify-start gap-2 md:gap-3">
                    {["Security Engineer", "Full-Stack Dev", "Cloud Architect"].map((role, i) => (
                      <span key={role} className="flex items-center gap-2 md:gap-3 font-mono">
                        <span className="text-[8px] md:text-xs text-text-secondary font-black tracking-widest uppercase">{role}</span>
                        {i < 2 && <span className="text-brand-red font-bold text-xs hidden sm:inline">//</span>}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div variants={slideUp} className="flex justify-start">
                    <div className="font-mono text-[10px] md:text-sm text-white/95 max-w-xl leading-relaxed text-left bg-white/5 border border-white/10 px-3 py-2 md:px-5 md:py-3">
                      <span className="text-brand-red font-black">&gt; </span>
                      "Securing code. Building futures. Defending threats today."
                      <span className="cursor-blink" />
                    </div>
                  </motion.div>

                  <motion.div variants={slideUp} className="flex justify-start">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[8px] md:text-[10px] text-text-secondary font-mono tracking-widest uppercase">Kozhikode, Kerala</span>
                      <span className="w-1.5 h-1.5 bg-brand-red glow-red animate-pulse" />
                      <span className="text-[8px] md:text-[10px] text-text-secondary font-mono tracking-widest uppercase">India</span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={slideUp}
                    className="flex flex-wrap items-center justify-start gap-2 md:gap-4 pt-1 md:pt-2"
                  >
                    <a
                      href="#projects"
                      className="btn-brutalist-red text-sm md:text-base"
                      onMouseEnter={() => play("hover")}
                      onClick={() => play("click")}
                    >
                      <span>Explore Work_</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                    <a
                      href="#contact"
                      className="btn-brutalist-ghost text-sm md:text-base"
                      onMouseEnter={() => play("hover")}
                      onClick={() => play("click")}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Get In Touch_</span>
                    </a>
                  </motion.div>

                  <motion.div
                    variants={slideUp}
                    className="flex flex-wrap items-center justify-start gap-3 md:gap-6 pt-2 md:pt-4"
                  >
                    {[
                      { label: "Projects", value: "4+" },
                      { label: "Users", value: "10K+" },
                      { label: "Uptime", value: "99.5%" },
                    ].map((stat) => (
                      <div key={stat.label} className="px-2 md:px-4 py-1 md:py-1.5 border border-white/5 bg-white/[0.01] min-w-[100px] md:min-w-[130px] shadow-[1px_1px_0px_rgba(255,255,255,0.05)] md:shadow-[2px_2px_0px_rgba(255,255,255,0.05)]">
                        <div className="text-lg md:text-xl font-black text-brand-red glow-red font-display">{stat.value}</div>
                        <div className="text-[7px] md:text-[9px] text-text-secondary font-mono tracking-wider uppercase mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              <div className="lg:col-span-5 flex justify-center items-center hidden md:flex">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
                >
                  <CyberCore />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 3 }}
        >
          <span className="text-[7px] md:text-[8px] font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase text-text-secondary">SCROLL</span>
          <div className="w-4 md:w-5 h-6 md:h-8 border border-white/30 flex items-start justify-center pt-1 bg-black">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 md:w-1.5 h-2 bg-brand-red glow-red"
            />
          </div>
        </motion.div>
      </section>
    </>
  )
}
