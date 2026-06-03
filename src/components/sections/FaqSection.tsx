import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingOrbs, SplitTitle } from '../ui/animations'

const FAQS = [
  {
    q: 'Сколько стоит разработка AI-решения?',
    a: 'Стоимость зависит от сложности задачи. AI Контент — от 15 000 ₽, AI Автоматизация — от 30 000 ₽, AI для Бизнеса — от 50 000 ₽, AI Обучение — от 20 000 ₽. Точную цену рассчитываем после бесплатной консультации.',
  },
  {
    q: 'Как быстро вы запускаете проект?',
    a: 'Стратегию и смету готовим за 48 часов после первой встречи. Сроки реализации зависят от объёма: простые автоматизации — 1-2 недели, сложные AI-системы — 4-8 недель.',
  },
  {
    q: 'Нужен ли технический специалист на стороне клиента?',
    a: 'Нет. Мы берём на себя всё — от анализа задачи до внедрения и обучения команды. Для работы с результатом достаточно базовых навыков компьютера.',
  },
  {
    q: 'Вы работаете с компаниями из регионов?',
    a: 'Да, работаем удалённо по всей России и СНГ. Все встречи — в Zoom или Telegram. Для масштабных проектов возможен выезд.',
  },
  {
    q: 'Что будет после запуска проекта?',
    a: 'Мы сопровождаем проект после запуска: исправляем баги, дообучаем модели под новые данные, помогаем команде освоить инструмент. Поддержка включена в стоимость первые 30 дней.',
  },
  {
    q: 'Вы подписываете NDA?',
    a: 'Да, подписываем NDA до начала работы по запросу клиента. Конфиденциальность данных — наш приоритет.',
  },
]

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.07]">
      <button type="button" onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className={`text-[14px] sm:text-[15px] font-medium transition-colors duration-200 ${open ? 'text-white' : 'text-white/65 group-hover:text-white/85'}`}>
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          className="shrink-0 w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/40">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-white/45 text-[13px] sm:text-[14px] leading-relaxed pb-5 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#080808' }}>
      <FloatingOrbs accent="#60a5fa" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 w-full py-24">
        <motion.p className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-3 font-medium"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          FAQ
        </motion.p>
        <SplitTitle text={'Частые\nвопросы'}
          className="text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] text-white tracking-tight mb-12"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }} />

        <div className="max-w-3xl">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a}
              open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </div>
  )
}
