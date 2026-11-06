import { useId } from 'react'

// アイコンの下にある鍵盤を、セクションの区切りとして横に並べる帯
const WHITE = 22
// 1オクターブ(白鍵7本)のうち、黒鍵が右隣に付く白鍵の位置
const BLACK_AFTER = [0, 1, 3, 4, 5]

export function Keys({
  height = 34,
  className = '',
}: {
  height?: number
  className?: string
}) {
  const id = useId()
  const octave = WHITE * 7
  const blackH = Math.round(height * 0.6)
  return (
    <svg
      aria-hidden
      width="100%"
      height={height}
      className={`block ${className}`}
      focusable="false"
    >
      <defs>
        <pattern
          id={id}
          width={octave}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width={octave}
            height={height}
            fill="var(--color-paper-light)"
          />
          {Array.from({ length: 7 }, (_, i) => (
            <line
              key={i}
              x1={i * WHITE + 1}
              x2={i * WHITE + 1}
              y1="0"
              y2={height}
              stroke="var(--color-ink)"
              strokeWidth="2"
            />
          ))}
          {BLACK_AFTER.map((i) => (
            <rect
              key={i}
              x={i * WHITE + WHITE - 6}
              y="0"
              width="13"
              height={blackH}
              rx="2"
              fill="var(--color-ink)"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
      <line
        x1="0"
        x2="100%"
        y1="1"
        y2="1"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
      <line
        x1="0"
        x2="100%"
        y1={height - 1}
        y2={height - 1}
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
    </svg>
  )
}
