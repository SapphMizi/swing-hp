import { dateParts } from '../../lib/format'

// お知らせの日付を示す付箋。傾きは行ごとに変えて、貼った感じを出す
export function StickyDate({ iso, tilt = -4 }: { iso: string; tilt?: number }) {
  const { year, month, day } = dateParts(iso)
  return (
    <time
      dateTime={iso}
      className="relative flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center bg-yellow leading-none text-ink shadow-[0_6px_10px_-5px_rgba(43,29,31,0.45)]"
      style={{ rotate: `${tilt}deg` }}
    >
      <span className="text-xs font-bold">{year}</span>
      <span className="mt-1 text-xl font-black tabular">
        {month}.{day}
      </span>
    </time>
  )
}
