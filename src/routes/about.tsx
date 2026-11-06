import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { BandSheets } from '../components/home/BandSheets'
import { SectionHeading } from '../components/ui/SectionHeading'
import { bandsQuery } from '../lib/queries'

export const Route = createFileRoute('/about')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(bandsQuery()),
  head: () => ({ meta: [{ title: '部について | 大阪大学 軽音楽部 SWING' }] }),
  component: About,
})

function About() {
  const { t } = useTranslation()
  const { data: bands } = useSuspenseQuery(bandsQuery())

  return (
    <main>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[3fr_2fr] lg:items-center">
        <div>
          <SectionHeading as="h1" en="About" ja={t('about.label')} />
          <p className="max-w-[36ch] text-xl font-bold leading-relaxed">
            {t('about.intro')}
          </p>
          <p className="mt-4 max-w-[40ch] text-lg leading-relaxed">
            {t('about.beginners')}
          </p>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="text-lg font-black">{t('about.activityTitle')}</dt>
              <dd className="mt-2 leading-relaxed">
                {t('about.activityText')}
              </dd>
            </div>
            <div>
              <dt className="text-lg font-black">{t('about.placeTitle')}</dt>
              <dd className="mt-2 leading-relaxed">{t('about.placeText')}</dd>
            </div>
          </dl>
        </div>
        <img
          src="/images/hand/logo.webp"
          alt="SWING  All you need is Jazz"
          width={572}
          height={420}
          className="mx-auto h-auto w-full max-w-[460px]"
        />
      </div>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading en="Combo & Big Band" ja={t('about.formsLabel')} />
        <div className="grid gap-6 md:grid-cols-2">
          {(
            [
              ['comboTitle', 'comboText', 'bg-teal'],
              ['bigbandTitle', 'bigbandText', 'bg-orange'],
            ] as const
          ).map(([title, text, bg], i) => (
            <div
              key={title}
              className={`rounded-[1.75rem] border-2 border-ink p-6 shadow-[0_4px_0_0_var(--color-ink)] md:p-8 ${bg}`}
              style={{ rotate: i === 0 ? '-1deg' : '1deg' }}
            >
              <h3 className="text-2xl font-black">{t(`about.${title}`)}</h3>
              <p className="mt-3 text-lg leading-relaxed">
                {t(`about.${text}`)}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading en="Our Bands" ja={t('home.bandsLabel')} />
      </div>
      <BandSheets bands={bands} headingLevel="h3" detailed />
      <div className="h-20" />
    </main>
  )
}
