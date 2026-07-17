import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll } from 'framer-motion'
import { X } from 'lucide-react'

const LOGO_PATH = 'M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z'

export function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9997 }} aria-hidden="true">
      <div
        style={{
          position: 'absolute', inset: '-150px',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '256px 256px',
          opacity: 0.055, mixBlendMode: 'overlay' as const,
          animation: 'grain-shift 0.8s steps(1) infinite',
        }}
      />
    </div>
  )
}

export function Preloader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <div className="flex flex-col items-center gap-5">
            <svg width="72" height="72" viewBox="0 0 256 256" fill="none">
              <defs>
                <linearGradient id="pre-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <motion.path fill="url(#pre-grad)" d={LOGO_PATH}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.45 }} />
              <motion.path stroke="url(#pre-grad)" strokeWidth="5" fill="none" d={LOGO_PATH}
                initial={{ pathLength: 0, opacity: 1 }} animate={{ pathLength: 1, opacity: 0 }}
                transition={{ pathLength: { duration: 1.0, ease: 'easeInOut' }, opacity: { delay: 1.05, duration: 0.25 } }} />
            </svg>
            <motion.p className="text-white/40 text-[10px] tracking-[0.5em] uppercase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
              LIDINC
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="relative w-full max-w-5xl aspect-video"
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }} transition={{ type: 'spring', damping: 26 }}
        onClick={e => e.stopPropagation()}>
        <video src={src} autoPlay controls className="w-full h-full rounded-2xl object-cover bg-black" />
        <button type="button" onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </motion.div>
    </motion.div>
  )
}

export function SectionProgress({ idx, visible }: { idx: number; visible: boolean }) {
  const total = 6
  const current = Math.max(0, idx - 1)
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div key={i} className="w-[2px] rounded-full"
              animate={{ height: i === current ? 22 : 5, backgroundColor: i <= current ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.35 }} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{ scaleX: scrollYProgress, background: 'linear-gradient(to right, #60a5fa, #22d3ee, #a78bfa)' }} />
  )
}

export function ScrollToTop({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-5 z-40 w-10 h-10 rounded-full border border-white/15 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white/35 transition-colors duration-200"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }} aria-label="Наверх">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export function CustomCursor({ accent }: { accent: string }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [visible, setVisible] = useState(false)
  const springX = useSpring(x, { damping: 22, stiffness: 180 })
  const springY = useSpring(y, { damping: 22, stiffness: 180 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 22); y.set(e.clientY - 22); setVisible(true) }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', leave) }
  }, [x, y])

  return (
    <motion.div className="fixed pointer-events-none z-50 rounded-full hidden md:block"
      style={{ left: springX, top: springY, width: 44, height: 44, backgroundColor: accent }}
      animate={{ opacity: visible ? 0.18 : 0, scale: visible ? 1 : 0.4 }}
      transition={{ duration: 0.2 }} />
  )
}

export function CursorTrail({ active }: { active: boolean }) {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    if (!active) { setTrail([]); return } // eslint-disable-line react-hooks/set-state-in-effect
    let id = 0
    const move = (e: MouseEvent) => {
      setTrail(t => [...t.slice(-10), { id: id++, x: e.clientX, y: e.clientY }])
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [active])

  if (!active || trail.length === 0) return null
  return (
    <>
      {trail.map((dot, i) => (
        <div key={dot.id} className="fixed pointer-events-none z-[49] rounded-full bg-blue-400"
          style={{ left: dot.x - 3, top: dot.y - 3, width: 6, height: 6,
            opacity: ((i + 1) / trail.length) * 0.35,
            transform: `scale(${((i + 1) / trail.length) * 0.9})` }} />
      ))}
    </>
  )
}

export function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 12, stiffness: 120 })
  const springY = useSpring(y, { damping: 12, stiffness: 120 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.38)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.38)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className={className ?? 'inline-block'}>
      <motion.div style={{ x: springX, y: springY }}>{children}</motion.div>
    </div>
  )
}
