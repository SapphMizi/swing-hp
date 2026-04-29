import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTitle } from '../components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

export const Route = createFileRoute('/contact')({ component: Contact })

const BANDS = [
  {
    key: 'bands.dgun',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://x.com/',
    email: null,
  },
  {
    key: 'bands.sao',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://x.com/',
    email: null,
  },
  {
    key: 'bands.tnwjo',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://x.com/',
    email: null,
  },
]

const SWING_EMAIL = 'swing@example.com' // TODO: replace with real email

function BandContactCard({ bandKey, instagram, twitter, index }: { bandKey: string; instagram?: string; twitter?: string; index: number }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'expo.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, [index])

  return (
    <div
      ref={ref}
      className="group bg-swing-deep border border-swing-amber/10 rounded-2xl p-8 hover:border-swing-amber/25 transition-all duration-500 opacity-0"
    >
      <h3 className="text-swing-cream font-bold text-lg mb-1">{t(`${bandKey}.name`)}</h3>
      <p className="text-swing-warm-gray text-xs mb-6">{t(`${bandKey}.desc`)}</p>

      <div className="flex gap-5">
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-swing-warm-gray hover:text-swing-amber text-sm tracking-wide transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagram
          </a>
        )}
        {twitter && (
          <a
            href={twitter}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-swing-warm-gray hover:text-swing-amber text-sm tracking-wide transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
            X (Twitter)
          </a>
        )}
      </div>
    </div>
  )
}

function Contact() {
  const { t } = useTranslation()

  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-5xl mx-auto">
      <SectionTitle subtitle={t('contact.subtitle')} title={t('contact.title')} />

      <p className="text-swing-warm-gray-light leading-loose max-w-2xl mb-12 text-sm md:text-base">
        {t('contact.intro')}
      </p>

      {/* SWING overall */}
      <div className="mb-8 p-8 bg-swing-deep rounded-2xl border border-swing-amber/20">
        <h3 className="text-swing-amber font-mono text-xs tracking-[0.4em] uppercase mb-2">
          General
        </h3>
        <p className="text-swing-cream font-bold text-lg mb-1">軽音楽部 SWING</p>
        <a
          href={`mailto:${SWING_EMAIL}`}
          className="text-swing-warm-gray hover:text-swing-amber text-sm transition-colors duration-200"
        >
          {SWING_EMAIL}
        </a>
        <p className="text-swing-warm-gray text-xs mt-3 leading-relaxed">
          {t('contact.emailNote')}
        </p>
      </div>

      {/* Band cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BANDS.map(({ key, instagram, twitter }, i) => (
          <BandContactCard
            key={key}
            bandKey={key}
            instagram={instagram}
            twitter={twitter}
            index={i}
          />
        ))}
      </div>
    </main>
  )
}
