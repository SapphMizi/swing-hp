import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'

export const Route = createFileRoute('/live-reports')({ component: LiveReports })

// Placeholder data — replace with real content + images
const REPORTS = [
  {
    year: 2024,
    items: [
      {
        slug: '2024-06-regular',
        date: '2024.06.15',
        titleJa: '2024年6月 定期ライブ',
        titleEn: 'June 2024 Regular Live',
        descJa: '学内ホールで開催した定期ライブ。',
        descEn: 'Our regular live performance held on campus.',
        image: '/images/live-2024-06.jpg',
      },
      {
        slug: '2024-04-welcome',
        date: '2024.04.10',
        titleJa: '2024年4月 新歓ライブ',
        titleEn: 'April 2024 Welcome Live',
        descJa: '新入生歓迎ライブの様子をお届けします。',
        descEn: 'Highlights from our welcome live for new students.',
        image: '/images/live-2024-04.jpg',
      },
    ],
  },
  {
    year: 2023,
    items: [
      {
        slug: '2023-12-christmas',
        date: '2023.12.20',
        titleJa: 'クリスマスライブ 2023',
        titleEn: 'Christmas Live 2023',
        descJa: '年内最後のライブ。',
        descEn: 'Our last live of the year.',
        image: '/images/live-2023-12.jpg',
      },
    ],
  },
]

function LiveReports() {
  const { t, i18n } = useTranslation()
  const isJa = i18n.language === 'ja'
  const years = REPORTS.map((r) => r.year)
  const [activeYear, setActiveYear] = useState(years[0])
  const activeData = REPORTS.find((r) => r.year === activeYear)!

  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-7xl mx-auto">
      <SectionTitle subtitle={t('liveReports.subtitle')} title={t('liveReports.title')} />

      {/* Year tabs */}
      <div className="flex gap-6 mb-12">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setActiveYear(y)}
            className={`font-bold text-2xl pb-2 border-b-2 transition-all duration-200 ${
              activeYear === y
                ? 'text-swing-cream border-swing-amber'
                : 'text-swing-warm-gray border-transparent hover:text-swing-amber-light'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeData.items.map((item) => (
          <article
            key={item.slug}
            className="group bg-swing-deep border border-swing-amber/10 rounded-2xl overflow-hidden hover:border-swing-amber/30 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="aspect-[16/9] bg-swing-black overflow-hidden">
              <img
                src={item.image}
                alt={isJa ? item.titleJa : item.titleEn}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
            <div className="p-6">
              <time className="font-mono text-swing-amber text-xs tracking-widest">{item.date}</time>
              <h3 className="text-swing-cream font-bold mt-2 mb-2 group-hover:text-swing-amber transition-colors duration-300">
                {isJa ? item.titleJa : item.titleEn}
              </h3>
              <p className="text-swing-warm-gray text-sm leading-relaxed">
                {isJa ? item.descJa : item.descEn}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
