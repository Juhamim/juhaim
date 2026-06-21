"use client"

import AnimatedSection from "./AnimatedSection"
import { Mail, Linkedin, Github, MessageCircle, MapPin, Calendar } from "lucide-react"

const contactLinks = [
  {
    label: "Email",
    value: "juhaimmtm@gmail.com",
    href: "mailto:juhaimmtm@gmail.com",
    icon: Mail,
    color: "#e60000",
  },
  {
    label: "LinkedIn",
    value: "juhaim-mohammed-mt",
    href: "https://linkedin.com/in/juhaim-mohammed-mt-8a1b9422b",
    icon: Linkedin,
    color: "#00f3ff",
  },
  {
    label: "GitHub",
    value: "Juhamim",
    href: "https://github.com/Juhamim",
    icon: Github,
    color: "#FFFFFF",
  },
  {
    label: "WhatsApp",
    value: "+91 7736951364",
    href: "https://wa.me/917736951364?text=Hi%20Juhaim",
    icon: MessageCircle,
    color: "#25D366",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSection className="mb-16 text-center">
          <span className="section-label">Contact</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-2">
            Let&apos;s Build Something <span className="text-primary font-display uppercase tracking-wider">Extraordinary</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto text-lg font-comic tracking-wider">
            Whether you need a full-stack developer, a security review, or just want to collaborate on AI tools, let&apos;s connect.
          </p>
        </AnimatedSection>

        {/* Contact Layout */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info Side Panel */}
          <AnimatedSection className="md:col-span-1" delay={0.05}>
            <div
              className="glass-card p-6 h-full flex flex-col justify-between hover:border-primary/20 transition-all duration-300"
              style={{
                "--shadow-color": "#e60000",
              } as React.CSSProperties}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl uppercase tracking-wider text-white mb-1">Availability</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm text-text-muted font-mono uppercase tracking-wider text-xs">Available for projects</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl uppercase tracking-wider text-white mb-2">Location</h3>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MapPin size={16} className="text-secondary" />
                    <span className="text-sm font-comic">Kozhikode, Kerala, India</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl uppercase tracking-wider text-white mb-2">Response Time</h3>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-sm font-comic">Typically within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Social Links Panel */}
          <AnimatedSection className="md:col-span-2" delay={0.1}>
            <div
              className="glass-card p-6 md:p-8 h-full hover:border-primary/20 transition-all duration-300"
              style={{
                "--shadow-color": "#00f3ff",
              } as React.CSSProperties}
            >
              <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-6">Channels &amp; Socials</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-border bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-300 flex items-center gap-4 group"
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center transition-colors"
                        style={{
                          background: `${link.color}10`,
                          border: `1px solid ${link.color}20`,
                        }}
                      >
                        <Icon size={18} style={{ color: link.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] text-text-dim font-mono block uppercase tracking-wider font-bold">{link.label}</span>
                        <span className="text-sm text-text-muted font-mono truncate block group-hover:text-white transition-colors">
                          {link.value}
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
