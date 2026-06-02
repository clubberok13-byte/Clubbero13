import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { FloatingOrbs, SplitTitle } from '../ui/animations'

const LOGOS = ['FitLife', 'SkyStore', 'DevGroup', 'RealTech', 'MediaHub', 'ProBrand']
const TELEGRAM = 'https://t.me/AlexSTETSKIY'
const EMAIL = 'clubberok13@gmail.com'

const NAV_COLS: { title: string; links: { label: string; idx: number }[] }[] = [
  {
    title: 'Услуги',
    links: [
      { label: 'AI Content', idx: 1 },
      { label: 'AI Автоматизация', idx: 1 },
      { label: 'AI для Бизнеса', idx: 1 },
      { label: 'AI Обучение', idx: 1 },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'О нас', idx: 2 },
      { label: 'Кейсы', idx: 3 },
      { label: 'Отзывы', idx: 3 },
      { label: 'Как мы работаем', idx: 4 },
    ],
  },
]

function TelegramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

export default function CtaSection({ onContact, onScrollTo }: {
  onContact: () => void
  onScrollTo?: (idx: number) => void
}) {
  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{ width: '100vw', height: '100vh', backgroundColor: '#050505' }}
    >
      <FloatingOrbs accent="#3b82f6" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />

      {/* CTA content — centred in the upper portion */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 w-full">
        {/* Logos strip */}
        <motion.div
          className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-white/20 text-[11px] tracking-[0.2em] uppercase shrink-0">Нам доверяют</span>
          {LOGOS.map(logo => (
            <span key={logo} className="text-white/30 text-[13px] font-medium tracking-wide hover:text-white/55 transition-colors duration-300">
              {logo}
            </span>
          ))}
        </motion.div>

        <SplitTitle
          text={'Готовы\nначать?'}
          className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] text-white tracking-tight mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        />

        <motion.p
          className="text-white/45 text-[14px] sm:text-[15px] leading-relaxed max-w-md mb-8"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          Оставьте заявку — обсудим вашу задачу бесплатно и предложим решение за 48 часов.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          <motion.button
            type="button" onClick={onContact}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-[13px] font-semibold"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #22d3ee, #a78bfa, #3b82f6)',
              backgroundSize: '300% 300%',
            }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Send size={13} />Оставить заявку
          </motion.button>
          <a
            href={TELEGRAM} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/15 text-white/55 text-[13px] font-medium hover:text-white hover:border-white/35 transition-all duration-200 backdrop-blur-sm"
          >
            <TelegramIcon size={13} />Telegram
          </a>
        </motion.div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────────── */}
      <motion.footer
        className="relative z-10 border-t border-white/[0.07] px-6 sm:px-12 md:px-20 lg:px-28 py-8"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between mb-8">
          {/* Brand */}
          <div className="max-w-[220px]">
            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 256 256" fill="none">
                <path fill="url(#lidinc-grad)" d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z" />
              </svg>
              <span className="text-white/70 text-[12px] font-semibold tracking-[0.12em]">LIDINC</span>
            </div>
            <p className="text-white/25 text-[12px] leading-relaxed">
              AI-агентство полного цикла — контент, разработка, автоматизация и обучение.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {NAV_COLS.map(col => (
              <div key={col.title}>
                <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => onScrollTo?.(link.idx)}
                        className="text-white/45 text-[12px] hover:text-white/70 transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contacts column */}
            <div>
              <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">Контакты</p>
              <ul className="space-y-2">
                <li>
                  <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
                    className="text-white/45 text-[12px] hover:text-white/70 transition-colors flex items-center gap-1.5">
                    <TelegramIcon size={11} />Telegram
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`}
                    className="text-white/45 text-[12px] hover:text-white/70 transition-colors">
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-6 border-t border-white/[0.05]">
          <p className="text-white/20 text-[11px]">© 2026 LIDINC. Все права защищены.</p>
          <a href="/privacy"
            onClick={e => { e.preventDefault(); window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }}
            className="text-white/15 hover:text-white/35 text-[11px] transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </motion.footer>
    </div>
  )
}
