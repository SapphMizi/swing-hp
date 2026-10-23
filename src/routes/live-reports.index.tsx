import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Page } from '../components/layout/Page'
import { ReportGrid } from '../components/home/ReportGrid'
import { SectionHeading } from '../components/ui/SectionHeading'
import { liveReportYearsQuery, postsQuery } from '../lib/queries'

interface Search {
  year?: number
}

export const Route = createFileRoute('/live-reports/')({
  validateSearch: (search: Record<string, unknown>): Search => {
    const year = Number(search.year)
    return Number.isInteger(year) && year > 1900 ? { year } : {}
  },
  loaderDeps: ({ search }) => ({ year: search.year }),
  loader: ({ context: { queryClient }, deps }) =>
    Promise.all([
      queryClient.ensureQueryData(liveReportYearsQuery()),
      queryClient.ensureQueryData(
        postsQuery('live-report', { year: deps.year }),
      ),
    ]),
  head: () => ({
    meta: [{ title: 'ライブレポート | 大阪大学 軽音楽部 SWING' }],
  }),
  component: LiveReports,
})

const TAB =
  'inline-flex min-h-11 items-center rounded-full border-2 border-ink px-5 font-black no-underline tabular transition-colors duration-150'

function LiveReports() {
  const { t } = useTranslation()
  const { year } = Route.useSearch()
  const { data: years } = useSuspenseQuery(liveReportYearsQuery())
  const { data } = useSuspenseQuery(postsQuery('live-report', { year }))

  return (
    <Page>
      <SectionHeading as="h1" en="Live Reports" ja={t('liveReports.label')} />
      {years.length > 0 && (
        <nav aria-label={t('liveReports.label')} className="mb-12">
          <ul className="flex flex-wrap gap-3">
            <li>
              <Link
                to="/live-reports"
                search={{}}
                activeOptions={{ includeSearch: true }}
                className={`${TAB} bg-paper-light text-ink hover:bg-yellow`}
                activeProps={{
                  className: '!bg-ink !text-paper-light',
                  'aria-current': 'page',
                }}
              >
                {t('liveReports.all')}
              </Link>
            </li>
            {years.map((y) => (
              <li key={y}>
                <Link
                  to="/live-reports"
                  search={{ year: y }}
                  activeOptions={{ includeSearch: true }}
                  className={`${TAB} bg-paper-light text-ink hover:bg-yellow`}
                  activeProps={{
                    className: '!bg-ink !text-paper-light',
                    'aria-current': 'page',
                  }}
                >
                  {y}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <ReportGrid posts={data.contents} emptyText={t('liveReports.empty')} />
    </Page>
  )
}
