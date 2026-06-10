import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Marquee } from './HeroMarquee'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4'

function EyePill() {
  return (
    <span className="inline-flex items-center justify-center mx-1.5 align-middle"
      style={{ width: 'clamp(18px, 4vw, 56px)', height: 'clamp(18px, 2.2vw, 30px)', border: '2px solid #1a1a1a', borderRadius: 9999, flexShrink: 0 }}>
      <span className="rounded-full bg-[#1a1a1a]"
        style={{ width: 'clamp(5px, 0.8vw, 9px)', height: 'clamp(5px, 0.8vw, 9px)' }} />
    </span>
  )
}

export default function HeroSection({ onContact, onScrollToServices }: {
  onContact: () => void
  onScrollToServices: () => void
  onPlayVideo?: () => void
}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onContact()
      setQuery('')
    } else {
      onScrollToServices()
    }
  }

  return (
    <section className="relative overflow-hidden flex flex-col" style={{ minHeight: '100vh', backgroundColor: '#EDEEF5' }}>

      {/* Background video */}
      <div className="absolute top-[15vh] sm:top-[20vh] left-0 w-full pointer-events-none z-0"
        style={{ height: '95vh' }}>
        <video
          src={HERO_VIDEO} autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 1 }}
        />
        {/* gradient mask — blends video into bg-base */}
        <div className="absolute top-0 left-0 w-full"
          style={{ height: '10vh', background: 'linear-gradient(to bottom, #EDEEF5, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-full"
          style={{ height: '30vh', background: 'linear-gradient(to top, #EDEEF5, transparent)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl w-full mx-auto px-6 md:px-16 lg:px-20 pt-28 sm:pt-36">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
          <div className="col-span-12 md:col-span-10 md:col-start-2">

            {/* Headline */}
            <motion.h1
              className="leading-[1.05] tracking-tight mb-8"
              style={{ fontFamily: "'Outfit', 'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ color: '#1a1a1a' }}>LIDINC внедряет</span>{' '}
              <span style={{ color: '#8e8e8e' }}>AI-решения</span>
              <br />
              <span style={{ color: '#8e8e8e' }}>для вашего бизнеса</span>
              <br />
              <span style={{ color: '#8e8e8e' }}>под ключ</span>
              <EyePill />
              <span style={{ color: '#8e8e8e' }}>за 48 часов.</span>
            </motion.h1>

            {/* Search pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <form onSubmit={handleSubmit}
                className="inline-flex items-center rounded-[8px] border pl-4 pr-1 py-1 max-w-sm w-full"
                style={{ background: 'white', borderColor: 'rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Опишите вашу задачу..."
                  className="flex-1 bg-transparent text-[13px] text-[#1a1a1a] placeholder-[#aaa] outline-none min-w-0"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <button type="submit"
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-opacity duration-200 hover:opacity-80"
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
        className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      >
        <div className="flex flex-col gap-1 text-[10px] font-medium tracking-[0.12em] rounded-full border border-black/10 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)' }}>
          {(['ru', 'en'] as const).map((lang, i) => (
            <button key={lang} type="button"
              className={`px-3 py-1.5 uppercase transition-colors ${i === 0 ? 'text-[#1a1a1a]' : 'text-[#aaa] hover:text-[#1a1a1a]'}`}>
              {lang}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-6 sm:left-8 z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
      >
        <span className="text-[10px] tracking-[0.2em] text-[#aaa]" style={{ fontFamily: "'Inter', sans-serif" }}>
          2026
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-6 sm:right-8 z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
      >
        <span className="text-[10px] tracking-[0.2em] text-[#aaa] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
          AI услуги
        </span>
      </motion.div>

      {/* Marquee */}
      <div className="relative z-20 mt-auto">
        <Marquee />
      </div>
    </section>
  )
}
