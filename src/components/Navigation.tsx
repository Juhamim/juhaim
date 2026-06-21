"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSound } from "@/lib/sounds"
import { Volume2, VolumeX } from "lucide-react"

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scrollPercent, setScrollPercent] = useState(0)
  const { play } = useSound()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollPercent((window.scrollY / totalHeight) * 100)
      }

      // Detect active section
      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    play("click")
    setMobileOpen(false)
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[60] py-4 transition-all duration-300"
    >
      <div
        className={cn(
          "w-[94%] max-w-5xl mx-auto h-16 md:h-18 flex items-center justify-between px-6 bg-black/85 border border-white/10 backdrop-blur-xl transition-all duration-300 relative shadow-lg",
          scrolled ? "border-brand-red/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" : "border-white/10"
        )}
        style={{
          // Custom clip-path for brutalist styling (clipped top-right and bottom-left)
          clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))"
        }}
      >
        {/* Dynamic scroll progress line at the bottom of the floating dock */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-brand-red glow-red transition-all duration-75"
          style={{ width: `${scrollPercent}%` }}
        />

        {/* Diagonal border helper overlay */}
        <div className="absolute inset-0 pointer-events-none border border-white/5 opacity-40" />

        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group relative z-10"
          onClick={() => play("click")}
          onMouseEnter={() => play("hover")}
        >
          <div className="relative w-8 h-8 clipped-corner-sm overflow-hidden border border-white/20">
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #e60000, #ff00ff)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xs font-mono">
              JM
            </div>
          </div>
          <span className="text-[10px] font-black tracking-[0.25em] uppercase hidden sm:block font-display text-white group-hover:text-brand-red transition-colors">
            JUHAIM<span className="text-brand-red">_</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                onMouseEnter={() => play("hover")}
                className={cn(
                  "relative px-4 py-2.5 text-[10px] font-black tracking-[0.18em] uppercase transition-all duration-200 hover:text-white select-none",
                  isActive
                    ? "text-brand-red font-black"
                    : "text-text-secondary"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill-dock"
                    className="absolute inset-0 bg-brand-red/10 border border-brand-red/20"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))"
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-0.5">
                  {link.label}
                  {isActive && <span className="text-brand-red animate-pulse">_</span>}
                </span>
              </a>
            )
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 relative z-10">
          {/* Sound Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSoundEnabled(!soundEnabled)
              play("click")
            }}
            className="w-9 h-9 bg-black border border-white/20 flex items-center justify-center text-text-secondary hover:text-brand-red hover:border-brand-red transition-all cursor-pointer"
            style={{
              clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))"
            }}
            aria-label={soundEnabled ? "Disable sounds" : "Enable sounds"}
            title={soundEnabled ? "Sound on" : "Sound off"}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </motion.button>

          {/* Hire Me CTA Button */}
          <a
            href="#contact"
            onClick={() => play("click")}
            onMouseEnter={() => play("hover")}
            className="hidden md:flex items-center gap-1.5 px-4.5 py-2.5 bg-brand-red border border-white/20 text-white hover:bg-brand-red-light font-black text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_#00f3ff] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            style={{
              clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
            }}
          >
            <span>HIRE_ME</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => { setMobileOpen(!mobileOpen); play("click") }}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-white"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-5 h-0.5 bg-current transition-all duration-300",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-current transition-all duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-current transition-all duration-300",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden w-[94%] mx-auto mt-2 bg-black border border-white/10"
            style={{
              backdropFilter: "blur(30px)",
              clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))"
            }}
          >
            <nav className="py-6 px-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={cn(
                    "px-4 py-3 text-[10px] font-black tracking-widest uppercase border transition-colors",
                    activeSection === link.href.slice(1)
                      ? "text-brand-red bg-brand-red/10 border-brand-red/30"
                      : "text-text-secondary border-transparent hover:text-white hover:bg-white/5"
                  )}
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))"
                  }}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && " _"}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => { play("click"); setMobileOpen(false) }}
                className="mt-2 text-center py-3 bg-brand-red border border-white/20 text-white font-black text-[10px] tracking-widest uppercase shadow-[3px_3px_0px_#00f3ff]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
                }}
              >
                HIRE_ME
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
