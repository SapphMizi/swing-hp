import type { Band, HistoryEntry } from './cms-types'

// microCMS が未設定、または空のときに表示する内容。
// どれも部が確認済みの事実で、microCMS に入力されたらそちらが優先される。

export const DEFAULT_BANDS: Band[] = [
  {
    id: 'bsjo',
    slug: 'bsjo',
    name: 'Blue Spirits Jazz Orchestra',
    desc: '入部した部員が加入するビッグバンドです。先輩に教わりながら、ジャズを楽しんでいきます。',
    desc_en:
      'The big band that all new members join. Learn jazz step by step with guidance from senior members.',
  },
  {
    id: 'sao',
    slug: 'sao',
    name: 'Swing Arcade Orchestra',
    desc: 'ファンクやフュージョンを中心に、オールジャンルに挑戦するバンドです。1年間同じメンバーで活動します。',
    desc_en:
      'A band that takes on all genres, centered on funk and fusion. Members stay together for one full year.',
  },
  {
    id: 'tnwjo',
    slug: 'tnwjo',
    name: 'The New Wave Jazz Orchestra',
    desc: 'ジャズの巨匠カウント・ベイシーの楽曲のみを演奏するバンドです。1年間同じメンバーで活動します。',
    desc_en:
      'A band dedicated exclusively to the music of jazz legend Count Basie. Members stay together for one full year.',
  },
]

const H = (
  year: number,
  text: string,
  text_en: string,
  i: number,
): HistoryEntry => ({
  id: `default-${year}-${i}`,
  year,
  text,
  text_en,
})

export const DEFAULT_HISTORY: HistoryEntry[] = [
  H(1961, 'ハワイアン創立', 'Hawaiian band founded', 0),
  H(1962, '軽音楽部として承認', 'Approved as a light music club', 1),
  H(1962, 'カントリー設立', 'Country band established', 2),
  H(
    1963,
    'フルバンド設立（後のSwing Academy Orchestra）',
    'Full band established (later Swing Academy Orchestra)',
    3,
  ),
  H(
    1964,
    'カントリーがロックとウェスタンに分離',
    'Country split into Rock and Western',
    4,
  ),
  H(1964, '第一回三大学演奏会開催', 'First tri-university concert held', 5),
  H(
    1965,
    '第一回定期演奏会開催（大阪大学中之島講堂）',
    'First regular concert held (Osaka University Nakanoshima Auditorium)',
    6,
  ),
  H(1965, 'ディキシー設立', 'Dixieland band established', 7),
  H(1966, 'フォーク設立', 'Folk band established', 8),
  H(1966, 'モダンジャズ設立', 'Modern Jazz band established', 9),
  H(1969, 'フォーク解散', 'Folk band disbanded', 10),
  H(
    1969,
    'フルバンド・ウエスタン、バンド合戦近畿大会出場',
    'Full band and Western band appear in Kansai competition',
    11,
  ),
  H(
    1970,
    'フルバンド、Light Music Contest 関西代表として全国決勝大会に出場',
    'Full band represents Kansai at national contest',
    12,
  ),
  H(1972, 'ハワイアン解散', 'Hawaiian band disbanded', 13),
  H(1973, 'カントリー解散', 'Country band disbanded', 14),
]
