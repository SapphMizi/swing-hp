import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useState, useEffect } from 'react'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { LoadingScreen } from '../components/loading/LoadingScreen'

import '../i18n'
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: '大阪大学 軽音楽部 SWING' },
      {
        name: 'description',
        content: 'All you need is Jazz — 大阪大学公認 軽音楽部SWING 公式サイト',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
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
            { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  // Show loading screen only on first visit per browser session
  const [showLoading, setShowLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('swing_loaded')
    if (alreadyLoaded) {
      setLoaded(true)
    } else {
      setShowLoading(true)
    }
  }, [])

  const handleLoadComplete = () => {
    sessionStorage.setItem('swing_loaded', '1')
    setShowLoading(false)
    setLoaded(true)
  }

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadComplete} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          visibility: loaded ? 'visible' : 'hidden',
        }}
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
