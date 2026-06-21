import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-deep/80 backdrop-blur-sm">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Quote */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#hero" className="text-2xl font-bold tracking-wider font-display text-white hover:text-primary transition-colors">
              Juhaim<span className="text-secondary">.</span>
            </a>
            <p className="text-sm text-text-dim text-center md:text-left font-comic tracking-wide">
              Securing code. Building futures. Defending tomorrow&apos;s threats today.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:juhaimmtm@gmail.com"
              className="w-10 h-10 bg-white/[0.02] border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/20 transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://linkedin.com/in/juhaim-mohammed-mt-8a1b9422b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/[0.02] border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/20 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/Juhamim"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/[0.02] border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/20 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-dim font-mono uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Juhaim Mohammed M T. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with Next.js &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
