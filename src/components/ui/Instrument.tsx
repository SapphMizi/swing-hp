import { useId } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// 顔の付いた楽器のイラスト。色はアイコンの色鉛筆の色だけを使う。
// 外側に paper-light の縁を付けて、色の面の上に貼ったシールのように見せる。
export type InstrumentKind = 'sax' | 'trumpet' | 'drum' | 'bass' | 'piano'

const C = {
  ink: 'var(--color-ink)',
  inkSoft: 'var(--color-ink-soft)',
  paper: 'var(--color-paper-light)',
  pink: 'var(--color-pink)',
  pinkDeep: 'var(--color-pink-deep)',
  teal: 'var(--color-teal)',
  orange: 'var(--color-orange)',
  yellow: 'var(--color-yellow)',
  navy: 'var(--color-navy)',
  blue: 'var(--color-blue)',
}

// 縁取り用の複製では --s で塗りを paper-light に置き換える
const f = (color: string): CSSProperties => ({ fill: `var(--s, ${color})` })

// 外形(縁取りの対象)と、顔などの細部
const SHAPES: Record<
  InstrumentKind,
  { body: ReactNode; face: [number, number]; faceColor?: string }
> = {
  trumpet: {
    body: (
      <>
        <rect x="6" y="55" width="16" height="9" rx="3" style={f(C.orange)} />
        <rect x="18" y="56" width="34" height="7" style={f(C.orange)} />
        <path
          fillRule="evenodd"
          d="M41 64h38a11 11 0 0 1 0 22H41a11 11 0 0 1 0-22Zm0 7a4 4 0 0 0 0 8h38a4 4 0 0 0 0-8Z"
          style={f(C.orange)}
        />
        <rect x="50" y="34" width="8" height="12" rx="3" style={f(C.pink)} />
        <rect x="61" y="34" width="8" height="12" rx="3" style={f(C.pink)} />
        <rect x="72" y="34" width="8" height="12" rx="3" style={f(C.pink)} />
        <rect
          x="46"
          y="42"
          width="38"
          height="32"
          rx="10"
          style={f(C.yellow)}
        />
        <rect x="82" y="53" width="10" height="11" style={f(C.orange)} />
        <path d="M90 53 108 38q8 21 0 44L90 66Z" style={f(C.orange)} />
        <ellipse cx="108" cy="60" rx="6" ry="22" style={f(C.yellow)} />
      </>
    ),
    face: [65, 58],
  },
  sax: {
    body: (
      <>
        <rect
          x="22"
          y="10"
          width="14"
          height="9"
          rx="3"
          transform="rotate(-25 29 14)"
          style={f(C.ink)}
        />
        <path d="M33 17q16-12 27 4l-8 6q-6-9-15-3Z" style={f(C.blue)} />
        <path
          d="M50 24h14l2 52q1 16 13 16 10 0 10-14l-2-14 18-6 1 22q-1 30-29 30-28 0-29-30Z"
          style={f(C.teal)}
        />
        <ellipse
          cx="97"
          cy="60"
          rx="11"
          ry="6"
          transform="rotate(-18 97 60)"
          style={f(C.yellow)}
        />
      </>
    ),
    face: [73, 98],
  },
  drum: {
    body: (
      <>
        <rect
          x="34"
          y="6"
          width="7"
          height="46"
          rx="3.5"
          transform="rotate(-38 37 29)"
          style={f(C.orange)}
        />
        <rect
          x="80"
          y="6"
          width="7"
          height="46"
          rx="3.5"
          transform="rotate(38 83 29)"
          style={f(C.orange)}
        />
        <ellipse cx="60" cy="92" rx="42" ry="12" style={f(C.pinkDeep)} />
        <rect x="18" y="54" width="84" height="38" style={f(C.pink)} />
        <ellipse cx="60" cy="54" rx="44" ry="14" style={f(C.pinkDeep)} />
        <ellipse cx="60" cy="52" rx="40" ry="11" style={f(C.paper)} />
      </>
    ),
    face: [60, 74],
  },
  bass: {
    body: (
      <>
        <circle cx="60" cy="11" r="7" style={f(C.inkSoft)} />
        <rect x="56" y="12" width="8" height="40" rx="3" style={f(C.inkSoft)} />
        <ellipse cx="60" cy="56" rx="21" ry="18" style={f(C.orange)} />
        <rect x="44" y="60" width="32" height="20" style={f(C.orange)} />
        <ellipse cx="60" cy="90" rx="29" ry="22" style={f(C.orange)} />
        <rect x="57" y="112" width="6" height="7" rx="2" style={f(C.ink)} />
      </>
    ),
    face: [60, 90],
  },
  piano: {
    body: (
      <>
        <rect x="16" y="22" width="88" height="14" rx="7" style={f(C.ink)} />
        <rect x="20" y="30" width="80" height="72" rx="10" style={f(C.navy)} />
        <rect x="26" y="100" width="8" height="14" rx="3" style={f(C.ink)} />
        <rect x="86" y="100" width="8" height="14" rx="3" style={f(C.ink)} />
      </>
    ),
    face: [60, 50],
    faceColor: C.paper,
  },
}

// 外形の上に重ねる細部(縁取りしない)
function Details({ kind }: { kind: InstrumentKind }) {
  switch (kind) {
    case 'sax':
      return (
        <g fill={C.yellow}>
          <circle cx="57" cy="38" r="3.5" />
          <circle cx="58" cy="50" r="3.5" />
          <circle cx="59" cy="62" r="3.5" />
        </g>
      )
    case 'drum':
      return (
        <g fill={C.yellow}>
          {[27, 39, 81, 93].map((x) => (
            <rect key={x} x={x - 1.5} y="62" width="3" height="30" rx="1.5" />
          ))}
        </g>
      )
    case 'bass':
      return (
        <>
          <rect x="57" y="36" width="6" height="40" rx="2" fill={C.ink} />
          <rect x="52" y="104" width="16" height="6" rx="3" fill={C.ink} />
        </>
      )
    case 'piano':
      return (
        <>
          <rect x="26" y="70" width="68" height="18" rx="3" fill={C.paper} />
          <g fill={C.ink}>
            {[33, 42, 56, 65, 74].map((x) => (
              <rect key={x} x={x} y="70" width="5" height="10" rx="1" />
            ))}
          </g>
        </>
      )
    default:
      return null
  }
}

function Face({
  x,
  y,
  color,
  sleep,
}: {
  x: number
  y: number
  color: string
  sleep: boolean
}) {
  return (
    <g>
      <ellipse
        cx={x - 10}
        cy={y + 6}
        rx="4"
        ry="2.4"
        fill={C.pink}
        opacity="0.75"
      />
      <ellipse
        cx={x + 10}
        cy={y + 6}
        rx="4"
        ry="2.4"
        fill={C.pink}
        opacity="0.75"
      />
      {sleep ? (
        <g fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
          <path d={`M${x - 9} ${y}q3 3 6 0`} />
          <path d={`M${x + 3} ${y}q3 3 6 0`} />
        </g>
      ) : (
        <g className="instrument-eyes" fill={color}>
          <circle cx={x - 6} cy={y} r="2.6" />
          <circle cx={x + 6} cy={y} r="2.6" />
        </g>
      )}
      <path
        d={sleep ? `M${x - 2} ${y + 7}h4` : `M${x - 3} ${y + 5}q3 3.5 6 0`}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
  )
}

export function Instrument({
  kind,
  sleep = false,
  className = '',
}: {
  kind: InstrumentKind
  sleep?: boolean
  className?: string
}) {
  const id = useId()
  const shape = SHAPES[kind]
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      focusable="false"
      className={`overflow-visible ${className}`}
    >
      <defs>
        <g id={id}>{shape.body}</g>
      </defs>
      {/* シールの縁 */}
      <use
        href={`#${id}`}
        style={
          {
            '--s': C.paper,
            stroke: C.paper,
            strokeWidth: 10,
            strokeLinejoin: 'round',
          } as CSSProperties
        }
      />
      <use href={`#${id}`} />
      <Details kind={kind} />
      <Face
        x={shape.face[0]}
        y={shape.face[1]}
        color={shape.faceColor ?? C.ink}
        sleep={sleep}
      />
    </svg>
  )
}
