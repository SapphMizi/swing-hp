import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Hero } from '../components/home/Hero'
import { NewsList } from '../components/home/NewsList'
import { BandSheets } from '../components/home/BandSheets'
import { ReportGrid } from '../components/home/ReportGrid'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ButtonLink } from '../components/ui/ButtonLink'
import { TornEdge } from '../components/ui/TornEdge'
import { bandsQuery, postsQuery, siteQuery } from '../lib/queries'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(siteQuery()),
      queryClient.ensureQueryData(postsQuery('news', { limit: 3 })),
      queryClient.ensureQueryData(postsQuery('live-report', { limit: 3 })),
      queryClient.ensureQueryData(bandsQuery()),
    ]),
  component: Home,
})

function MoreLink({
  to,
  children,
}: {
  to: '/news' | '/live-reports'
  children: string
}) {
  return (
    <Link
      to={to}
      className="group inline-flex min-h-11 items-center gap-2 font-bold text-pink-deep"
    >
      {children}
      <ArrowRight
        aria-hidden
        size={18}
        strokeWidth={2.5}
        className="transition-transform duration-150 group-hover:translate-x-1"
      />
    </Link>
  )
}

function Home() {
  const { t } = useTranslation()
  const { data: site } = useSuspenseQuery(siteQuery())
  const { data: news } = useSuspenseQuery(postsQuery('news', { limit: 3 }))
  const { data: reports } = useSuspenseQuery(
    postsQuery('live-report', { limit: 3 }),
  )
  const { data: bands } = useSuspenseQuery(bandsQuery())

  return (
    <main>
      <Hero site={site} />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <SectionHeading en="News" ja={t('home.newsLabel')} />
        <div>
          <NewsList posts={news.contents} emptyText={t('home.newsEmpty')} />
          {news.totalCount > 3 && (
            <div className="mt-6 text-right">
              <MoreLink to="/news">{t('common.more')}</MoreLink>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            en="Our Bands"
            ja={t('home.bandsLabel')}
            className="!mb-12"
          />
        </div>
        <BandSheets bands={bands} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading en="Live Reports" ja={t('home.reportsLabel')} />
          {reports.totalCount > 3 && (
            <div className="mb-14 hidden md:block">
              <MoreLink to="/live-reports">{t('common.more')}</MoreLink>
            </div>
          )}
        </div>
        <ReportGrid
          posts={reports.contents}
          emptyText={t('home.reportsEmpty')}
        />
        {reports.totalCount > 3 && (
          <div className="mt-8 text-right md:hidden">
            <MoreLink to="/live-reports">{t('common.more')}</MoreLink>
          </div>
        )}
      </section>

      <section className="relative bg-ink text-paper-light">
        <TornEdge className="bg-ink" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[3fr_2fr]">
          <div>
            <SectionHeading
              en="Join Us"
              ja={t('home.joinLabel')}
              tone="paper"
            />
            <p className="max-w-[40ch] text-lg leading-relaxed">
              {t('home.joinText')}
            </p>
            <div className="mt-8">
              <ButtonLink to="/contact" variant="secondary">
                {t('home.joinCta')}
              </ButtonLink>
            </div>
          </div>
          <div
            className="relative mx-auto w-full max-w-[380px] bg-paper px-6 pb-4 pt-8 shadow-[0_18px_30px_-16px_rgba(0,0,0,0.6)]"
            style={{ rotate: '3deg' }}
          >
            <img
              src="/images/hand/bubble.webp"
              alt=""
              width={314}
              height={134}
              loading="lazy"
              className="ml-auto w-[78%]"
            />
            <img
              src="/images/hand/chara.webp"
              alt=""
              width={323}
              height={328}
              loading="lazy"
              className="-mt-6 w-[42%]"
            />
            <p className="absolute bottom-6 right-6 font-hand text-xl text-ink">
              {t('home.joinNote')}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
