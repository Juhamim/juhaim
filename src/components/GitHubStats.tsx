"use client"

import AnimatedSection from "./AnimatedSection"
import { Github, ArrowUpRight, Award, Flame, BarChart2 } from "lucide-react"

export default function GitHubStats() {
  const username = "Juhamim"
  
  // Custom theme colors matching our palette
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=default&title_color=e60000&text_color=94A3B8&icon_color=00f3ff&bg_color=08080C&hide_border=true`
  const languagesUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&title_color=e60000&text_color=94A3B8&icon_color=00f3ff&bg_color=08080C&hide_border=true`
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&background=08080C&fire=e60000&ring=00f3ff&currStreakNum=FFFFFF&currStreakLabel=94A3B8&sideNums=FFFFFF&sideLabels=94A3B8&hide_border=true`

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <AnimatedSection className="mb-16 text-center">
          <span className="section-label">Contributions</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-2">
            GitHub <span className="text-primary font-display uppercase tracking-wider">Telemetry</span>
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-lg font-comic tracking-wider">
            Real-time open source metrics and coding activity tracked directly from my GitHub profile.
          </p>
        </AnimatedSection>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* Card 1: GitHub Stats */}
          <AnimatedSection delay={0.05}>
            <div
              className="glass-card p-6 h-full flex flex-col justify-between hover:border-primary/20 transition-all duration-300"
              style={{
                "--shadow-color": "#e60000",
              } as React.CSSProperties}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Award size={18} />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-wider text-white">General Telemetry</h3>
                </div>
                <div className="flex items-center justify-center p-2 bg-white/[0.01] border border-border min-h-[200px]">
                  <img
                    src={statsUrl}
                    alt="GitHub Stats"
                    className="w-full h-auto object-contain max-h-[190px]"
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text-[10px] font-mono text-text-dim mt-4 uppercase tracking-widest font-black block">
                Updated in real-time
              </span>
            </div>
          </AnimatedSection>

          {/* Card 2: Streak Stats */}
          <AnimatedSection delay={0.1}>
            <div
              className="glass-card p-6 h-full flex flex-col justify-between hover:border-primary/20 transition-all duration-300"
              style={{
                "--shadow-color": "#00f3ff",
              } as React.CSSProperties}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <Flame size={18} />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-wider text-white">Commit Streak</h3>
                </div>
                <div className="flex items-center justify-center p-2 bg-white/[0.01] border border-border min-h-[200px]">
                  <img
                    src={streakUrl}
                    alt="GitHub Streak"
                    className="w-full h-auto object-contain max-h-[190px]"
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text-[10px] font-mono text-text-dim mt-4 uppercase tracking-widest font-black block">
                Activity streaks tracker
              </span>
            </div>
          </AnimatedSection>

          {/* Card 3: Top Languages */}
          <AnimatedSection delay={0.15}>
            <div
              className="glass-card p-6 h-full flex flex-col justify-between hover:border-primary/20 transition-all duration-300"
              style={{
                "--shadow-color": "#ff00ff",
              } as React.CSSProperties}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-accent-magenta-dim border border-accent-magenta/20 flex items-center justify-center text-accent-magenta">
                    <BarChart2 size={18} />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-wider text-white">Language Focus</h3>
                </div>
                <div className="flex items-center justify-center p-2 bg-white/[0.01] border border-border min-h-[200px]">
                  <img
                    src={languagesUrl}
                    alt="GitHub Top Languages"
                    className="w-full h-auto object-contain max-h-[190px]"
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text-[10px] font-mono text-text-dim mt-4 uppercase tracking-widest font-black block">
                Top languages by bytes
              </span>
            </div>
          </AnimatedSection>
        </div>

        {/* GitHub Button CTA */}
        <AnimatedSection className="text-center">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs shadow-[4px_4px_0px_#00f3ff] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            <Github size={14} />
            Explore GitHub Profile
            <ArrowUpRight size={14} />
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
