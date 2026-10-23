import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Post } from '../lib/cms-types'
import { BAND_NAME } from '../lib/bands'
import { formatDate, useLocalized } from '../lib/format'
import { Page } from './layout/Page'
import { RichText } from './ui/RichText'
import { TapedPhoto } from './ui/TapedPhoto'

// お知らせとライブレポートの本文ページ
export function ArticlePage({
  post,
  backTo,
  notFoundText,
}: {
  post: Post | null
  backTo: LinkProps['to']
  notFoundText: string
}) {
  const { t } = useTranslation()
  const l = useLocalized()

  const back = (
    <Link
      to={backTo}
      className="inline-flex min-h-11 items-center gap-2 font-bold text-ink"
    >
      <ArrowLeft aria-hidden size={18} strokeWidth={2.5} />
      {t('common.backToList')}
    </Link>
  )

  if (!post) {
    return (
      <Page narrow>
        <p className="text-lg font-bold">{notFoundText}</p>
        <div className="mt-6">{back}</div>
      </Page>
    )
  }

  const date = post.eventDate ?? post.publishedAt
  const body = l(post.body, post.body_en)

  return (
    <Page narrow>
      {back}
      <article className="mt-8">
        <header>
          <time dateTime={date} className="font-hand text-lg">
            {formatDate(date)}
          </time>
          <h1 className="mt-2 text-[clamp(1.8rem,4.5vw,3rem)] font-black leading-tight [text-wrap:balance]">
            {l(post.title, post.title_en)}
          </h1>
          {post.bands && post.bands.length > 0 && (
            <ul
              className="mt-4 flex flex-wrap gap-2"
              aria-label={t('common.bands')}
            >
              {post.bands.map((b) => (
                <li
                  key={b}
                  className="rounded-full border-2 border-ink bg-paper-light px-3 text-sm font-black"
                  lang="en"
                >
                  {BAND_NAME[b]}
                </li>
              ))}
            </ul>
          )}
        </header>
        {post.eyecatch && (
          <TapedPhoto
            image={post.eyecatch}
            alt=""
            sizes="(min-width: 896px) 860px, 92vw"
            tilt={-1}
            priority
            className="my-12"
          />
        )}
        <div className="mt-10 rounded-sm bg-paper-light px-5 py-8 sm:px-10 sm:py-12">
          <RichText html={body} />
        </div>
      </article>
      <div className="mt-12">{back}</div>
    </Page>
  )
}
