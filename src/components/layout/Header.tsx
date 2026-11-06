import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { NAV_DOTS } from '../../lib/dots'

// en は鍵盤に載せる英語のラベル。日本語表示のときは、その下に日本語を添える
const NAV_LINKS = [
  { key: 'nav.about', en: 'About', to: '/about' },
  { key: 'nav.news', en: 'News', to: '/news' },
  { key: 'nav.liveReports', en: 'Live', to: '/live-reports' },
  { key: 'nav.schedule', en: 'Schedule', to: '/schedule' },
  { key: 'nav.history', en: 'History', to: '/history' },
  { key: 'nav.contact', en: 'Contact', to: '/contact' },
] as const

// 黒鍵が右隣に付く鍵盤の位置(ドレミファソラシのうち、ミとシの右には黒鍵がない)
const HAS_BLACK_KEY = [true, true, false, true, true, false]

export function Header() {
  const { t, i18n } = useTranslation()
  const isJa = i18n.language === 'ja'
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => setMenuOpen(false), [pathname])

  const toggleLang = () => {
    const next = isJa ? 'en' : 'ja'
    i18n.changeLanguage(next)
    document.documentElement.lang = next
  }

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl items-stretch justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 py-3 text-ink no-underline"
        >
          <img
            src="/images/hand/chara.webp"
            alt=""
            width={44}
            height={45}
            className="h-11 w-auto"
          />
          <span className="leading-none">
            <span
              className="block text-[1.7rem] font-black tracking-[0.02em]"
              lang="en"
            >
              SWING
            </span>
            <span className="mt-1 block text-[0.8rem] font-bold">
              {isJa ? '大阪大学 軽音楽部' : 'Osaka Univ. Light Music Club'}
            </span>
          </span>
        </Link>

        <div className="flex items-start gap-3">
          <nav aria-label={t('nav.menu')} className="hidden lg:block">
            <ul className="flex">
              {NAV_LINKS.map(({ key, en, to }, i) => (
                <li key={to} className="relative -ml-[2px] first:ml-0">
                  <Link
                    to={to}
                    className="flex h-[4.6rem] w-[6.4rem] flex-col items-center justify-end rounded-b-xl border-2 border-t-0 border-ink bg-paper-light pb-2 leading-tight text-ink no-underline shadow-[0_3px_0_0_var(--color-ink)] transition-[translate,box-shadow,background-color] duration-100 hover:translate-y-[3px] hover:shadow-none focus-visible:translate-y-[3px] focus-visible:shadow-none"
                    activeProps={{
                      className: 'bg-yellow',
                      'aria-current': 'page',
                    }}
                  >
                    <span className="text-[0.95rem] font-black" lang="en">
                      {en}
                    </span>
                    {isJa && (
                      <span className="text-xs font-bold">{t(key)}</span>
                    )}
                  </Link>
                  {HAS_BLACK_KEY[i] && i < NAV_LINKS.length - 1 && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-[9px] top-0 z-10 h-[2.4rem] w-4 rounded-b-md bg-ink"
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 self-center">
            {/* 日本語と英語の切り替え。黄色のつまみが今の言語の側にすべる */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('nav.langLabel')}
              className="pop relative grid h-11 w-[5.5rem] grid-cols-2 items-center rounded-full bg-paper-light text-sm font-black text-ink"
            >
              <span
                aria-hidden
                className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-yellow transition-transform duration-300 ease-[var(--ease-spring)]"
                style={{ transform: isJa ? 'none' : 'translateX(100%)' }}
              />
              <span aria-hidden className="relative" lang="ja">
                JA
              </span>
              <span aria-hidden className="relative" lang="en">
                EN
              </span>
            </button>
            <button
              type="button"
              className="pop relative flex h-11 w-11 items-center justify-center rounded-full bg-paper-light text-ink lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
            >
              {/* 3本線が、開くと × に変わる */}
              <span aria-hidden className="relative block h-4 w-5">
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    className="absolute left-0 h-[3px] w-full rounded-full bg-ink transition-[transform,opacity] duration-300 ease-[var(--ease-spring)]"
                    style={{
                      top: `${n * 6.5}px`,
                      transform: menuOpen
                        ? n === 0
                          ? 'translateY(6.5px) rotate(45deg)'
                          : n === 2
                            ? 'translateY(-6.5px) rotate(-45deg)'
                            : 'scaleX(0)'
                        : 'none',
                      opacity: menuOpen && n === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label={t('nav.menu')}
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto rounded-b-[2rem] border-2 border-t-0 border-ink bg-paper-light shadow-[0_18px_30px_-20px_rgba(43,29,31,0.6)] lg:hidden"
      >
        <ul className="mx-auto grid max-w-7xl gap-3 px-4 pb-6 pt-4 sm:px-6">
          {NAV_LINKS.map(({ key, en, to }, i) => (
            <li
              key={to}
              className="menu-pop"
              style={{ '--i': i } as React.CSSProperties}
            >
              <Link
                to={to}
                className="pop group flex min-h-14 items-center gap-3 rounded-full bg-paper px-5 text-ink no-underline"
                activeProps={{
                  'aria-current': 'page',
                  className: '!bg-yellow',
                }}
              >
                <span
                  aria-hidden
                  className={`h-3 w-3 shrink-0 rounded-full border-2 border-ink ${NAV_DOTS[i]}`}
                />
                <span className="text-xl font-black" lang="en">
                  {en}
                </span>
                {isJa && <span className="text-sm font-bold">{t(key)}</span>}
                <ArrowRight
                  aria-hidden
                  size={20}
                  strokeWidth={2.5}
                  className="ml-auto transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
