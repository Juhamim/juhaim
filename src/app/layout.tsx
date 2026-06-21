import type { Metadata, Viewport } from "next"
import { Outfit, JetBrains_Mono, Bangers, Comic_Neue, Russo_One } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const bangers = Bangers({
  subsets: ["latin"],
  variable: "--font-bangers-display",
  weight: "400",
  display: "swap",
})

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic-neue",
  weight: ["300", "400", "700"],
  display: "swap",
})

const russoOne = Russo_One({
  subsets: ["latin"],
  variable: "--font-russo-one",
  weight: "400",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Juhaim Mohammed M T | Cybersecurity Engineer & Full-Stack Developer",
  description:
    "Portfolio of Juhaim Mohammed M T — Cybersecurity Engineer, Full-Stack Developer & Cloud Security Architect. Building AI-powered security solutions and scalable platforms.",
  keywords: [
    "Cybersecurity Engineer",
    "Full-Stack Developer",
    "Cloud Security Architect",
    "AI Security",
    "Threat Detection",
    "Penetration Testing",
    "React.js",
    "Next.js",
  ],
  authors: [{ name: "Juhaim Mohammed M T" }],
  openGraph: {
    title: "Juhaim Mohammed M T | Cybersecurity & Full-Stack Developer",
    description:
      "Building secure, scalable systems — from threat detection to full-stack platforms.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} ${bangers.variable} ${comicNeue.variable} ${russoOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
