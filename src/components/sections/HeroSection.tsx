import { useState, useRef, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Marquee } from './HeroMarquee'
import { ymGoal } from '../../lib/metrika'

function getHeroVariant(): 'A' | 'B' {
  try {
    const stored = localStorage.getItem('lidinc_hero_v')
    if (stored === 'A' || stored === 'B') return stored
    const v: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B'
    localStorage.setItem('lidinc_hero_v', v)
    return v
  } catch {
    return 'A'
  }
}

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

function HeroCTAB() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const honeypotRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), contact: contact.trim(), service: 'Hero B', message: '', _h: honeypotRef.current?.value ?? '' }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      ymGoal('hero_b_submit')
    } catch {
      /* silent — user can retry */
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!open ? (
        <motion.button
          type="button"
          onClick={() => { setOpen(true); ymGoal('hero_b_open') }}
          className="inline-flex items-center gap-2 rounded-[8px] px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: '#1a1a1a', fontFamily: "'Inter', sans-serif", boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Получить консультацию
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-full max-w-sm"
            style={{ position: 'relative' }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {sent ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[13px] text-[#1a1a1a]/60 py-2"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Готово — свяжемся в течение нескольких часов.
              </motion.p>
            ) : (
              <>
                <input ref={honeypotRef} type="text" name="_h" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-5000px', top: 'auto' }} />
                <input
                  value={name} onChange={e => setName(e.target.value)}
                  placeholder="Ваше имя" required autoFocus
                  className="rounded-[8px] border px-4 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#b0b0b0] outline-none"
                  style={{ background: 'white', borderColor: 'rgba(0,0,0,0.10)', fontFamily: "'Inter', sans-serif" }}
                />
                <input
                  value={contact} onChange={e => setContact(e.target.value)}
                  placeholder="Telegram, WhatsApp или email" required
                  className="rounded-[8px] border px-4 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#b0b0b0] outline-none"
                  style={{ background: 'white', borderColor: 'rgba(0,0,0,0.10)', fontFamily: "'Inter', sans-serif" }}
                />
                <button type="submit" disabled={loading || !name.trim() || !contact.trim()}
                  className="rounded-[8px] px-5 py-2.5 text-[13px] font-semibold text-white disabled:opacity-40 transition-opacity hover:opacity-80"
                  style={{ background: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>
                  {loading ? 'Отправляем…' : 'Отправить →'}
                </button>
              </>
            )}
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  )
}

export default function HeroSection({ onScrollToServices }: {
  onContact?: () => void
  onScrollToServices: () => void
}) {
  const [query, setQuery] = useState('')
  const [variant] = useState<'A' | 'B'>(() => getHeroVariant())
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ymGoal(`hero_${variant.toLowerCase()}_view`)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = query.trim()
    if (text) {
      setQuery('')
      ymGoal('hero_a_submit')
      window.dispatchEvent(new CustomEvent('lidinc-ask', { detail: { message: text } }))
    } else {
      onScrollToServices()
    }
  }

  return (
    <section className="relative flex flex-col" style={{ minHeight: '100svh', backgroundColor: '#EDEEF5' }}>

      {/* Background video — hidden on very small screens to save bandwidth */}
      <div className="hidden sm:block absolute top-[18vh] left-0 w-full pointer-events-none z-0"
        style={{ height: '90vh' }}>
        <video
          src={HERO_VIDEO} autoPlay loop muted playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-32"
          style={{ background: 'linear-gradient(to bottom, #EDEEF5, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-full h-40"
          style={{ background: 'linear-gradient(to top, #EDEEF5, transparent)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-7xl w-full mx-auto px-6 md:px-16 lg:px-20 pt-24 sm:pt-36">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
          <div className="col-span-12 md:col-span-10 md:col-start-2">

            {/* Headline */}
            <motion.h1
              className="leading-[1.08] tracking-tight mb-7"
              style={{
                fontFamily: "'Outfit', 'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 5.8vw, 5.5rem)',
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

            {/* CTA — A/B */}
            {variant === 'A' ? (
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
            ) : (
              <HeroCTAB />
            )}

          </div>
        </div>
      </div>

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
