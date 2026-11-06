import { Fragment, useEffect, useRef, useState } from 'react'
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
  // 文字の出し方。最初から画面にある見出しは動かさない(読み込み直後にちらつくため)
  const [letters, setLetters] = useState<'static' | 'armed' | 'play'>('static')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let first = true
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          if (!first) setLetters('play')
          io.disconnect()
        } else if (first) {
          setLetters('armed')
        }
        first = false
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`mb-10 md:mb-14 ${className}`}>
      <Tag
        aria-label={en}
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
        <span
          aria-hidden
          className={`relative ${letters === 'static' ? '' : `letters-${letters}`}`}
        >
          {/* 単語の途中で折り返さないよう、単語ごとにまとめる。空白は単語の外に置く */}
          {en.split(' ').map((word, w, words) => (
            <Fragment key={w}>
              <span className="inline-block whitespace-nowrap">
                {[...word].map((ch, c) => (
                  <span
                    key={c}
                    className="letter"
                    style={
                      {
                        '--i': words.slice(0, w).join('').length + c,
                      } as React.CSSProperties
                    }
                  >
                    {ch}
                  </span>
                ))}
              </span>
              {w < words.length - 1 && ' '}
            </Fragment>
          ))}
        </span>
      </Tag>
      {i18n.language === 'ja' && (
        <p className="mt-3 flex w-fit -rotate-2 items-center gap-2 rounded-full bg-pink-deep py-1 pl-2.5 pr-4 text-sm font-bold text-paper-light">
          <span aria-hidden className="h-2 w-2 rounded-full bg-paper-light" />
          {ja}
        </p>
      )}
    </div>
  )
}
