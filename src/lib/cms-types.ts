// 画面で使う形。microCMS から届く生の形は src/server/cms.ts で変換する。
// スキーマは docs/microcms-schema/ にある。

export interface CmsImage {
  url: string
  width?: number
  height?: number
}

export type PostCategory = 'news' | 'live-report'
export type BandSlug = 'bsjo' | 'sao' | 'tnwjo'

export interface Post {
  id: string
  publishedAt: string
  category?: PostCategory
  title: string
  title_en?: string
  body: string
  body_en?: string
  eyecatch?: CmsImage
  eventDate?: string
  bands?: BandSlug[]
}

export interface PostList {
  contents: Post[]
  totalCount: number
}

export interface SiteSettings {
  heroImages?: CmsImage[]
  // 歴史のページの上に貼る写真
  historyImages?: CmsImage[]
  heroCopy?: string
  heroCopy_en?: string
  email?: string
  instagram?: string
  x?: string
}

export interface Band {
  id: string
  slug: BandSlug
  name: string
  desc: string
  desc_en?: string
  // 活動の特徴。1行に1つ
  points?: string[]
  points_en?: string[]
  // 1枚目をバンド紹介に使う
  photos?: CmsImage[]
  instagram?: string
  x?: string
  // 歴史のページに載せる、バンドの歩み(リッチエディタの HTML)
  story?: string
  story_en?: string
}

export type HistoryKind = 'start' | 'end' | 'concert' | 'contest'

export interface HistoryEntry {
  id: string
  year: number
  text: string
  text_en?: string
  kind?: HistoryKind
}

export type ContestSlug = 'yamano' | 'stellar' | 'other'

// コンテストの記録。1年1コンテストで1件
export interface Award {
  id: string
  band: BandSlug
  contest: ContestSlug
  year: number
  // 「4位」「出場せず」「コンサート形式」など
  result: string
  prize?: string
  // 1行に1人
  soloists?: string[]
  others?: string[]
  concertmaster?: string
}
