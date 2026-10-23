import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'

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
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t('nav.langLabel')}
              className="min-h-11 rounded-full border-2 border-ink bg-paper-light px-4 text-sm font-bold text-ink transition-colors duration-150 hover:bg-yellow"
            >
              {t('nav.lang')}
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-paper-light text-ink lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
            >
              {menuOpen ? (
                <X aria-hidden size={22} />
              ) : (
                <Menu aria-hidden size={22} />
              )}
            </button>
          </div>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label={t('nav.menu')}
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b-2 border-ink bg-paper-light lg:hidden"
      >
        <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
          {NAV_LINKS.map(({ key, en, to }) => (
            <li
              key={to}
              className="border-b-2 border-dashed border-ink/30 last:border-b-0"
            >
              <Link
                to={to}
                className="flex min-h-14 items-baseline gap-3 text-ink no-underline"
                activeProps={{
                  'aria-current': 'page',
                  className: 'text-pink-deep',
                }}
              >
                <span className="text-xl font-black" lang="en">
                  {en}
                </span>
                {isJa && <span className="text-sm font-bold">{t(key)}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
