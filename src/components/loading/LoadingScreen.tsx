import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { Keys } from '../ui/Keys'

export const INTRO_STORAGE_KEY = 'swing_loaded'

// ブラウザのセッションで最初に開いたときだけ出す。
// 出すかどうかは __root.tsx の head のスクリプトが html[data-intro] で決める。
// 鍵盤の上をキャラクターが歩き、その間にロゴが左から描かれていく(1.4 秒)。
export function LoadingScreen() {
  const { t } = useTranslation()
  const coverRef = useRef<HTMLDivElement>(null)
  const charaRef = useRef<HTMLImageElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const root = document.documentElement
    if (!('intro' in root.dataset)) return

    const finish = () => {
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, '1')
      } catch {
        // プライベートブラウズなどで保存できなくても、表示は続ける
      }
      delete root.dataset.intro
    }

    const track = trackRef.current
    const distance = track
      ? track.clientWidth - (charaRef.current?.clientWidth ?? 0)
      : 0

    const tl = gsap.timeline({ onComplete: finish })
    tlRef.current = tl
    tl.fromTo(
      charaRef.current,
      { x: 0 },
      { x: distance, duration: 1, ease: 'none' },
      0,
    )
      .fromTo(
        charaRef.current,
        { y: 0 },
        { y: -8, duration: 0.125, ease: 'sine.out', yoyo: true, repeat: 7 },
        0,
      )
      .fromTo(
        logoRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'none' },
        0,
      )
      .to(
        coverRef.current,
        { yPercent: -100, duration: 0.4, ease: 'expo.in' },
        '+=0.05',
      )

    const skip = () => tl.progress(1)
    window.addEventListener('keydown', skip, { once: true })
    return () => {
      window.removeEventListener('keydown', skip)
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={coverRef}
      className="intro-cover fixed inset-0 z-[100] flex-col items-center justify-center bg-paper px-6"
      onClick={() => tlRef.current?.progress(1)}
      aria-hidden
    >
      <img
        ref={logoRef}
        src="/images/hand/logo.webp"
        alt=""
        width={572}
        height={420}
        className="h-auto w-[min(420px,78vw)]"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      />
      <div ref={trackRef} className="relative mt-6 w-[min(520px,86vw)]">
        <img
          ref={charaRef}
          src="/images/hand/chara.webp"
          alt=""
          width={323}
          height={328}
          className="absolute bottom-full left-0 mb-[-6px] w-14"
        />
        <Keys height={38} />
      </div>
      <p className="mt-8 text-sm font-bold">{t('loading.skip')}</p>
    </div>
  )
}
