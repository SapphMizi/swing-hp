import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTitle } from '../components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

export const Route = createFileRoute('/history')({ component: History })

const HISTORY_EVENTS = [
  { year: 1961, ja: 'ハワイアン創立', en: 'Hawaiian band founded' },
  { year: 1962, ja: '軽音楽部として承認', en: 'Approved as a light music club' },
  { year: 1962, ja: 'カントリー設立', en: 'Country band established' },
  { year: 1963, ja: 'フルバンド設立（後のSwing Academy Orchestra）', en: 'Full band established (later Swing Academy Orchestra)' },
  { year: 1964, ja: 'カントリーがロックとウェスタンに分離', en: 'Country split into Rock and Western' },
  { year: 1964, ja: '第一回三大学演奏会開催', en: 'First tri-university concert held' },
  { year: 1965, ja: '第一回定期演奏会開催（大阪大学中之島講堂）', en: 'First regular concert held (Osaka University Nakanoshima Auditorium)' },
  { year: 1965, ja: 'ディキシー設立', en: 'Dixieland band established' },
  { year: 1966, ja: 'フォーク設立', en: 'Folk band established' },
  { year: 1966, ja: 'モダンジャズ設立', en: 'Modern Jazz band established' },
  { year: 1969, ja: 'フォーク解散', en: 'Folk band disbanded' },
  { year: 1969, ja: 'フルバンド・ウエスタン、バンド合戦近畿大会出場', en: 'Full band and Western band appear in Kansai competition' },
  { year: 1970, ja: 'フルバンド、Light Music Contest 関西代表として全国決勝大会に出場', en: 'Full band represents Kansai at national contest' },
  { year: 1972, ja: 'ハワイアン解散', en: 'Hawaiian band disbanded' },
  { year: 1973, ja: 'カントリー解散', en: 'Country band disbanded' },
]

function TimelineItem({
  year,
  text,
  isLast,
  index,
}: {
  year: number
  text: string
  isLast: boolean
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(
      el,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'expo.out',
        delay: (index % 4) * 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, [index])

  return (
    <div ref={ref} className="flex gap-6 opacity-0">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-swing-amber mt-1.5 shrink-0 ring-2 ring-swing-amber/20" />
        {!isLast && <div className="w-px flex-1 bg-swing-amber/15 mt-2" />}
      </div>
      {/* Content */}
      <div className={`pb-8 ${isLast ? '' : ''}`}>
        <span className="font-mono text-swing-amber text-xs tracking-widest">{year}</span>
        <p className="text-swing-warm-gray-light text-sm leading-relaxed mt-1">{text}</p>
      </div>
    </div>
  )
}

function History() {
  const { t, i18n } = useTranslation()
  const isJa = i18n.language === 'ja'

  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-4xl mx-auto">
      <SectionTitle subtitle={t('history.subtitle')} title={t('history.title')} />
      <div className="mt-12">
        {HISTORY_EVENTS.map((ev, i) => (
          <TimelineItem
            key={`${ev.year}-${i}`}
            year={ev.year}
            text={isJa ? ev.ja : ev.en}
            isLast={i === HISTORY_EVENTS.length - 1}
            index={i}
          />
        ))}
      </div>
    </main>
  )
}
