import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ── Floating orbs background ──────────────────────────────────────────────────
export function FloatingOrbs({ accent }: { accent: string }) {
  const orbs = [
    { size: 380, x: ['8%', '22%', '5%', '8%'],   y: ['12%', '30%', '55%', '12%'], duration: 18 },
    { size: 260, x: ['72%', '55%', '80%', '72%'], y: ['60%', '20%', '75%', '60%'], duration: 24 },
    { size: 200, x: ['45%', '65%', '30%', '45%'], y: ['80%', '50%', '15%', '80%'], duration: 20 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size, height: orb.size,
            background: `radial-gradient(circle, ${accent}30 0%, ${accent}08 60%, transparent 100%)`,
            left: orb.x[0], top: orb.y[0],
            filter: 'blur(40px)',
          }}
          animate={{ left: orb.x, top: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
        />
      ))}
    </div>
  )
}

// ── Clip-path line reveal ────────────────────────────────────────────────────
const lineVariants = {
  hidden: { y: '108%', opacity: 0, filter: 'blur(6px)' },
  visible: (i: number) => ({
    y: '0%', opacity: 1, filter: 'blur(0px)',
    transition: { delay: 0.08 + i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function SplitTitle({ text, className, style }: {
  text: string; className?: string; style?: React.CSSProperties
}) {
  const lines = text.split('\n')
  return (
    <motion.div
      className={className} style={style}
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden', lineHeight: '1.08' }}>
          <motion.div custom={i} variants={lineVariants}>{line}</motion.div>
        </div>
      ))}
    </motion.div>
  )
}

// ── Text scramble ─────────────────────────────────────────────────────────────
const CHARS = '!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function useTextScramble(text: string, active: boolean) {
  const [output, setOutput] = useState(text)
  useEffect(() => {
    if (!active) return
    let frame = 0
    const total = 20
    const id = setInterval(() => {
      frame++
      setOutput(text.split('').map((ch, i) => {
        if (ch === ' ' || ch === '/') return ch
        if (frame >= Math.floor((i / text.length) * total) + 4) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      if (frame > total + 4) clearInterval(id)
    }, 38)
    return () => clearInterval(id)
  }, [active, text])
  return output
}

// ── 3-D tilt on hover ────────────────────────────────────────────────────────
export function TiltCard({ children, className, intensity = 8 }: {
  children: React.ReactNode; className?: string; intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-y * intensity).toFixed(1)}deg) rotateY(${(x * intensity).toFixed(1)}deg) scale(1.02)`
  }
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: 'transform 0.18s ease', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

// ── Scramble triggered when element enters view ───────────────────────────────
export function useScrambleOnView(text: string) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(false)
  useEffect(() => { if (inView) setActive(true) }, [inView])
  const scrambled = useTextScramble(text, active)
  return { ref, scrambled }
}

// ── Blur + slide reveal for section content blocks ────────────────────────────
export function SectionReveal({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay }}
    >
      {children}
    </motion.div>
  )
}

// ── Stagger variants for lists ────────────────────────────────────────────────
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}
