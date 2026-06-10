import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Marquee } from './HeroMarquee'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4'

function SparkPill() {
  return (
    <span
      className="inline-flex items-center gap-1 mx-2 align-middle px-2.5 py-0.5 rounded-full"
      style={{ border: '1.5px solid rgba(26,26,26,0.55)', verticalAlign: 'middle' }}
    >
      <svg width="9" height="9" viewBox="0 0 10 10" fill="#1a1a1a">
        <path d="M5 0L5.95 3.55L9.51 5L5.95 6.45L5 10L4.05 6.45L0.49 5L4.05 3.55Z" />
      </svg>
      <span style={{ fontSize: '10px', fontFamily: "'Inter', sans-serif", fontWeight: 600, color: '#1a1a1a', letterSpacing: '0.05em' }}>
        AI
      </span>
    </span>
  )
}

export default function HeroSection({ onScrollToServices }: {
  onContact?: () => void
  onScrollToServices: () => void
}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = query.trim()
    if (text) {
      setQuery('')
      window.dispatchEvent(new CustomEvent('lidinc-ask', { detail: { message: text } }))
    } else {
      onScrollToServices()
    }
  }

  return (
    <section className="relative flex flex-col" style={{ minHeight: '100svh', backgroundColor: '#EDEEF5' }}>

      {/* Background video */}
      <div className="absolute top-[12vh] sm:top-[18vh] left-0 w-full pointer-events-none z-0"
        style={{ height: '90vh' }}>
        <video
          src={HERO_VIDEO} autoPlay loop muted playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-24 sm:h-32"
          style={{ background: 'linear-gradient(to bottom, #EDEEF5, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-full h-40"
          style={{ background: 'linear-gradient(to top, #EDEEF5, transparent)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl w-full mx-auto px-6 md:px-16 lg:px-20 pt-28 sm:pt-36">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
          <div className="col-span-12 md:col-span-10 md:col-start-2">

            {/* Headline */}
            <motion.h1
              className="leading-[1.05] tracking-tight mb-8"
              style={{
                fontFamily: "'Outfit', 'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.2rem, 5.8vw, 5.5rem)',
              }}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ color: '#1a1a1a' }}>LIDINC создаёт</span>
              <br />
              <span style={{ color: '#8e8e8e' }}>AI-решения для</span>
              <br />
              <span style={{ color: '#8e8e8e' }}>вашего бизнеса</span>
              <SparkPill />
              <br />
              <span style={{ color: '#8e8e8e' }}>под ключ за 48 часов.</span>
            </motion.h1>

            {/* Search pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <form onSubmit={handleSubmit}
                className="inline-flex items-center rounded-[8px] border pl-4 pr-1 py-1 w-full max-w-sm"
                style={{ background: 'white', borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Опишите вашу задачу..."
                  className="flex-1 bg-transparent text-[13px] text-[#1a1a1a] placeholder-[#b0b0b0] outline-none min-w-0"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <button type="submit"
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
                  style={{ background: '#1a1a1a' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Edge anchors */}
      <motion.div
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      >
        <div className="flex flex-col text-[10px] font-semibold tracking-[0.12em] rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,0,0,0.08)' }}>
          {['RU', 'EN'].map((lang, i) => (
            <button key={lang} type="button"
              className="px-3 py-1.5 transition-colors"
              style={{ color: i === 0 ? '#1a1a1a' : '#bbb', fontFamily: "'Inter', sans-serif" }}>
              {lang}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.span className="absolute bottom-20 left-6 sm:left-8 z-20 text-[10px] tracking-[0.2em] select-none"
        style={{ color: '#bbb', fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        2026
      </motion.span>

      <motion.span className="absolute bottom-20 right-6 sm:right-8 z-20 text-[10px] tracking-[0.2em] uppercase select-none"
        style={{ color: '#bbb', fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        AI услуги
      </motion.span>

      {/* Marquee */}
      <div className="relative z-20 mt-auto">
        <Marquee />
      </div>

      {/* Fade to dark (transition to Services section) */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-30"
        style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }} />
    </section>
  )
}
