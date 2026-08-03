import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Video, Bot, Database, GraduationCap } from 'lucide-react'
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

export default function CasesTestimonialsSection() {
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
        <div className="mb-6 sm:mb-8">
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

        {/* Desktop: 4-column grid */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-4 gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
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
      </div>
    </div>
  )
}
