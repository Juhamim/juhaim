import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Certifications from "@/components/Certifications"
import GitHubStats from "@/components/GitHubStats"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-deep">
      {/* Chill Pill Background Patterns */}
      <div className="fixed inset-0 pointer-events-none z-50 halftone-overlay opacity-15" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-40 cyber-grid opacity-10" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden" aria-hidden="true">
        <div className="scanline-overlay" />
      </div>

      {/* Ambient glow backgrounds */}
      <div
        className="glow-orb glow-orb-green"
        style={{ width: 600, height: 600, top: "10%", left: "-10%", opacity: 0.5 }}
        aria-hidden="true"
      />
      <div
        className="glow-orb glow-orb-blue"
        style={{ width: 500, height: 500, top: "60%", right: "-10%", opacity: 0.4 }}
        aria-hidden="true"
      />

      {/* Page content */}
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <GitHubStats />
      <Contact />
      <Footer />
    </main>
  )
}
