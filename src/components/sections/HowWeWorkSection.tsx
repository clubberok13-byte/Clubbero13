import { motion } from 'framer-motion'
import { MessageSquare, BarChart2, Zap, Shield } from 'lucide-react'
import { FloatingOrbs, SplitTitle, useScrambleOnView } from '../ui/animations'
import type { LucideIcon } from 'lucide-react'

const STEPS: { num: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Консультация',
    desc: 'Бесплатный разбор вашей задачи. Определяем цели, ограничения и точки роста.',
  },
  {
    num: '02',
    icon: BarChart2,
    title: 'Стратегия',
    desc: 'Готовим план и смету за 48 часов. Прозрачно — без скрытых платежей.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Реализация',
    desc: 'Запускаем решение в срок. Держим в курсе на каждом этапе.',
  },
  {
    num: '04',
    icon: Shield,
    title: 'Поддержка',
    desc: 'Сопровождаем, обучаем команду и развиваем продукт после запуска.',
  },
]

export default function HowWeWorkSection() {
  const { ref, scrambled } = useScrambleOnView('Процесс')

  return (
    <div
      ref={ref}
      className="relative snap-start overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', height: '100vh', scrollSnapStop: 'always', backgroundColor: '#060606' }}
    >
      <FloatingOrbs accent="#22d3ee" />
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 w-full">
        <motion.p
          className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-3 font-medium"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          {scrambled}
        </motion.p>
        <SplitTitle
          text={'Как мы\nработаем'}
          className="text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] text-white tracking-tight mb-12"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-white/8 z-0" />
                )}

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center mb-4">
                  <Icon size={17} className="text-blue-400" />
                </div>

                <p className="text-white/20 text-[11px] tracking-[0.2em] uppercase mb-2">{step.num}</p>
                <p className="text-white text-[15px] font-medium mb-2">{step.title}</p>
                <p className="text-white/45 text-[13px] leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
