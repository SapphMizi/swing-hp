import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Page } from '../components/layout/Page'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SnsLinks } from '../components/ui/SnsLinks'
import { BAND_BG, BAND_TEXT } from '../lib/bands'
import { bandsQuery, siteQuery } from '../lib/queries'

export const Route = createFileRoute('/contact')({
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(siteQuery()),
      queryClient.ensureQueryData(bandsQuery()),
    ]),
  head: () => ({ meta: [{ title: '見学・連絡 | 大阪大学 軽音楽部 SWING' }] }),
  component: Contact,
})

function Contact() {
  const { t } = useTranslation()
  const { data: site } = useSuspenseQuery(siteQuery())
  const { data: bands } = useSuspenseQuery(bandsQuery())

  return (
    <Page>
      <SectionHeading as="h1" en="Contact" ja={t('contact.label')} />
      <p className="max-w-[40ch] text-xl font-bold leading-relaxed">
        {t('contact.intro')}
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[2fr_3fr]">
        <section aria-labelledby="mail-heading">
          <h2 id="mail-heading" className="text-2xl font-black">
            {t('contact.mailTitle')}
          </h2>
          <div className="mt-5 rounded-2xl border-2 border-ink bg-paper-light p-6">
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center gap-3 break-all text-lg font-bold text-pink-deep"
              >
                <Mail
                  aria-hidden
                  size={22}
                  strokeWidth={2.25}
                  className="shrink-0"
                />
                {site.email}
              </a>
            ) : (
              <p className="font-bold">{t('contact.unset')}</p>
            )}
            <p className="mt-4 text-sm leading-relaxed">
              {t('contact.emailNote')}
            </p>
          </div>
          {(site.instagram || site.x) && (
            <div className="mt-6">
              <SnsLinks
                instagram={site.instagram}
                x={site.x}
                label="SWING SNS"
                emptyText=""
              />
            </div>
          )}
        </section>

        <section aria-labelledby="sns-heading">
          <h2 id="sns-heading" className="text-2xl font-black">
            {t('contact.snsTitle')}
          </h2>
          <ul className="mt-5 space-y-4">
            {bands.map((band) => {
              const name = band.name
              return (
                <li
                  key={band.id}
                  className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-ink p-5 ${BAND_BG[band.slug]} ${BAND_TEXT[band.slug]}`}
                >
                  <span className="text-lg font-black">{name}</span>
                  <SnsLinks
                    instagram={band.instagram}
                    x={band.x}
                    label={`${name} SNS`}
                    emptyText={t('contact.unset')}
                  />
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </Page>
  )
}
