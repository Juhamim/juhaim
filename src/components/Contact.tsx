"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import AnimatedSection from "./AnimatedSection"
import { useSound } from "@/lib/sounds"

const contacts = [
  {
    label: "Email",
    value: "juhaimmtm@gmail.com",
    href: "mailto:juhaimmtm@gmail.com",
    icon: Mail,
    color: "#e60000",
    action: "SEND // MAIL_",
  },
  {
    label: "Phone",
    value: "+91 7736951364",
    href: "tel:+917736951364",
    icon: Phone,
    color: "#00f3ff",
    action: "CALL // NOW_",
  },
  {
    label: "Location",
    value: "Kozhikode, Kerala, India",
    href: null,
    icon: MapPin,
    color: "#ffffff",
    action: "VIEW // MAP_",
  },
  {
    label: "LinkedIn",
    value: "juhaim-mohammed-mt",
    href: "https://linkedin.com/in/juhaim-mohammed-mt-8a1b9422b",
    icon: Linkedin,
    color: "#00f3ff",
    action: "CONNECT // IN_",
  },
  {
    label: "GitHub",
    value: "github.com/Juhamim",
    href: "https://github.com/Juhamim",
    icon: Github,
    color: "#ff00ff",
    action: "CODE // REPOS_",
  },
]

export default function Contact() {
  const { play } = useSound()
  const [hovered, setHovered] = useState(false)

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-10" aria-hidden="true" />
      <div
        className="orb orb-red"
        style={{ width: 500, height: 500, bottom: "-20%", right: "-10%", opacity: 0.08 }}
        aria-hidden="true"
      />
      <div
        className="orb orb-cyan"
        style={{ width: 400, height: 400, top: "-10%", left: "20%", opacity: 0.06 }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="section-title-wrap">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-brand-red font-black">
              CONNECT // SECURE_
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white font-display">
            LET&apos;S BUILD SOMETHING <span className="text-brand-red glow-red">SECURE_</span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-xl mx-auto leading-relaxed font-mono">
            Whether you need a security analyst, a full-stack engineer, or an infrastructure architect — let's execute.
          </p>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {/* Main contact card */}
          <AnimatedSection delay={0.1}>
            <div
              onMouseEnter={() => { setHovered(true); play("hover") }}
              onMouseLeave={() => setHovered(false)}
              className="bg-[#050507]/75 backdrop-blur-md border border-white p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:translate-x-2 hover:translate-y-2"
              style={{
                boxShadow: hovered ? "0px 0px 0px #e60000" : "8px 8px 0px #e60000",
              }}
            >


              {/* Decorative radial overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: "radial-gradient(circle at 50% 0%, #e60000, transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* Contact list items */}
              <div className="space-y-4 mb-8 relative z-10">
                {contacts.map((item, i) => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 border flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: `${item.color}15`,
                          borderColor: `${item.color}35`,
                        }}
                      >
                        <Icon size={18} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-mono tracking-widest uppercase text-text-secondary mb-0.5 font-bold">
                          {item.label}
                        </p>
                        <p className="text-xs sm:text-sm font-black text-white truncate font-mono">{item.value}</p>
                      </div>
                      {item.href && (
                        <span
                          className="text-[10px] font-mono shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-black"
                          style={{ color: item.color }}
                        >
                          {item.action} →
                        </span>
                      )}
                    </div>
                  )

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.5, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-4 p-4 border border-white/5 bg-black/40 hover:bg-black hover:border-white/10 hover:translate-x-1.5 transition-all duration-200 cursor-pointer group"
                          onMouseEnter={() => play("hover")}
                          onClick={() => play("click")}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 border border-white/5 bg-black/40">{content}</div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Quick links as brutalist buttons */}
              <div className="flex flex-wrap gap-4 justify-center relative z-10 border-t border-white/5 pt-6">
                <a
                  href="mailto:juhaimmtm@gmail.com"
                  className="btn-brutalist-red"
                  onMouseEnter={() => play("hover")}
                  onClick={() => play("click")}
                >
                  <Mail size={15} />
                  <span>EMAIL_</span>
                </a>

                <a
                  href="https://linkedin.com/in/juhaim-mohammed-mt-8a1b9422b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutalist-ghost"
                  onMouseEnter={() => play("hover")}
                  onClick={() => play("click")}
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN_</span>
                </a>

                <a
                  href="https://github.com/Juhamim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutalist-ghost shadow-brutalist-cyan hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                  style={{ boxShadow: "4px 4px 0px #00f3ff" }}
                  onMouseEnter={() => play("hover")}
                  onClick={() => play("click")}
                >
                  <Github size={15} />
                  <span>GITHUB_</span>
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Quick status message */}
          <AnimatedSection delay={0.3} className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black shadow-[2px_2px_0px_rgba(255,255,255,0.05)]">
              <span className="w-2.5 h-2.5 bg-brand-red glow-red animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase font-bold">
                SYSTEM_RESPONSE // WITHIN_24_HOURS_
              </span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
