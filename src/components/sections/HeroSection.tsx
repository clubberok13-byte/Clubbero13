import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'
import { FloatingOrbs } from '../ui/animations'
import { MagneticButton } from '../ui/overlays'
import { HERO, VIDEO_SRC } from '../../data/sections'


const ROTATE_WORDS = ['бизнеса —', 'контента —', 'команды —', 'процессов —']

function RotatingWord() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % ROTATE_WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])
  return (
    <AnimatePresence mode="wait">
      <motion.span key={idx} className="text-gradient-anim"
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'inline-block' }}>
        {ROTATE_WORDS[idx]}
      </motion.span>
    </AnimatePresence>
  )
}

function SplitChars({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
            transition={{ delay: baseDelay + i * 0.032, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </>
  )
}

function Marquee() {
  const items = ['AI Контент', 'AI Автоматизация', 'AI для Бизнеса', 'AI Обучение', 'Автоматизация', 'Контент-завод', 'Чат-боты', 'LIDINC']
  const doubled = [...items, ...items, ...items]
  return (
    <div className="overflow-hidden border-y border-gray-200 bg-[#f0f0ee] py-3 select-none">
      <motion.div className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-7 text-[11px] tracking-[0.3em] uppercase text-gray-400 px-7"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            {item}
            <span className="inline-block w-[3px] h-[3px] rounded-full bg-gray-300 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export { Marquee }

export default function HeroSection({ onContact, onScrollToServices, onPlayVideo }: {
  onContact: () => void
  onScrollToServices: () => void
  onPlayVideo: () => void
}) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden bg-[#f0f0ee]">
      <video
        src={VIDEO_SRC} muted loop playsInline
        autoPlay={typeof window !== 'undefined' && window.innerWidth > 768}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 20%', backgroundColor: '#0d0d0d' }}
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%230d0d0d'/%3E%3C/svg%3E"
      />

      <motion.div className="absolute inset-0"
        initial={{ clipPath: 'inset(22% 12% 22% 12% round 18px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}>
        <div className="absolute inset-0 bg-black/38" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
        <FloatingOrbs accent={HERO.accent} />
      </motion.div>

      <motion.div className="absolute inset-0 z-10 flex flex-col justify-start pt-24 sm:pt-28 px-6 sm:px-12 md:px-20 lg:px-28"
        style={{ y: contentY }}>
        <div className="max-w-2xl">
          <motion.a href="#" onClick={e => { e.preventDefault(); onScrollToServices() }}
            className="inline-flex items-center gap-2.5 text-[11px] font-medium text-white/70 px-4 py-1.5 rounded-full mb-5 group hover:text-white transition-colors duration-300"
            style={{ border: '1px solid rgba(96,165,250,0.3)', background: 'rgba(96,165,250,0.06)', boxShadow: '0 0 18px rgba(96,165,250,0.12)' }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.5 }}
            whileHover={{ boxShadow: '0 0 28px rgba(96,165,250,0.22)', borderColor: 'rgba(96,165,250,0.55)' }}>
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
            </span>
            {HERO.badge}
            <span className="text-white/40 group-hover:text-white/70 transition-colors group-hover:translate-x-0.5 inline-block transition-transform duration-200">→</span>
          </motion.a>

          <h1 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] leading-[1.12] text-white tracking-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
            {HERO.title.map((line, i) => (
              <div key={i} style={{ lineHeight: '1.12' }}>
                {i === 1 ? (
                  <div style={{ overflow: 'hidden' }}>
                    <motion.div initial={{ y: '110%' }} animate={{ y: '0%' }}
                      transition={{ delay: 1.05, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>
                      Вашего <RotatingWord />
                    </motion.div>
                  </div>
                ) : (
                  <SplitChars text={line} baseDelay={0.92 + i * 0.08} />
                )}
              </div>
            ))}
          </h1>

          <motion.p className="text-[13px] sm:text-[15px] text-white/55 font-normal mb-6 max-w-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.28, duration: 0.5 }}>
            {HERO.sub}
          </motion.p>

          <motion.div className="flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}>
            <MagneticButton>
              <button type="button" onClick={onContact}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 border border-white/20 rounded-full px-5 py-2.5 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-200 group backdrop-blur-sm">
                Бесплатная консультация
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 opacity-60 group-hover:opacity-100">→</span>
              </button>
            </MagneticButton>
            <button type="button" onClick={onPlayVideo}
              className="inline-flex items-center gap-2.5 text-[13px] font-medium text-white/35 hover:text-white/65 transition-colors duration-200 group">
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-200">
                <Play size={12} className="ml-0.5" />
              </span>
              Смотреть шоурил
            </button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {!scrolled && (
          <motion.div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.8 }}>
            <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase select-none">scroll</p>
            <motion.div className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent"
              animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {[
        { text: '50+ проектов',             x: '68%', y: '32%', delay: 1.7 },
        { text: '150+ клиентов',            x: '74%', y: '52%', delay: 1.95 },
        { text: '5+ лет опыта работы с ИИ', x: '62%', y: '68%', delay: 2.15 },
      ].map(b => (
        <motion.div key={b.text}
          className="absolute hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 text-white/80 text-[13px] font-medium z-20 select-none"
          style={{ left: b.x, top: b.y }}
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
          transition={{ opacity: { delay: b.delay, duration: 0.5 }, scale: { delay: b.delay, duration: 0.5 }, y: { delay: b.delay + 0.5, duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}>
          {b.text}
        </motion.div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Marquee />
      </div>
    </div>
  )
}
