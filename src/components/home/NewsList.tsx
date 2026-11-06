import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { Post } from '../../lib/cms-types'
import { useLocalized } from '../../lib/format'
import { EmptyState } from '../ui/EmptyState'
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
    return <EmptyState text={emptyText} kind="trumpet" />
  }

  return (
    <ul className="space-y-6">
      {posts.map((post, i) => (
        <li key={post.id}>
          <Link
            to="/news/$id"
            params={{ id: post.id }}
            className={`pop group relative flex min-h-24 items-center gap-5 rounded-[1.75rem] py-3 pl-3 pr-4 text-ink no-underline ${ROW_COLORS[i % ROW_COLORS.length]}`}
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
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-light transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-1">
              <ArrowRight aria-hidden size={18} strokeWidth={2.75} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
