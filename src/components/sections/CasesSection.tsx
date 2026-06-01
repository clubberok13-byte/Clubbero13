import { motion } from 'framer-motion'
import { FloatingOrbs, SplitTitle, useScrambleOnView } from '../ui/animations'
import { GlowCard } from '../ui/spotlight-card'

const CASES = [
  {
    num: '01',
    category: 'AI Content',
    title: 'Контент-завод для фитнес-бренда',
    desc: 'AI-аватары, автосубтитры, мультиязычная озвучка без студии',
    result: '120 роликов за 2 месяца',
    accent: '#22d3ee',
    glow: 'cyan' as const,
  },
  {
    num: '02',
    category: 'AI Business',
    title: 'Чат-бот для интернет-магазина',
    desc: 'Интеграция с Bitrix24, автоматическая обработка заказов и FAQ',
    result: '70% запросов автоматизировано',
    accent: '#60a5fa',
    glow: 'blue' as const,
  },
  {
    num: '03',
    category: 'AI Development',
    title: 'Парсинг конкурентов в e-com нише',
    desc: 'Ежедневный сбор цен и аналитика по 12 площадкам',
    result: '500 000 SKU обработано',
    accent: '#a78bfa',
    glow: 'purple' as const,
  },
  {
    num: '04',
    category: 'AI Education',
    title: 'Обучение IT-команды застройщика',
    desc: 'ChatGPT, Midjourney, автоматизация процессов разработки',
    result: '45 специалистов обучено',
    accent: '#fbbf24',
    glow: 'orange' as const,
  },
]

export default function CasesSection() {
  const { ref, scrambled } = useScrambleOnView('Кейсы')

  return (
    <div
      ref={ref}
      className="relative snap-start overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', height: '100vh', scrollSnapStop: 'always', backgroundColor: '#080808' }}
    >
      <FloatingOrbs accent="#a78bfa" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 w-full">
        <div className="mb-8 sm:mb-10">
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

        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6
                        sm:mx-0 sm:px-0 sm:overflow-x-visible sm:snap-none sm:pb-0
                        sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {CASES.map((c, i) => (
            <motion.div key={c.num}
              className="shrink-0 snap-start w-[72vw] sm:w-auto"
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlowCard glowColor={c.glow} customSize className="w-full p-5 flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: c.accent }}>
                      {c.category}
                    </span>
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
        </div>
      </div>
    </div>
  )
}
