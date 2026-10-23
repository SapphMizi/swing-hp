import { createServerFn } from '@tanstack/react-start'
import { createClient } from 'microcms-js-sdk'
import type {
  Band,
  BandSlug,
  CmsImage,
  HistoryEntry,
  Post,
  PostCategory,
  PostList,
  SiteSettings,
} from '../lib/cms-types'
import { BAND_NAME } from '../lib/bands'
import { DEFAULT_BANDS, DEFAULT_HISTORY } from '../lib/defaults'

// 管理画面のセレクトフィールドの選択肢。部員が読んで分かる言葉にしてあるので、ここで識別子に直す。
// 選択肢の文言を管理画面で変えたら、ここも合わせて変える。
const CATEGORY_LABEL: Record<PostCategory, string> = {
  news: 'お知らせ',
  'live-report': 'ライブレポート',
}

function categoryFromLabel(labels?: string[]): PostCategory | undefined {
  const entry = Object.entries(CATEGORY_LABEL).find(([, label]) =>
    labels?.includes(label),
  )
  return entry?.[0] as PostCategory | undefined
}

function bandFromName(name: string): BandSlug | undefined {
  const entry = Object.entries(BAND_NAME).find(([, n]) => n === name)
  return entry?.[0] as BandSlug | undefined
}

// microCMS から届く生の形
interface RawPost {
  id: string
  publishedAt: string
  category?: string[]
  title: string
  title_en?: string
  body?: string
  body_en?: string
  eyecatch?: CmsImage
  eventDate?: string
  bands?: string[]
}

interface RawBand {
  id: string
  band: string[]
  desc: string
  desc_en?: string
  photo?: CmsImage
  instagram?: string
  x?: string
}

function toPost(raw: RawPost): Post {
  return {
    ...raw,
    body: raw.body ?? '',
    category: categoryFromLabel(raw.category),
    bands: raw.bands?.map(bandFromName).filter((b): b is BandSlug => !!b),
  }
}

// API キーはここ(サーバー側)だけで読む。ブラウザには渡らない。
function getClient() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY
  if (!serviceDomain || !apiKey) return null
  return createClient({ serviceDomain, apiKey })
}

// 環境変数がない、または API が失敗したときは fallback を返し、ページは表示し続ける
async function safely<T>(
  label: string,
  fallback: T,
  run: () => Promise<T>,
): Promise<T> {
  try {
    return await run()
  } catch (error) {
    console.error(`[microCMS] ${label} の取得に失敗しました`, error)
    return fallback
  }
}

interface PostsInput {
  category: PostCategory
  limit?: number
  // 日付(eventDate)の年で絞り込む。ライブレポートの年のタブで使う
  year?: number
}

const EMPTY_LIST: PostList = { contents: [], totalCount: 0 }

export const getPosts = createServerFn({ method: 'GET' })
  .inputValidator((input: PostsInput) => input)
  .handler(async ({ data }): Promise<PostList> => {
    const client = getClient()
    if (!client) return EMPTY_LIST
    const filters = [`category[contains]${CATEGORY_LABEL[data.category]}`]
    if (data.year) {
      // 日本時間の1月1日0時から12月31日24時まで
      filters.push(
        `eventDate[greater_than]${data.year - 1}-12-31T14:59:59.999Z`,
        `eventDate[less_than]${data.year}-12-31T15:00:00.000Z`,
      )
    }
    return safely('posts', EMPTY_LIST, async () => {
      const res = await client.getList<RawPost>({
        endpoint: 'posts',
        queries: {
          filters: filters.join('[and]'),
          limit: data.limit ?? 30,
          orders: '-eventDate',
          fields:
            'id,publishedAt,category,title,title_en,eyecatch,eventDate,bands',
        },
      })
      return { contents: res.contents.map(toPost), totalCount: res.totalCount }
    })
  })

export const getPost = createServerFn({ method: 'GET' })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }): Promise<Post | null> => {
    const client = getClient()
    if (!client) return null
    return safely('post', null, async () =>
      toPost(
        await client.get<RawPost>({ endpoint: 'posts', contentId: data.id }),
      ),
    )
  })

// ライブレポートがある年の一覧(年のタブ用)
export const getLiveReportYears = createServerFn({ method: 'GET' }).handler(
  async (): Promise<number[]> => {
    const client = getClient()
    if (!client) return []
    return safely('live report years', [], async () => {
      const res = await client.getAllContents<
        Pick<RawPost, 'eventDate' | 'publishedAt'>
      >({
        endpoint: 'posts',
        queries: {
          filters: `category[contains]${CATEGORY_LABEL['live-report']}`,
          fields: 'eventDate,publishedAt',
        },
      })
      // 年は日本時間で数える
      const years = res.map((p) =>
        new Date(
          Date.parse(p.eventDate ?? p.publishedAt) + 9 * 3600_000,
        ).getUTCFullYear(),
      )
      return [...new Set(years)].sort((a, b) => b - a)
    })
  },
)

export const getSite = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SiteSettings> => {
    const client = getClient()
    if (!client) return {}
    return safely<SiteSettings>('site', {}, () =>
      client.getObject<SiteSettings>({ endpoint: 'site' }),
    )
  },
)

export const getBands = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Band[]> => {
    const client = getClient()
    if (!client) return DEFAULT_BANDS
    return safely('bands', DEFAULT_BANDS, async () => {
      const res = await client.getList<RawBand>({
        endpoint: 'bands',
        queries: { orders: 'order', limit: 10 },
      })
      const bands = res.contents.flatMap((raw): Band[] => {
        const slug = bandFromName(raw.band[0] ?? '')
        if (!slug) return []
        const { band: _band, ...rest } = raw
        return [{ ...rest, slug, name: BAND_NAME[slug] }]
      })
      return bands.length > 0 ? bands : DEFAULT_BANDS
    })
  },
)

export const getHistory = createServerFn({ method: 'GET' }).handler(
  async (): Promise<HistoryEntry[]> => {
    const client = getClient()
    if (!client) return DEFAULT_HISTORY
    return safely('history', DEFAULT_HISTORY, async () => {
      const res = await client.getAllContents<HistoryEntry>({
        endpoint: 'history',
        queries: { orders: 'year' },
      })
      return res.length > 0 ? res : DEFAULT_HISTORY
    })
  },
)
