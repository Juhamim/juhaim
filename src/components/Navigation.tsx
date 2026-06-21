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
  const { play } = useSound()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)

      // Detect active section
      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
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
    // Smooth scroll
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500",
        scrolled
          ? "backdrop-blur-2xl border-b border-white/10"
          : "bg-transparent"
      )}
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
      }}
    >
      {/* Top red/magenta gradient line */}
      {scrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(230,0,0,0.6), rgba(255,0,255,0.4), transparent)",
          }}
          aria-hidden="true"
        />
      )}

      <div className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group"
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
          <span className="text-xs font-black tracking-[0.25em] uppercase hidden sm:block font-display">
            <span className="text-brand-red">Juhaim</span>
            <span className="text-white">_</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                onMouseEnter={() => play("hover")}
                className={cn(
                  "relative px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300",
                  isActive
                    ? "text-brand-red"
                    : "text-text-secondary hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 clipped-corner-btn"
                    style={{
                      background: "rgba(230,0,0,0.1)",
                      border: "1px solid rgba(230,0,0,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Sound toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSoundEnabled(!soundEnabled)
              play("click")
            }}
            className="w-9 h-9 clipped-corner-btn bg-black border border-white/20 flex items-center justify-center text-text-secondary hover:text-brand-red hover:border-brand-red transition-all cursor-pointer"
            aria-label={soundEnabled ? "Disable sounds" : "Enable sounds"}
            title={soundEnabled ? "Sound on" : "Sound off"}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </motion.button>

          {/* Hire me CTA */}
          <a
            href="#contact"
            onClick={() => play("click")}
            onMouseEnter={() => play("hover")}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-brand-red border border-white/20 text-white hover:bg-brand-red-light font-black text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_#00f3ff] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            <span>Hire Me</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => { setMobileOpen(!mobileOpen); play("click") }}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-white"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-5 h-0.5 bg-current rounded-full transition-all duration-300",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-current rounded-full transition-all duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-current rounded-full transition-all duration-300",
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
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden border-b border-white/10"
            style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(30px)" }}
          >
            <nav className="section-container py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={cn(
                    "px-4 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors",
                    activeSection === link.href.slice(1)
                      ? "text-brand-red bg-brand-red/10 border border-brand-red/30"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => { play("click"); setMobileOpen(false) }}
                className="mt-2 text-center py-3 bg-brand-red border border-white/20 text-white font-black text-xs tracking-widest uppercase shadow-[3px_3px_0px_#00f3ff]"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
