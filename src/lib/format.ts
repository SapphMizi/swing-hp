import { useTranslation } from 'react-i18next'
import type { CmsImage } from './cms-types'

// 英語表示で英語欄が空なら日本語を出す
export function useLocalized() {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  return (ja: string, en?: string) => (isEn && en ? en : ja)
}

// microCMS の画像 API で表示幅に合わせて縮小する
export function imageUrl(image: CmsImage | string, width: number) {
  const url = typeof image === 'string' ? image : image.url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}w=${width}&fm=webp&q=80`
}

export function imageSrcSet(image: CmsImage, widths: number[]) {
  return widths.map((w) => `${imageUrl(image, w)} ${w}w`).join(', ')
}

// 日本時間での日付の部品(microCMS の日付は UTC で返る)
export function dateParts(iso: string) {
  const d = new Date(new Date(iso).getTime() + 9 * 60 * 60 * 1000)
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  }
}

export function formatDate(iso: string) {
  const { year, month, day } = dateParts(iso)
  return `${year}.${month}.${day}`
}
