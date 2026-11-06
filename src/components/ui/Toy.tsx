import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

const NOTE_COLORS = [
  'var(--color-yellow)',
  'var(--color-pink)',
  'var(--color-teal)',
  'var(--color-orange)',
]

interface Note {
  id: number
  dx: number
  rot: number
  color: string
}

// 押すと跳ねて、音符が飛び出すイラスト。飾りなのでフォーカスは当てない
export function Toy({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const [notes, setNotes] = useState<Note[]>([])
  const bodyRef = useRef<HTMLDivElement>(null)
  const count = useRef(0)

  const play = () => {
    const el = bodyRef.current
    if (el) {
      // クラスを付け直して、続けて押しても最初から跳ねさせる
      el.classList.remove('boing')
      void el.offsetWidth
      el.classList.add('boing')
    }
    const id = count.current++
    const note: Note = {
      id,
      dx: (id % 2 === 0 ? 1 : -1) * (18 + Math.random() * 22),
      rot: (Math.random() - 0.5) * 50,
      color: NOTE_COLORS[id % NOTE_COLORS.length],
    }
    setNotes((n) => [...n.slice(-4), note])
    setTimeout(() => setNotes((n) => n.filter((x) => x.id !== id)), 950)
  }

  return (
    <div
      aria-hidden
      onPointerDown={play}
      className={`relative cursor-pointer touch-manipulation select-none ${className}`}
    >
      <div
        ref={bodyRef}
        onAnimationEnd={(e) => e.currentTarget.classList.remove('boing')}
      >
        {children}
      </div>
      {notes.map((n) => (
        <svg
          key={n.id}
          viewBox="0 0 24 30"
          className="note-pop pointer-events-none absolute left-1/2 top-1/4 w-6"
          style={
            {
              '--dx': `${n.dx}px`,
              '--rot': `${n.rot}deg`,
            } as React.CSSProperties
          }
        >
          <path
            d="M9 4v16.5A5 5 0 1 0 12 25V10q5 1 8 6 1-8-11-12Z"
            fill={n.color}
            stroke="var(--color-ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  )
}
