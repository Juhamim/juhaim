import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4">
      <div className="border border-brand-red p-8 bg-[#050507] max-w-md shadow-[4px_4px_0px_#e60000] clipped-corner">
        <h1 className="text-4xl font-black text-brand-red mb-4">404 // NOT_FOUND</h1>
        <p className="text-sm font-mono text-text-secondary mb-6">
          The requested system module or address does not exist or has been relocated.
        </p>
        <Link href="/" className="btn-brutalist-red">
          RETURN // HOME_
        </Link>
      </div>
    </div>
  )
}
