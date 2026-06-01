import { useRef, useCallback, useEffect } from 'react'

const RADIUS = 130 // spotlight size in px
// Mouth zone as % of image dimensions
const MOUTH = { x1: 28, x2: 72, y1: 57, y2: 78 }

export default function HoverMaskHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const revealRef    = useRef<HTMLImageElement>(null)
  const cursorRef    = useRef<HTMLDivElement>(null)
  const rafRef       = useRef<number | null>(null)
  const mouseRef     = useRef({ x: 0, y: 0 })

  const inMouth = (xPct: number, yPct: number) =>
    xPct >= MOUTH.x1 && xPct <= MOUTH.x2 &&
    yPct >= MOUTH.y1 && yPct <= MOUTH.y2

  const frame = useCallback(() => {
    const container = containerRef.current
    const reveal    = revealRef.current
    const cursor    = cursorRef.current
    if (!container || !reveal || !cursor) return

    const rect = container.getBoundingClientRect()
    const xPct = ((mouseRef.current.x - rect.left)  / rect.width)  * 100
    const yPct = ((mouseRef.current.y - rect.top)   / rect.height) * 100

    if (inMouth(xPct, yPct)) {
      reveal.style.clipPath = `circle(${RADIUS}px at ${xPct.toFixed(1)}% ${yPct.toFixed(1)}%)`
      cursor.style.opacity  = '1'
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
    } else {
      reveal.style.clipPath = 'circle(0px at 50% 68%)'
      cursor.style.opacity  = '0'
      cursor.style.transform = 'translate(-50%, -50%) scale(0)'
    }

    cursor.style.left = mouseRef.current.x + 'px'
    cursor.style.top  = mouseRef.current.y + 'px'
    rafRef.current = null
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(frame)
    }

    const onLeave = () => {
      if (revealRef.current)  revealRef.current.style.clipPath = 'circle(0px at 50% 68%)'
      if (cursorRef.current) {
        cursorRef.current.style.opacity   = '0'
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(0)'
      }
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [frame])

  return (
    <>
      {/* Custom cursor — rendered outside container so it's fixed to viewport */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: '2px solid rgba(0,210,255,0.9)',
          boxShadow: '0 0 20px rgba(0,210,255,0.6), 0 0 40px rgba(0,210,255,0.2)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) scale(0)',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s',
          zIndex: 9999,
          opacity: 0,
        }}
      />

      {/* Hero section */}
      <section
        style={{
          background: '#f0f0f0',
          maxWidth: 820,
          margin: '0 auto',
          borderRadius: 16,
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
        }}
      >
        <h1
          style={{
            padding: '32px 28px 0',
            fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#111',
          }}
        >
          FUTURE FIT.<br />LUXURY<br />PERFORMANCE.
        </h1>

        {/* Image stack */}
        <div
          ref={containerRef}
          style={{ position: 'relative', width: '100%', marginTop: 20, cursor: 'none', userSelect: 'none' }}
        >
          {/* Photo 1 — base (no mask). Replace src with /photo1.jpg when ready */}
          <img
            src="https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=900&q=90&auto=format&fit=crop"
            alt="Future Fit"
            style={{ display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' }}
          />

          {/* Photo 2 — reveal (with mask). Replace src with /photo2.jpg when ready */}
          <img
            ref={revealRef}
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=90&auto=format&fit=crop"
            alt="Mask reveal"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              pointerEvents: 'none',
              clipPath: 'circle(0px at 50% 68%)',
              transition: 'clip-path 0.04s linear',
            }}
          />
        </div>
      </section>
    </>
  )
}
