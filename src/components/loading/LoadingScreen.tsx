import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const charaRef = useRef<HTMLImageElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const counter = { val: 0 }
    const tl = gsap.timeline()

    tl.to(counter, {
      val: 100,
      duration: 2.6,
      ease: 'power1.inOut',
      onUpdate() {
        const v = Math.round(counter.val)
        setProgress(v)
        if (countRef.current) countRef.current.textContent = String(v).padStart(3, '0')

        // キャラクターをバーの先端に追従させる
        if (charaRef.current && barFillRef.current) {
          const barEl = barFillRef.current
          const barRect = barEl.parentElement!.getBoundingClientRect()
          const filled = (v / 100) * barRect.width
          // キャラをバー右端に配置（キャラ幅の半分だけ左にオフセット）
          charaRef.current.style.left = `${filled}px`
        }
      },
    })

    // 完了後: キャラがゴール → オーバーレイが上にスライドアウト
    tl.to({}, { duration: 0.5 })
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'expo.inOut',
      onComplete,
    })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-swing-black overflow-hidden"
    >
      {/* グレイン */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ロゴ */}
      <img
        src="/images/swing_logo.jpg"
        alt="SWING"
        className="w-48 sm:w-60 object-contain mb-20 opacity-90"
      />

      {/* プログレスバー + キャラクター */}
      <div className="relative w-[64vw] max-w-2xl">
        {/* キャラクター（バー右端に追従） */}
        <img
          ref={charaRef}
          src="/images/swing_chara.png"
          alt=""
          aria-hidden
          className="absolute bottom-2 w-20 pointer-events-none"
          style={{
            left: 0,
            transform: 'translateX(-40%)',
            animation: 'chara-run 0.45s ease-in-out infinite alternate',
          }}
        />

        {/* バー本体 */}
        <div className="relative h-[3px] w-full bg-swing-amber/15 rounded-full overflow-hidden">
          <div
            ref={barFillRef}
            className="absolute inset-y-0 left-0 bg-swing-amber rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* カウンター */}
      <div className="mt-5 flex items-baseline gap-1 font-mono text-swing-amber/50">
        <span ref={countRef} className="text-2xl font-bold tabular-nums">
          000
        </span>
        <span className="text-sm">%</span>
      </div>

      {/* キャラのランアニメーション（上下バウンス + 傾き） */}
      <style>{`
        @keyframes chara-run {
          from { transform: translateX(-40%) translateY(0px) rotate(-4deg); }
          to   { transform: translateX(-40%) translateY(-10px) rotate(3deg); }
        }
      `}</style>
    </div>
  )
}
