import type { ReactNode } from 'react'

// トップ以外のページの外枠
export function Page({
  children,
  narrow = false,
}: {
  children: ReactNode
  narrow?: boolean
}) {
  return (
    <main
      className={`mx-auto px-4 pb-24 pt-12 sm:px-6 md:pt-16 ${narrow ? 'max-w-4xl' : 'max-w-7xl'}`}
    >
      {children}
    </main>
  )
}
