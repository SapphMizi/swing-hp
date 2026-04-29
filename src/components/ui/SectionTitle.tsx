import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionTitleProps {
  subtitle: string
  title: string
  align?: 'left' | 'center'
}

export function SectionTitle({ subtitle, title, align = 'left' }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(
      el,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, [])

  return (
    <div
      ref={ref}
      className={`mb-12 opacity-0 ${align === 'center' ? 'text-center' : ''}`}
    >
      <p className="font-mono text-swing-amber text-xs tracking-[0.45em] uppercase mb-3">
        {subtitle}
      </p>
      <h2 className="text-swing-cream font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
        {title}
      </h2>
      <div className={`mt-4 h-px w-16 bg-swing-amber/40 ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  )
}
