import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden bg-black">
      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="section-container py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <a href="#hero" className="text-sm font-black tracking-[0.25em] uppercase font-display">
                <span className="text-brand-red">Juhaim</span>
                <span className="text-white">_</span>
              </a>
              <p className="text-[10px] text-text-secondary font-mono tracking-wider uppercase text-center md:text-left">
                SYSTEMS_SECURITY // DEFENDING_TOMORROW_
              </p>
            </div>

            {/* Quote */}
            <div className="text-center">
              <p className="text-[11px] text-text-secondary font-mono uppercase tracking-wider max-w-xs">
                "Securing code. Building futures. Defending tomorrow's threats today."
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="w-4 h-px bg-brand-red/40" />
                <span className="text-[9px] text-brand-red font-mono uppercase tracking-widest font-bold">Juhaim Mohammed M T</span>
                <div className="w-4 h-px bg-brand-red/40" />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:juhaimmtm@gmail.com"
                className="w-9 h-9 bg-black border border-white/10 flex items-center justify-center text-text-secondary hover:text-brand-red hover:border-brand-red transition-all duration-200 hover:scale-105 clipped-corner-btn cursor-pointer"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
              <a
                href="https://linkedin.com/in/juhaim-mohammed-mt-8a1b9422b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-black border border-white/10 flex items-center justify-center text-text-secondary hover:text-neon-cyan hover:border-neon-cyan transition-all duration-200 hover:scale-105 clipped-corner-btn cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://github.com/Juhamim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-black border border-white/10 flex items-center justify-center text-text-secondary hover:text-neon-magenta hover:border-neon-magenta transition-all duration-200 hover:scale-105 clipped-corner-btn cursor-pointer"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
            </div>
          </div>

          {/* Bottom divider & copyright */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-text-secondary font-mono tracking-widest uppercase">
            <p>© {new Date().getFullYear()} JUHAIM MOHAMMED M T // ALL RIGHTS RESERVED_</p>
            <p className="opacity-50">
              BUILD // NEXTJS // TACTILE_CANVAS
            </p>
          </div>
        </div>

        {/* Top brand red decorative accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(230,0,0,0.5), rgba(255,0,255,0.3), transparent)" }}
          aria-hidden="true"
        />
      </div>
    </footer>
  )
}
