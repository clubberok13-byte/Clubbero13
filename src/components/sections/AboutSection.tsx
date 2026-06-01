import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FloatingOrbs, SplitTitle, useScrambleOnView } from '../ui/animations'

interface Stat { value: number; suffix: string; label: string }

const STATS: Stat[] = [
  { value: 50,  suffix: '+', label: 'проектов' },
  { value: 150, suffix: '+', label: 'клиентов' },
  { value: 3,   suffix: '',  label: 'года опыта' },
  { value: 4,   suffix: '',  label: 'направления' },
]

function StatNum({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1200, 1)
      setV(Math.round((1 - Math.pow(1 - p, 3)) * stat.value))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, stat.value])

  return <span ref={ref}>{v}{stat.suffix}</span>
}

export default function AboutSection() {
  const { ref, scrambled } = useScrambleOnView('О нас')

  return (
    <div
      ref={ref}
      className="relative snap-start overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', height: '100vh', scrollSnapStop: 'always', backgroundColor: '#0a0a0a' }}
    >
      <FloatingOrbs accent="#3b82f6" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/15 pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28">
        <motion.p
          className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-4 font-medium"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {scrambled}
        </motion.p>

        <SplitTitle
          text={'Делаем AI\nдоступным\nдля бизнеса'}
          className="text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] text-white tracking-tight mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        />

        <motion.p
          className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-lg mb-14"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          LIDINC — AI-агентство полного цикла. Мы создаём контент, разрабатываем
          инструменты, автоматизируем процессы и обучаем команды работать с
          искусственным интеллектом.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="text-[2.8rem] sm:text-[3.4rem] leading-none text-white mb-1.5 tabular-nums"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
              >
                <StatNum stat={stat} />
              </p>
              <p className="text-white/35 text-[12px] tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
