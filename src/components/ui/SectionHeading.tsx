import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SectionHeadingProps {
  en: string
  ja: string
  as?: 'h1' | 'h2'
  tone?: 'ink' | 'paper'
  className?: string
}

// 英字の大見出しと、その下に添える日本語のリボン。英語表示ではリボンを出さない。
// 見出しが画面に入ったら、色鉛筆の黄色のマーカー線が1回だけ左から引かれる。
export function SectionHeading({
  en,
  ja,
  as: Tag = 'h2',
  tone = 'ink',
  className = '',
}: SectionHeadingProps) {
  const { i18n } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`mb-10 md:mb-14 ${className}`}>
      <Tag
        className={`relative inline-block font-black uppercase leading-[0.95] tracking-[-0.01em] text-[clamp(2.4rem,7vw,4.75rem)] ${
          tone === 'paper' ? 'text-paper-light' : 'text-ink'
        }`}
        lang="en"
      >
        <span
          aria-hidden
          className="absolute -bottom-[0.06em] left-[-3%] h-[0.42em] w-[106%] bg-[url(/images/hand/marker.webp)] bg-[length:100%_100%] bg-no-repeat"
          style={{
            clipPath: drawn ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transition: 'clip-path 300ms var(--ease-out-expo)',
          }}
        />
        <span className="relative">{en}</span>
      </Tag>
      {i18n.language === 'ja' && (
        <p className="mt-3 w-fit bg-pink-deep py-0.5 pl-3 pr-5 text-sm font-bold text-paper-light [clip-path:polygon(0_0,100%_0,calc(100%-8px)_50%,100%_100%,0_100%)]">
          {ja}
        </p>
      )}
    </div>
  )
}
