import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Star, Video, Bot, Database, GraduationCap } from 'lucide-react'
import { FloatingOrbs, SplitTitle, useScrambleOnView, staggerContainer, staggerItem } from '../ui/animations'
import { GlowCard } from '../ui/spotlight-card'

const CASES = [
  {
    num: '01', category: 'AI Контент',
    title: 'Контент-завод для фитнес-бренда',
    desc: 'AI-аватары, автосубтитры, мультиязычная озвучка без студии',
    result: '120 роликов за 2 месяца',
    accent: '#22d3ee', glow: 'cyan' as const,
    Icon: Video, barPercent: 82,
  },
  {
    num: '02', category: 'AI для Бизнеса',
    title: 'Чат-бот для интернет-магазина',
    desc: 'Интеграция с Bitrix24, автоматическая обработка заказов и FAQ',
    result: '70% запросов автоматизировано',
    accent: '#60a5fa', glow: 'blue' as const,
    Icon: Bot, barPercent: 70,
  },
  {
    num: '03', category: 'AI Автоматизация',
    title: 'Парсинг конкурентов в e-com нише',
    desc: 'Ежедневный сбор цен и аналитика по 12 площадкам',
    result: '500 000 SKU обработано',
    accent: '#a78bfa', glow: 'purple' as const,
    Icon: Database, barPercent: 95,
  },
  {
    num: '04', category: 'AI Обучение',
    title: 'Обучение IT-команды застройщика',
    desc: 'ChatGPT, Midjourney, автоматизация процессов разработки',
    result: '45 специалистов обучено',
    accent: '#fbbf24', glow: 'orange' as const,
    Icon: GraduationCap, barPercent: 90,
  },
]

const REVIEWS = [
  {
    name: 'Михаил Орлов', role: 'Директор по маркетингу, FitLife', stars: 5,
    text: 'За 2 месяца закрыли потребность в видеоконтенте на полгода вперёд. AI-аватары выглядят убедительно, команда не нарадуется.',
    avatarColor: '#22d3ee',
  },
  {
    name: 'Анна Крылова', role: 'CEO, SkyStore', stars: 5,
    text: 'Чат-бот от LIDINC разгрузил поддержку на 70%. Клиенты получают ответы мгновенно, а менеджеры занимаются реальными задачами.',
    avatarColor: '#60a5fa',
  },
  {
    name: 'Дмитрий Соколов', role: 'CTO, DevGroup', stars: 5,
    text: 'Провели обучение для всей IT-команды — 45 человек. Подача живая, материал актуальный. После воркшопов реально ускорили разработку.',
    avatarColor: '#a78bfa',
  },
]

function CaseCard({ c }: { c: typeof CASES[0] }) {
  const Icon = c.Icon
  return (
    <GlowCard glowColor={c.glow} customSize className="w-full p-5 flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}28` }}
            >
              <Icon size={14} style={{ color: c.accent }} />
            </div>
            <span className="text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: c.accent }}>
              {c.category}
            </span>
          </div>
          <span className="text-white/12 text-[11px] font-light tabular-nums">{c.num}</span>
        </div>
        <p className="text-white text-[14px] font-medium leading-snug mb-2">{c.title}</p>
        <p className="text-white/40 text-[12px] leading-relaxed">{c.desc}</p>
      </div>

      <div className="pt-3 border-t border-white/[0.07] mt-4 space-y-2">
        <p className="text-[13px] font-semibold" style={{ color: c.accent }}>{c.result}</p>
        <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${c.accent}CC, ${c.accent}44)` }}
            initial={{ width: '0%' }}
            whileInView={{ width: `${c.barPercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          />
        </div>
      </div>
    </GlowCard>
  )
}

function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 relative overflow-hidden">
      {/* Decorative quote mark */}
      <svg
        className="absolute top-4 right-5 opacity-[0.055]"
        width="36" height="28" viewBox="0 0 36 28" fill="white"
      >
        <path d="M0 28V17.5C0 7.833 5.333 2.167 16 0l2 3.5C12.667 5.167 10 8.333 10 13h6V28H0zm20 0V17.5C20 7.833 25.333 2.167 36 0l2 3.5C32.667 5.167 30 8.333 30 13h6V28H20z"/>
      </svg>

      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: r.stars }).map((_, j) => (
          <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-white/75 text-[13px] leading-relaxed mb-5">"{r.text}"</p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[13px] font-semibold text-black"
          style={{ background: r.avatarColor }}
        >
          {r.name.charAt(0)}
        </div>
        <div>
          <p className="text-white text-[13px] font-medium">{r.name}</p>
          <p className="text-white/35 text-[11px] mt-0.5">{r.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function CasesTestimonialsSection() {
  const [tab, setTab] = useState<'cases' | 'reviews'>('cases')
  const [isDragging, setIsDragging] = useState(false)
  const constraintRef = useRef<HTMLDivElement>(null)
  const { ref, scrambled } = useScrambleOnView('Результаты')

  return (
    <div
      ref={ref}
      className="svh-screen relative overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', backgroundColor: '#080808' }}
    >
      <FloatingOrbs accent="#a78bfa" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 w-full">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <motion.p
              className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-3 font-medium"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              {scrambled}
            </motion.p>
            <SplitTitle
              text={'Наши\nрезультаты'}
              className="text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] text-white tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            />
          </div>
          <div className="flex gap-1.5 shrink-0 mb-1">
            {(['cases', 'reviews'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`text-[11px] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full transition-all duration-300 border ${
                  tab === t
                    ? 'bg-white/10 text-white border-white/20'
                    : 'text-white/35 border-transparent hover:text-white/60'
                }`}
              >
                {t === 'cases' ? 'Кейсы' : 'Отзывы'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'cases' ? (
            <motion.div
              key="cases"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {/* Desktop: 4-column grid */}
              <motion.div
                className="hidden lg:grid lg:grid-cols-4 gap-3"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {CASES.map(c => (
                  <motion.div key={c.num} variants={staggerItem}>
                    <CaseCard c={c} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile/tablet: drag carousel */}
              <div className="lg:hidden">
                <div
                  ref={constraintRef}
                  className="overflow-hidden"
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  <motion.div
                    drag="x"
                    dragConstraints={constraintRef}
                    dragElastic={0.05}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    className="flex gap-3 pb-2"
                    style={{ width: 'max-content' }}
                  >
                    {CASES.map((c, i) => (
                      <motion.div key={c.num}
                        className="w-[260px] sm:w-[280px] shrink-0"
                        initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.06 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <CaseCard c={c} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <p className="text-white/15 text-[10px] mt-3 tracking-[0.25em] uppercase text-center select-none">
                  drag to explore
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reviews"
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6
                         sm:mx-0 sm:px-0 sm:overflow-x-visible sm:snap-none sm:pb-0
                         sm:grid sm:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {REVIEWS.map(r => (
                <motion.div key={r.name}
                  variants={staggerItem}
                  className="shrink-0 snap-start w-[78vw] sm:w-auto"
                >
                  <ReviewCard r={r} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
