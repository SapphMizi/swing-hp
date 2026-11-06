import { Instrument } from './Instrument'
import type { InstrumentKind } from './Instrument'

// 記事がまだないときの表示。楽器が眠っている
export function EmptyState({
  text,
  kind = 'trumpet',
}: {
  text: string
  kind?: InstrumentKind
}) {
  return (
    <div className="flex items-center gap-4 rounded-[2rem] bg-paper-light px-5 py-6 shadow-[0_10px_24px_-18px_rgba(43,29,31,0.6)]">
      <div className="relative w-28 shrink-0">
        <Instrument kind={kind} sleep className="breathe block w-full" />
        <span
          aria-hidden
          className="absolute right-3 top-0 font-hand text-xl font-semibold text-ink-soft"
        >
          <span className="zzz absolute">z</span>
          <span className="zzz absolute" style={{ animationDelay: '1.2s' }}>
            z
          </span>
          <span className="zzz absolute" style={{ animationDelay: '2.4s' }}>
            z
          </span>
        </span>
      </div>
      <p className="font-bold">{text}</p>
    </div>
  )
}
