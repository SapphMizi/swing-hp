import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Page } from '../components/layout/Page'
import { SectionHeading } from '../components/ui/SectionHeading'
import type { HistoryEntry } from '../lib/cms-types'
import { useLocalized } from '../lib/format'
import { historyQuery } from '../lib/queries'

export const Route = createFileRoute('/history')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(historyQuery()),
  head: () => ({ meta: [{ title: '歴史 | 大阪大学 軽音楽部 SWING' }] }),
  component: History,
})

// 同じ年の出来事を1行にまとめる
function groupByYear(entries: HistoryEntry[]) {
  const groups = new Map<number, HistoryEntry[]>()
  for (const e of entries)
    groups.set(e.year, [...(groups.get(e.year) ?? []), e])
  return [...groups.entries()]
}

function History() {
  const { t } = useTranslation()
  const l = useLocalized()
  const { data } = useSuspenseQuery(historyQuery())

  return (
    <Page narrow>
      <SectionHeading as="h1" en="History" ja={t('history.label')} />
      <ol className="border-t-2 border-ink">
        {groupByYear(data).map(([year, entries]) => (
          <li
            key={year}
            className="grid gap-2 border-b-2 border-dashed border-ink/40 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8"
          >
            <span className="text-3xl font-black leading-none tabular">
              {year}
            </span>
            <ul className="space-y-2 text-lg leading-relaxed">
              {entries.map((e) => (
                <li key={e.id}>{l(e.text, e.text_en)}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Page>
  )
}
