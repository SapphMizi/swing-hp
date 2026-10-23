import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { Post } from '../../lib/cms-types'
import { useLocalized } from '../../lib/format'
import { StickyDate } from '../ui/StickyDate'

// 行の色はアイコンの色鉛筆の色を順に使う。文字は ink(どの色の上でも 6.7:1 以上)
const ROW_COLORS = ['bg-teal', 'bg-orange', 'bg-green']
const TILTS = [-4, 3, -2]

export function NewsList({
  posts,
  emptyText,
}: {
  posts: Post[]
  emptyText: string
}) {
  const l = useLocalized()

  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-dashed border-ink/50 bg-paper-light px-6 py-8 font-bold">
        {emptyText}
      </p>
    )
  }

  return (
    <ul className="space-y-6">
      {posts.map((post, i) => (
        <li key={post.id}>
          <Link
            to="/news/$id"
            params={{ id: post.id }}
            className={`group relative flex min-h-24 items-center gap-5 rounded-2xl border-2 border-ink py-3 pl-3 pr-5 text-ink no-underline transition-transform duration-150 hover:-translate-y-0.5 ${ROW_COLORS[i % ROW_COLORS.length]}`}
          >
            <span className="-my-6 -ml-6">
              <StickyDate
                iso={post.eventDate ?? post.publishedAt}
                tilt={TILTS[i % TILTS.length]}
              />
            </span>
            <span className="flex-1 text-base font-bold leading-snug md:text-lg">
              {l(post.title, post.title_en)}
            </span>
            <ArrowRight
              aria-hidden
              size={22}
              strokeWidth={2.5}
              className="shrink-0 transition-transform duration-150 group-hover:translate-x-1"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
