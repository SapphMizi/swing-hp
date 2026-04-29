import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
  symbol: string
  rotation: number
  vr: number
}

const SYMBOLS = ['♩', '♪', '♫', '♬', '𝄞', '𝄢']

export function MusicNoteParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.8 + 0.3),
      opacity: 0,
      size: Math.random() * 14 + 10,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      rotation: (Math.random() - 0.5) * 0.4,
      vr: (Math.random() - 0.5) * 0.005,
    })

    // Initial particles
    for (let i = 0; i < 18; i++) {
      const p = spawn()
      p.y = Math.random() * canvas.height
      p.opacity = Math.random() * 0.15
      particles.push(p)
    }

    let spawnTimer = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnTimer++
      if (spawnTimer % 90 === 0 && particles.length < 30) {
        particles.push(spawn())
      }

      particles = particles.filter((p) => p.y > -40 && p.opacity >= 0)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.vr

        // Fade in near bottom, fade out near top
        if (p.y > canvas.height * 0.75) {
          p.opacity = Math.min(p.opacity + 0.004, 0.18)
        } else if (p.y < canvas.height * 0.25) {
          p.opacity -= 0.003
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = '#f2bf80'
        ctx.font = `${p.size}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(p.symbol, 0, 0)
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  )
}
