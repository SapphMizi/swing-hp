import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import {
  INTRO_STORAGE_KEY,
  LoadingScreen,
} from '../components/loading/LoadingScreen'
import { NotFound } from '../components/NotFound'

import '../i18n'
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

// 初回訪問で、視差効果を減らす設定がオフのときだけ html[data-intro] を付ける。
// React が動く前に実行されるので、ローディング画面がちらつかない。
const INTRO_SCRIPT = `try{if(!sessionStorage.getItem('${INTRO_STORAGE_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='1'}}catch(e){}`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: '大阪大学 軽音楽部 SWING' },
      {
        name: 'description',
        content:
          '大阪大学 軽音楽部 SWING の公式サイト。豊中キャンパスの明道館で、3つのビッグバンドがジャズを演奏しています。',
      },
      { name: 'theme-color', content: '#fbdcc0' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Klee+One:wght@600&family=Zen+Maru+Gothic:wght@500;700;900&display=swap',
      },
    ],
    scripts: [{ children: INTRO_SCRIPT }],
  }),
  // microCMS の更新を 1 分ほどで反映させるため、CDN のキャッシュは 60 秒にする
  headers: () => ({
    'Cache-Control':
      'public, max-age=0, s-maxage=60, stale-while-revalidate=600',
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
