import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { MusicNoteParticles } from './MusicNoteParticles'

// Hero uses whatever images are in /images/hero-*.jpg
// Falls back to a gradient if no images are loaded
const HERO_IMAGES = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
]

export function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLElement>(null)
  const imageRefs = useRef<HTMLDivElement[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Ken Burns: cycle images with slow zoom
  useEffect(() => {
    const imgs = imageRefs.current.filter(Boolean)
    if (imgs.length === 0) return
    let current = 0

    const showNext = () => {
      const prev = current
      current = (current + 1) % imgs.length

      gsap.to(imgs[prev], { opacity: 0, duration: 1.2, ease: 'power2.inOut' })
      gsap.to(imgs[current], { opacity: 1, duration: 1.2, ease: 'power2.inOut' })

      // Ken Burns on outgoing
      gsap.fromTo(
        imgs[prev],
        { scale: 1.08 },
        { scale: 1.0, duration: 8, ease: 'linear' },
      )
      // Ken Burns on incoming
      gsap.fromTo(
        imgs[current],
        { scale: 1.0 },
        { scale: 1.08, duration: 8, ease: 'linear' },
      )
    }

    // Init first image
    gsap.set(imgs[0], { opacity: 1 })
    gsap.fromTo(imgs[0], { scale: 1.0 }, { scale: 1.08, duration: 8, ease: 'linear' })

    const interval = setInterval(showNext, 6000)
    return () => clearInterval(interval)
  }, [])

  // Text reveal on mount (after loading screen)
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
    )
    tl.fromTo(
      nameRef.current,
      { y: 40, opacity: 0, letterSpacing: '0.5em' },
      { y: 0, opacity: 1, letterSpacing: '0.05em', duration: 1.0, ease: 'expo.out' },
      '-=0.4',
    )
    tl.fromTo(
      subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.5',
    )
    tl.fromTo(
      ctaRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.4',
    )
  }, [])

  // Scroll-driven parallax on hero content
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      const progress = window.scrollY / window.innerHeight
      gsap.to(el.querySelector('.hero-content'), {
        y: progress * 80,
        opacity: 1 - progress * 1.5,
        duration: 0,
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Fallback gradient (base layer — always visible beneath images) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a05] via-swing-deep to-[#0a0c18]" />

      {/* Background image layers — stacked above gradient */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          ref={(el) => { if (el) imageRefs.current[i] = el }}
          className="absolute inset-0 bg-cover bg-center opacity-0 will-change-transform"
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-swing-black via-swing-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-swing-black/60 via-transparent to-transparent" />

      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
      />

      {/* Floating music note particles */}
      <MusicNoteParticles />

      {/* Hero content */}
      <div className="hero-content absolute inset-0 flex flex-col justify-end pb-24 px-8 md:px-16 max-w-5xl">
        <p
          ref={titleRef}
          className="text-swing-amber font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-3 opacity-0"
        >
          {t('home.heroTitle')}
        </p>
        <span
          ref={nameRef}
          className="block font-bold text-swing-cream leading-none mb-6 opacity-0"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', letterSpacing: '0.05em' }}
        >
          {t('home.heroName')}
        </span>
        <p
          ref={subRef}
          className="text-swing-warm-gray-light text-sm md:text-base max-w-md leading-relaxed mb-8 opacity-0"
        >
          {t('home.heroSub')}
        </p>
        <div ref={ctaRef} className="flex gap-4 flex-wrap opacity-0">
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 bg-swing-amber text-swing-black font-bold text-sm px-6 py-3 rounded-full hover:bg-swing-amber-light transition-colors duration-200 tracking-wide"
          >
            {t('home.ctaSchedule')}
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 border border-swing-amber/40 text-swing-cream text-sm px-6 py-3 rounded-full hover:border-swing-amber hover:text-swing-amber transition-all duration-200 tracking-wide"
          >
            {t('home.ctaAbout')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
        <span className="text-swing-warm-gray text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-6">
          scroll
        </span>
        <div className="w-px h-12 bg-swing-amber/40 animate-pulse" />
      </div>
    </section>
  )
}
