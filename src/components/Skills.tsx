"use client"

import AnimatedSection from "./AnimatedSection"
import { Shield, Code, Server, Network, Brain } from "lucide-react"

const skillCategories = [
  {
    id: "cyber",
    title: "Cybersecurity",
    label: "Offensive & Defensive",
    icon: Shield,
    color: "#e60000",
    skills: [
      "Threat Detection", "Vulnerability Assessment", "Penetration Testing",
      "Incident Response", "SOC Operations", "Log Analysis",
      "Cryptography", "Wireshark & Nmap", "DevSecOps"
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    label: "Modern SaaS Interfaces",
    icon: Code,
    color: "#00f3ff",
    skills: [
      "React.js", "Next.js", "TypeScript", "Tailwind CSS",
      "Framer Motion", "HTML5 & CSS3", "Responsive UI/UX",
      "State Management", "Performance Optimization"
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    label: "Scalable Logic & APIs",
    icon: Server,
    color: "#ff00ff",
    skills: [
      "Python", "Node.js", "REST APIs", "PostgreSQL",
      "Supabase", "Auth (JWT/OAuth)", "WebSockets",
      "Database Optimization", "Serverless Functions"
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    label: "Secure Infrastructure",
    icon: Network,
    color: "#00f3ff",
    skills: [
      "AWS Services", "Cloud Security", "CI/CD (GitHub Actions)",
      "Docker", "Linux System Admin", "Cloudflare Pages/R2",
      "Edge Computing", "Git & Workflows"
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    label: "Intelligent Workflows",
    icon: Brain,
    color: "#e60000",
    skills: [
      "LLM Integration", "Python Scripting", "LangChain",
      "Prompt Engineering", "Vector Databases", "Web Scraping",
      "Task Automation", "System Integration"
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="section-container relative z-10">
        <AnimatedSection className="mb-16 text-center">
          <span className="section-label">Skills</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-2">
            My Technical <span className="text-primary font-display uppercase tracking-wider">Arsenal</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-lg font-comic tracking-wider">
            A full-spectrum defensive, offensive, and full-stack engineering toolset built for the modern web.
          </p>
        </AnimatedSection>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <AnimatedSection
                key={cat.id}
                delay={i * 0.05}
                className={cat.id === "ai" ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <div
                  className="glass-card p-6 md:p-8 h-full flex flex-col justify-between group hover:border-primary/20 transition-all duration-300"
                  style={{
                    "--shadow-color": cat.color,
                  } as React.CSSProperties}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 flex items-center justify-center transition-colors"
                      style={{
                        background: `${cat.color}15`,
                        border: `1px solid ${cat.color}25`,
                      }}
                    >
                      <Icon size={24} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-wider text-white leading-tight group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[10px] text-text-dim mt-0.5 block uppercase tracking-wider font-mono">{cat.label}</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-border bg-white/[0.01] text-text-muted transition-colors duration-200 hover:border-primary/20 hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
