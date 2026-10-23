import { Link } from '@tanstack/react-router'
import type { Post } from '../../lib/cms-types'
import { formatDate, useLocalized } from '../../lib/format'
import { TapedPhoto } from '../ui/TapedPhoto'

const TILTS = [-2, 1.5, -1, 2, -1.5, 1]
// 写真がない記事に使う面の色
const PLAIN = ['bg-yellow', 'bg-teal', 'bg-green']

// ライブレポートを、紙に貼った写真のように並べる
export function ReportGrid({
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
    <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => {
        const title = l(post.title, post.title_en)
        return (
          <li key={post.id} className={i % 3 === 1 ? 'lg:mt-10' : ''}>
            <Link
              to="/live-reports/$id"
              params={{ id: post.id }}
              className="group block text-ink no-underline"
            >
              <div className="transition-transform duration-150 group-hover:-translate-y-1">
                {post.eyecatch ? (
                  <TapedPhoto
                    image={post.eyecatch}
                    alt=""
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    tilt={TILTS[i % TILTS.length]}
                  />
                ) : (
                  <div
                    aria-hidden
                    className={`flex aspect-[4/3] items-center justify-center border-2 border-ink p-6 ${PLAIN[i % PLAIN.length]}`}
                    style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
                  >
                    <span className="font-hand text-2xl leading-snug">
                      {title}
                    </span>
                  </div>
                )}
              </div>
              <time
                dateTime={post.eventDate ?? post.publishedAt}
                className="mt-5 block font-hand text-base"
              >
                {formatDate(post.eventDate ?? post.publishedAt)}
              </time>
              <span className="mt-1 block text-lg font-bold leading-snug group-hover:underline">
                {title}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
