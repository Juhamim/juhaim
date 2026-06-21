"use client"

import { useEffect, useRef, useCallback } from "react"

// Programmatically generated sound effects using Web Audio API
type SoundType = "hover" | "click" | "whoosh" | "chime" | "glitch" | "scan"

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch {
      return null
    }
  }
  return audioCtx
}

function playHover() {
  // Disabled by default to prevent jarring recruiter experience
}

function playClick() {
  const ctx = getAudioContext()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = "sine"
  osc.frequency.setValueAtTime(600, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15)
  gain.gain.setValueAtTime(0.05, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.15)
}

function playWhoosh() {
  const ctx = getAudioContext()
  if (!ctx) return
  const bufferSize = ctx.sampleRate * 0.3
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = "bandpass"
  filter.frequency.setValueAtTime(2000, ctx.currentTime)
  filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3)
  filter.Q.value = 2
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.08, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(ctx.currentTime)
}

function playChime() {
  const ctx = getAudioContext()
  if (!ctx) return
  const freqs = [523.25, 659.25, 783.99, 1046.50]
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = "sine"
    osc.frequency.value = freq
    const t = ctx.currentTime + i * 0.08
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.05, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5)
    osc.start(t)
    osc.stop(t + 0.5)
  })
}

function playGlitch() {
  const ctx = getAudioContext()
  if (!ctx) return
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = "square"
    const t = ctx.currentTime + i * 0.05
    osc.frequency.setValueAtTime(Math.random() * 800 + 400, t)
    gain.gain.setValueAtTime(0.03, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04)
    osc.start(t)
    osc.stop(t + 0.04)
  }
}

function playScan() {
  const ctx = getAudioContext()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = "sine"
  osc.frequency.setValueAtTime(200, ctx.currentTime)
  osc.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 0.8)
  osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1.6)
  gain.gain.setValueAtTime(0.04, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 1.6)
}

export function useSound() {
  const enabledRef = useRef(false)

  // Enable audio on first user interaction
  useEffect(() => {
    const enable = () => {
      enabledRef.current = true
      const ctx = getAudioContext()
      if (ctx && ctx.state === "suspended") {
        ctx.resume()
      }
    }
    window.addEventListener("click", enable, { once: true })
    window.addEventListener("keydown", enable, { once: true })
    return () => {
      window.removeEventListener("click", enable)
      window.removeEventListener("keydown", enable)
    }
  }, [])

  const play = useCallback((type: SoundType) => {
    if (!enabledRef.current) return
    try {
      switch (type) {
        case "hover": playHover(); break
        case "click": playClick(); break
        case "whoosh": playWhoosh(); break
        case "chime": playChime(); break
        case "glitch": playGlitch(); break
        case "scan": playScan(); break
      }
    } catch { /* Silently ignore audio errors */ }
  }, [])

  return { play }
}

// Sound context hook
export default useSound
