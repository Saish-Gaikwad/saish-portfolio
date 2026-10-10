import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
}

export const AmbientEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Spotlight cursor follower
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Interactive Neural Particle Canvas
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Cursor position for particle attraction/repulsion
    let mouse = { x: -1000, y: -1000, radius: 140 }
    const onCanvasMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onCanvasMouseMove, { passive: true })

    // Create particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.2,
      })
    }

    let isTabVisible = true
    const handleVisibility = () => {
      isTabVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const render = () => {
      if (!isTabVisible) {
        animId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Cursor gentle repulsion
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x -= (dx / dist) * force * 1.5
          p.y -= (dy / dist) * force * 1.5
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(251, 191, 36, ${p.baseAlpha})`
        ctx.fill()

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist2 < 115) {
            const alpha = (1 - dist2 / 115) * 0.18
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onCanvasMouseMove)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <>
      {/* Soft Gold Radial Spotlight that Follows Cursor */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 w-[700px] h-[700px] rounded-full bg-radial from-[var(--gold)]/[0.07] via-[var(--gold)]/[0.02] to-transparent blur-3xl transition-transform duration-75 ease-out z-0"
      />

      {/* Interactive Neural Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 w-full h-full z-0 opacity-80"
      />

      {/* Subtle Luxury Film Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-1 film-grain opacity-40" />
    </>
  )
}
