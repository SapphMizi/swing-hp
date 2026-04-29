import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero } from '../components/home/Hero'
import { BandCard } from '../components/home/BandCard'
import { SectionTitle } from '../components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

export const Route = createFileRoute('/')({ component: Home })

const BANDS_DATA = [
  { key: 'bands.dgun', instagram: undefined, twitter: undefined },
  { key: 'bands.sao', instagram: undefined, twitter: undefined },
  { key: 'bands.tnwjo', instagram: undefined, twitter: undefined },
] as const

function Home() {
  const { t } = useTranslation()
  const joinRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = joinRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, [])

  return (
    <main>
      <Hero />

      {/* About intro section */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <SectionTitle subtitle="About" title={t('home.aboutTitle')} />
        <p className="text-swing-warm-gray-light leading-loose max-w-2xl text-base md:text-lg">
          {t('home.aboutText')}
        </p>
      </section>

      {/* Bands section */}
      <section className="py-16 px-8 md:px-16 max-w-7xl mx-auto">
        <SectionTitle subtitle="Our Bands" title={t('home.bandsTitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BANDS_DATA.map(({ key }, i) => (
            <BandCard
              key={key}
              name={t(`${key}.name`)}
              desc={t(`${key}.desc`)}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Divider stripe */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-swing-amber/20 to-transparent my-8" />

      {/* Join section */}
      <section
        ref={joinRef}
        className="py-24 px-8 md:px-16 text-center max-w-3xl mx-auto opacity-0"
      >
        <p className="font-mono text-swing-amber text-xs tracking-[0.45em] uppercase mb-4">
          Join Us
        </p>
        <h2
          className="text-swing-cream font-bold mb-6"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          {t('home.joinTitle')}
        </h2>
        <p className="text-swing-warm-gray-light leading-relaxed mb-10 text-base md:text-lg">
          {t('home.joinText')}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-swing-amber text-swing-black font-bold px-8 py-4 rounded-full hover:bg-swing-amber-light transition-colors duration-200 tracking-wide"
        >
          {t('home.joinCta')}
        </Link>
      </section>
    </main>
  )
}
