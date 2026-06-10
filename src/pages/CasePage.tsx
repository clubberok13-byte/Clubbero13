import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowLeft, Send } from 'lucide-react'
import { LogoIcon, SvgDefs, TELEGRAM } from '../components/ui/icons'
import { staggerContainer, staggerItem } from '../components/ui/animations'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export interface CaseData {
  slug: string
  client: string
  category: string
  accent: string
  title: string
  subtitle: string
  metaTitle: string
  metaDesc: string
  problem: string
  solution: string
  results: { label: string; value: string }[]
  details: string[]
  duration: string
  budget: string
}

export default function CasePage({ c }: { c: CaseData }) {
  useEffect(() => {
    document.title = c.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.metaDesc)
    return () => {
      document.title = 'LIDINC — AI-агентство: чат-боты, автоматизация и AI-контент под ключ'
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Внедряем AI в бизнес под ключ.')
    }
  }, [c.metaTitle, c.metaDesc])

  return (
    <div className="bg-[#080808] text-white min-h-screen">
      <SvgDefs />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-6 sm:px-12 md:px-20 lg:px-28 pt-5 pb-4 bg-gradient-to-b from-[#080808] to-transparent">
        <button type="button" onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors duration-200">
          <LogoIcon />
          <span className="text-[13px] font-semibold tracking-[0.1em]">LIDINC</span>
        </button>
        <span className="text-white/15">/</span>
        <button type="button" onClick={() => navigate('/')}
          className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Кейсы</button>
        <span className="text-white/15">/</span>
        <span className="text-[13px] text-white/35">{c.client}</span>
      </nav>

      {/* Hero */}
      <div className="relative px-6 sm:px-12 md:px-20 lg:px-28 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 15% 30%, ${c.accent}18, transparent 65%)` }} />
        <div className="relative z-10 max-w-3xl">
          <motion.p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4"
            style={{ color: c.accent }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {c.category}
          </motion.p>
          <motion.h1 className="text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] leading-[1.08] tracking-tight mb-4 text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            {c.title}
          </motion.h1>
          <motion.p className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            {c.subtitle}
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 text-[12px] text-white/35"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span>Клиент: <span className="text-white/60">{c.client}</span></span>
            <span>·</span>
            <span>Срок: <span className="text-white/60">{c.duration}</span></span>
            <span>·</span>
            <span>Бюджет: <span className="text-white/60">{c.budget}</span></span>
          </motion.div>
        </div>
      </div>

      {/* Results grid */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-6" style={{ color: c.accent }}>Результаты</p>
        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {c.results.map(r => (
            <motion.div key={r.label} variants={staggerItem}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
              <p className="text-white text-[2rem] leading-none mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: c.accent }}>
                {r.value}
              </p>
              <p className="text-white/40 text-[12px]">{r.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Problem / Solution */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: c.accent }}>Задача</p>
          <p className="text-white/60 text-[14px] leading-relaxed">{c.problem}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: c.accent }}>Решение</p>
          <p className="text-white/60 text-[14px] leading-relaxed">{c.solution}</p>
        </div>
      </section>

      {/* Details */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-6" style={{ color: c.accent }}>Что сделали</p>
        <motion.ul className="space-y-3 max-w-xl"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {c.details.map(d => (
            <motion.li key={d} variants={staggerItem} className="flex items-start gap-3">
              <Check size={14} className="shrink-0 mt-0.5" style={{ color: c.accent }} />
              <span className="text-white/60 text-[14px] leading-relaxed">{d}</span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-20">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 max-w-lg">
          <p className="text-white text-[1.4rem] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
            Хотите похожий результат?
          </p>
          <p className="text-white/40 text-[13px] leading-relaxed mb-6">
            Расскажите вашу задачу — подберём решение и дадим оценку за 48 часов.
          </p>
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-[13px] font-semibold"
            style={{ background: `linear-gradient(135deg, ${c.accent}cc, ${c.accent}88)` }}>
            <Send size={13} />Обсудить проект
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] px-6 sm:px-12 md:px-20 lg:px-28 py-8 flex items-center justify-between">
        <button type="button" onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-[13px]">
          <ArrowLeft size={13} />На главную
        </button>
        <p className="text-white/15 text-[11px]">© 2026 LIDINC</p>
      </footer>
    </div>
  )
}
