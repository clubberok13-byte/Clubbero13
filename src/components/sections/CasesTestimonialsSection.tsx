import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Star } from 'lucide-react'
import { FloatingOrbs, SplitTitle, useScrambleOnView } from '../ui/animations'
import { GlowCard } from '../ui/spotlight-card'

const CASES = [
  {
    num: '01', category: 'AI Content',
    title: 'Контент-завод для фитнес-бренда',
    desc: 'AI-аватары, автосубтитры, мультиязычная озвучка без студии',
    result: '120 роликов за 2 месяца', accent: '#22d3ee', glow: 'cyan' as const,
  },
  {
    num: '02', category: 'AI для Бизнеса',
    title: 'Чат-бот для интернет-магазина',
    desc: 'Интеграция с Bitrix24, автоматическая обработка заказов и FAQ',
    result: '70% запросов автоматизировано', accent: '#60a5fa', glow: 'blue' as const,
  },
  {
    num: '03', category: 'AI Автоматизация',
    title: 'Парсинг конкурентов в e-com нише',
    desc: 'Ежедневный сбор цен и аналитика по 12 площадкам',
    result: '500 000 SKU обработано', accent: '#a78bfa', glow: 'purple' as const,
  },
  {
    num: '04', category: 'AI Обучение',
    title: 'Обучение IT-команды застройщика',
    desc: 'ChatGPT, Midjourney, автоматизация процессов разработки',
    result: '45 специалистов обучено', accent: '#fbbf24', glow: 'orange' as const,
  },
]

const REVIEWS = [
  {
    name: 'Михаил Орлов', role: 'Директор по маркетингу, FitLife', stars: 5,
    text: 'За 2 месяца закрыли потребность в видеоконтенте на полгода вперёд. AI-аватары выглядят убедительно, команда не нарадуется.',
  },
  {
    name: 'Анна Крылова', role: 'CEO, SkyStore', stars: 5,
    text: 'Чат-бот от LIDINC разгрузил поддержку на 70%. Клиенты получают ответы мгновенно, а менеджеры занимаются реальными задачами.',
  },
  {
    name: 'Дмитрий Соколов', role: 'CTO, DevGroup', stars: 5,
    text: 'Провели обучение для всей IT-команды — 45 человек. Подача живая, материал актуальный. После воркшопов реально ускорили разработку.',
  },
]

export default function CasesTestimonialsSection() {
  const [tab, setTab] = useState<'cases' | 'reviews'>('cases')
  const [isDragging, setIsDragging] = useState(false)
  const constraintRef = useRef<HTMLDivElement>(null)
  const { ref, scrambled } = useScrambleOnView('Результаты')

  return (
    <div
      ref={ref}
      className="relative overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', height: '100vh', backgroundColor: '#080808' }}
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
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                    >
                      <GlowCard glowColor={c.glow} customSize className="w-full p-5 flex flex-col justify-between min-h-[190px]">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: c.accent }}>{c.category}</span>
                            <span className="text-white/15 text-[11px]">{c.num}</span>
                          </div>
                          <p className="text-white text-[14px] font-medium leading-snug mb-2">{c.title}</p>
                          <p className="text-white/40 text-[12px] leading-relaxed">{c.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-white/[0.08] mt-4">
                          <p className="text-[13px] font-semibold" style={{ color: c.accent }}>{c.result}</p>
                        </div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <p className="text-white/15 text-[10px] mt-3 tracking-[0.25em] uppercase text-center select-none">
                drag to explore
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="reviews"
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6
                         sm:mx-0 sm:px-0 sm:overflow-x-visible sm:snap-none sm:pb-0
                         sm:grid sm:grid-cols-3"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {REVIEWS.map((r, i) => (
                <motion.div key={r.name}
                  className="shrink-0 snap-start w-[78vw] sm:w-auto bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.09, duration: 0.45 }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/75 text-[13px] leading-relaxed mb-5">"{r.text}"</p>
                  <div>
                    <p className="text-white text-[13px] font-medium">{r.name}</p>
                    <p className="text-white/35 text-[11px] mt-0.5">{r.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
