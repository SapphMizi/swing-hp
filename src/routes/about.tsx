import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { BandCard } from '../components/home/BandCard'

export const Route = createFileRoute('/about')({ component: About })

const BANDS_DATA = [
  { key: 'bands.dgun' },
  { key: 'bands.sao' },
  { key: 'bands.tnwjo' },
] as const

function About() {
  const { t } = useTranslation()
  return (
    <main className="pt-32 pb-24 px-8 md:px-16 max-w-7xl mx-auto">
      <SectionTitle subtitle={t('about.subtitle')} title={t('about.title')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        <div>
          <p className="text-swing-warm-gray-light leading-loose text-base md:text-lg mb-6">
            {t('about.intro')}
          </p>
          <h3 className="text-swing-amber font-mono text-xs tracking-[0.35em] uppercase mb-3">
            {t('about.activity')}
          </h3>
          <p className="text-swing-warm-gray-light leading-loose text-sm md:text-base">
            {t('about.activityText')}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/images/swing_logo.jpg"
            alt="SWING"
            className="w-64 h-64 object-contain rounded-2xl opacity-90"
          />
        </div>
      </div>

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
    </main>
  )
}
