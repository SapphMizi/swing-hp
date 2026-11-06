import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { Page } from '../components/layout/Page'
import { RichText } from '../components/ui/RichText'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TapedPhoto } from '../components/ui/TapedPhoto'
import { BAND_BG, BAND_NAME, BAND_TEXT } from '../lib/bands'
import type {
  Award,
  BandSlug,
  ContestSlug,
  HistoryEntry,
  HistoryKind,
} from '../lib/cms-types'
import { useLocalized } from '../lib/format'
import {
  awardsQuery,
  bandsQuery,
  historyQuery,
  siteQuery,
} from '../lib/queries'

export const Route = createFileRoute('/history')({
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData(historyQuery()),
      queryClient.ensureQueryData(bandsQuery()),
      queryClient.ensureQueryData(awardsQuery()),
      queryClient.ensureQueryData(siteQuery()),
    ]),
  head: () => ({ meta: [{ title: '歴史 | 大阪大学 軽音楽部 SWING' }] }),
  component: History,
})

// 年表の印の色。種類が入っていない出来事は紙の色
const KIND_DOT: Record<HistoryKind, string> = {
  start: 'bg-teal',
  end: 'bg-ink-soft',
  concert: 'bg-yellow',
  contest: 'bg-orange',
}
const KINDS = Object.keys(KIND_DOT) as HistoryKind[]

// 山野ビッグバンドジャズコンテストで入賞になる順位の下限
const PLACED_UNTIL = 10
// microCMS の「バンドの賞」にこの文言が入った年を数える
const GAKUBAN = '学バンアワード'

// 最初に見せるコンテストの記録の件数。残りは「すべて見る」で開く
const RECENT = 8

function groupByYear(entries: HistoryEntry[]) {
  const groups = new Map<number, HistoryEntry[]>()
  for (const e of entries)
    groups.set(e.year, [...(groups.get(e.year) ?? []), e])
  return [...groups.entries()]
}

function rankOf(result: string) {
  const m = /^(\d+)位$/.exec(result)
  return m ? Number(m[1]) : null
}

// 順位の文字の強さ。3位までは大きく、順位がない年(出場せず など)は薄く
function rankStyle(result: string) {
  const rank = rankOf(result)
  if (rank === null) return 'text-sm text-ink-soft'
  if (rank <= 3) return 'text-xl font-black'
  return 'text-base font-black'
}

function History() {
  const { t } = useTranslation()
  const l = useLocalized()
  const { data: history } = useSuspenseQuery(historyQuery())
  const { data: bands } = useSuspenseQuery(bandsQuery())
  const { data: awards } = useSuspenseQuery(awardsQuery())
  const { data: site } = useSuspenseQuery(siteQuery())
  const photos = site.historyImages?.slice(0, 3) ?? []
  const stories = bands.filter((b) => b.story)

  // /history#story-tnwjo のように来たら、そのバンドの話を開いてから移る
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id.startsWith('story-')) return
    const el = document.getElementById(id)
    if (el instanceof HTMLDetailsElement) {
      el.open = true
      el.scrollIntoView({ block: 'start' })
    }
  }, [])

  return (
    <Page>
      <div className="max-w-4xl">
        <SectionHeading as="h1" en="History" ja={t('history.label')} />
        <p className="max-w-[38ch] text-xl font-bold leading-relaxed">
          {t('history.intro')}
        </p>
      </div>

      {photos.length > 0 && (
        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {photos.map((img, i) => (
            <TapedPhoto
              key={img.url}
              image={img}
              alt=""
              sizes="(min-width: 640px) 30vw, 92vw"
              tilt={[-2, 1.5, -1][i]}
            />
          ))}
        </div>
      )}

      <section className="mt-20 max-w-4xl">
        <SectionHeading en="Timeline" ja={t('history.timelineLabel')} />
        <ul className="-mt-4 mb-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
          {KINDS.map((k) => (
            <li key={k} className="flex items-center gap-2">
              <span
                aria-hidden
                className={`h-3.5 w-3.5 rounded-full border-2 border-ink ${KIND_DOT[k]}`}
              />
              {t(`history.kinds.${k}`)}
            </li>
          ))}
        </ul>
        <ol>
          {groupByYear(history).map(([year, entries]) => (
            <li
              key={year}
              className="grid grid-cols-[4.25rem_1fr] gap-4 sm:grid-cols-[6rem_1fr] sm:gap-6"
            >
              <span className="pt-0.5 text-right text-2xl font-black leading-none tabular sm:text-3xl">
                {year}
              </span>
              <ul className="space-y-3 border-l-[3px] border-ink pb-7 pl-5">
                {entries.map((e) => (
                  <li key={e.id} className="relative leading-relaxed">
                    <span
                      aria-hidden
                      className={`absolute -left-[1.95rem] top-[0.3em] h-4 w-4 rounded-full border-2 border-ink ${e.kind ? KIND_DOT[e.kind] : 'bg-paper'}`}
                    />
                    {e.kind && (
                      <span className="sr-only">
                        {t(`history.kinds.${e.kind}`)}:{' '}
                      </span>
                    )}
                    {l(e.text, e.text_en)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {stories.length > 0 && (
        <section className="mt-16 max-w-4xl">
          <SectionHeading en="Band Stories" ja={t('history.storiesLabel')} />
          <p className="-mt-4 mb-8 font-bold">{t('history.storiesNote')}</p>
          <div className="space-y-5">
            {stories.map((band) => (
              <details
                key={band.id}
                id={`story-${band.slug}`}
                className="group scroll-mt-28 rounded-[1.75rem] border-2 border-ink bg-paper-light shadow-[0_4px_0_0_var(--color-ink)]"
              >
                <summary
                  className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-[1.6rem] px-5 py-3 text-xl font-black leading-tight group-open:rounded-b-none md:text-2xl [&::-webkit-details-marker]:hidden ${BAND_BG[band.slug]} ${BAND_TEXT[band.slug]}`}
                >
                  {band.name}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-light text-ink transition-transform duration-300 ease-[var(--ease-spring)] group-open:rotate-45">
                    <Plus aria-hidden size={20} strokeWidth={3} />
                  </span>
                </summary>
                <div className="story px-5 pb-8 pt-6 md:px-8">
                  <RichText html={l(band.story ?? '', band.story_en)} />
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {awards.length > 0 && (
        <section className="mt-20">
          <SectionHeading en="Contests" ja={t('history.awardsLabel')} />
          <div className="space-y-16">
            {groupAwards(awards).map(({ band, contest, list }) => (
              <AwardTable
                key={`${band}-${contest}`}
                band={band}
                contest={contest}
                list={list}
              />
            ))}
          </div>
        </section>
      )}
    </Page>
  )
}

function groupAwards(awards: Award[]) {
  const groups = new Map<
    string,
    { band: BandSlug; contest: ContestSlug; list: Award[] }
  >()
  for (const a of awards) {
    const key = `${a.band}-${a.contest}`
    const g = groups.get(key) ?? { band: a.band, contest: a.contest, list: [] }
    g.list.push(a)
    groups.set(key, g)
  }
  // 新しい年を上にする
  return [...groups.values()].map((g) => ({
    ...g,
    list: [...g.list].sort((a, b) => b.year - a.year),
  }))
}

function AwardTable({
  band,
  contest,
  list,
}: {
  band: BandSlug
  contest: ContestSlug
  list: Award[]
}) {
  const { t } = useTranslation()
  const recent = list.slice(0, RECENT)
  const older = list.slice(RECENT)
  // 3位までに入った回数
  const countRank = (from: number, to: number) =>
    list.filter((a) => {
      const rank = rankOf(a.result)
      return rank !== null && rank >= from && rank <= to
    }).length
  // 1〜3位はそれぞれの回数。山野では10位以内が入賞なので、4〜10位はまとめて「入賞」として数える
  const summary = [
    ...[1, 2, 3].map((rank) => ({
      key: `rank-${rank}`,
      label: `${rank}位`,
      count: countRank(rank, rank),
    })),
    ...(contest === 'yamano'
      ? [
          {
            key: 'placed',
            label: t('history.placed'),
            count: countRank(4, PLACED_UNTIL),
          },
        ]
      : []),
    {
      key: 'gakuban',
      label: t('history.gakuban'),
      count: list.filter((a) => a.prize === GAKUBAN).length,
    },
  ].filter((p) => p.count > 0)

  return (
    <div>
      <h3 className="text-xl font-black leading-snug [text-wrap:balance] md:text-3xl">
        {t(`history.contests.${contest}`)}
      </h3>
      <p className="mt-2 flex items-center gap-2 font-bold">
        <span
          aria-hidden
          className={`h-3.5 w-3.5 rounded-full border-2 border-ink ${BAND_BG[band]}`}
        />
        {BAND_NAME[band]}
      </p>
      {summary.length > 0 && (
        <dl className="mt-6 grid grid-cols-3 gap-y-5 sm:flex sm:gap-0">
          {summary.map(({ key, label, count }) => (
            <div
              key={key}
              className="sm:border-l-2 sm:border-dashed sm:border-ink/30 sm:px-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="text-sm font-bold">{label}</dt>
              <dd className="mt-1 text-4xl font-black leading-none tabular">
                {count}
                <span className="ml-0.5 text-base">
                  {t('history.timesUnit')}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}
      <AwardRows list={recent} />
      {older.length > 0 && (
        <details className="group mt-2">
          <summary className="pop inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full bg-paper-light px-5 font-bold [&::-webkit-details-marker]:hidden">
            <Plus
              aria-hidden
              size={18}
              strokeWidth={3}
              className="transition-transform duration-300 ease-[var(--ease-spring)] group-open:rotate-45"
            />
            {t('history.showAll', { from: older[older.length - 1].year })}
          </summary>
          <AwardRows list={older} />
        </details>
      )}
    </div>
  )
}

function AwardRows({ list }: { list: Award[] }) {
  const { t } = useTranslation()
  return (
    <ol className="mt-6 divide-y-2 divide-dashed divide-ink/30 border-y-2 border-ink">
      {list.map((a) => (
        <li
          key={a.id}
          className="grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-1 py-4 sm:grid-cols-[4.5rem_7.5rem_1fr_14rem] sm:items-baseline"
        >
          <span className="text-xl font-black tabular">{a.year}</span>
          <span className={`leading-tight tabular ${rankStyle(a.result)}`}>
            {a.result}
          </span>
          <div className="col-start-2 text-sm leading-relaxed sm:col-start-auto">
            {a.prize && <p className="font-bold">{a.prize}</p>}
            {[...(a.soloists ?? []), ...(a.others ?? [])].map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          {a.concertmaster && (
            <p className="col-start-2 text-sm text-ink-soft sm:col-start-auto">
              <span className="font-bold">{t('history.concertmaster')}</span>{' '}
              {a.concertmaster}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}
