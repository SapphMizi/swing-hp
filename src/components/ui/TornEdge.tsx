// ちぎった紙の縁。下のセクションの色で塗り、上のセクションに少し食い込ませて置く。
// 縁の形は public/images/hand/torn-edge.png(透明度だけの画像)で切り抜く
const MASK = {
  maskImage: 'url(/images/hand/torn-edge.png)',
  WebkitMaskImage: 'url(/images/hand/torn-edge.png)',
  maskRepeat: 'repeat-x',
  WebkitMaskRepeat: 'repeat-x',
  maskSize: '1200px 32px',
  WebkitMaskSize: '1200px 32px',
} as const

export function TornEdge({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 -top-[31px] h-8 ${className}`}
      style={MASK}
    />
  )
}
