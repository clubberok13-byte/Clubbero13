import { motion, useInView } from 'framer-motion'
import { MessageSquare, BarChart2, Zap, Shield } from 'lucide-react'
import { FloatingOrbs, SplitTitle, useScrambleOnView } from '../ui/animations'
import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'

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

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay: index * 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col group"
    >
      {/* Connector line to next step (desktop only) */}
      {index < STEPS.length - 1 && (
        <div className="hidden lg:block absolute top-6 left-[calc(50%+28px)] right-[-calc(50%-28px)] h-px overflow-hidden"
          style={{ width: 'calc(100% - 56px)' }}>
          <motion.div
            className="h-full origin-left"
            style={{ background: 'linear-gradient(to right, rgba(34,211,238,0.4), rgba(34,211,238,0.04))' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.14 + 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}

      {/* Icon circle */}
      <motion.div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-5 self-start relative"
        style={{ border: '1px solid rgba(34,211,238,0.22)', background: 'rgba(34,211,238,0.05)' }}
        animate={inView ? {
          boxShadow: '0 0 22px rgba(34,211,238,0.2)',
          borderColor: 'rgba(34,211,238,0.35)',
        } : {
          boxShadow: 'none',
          borderColor: 'rgba(34,211,238,0.22)',
        }}
        whileHover={{ boxShadow: '0 0 32px rgba(34,211,238,0.35)', scale: 1.06 }}
        transition={{ duration: 0.5, delay: index * 0.14 + 0.2 }}
      >
        <Icon size={16} className="text-cyan-400" />
        <span
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-semibold text-cyan-400"
          style={{ background: '#060606', border: '1px solid rgba(34,211,238,0.28)' }}
        >
          {index + 1}
        </span>
      </motion.div>

      <p className="text-white text-[15px] font-medium mb-2 group-hover:text-white transition-colors duration-200">
        {step.title}
      </p>
      <p className="text-white/45 text-[13px] leading-relaxed group-hover:text-white/60 transition-colors duration-200">
        {step.desc}
      </p>
    </motion.div>
  )
}

export default function HowWeWorkSection() {
  const { ref, scrambled } = useScrambleOnView('Процесс')

  return (
    <div
      ref={ref}
      className="svh-screen relative overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', backgroundColor: '#060606' }}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
