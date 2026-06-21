import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter, Fira_Code } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Juhaim Mohammed M T | Cybersecurity Engineer × Full-Stack Developer",
  description:
    "Portfolio of Juhaim Mohammed M T — Cybersecurity Engineer, Full-Stack Developer & Cloud Security Architect from Kozhikode, Kerala. Building AI-powered security solutions and scalable platforms that defend against tomorrow's threats.",
  keywords: [
    "Cybersecurity Engineer",
    "Full-Stack Developer",
    "Cloud Security",
    "SOC Engineer",
    "React Developer",
    "Next.js",
    "Kerala",
    "Juhaim Mohammed",
  ],
  authors: [{ name: "Juhaim Mohammed M T" }],
  openGraph: {
    title: "Juhaim Mohammed M T | Cybersecurity × Full-Stack",
    description: "Securing code. Building futures. Defending tomorrow's threats today.",
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
