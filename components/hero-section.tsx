import Link from "next/link"
import Image from 'next/image'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  ctaText?: string
}

export function HeroSection({ title, subtitle, ctaText }: HeroSectionProps) {
  return (
    <header className="relative">
      <div className="absolute inset-0">
        <Image
          src="/rob-cat-retouch.jpg"
          width={1440}
          height={724}
          alt="Rob and Cat standing on top of a mountain"
          className="w-full h-full object-cover object-[50%_38%]"
          />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight text-balance">
          {title || "Two Novices. One Ultra Marathon."}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-stone-200 max-w-2xl mx-auto text-pretty">
          {subtitle ||
            "This February, we're running 100 miles with zero experience. Support our cause, or bet against us. Either way, charity wins."}
        </p>
        <Link
          href="#pledge"
          className="mt-8 inline-block bg-rose-600 text-white hover:bg-rose-700 px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all transform active:scale-95 uppercase"
        >
          {ctaText || "Make Your Pledge"}
        </Link>
      </div>
    </header>
  )
}
