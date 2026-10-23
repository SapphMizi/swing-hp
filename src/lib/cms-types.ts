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
  photo?: CmsImage
  instagram?: string
  x?: string
}

export interface HistoryEntry {
  id: string
  year: number
  text: string
  text_en?: string
}
