import { motion, useInView, animate } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FloatingOrbs, SplitTitle, useScrambleOnView, SectionReveal } from '../ui/animations'

interface Stat { value: number; suffix: string; label: string; bar: number }

const STATS: Stat[] = [
  { value: 50,  suffix: '+', label: 'проектов',    bar: 82 },
  { value: 150, suffix: '+', label: 'клиентов',    bar: 91 },
  { value: 5,   suffix: '+', label: 'лет с AI',    bar: 75 },
  { value: 4,   suffix: '',  label: 'направления', bar: 100 },
]

const TOOLS: { name: string; color: string }[] = [
  { name: 'ChatGPT',         color: '#10b981' },
  { name: 'Midjourney',      color: '#3b82f6' },
  { name: 'Runway ML',       color: '#8b5cf6' },
  { name: 'HeyGen',          color: '#f59e0b' },
  { name: 'ElevenLabs',      color: '#22d3ee' },
  { name: 'n8n / Make',      color: '#f97316' },
  { name: 'GPT-4o',          color: '#10b981' },
  { name: 'Stable Diffusion',color: '#a78bfa' },
  { name: 'Telegram Bot',    color: '#2AABEE' },
  { name: 'Claude',          color: '#f59e0b' },
  { name: 'Perplexity',      color: '#22d3ee' },
  { name: 'Kling AI',        color: '#ec4899' },
  { name: 'Figma AI',        color: '#f97316' },
  { name: 'Whisper',         color: '#60a5fa' },
  { name: 'Sora',            color: '#8b5cf6' },
]

function StatNum({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, stat.value, {
      type: 'spring',
      damping: 18,
      stiffness: 65,
      onUpdate: (latest) => setV(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, stat.value])

  return <span ref={ref}>{v}{stat.suffix}</span>
}

export default function AboutSection() {
  const { ref, scrambled } = useScrambleOnView('О нас')
  const doubled = [...TOOLS, ...TOOLS, ...TOOLS]

  return (
    <div
      ref={ref}
      className="svh-screen relative overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', backgroundColor: '#0a0a0a' }}
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
          className="text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] text-white tracking-tight mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        />

        <SectionReveal delay={0.25}>
          <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-lg mb-10">
            LIDINC — AI-агентство полного цикла. Мы создаём контент, разрабатываем
            инструменты, автоматизируем процессы и обучаем команды работать с
            искусственным интеллектом.
          </p>
        </SectionReveal>

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
              <p className="text-white/35 text-[12px] tracking-wide mb-2">{stat.label}</p>
              <div className="h-px w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(to right, #60a5fa, #22d3ee)' }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${stat.bar}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools marquee strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-white/[0.06] py-3"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((tool, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.2em] uppercase px-5 text-white/30">
              <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tool.color, opacity: 0.7 }} />
              {tool.name}
              <span className="inline-block w-[3px] h-[3px] rounded-full bg-white/12 shrink-0 ml-1" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
