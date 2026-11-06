import type { BandSlug } from './cms-types'
import type { InstrumentKind } from '../components/ui/Instrument'

// 正式名。microCMS の「バンド」の選択肢と同じ文言にしておく
export const BAND_NAME: Record<BandSlug, string> = {
  bsjo: 'Blue Spirits Jazz Orchestra',
  sao: 'Swing Arcade Orchestra',
  tnwjo: 'The New Wave Jazz Orchestra',
}

// バンドのテーマカラーの面と、その上の文字色
export const BAND_BG: Record<BandSlug, string> = {
  bsjo: 'bg-blue',
  sao: 'bg-red',
  tnwjo: 'bg-navy',
}

export const BAND_TEXT: Record<BandSlug, string> = {
  bsjo: 'text-paper-light',
  sao: 'text-ink',
  tnwjo: 'text-paper-light',
}

// バンドの面に貼る楽器。Count Basie の楽曲を演奏する The New Wave Jazz Orchestra はピアノ
export const BAND_INSTRUMENT: Record<BandSlug, InstrumentKind> = {
  bsjo: 'sax',
  sao: 'drum',
  tnwjo: 'piano',
}
