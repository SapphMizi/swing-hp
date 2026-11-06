import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

const STYLES = {
  primary: 'bg-pink-deep text-paper-light hover:bg-ink',
  secondary: 'bg-paper-light text-ink hover:bg-yellow',
} as const

const DOT = {
  primary: 'bg-paper-light text-pink-deep group-hover:text-ink',
  secondary: 'bg-ink text-paper-light',
} as const

// 丸いボタン。右端の円に矢印を入れて、押すと先へ進むことを示す
export function ButtonLink({
  to,
  variant = 'primary',
  children,
  className = '',
}: {
  to: LinkProps['to']
  variant?: keyof typeof STYLES
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex min-h-12 items-center gap-4 rounded-full py-2 pl-6 pr-2 pop font-bold no-underline ${STYLES[variant]} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-1 group-hover:-rotate-12 ${DOT[variant]}`}
      >
        <ArrowRight aria-hidden size={18} strokeWidth={2.5} />
      </span>
    </Link>
  )
}
