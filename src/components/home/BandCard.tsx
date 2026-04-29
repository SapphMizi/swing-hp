import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BandCardProps {
  name: string
  desc: string
  index: number
  instagram?: string
  twitter?: string
}

export function BandCard({ name, desc, index, instagram, twitter }: BandCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'expo.out',
        delay: index * 0.12,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="group relative bg-swing-deep border border-swing-amber/10 rounded-2xl p-8 hover:border-swing-amber/30 transition-all duration-500 overflow-hidden opacity-0"
    >
      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-swing-amber opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 blur-3xl" />

      {/* Index number */}
      <span className="absolute top-6 right-8 font-mono text-4xl font-bold text-swing-amber/8 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <h3 className="text-swing-cream font-bold text-xl mb-3 group-hover:text-swing-amber transition-colors duration-300">
        {name}
      </h3>
      <p className="text-swing-warm-gray text-sm leading-relaxed">{desc}</p>

      {(instagram || twitter) && (
        <div className="flex gap-4 mt-5">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="text-swing-warm-gray hover:text-swing-amber text-xs tracking-widest uppercase transition-colors duration-200"
            >
              Instagram
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noreferrer"
              className="text-swing-warm-gray hover:text-swing-amber text-xs tracking-widest uppercase transition-colors duration-200"
            >
              X (Twitter)
            </a>
          )}
        </div>
      )}
    </div>
  )
}
