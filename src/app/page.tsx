import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Stats from "@/components/Stats"
import Projects from "@/components/Projects"
import Certifications from "@/components/Certifications"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import ThreeCanvas from "@/components/ThreeCanvas"
import SmoothScroll from "@/components/SmoothScroll"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Noise texture overlay for premium depth */}
      <div className="noise" aria-hidden="true" />

      {/* Persistent 3D Canvas background */}
      <ThreeCanvas />

      {/* Smooth scroll configuration */}
      <SmoothScroll />

      {/* Page content */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Stats />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
