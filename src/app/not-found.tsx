"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-deep flex flex-col items-center justify-center text-center p-4">
      <div className="border border-primary p-8 bg-[#08080C] max-w-md shadow-[4px_4px_0px_#e60000] clipped-corner">
        <h1 className="text-4xl font-display text-primary mb-4 uppercase tracking-wider">404 // NOT_FOUND</h1>
        <p className="text-sm font-comic text-text-muted mb-6">
          The requested system module or address does not exist or has been relocated.
        </p>
        <Link href="/" className="btn-primary font-display clipped-corner">
          RETURN // HOME_
        </Link>
      </div>
    </div>
  )
}

