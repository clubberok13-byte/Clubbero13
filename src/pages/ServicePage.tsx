import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Send } from 'lucide-react'
import { FloatingOrbs, staggerContainer, staggerItem } from '../components/ui/animations'
import { LogoIcon, SvgDefs, TELEGRAM, WHATSAPP } from '../components/ui/icons'
import { GlowCard } from '../components/ui/spotlight-card'
import type { SectionData } from '../data/sections'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function setMeta(title: string, description: string) {
  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/[0.07]">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className={`text-[14px] sm:text-[15px] font-medium transition-colors duration-200 ${open ? 'text-white' : 'text-white/65 group-hover:text-white/85'}`}>
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          className="shrink-0 w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/40">
          <ChevronDown size={12} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-white/45 text-[13px] sm:text-[14px] leading-relaxed pb-5 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export interface ServicePageProps {
  section: SectionData
  h1: string
  subtitle: string
  metaTitle: string
  metaDesc: string
  faq: { q: string; a: string }[]
}

export default function ServicePage({ section, h1, subtitle, metaTitle, metaDesc, faq }: ServicePageProps) {
  useEffect(() => {
    setMeta(metaTitle, metaDesc)
    return () => setMeta(
      'LIDINC — AI-агентство: чат-боты, автоматизация и AI-контент под ключ',
      'Внедряем AI в бизнес под ключ. Разработка чат-ботов от 15 000 ₽, автоматизация бизнес-процессов, AI-контент и обучение команд.'
    )
  }, [metaTitle, metaDesc])

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
        <span className="text-[13px] text-white/35">{section.category.split(' / ')[1]}</span>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden pt-32 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
        <FloatingOrbs accent={section.accent} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <motion.p
            className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4"
            style={{ color: section.accent }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            {section.category}
          </motion.p>
          <motion.h1
            className="text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] leading-[1.08] tracking-tight mb-5 text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          >
            {h1}
          </motion.h1>
          <motion.p
            className="text-white/50 text-[15px] sm:text-[16px] leading-relaxed mb-8 max-w-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
          <motion.div className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}>
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-[13px] font-semibold"
              style={{ background: `linear-gradient(135deg, ${section.accent}cc, ${section.accent}88)` }}>
              <Send size={13} />Получить консультацию
            </a>
            <button type="button" onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/15 text-white/50 text-[13px] font-medium hover:text-white hover:border-white/35 transition-all duration-200">
              Все услуги →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Services */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-6" style={{ color: section.accent }}>
          Что входит в услугу
        </p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          {section.services.map(svc => {
            const Icon = svc.icon
            return (
              <motion.div key={svc.name} variants={staggerItem}>
                <GlowCard glowColor="blue" customSize className="w-full p-5 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${section.accent}18`, border: `1px solid ${section.accent}28` }}>
                    <Icon size={18} style={{ color: section.accent }} />
                  </div>
                  <div>
                    <p className="text-white text-[14px] font-medium mb-1">{svc.name}</p>
                    <p className="text-white/40 text-[12px] leading-snug">{svc.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Details checklist */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-16">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-6" style={{ color: section.accent }}>
            Подробнее
          </p>
          <motion.ul className="space-y-3"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {section.details.map(d => (
              <motion.li key={d} variants={staggerItem} className="flex items-start gap-3">
                <Check size={15} className="shrink-0 mt-0.5" style={{ color: section.accent }} />
                <span className="text-white/70 text-[14px] leading-relaxed">{d}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Price + CTA */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-16">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 max-w-xl">
          <p className="text-white/30 text-[11px] tracking-wide uppercase mb-1">Стоимость от</p>
          <p className="text-white text-[2.8rem] leading-none mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{section.price}</p>
          <p className="text-white/40 text-[13px] leading-relaxed mb-6">
            Точную стоимость рассчитываем после бесплатной консультации — за 48 часов.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-[13px] font-semibold"
              style={{ background: `linear-gradient(135deg, ${section.accent}cc, ${section.accent}88)` }}>
              <Send size={13} />Написать в Telegram
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/15 text-white/50 text-[13px] hover:text-white hover:border-white/35 transition-all duration-200">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-12 md:px-20 lg:px-28 pb-20">
        <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-6" style={{ color: section.accent }}>
          Частые вопросы
        </p>
        <div className="max-w-2xl">
          {faq.map(item => <FaqItem key={item.q} q={item.q} a={item.a} />)}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] px-6 sm:px-12 md:px-20 lg:px-28 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button type="button" onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-[13px]">
          ← На главную
        </button>
        <p className="text-white/15 text-[11px]">© 2026 LIDINC. Все права защищены.</p>
      </footer>
    </div>
  )
}
