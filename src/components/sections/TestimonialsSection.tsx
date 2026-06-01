import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { FloatingOrbs, SplitTitle, useScrambleOnView } from '../ui/animations'

const REVIEWS = [
  {
    name: 'Михаил Орлов',
    role: 'Директор по маркетингу, FitLife',
    text: 'За 2 месяца закрыли потребность в видеоконтенте на полгода вперёд. AI-аватары выглядят убедительно, команда не нарадуется.',
    stars: 5,
  },
  {
    name: 'Анна Крылова',
    role: 'CEO, SkyStore',
    text: 'Чат-бот от LIDINC разгрузил поддержку на 70%. Клиенты получают ответы мгновенно, а менеджеры занимаются реальными задачами.',
    stars: 5,
  },
  {
    name: 'Дмитрий Соколов',
    role: 'CTO, DevGroup',
    text: 'Провели обучение для всей IT-команды — 45 человек. Подача живая, материал актуальный. После воркшопов реально ускорили разработку.',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  const { ref, scrambled } = useScrambleOnView('Отзывы')

  return (
    <div
      ref={ref}
      className="relative snap-start overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', height: '100vh', scrollSnapStop: 'always', backgroundColor: '#0a0a0a' }}
    >
      <FloatingOrbs accent="#fbbf24" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 w-full">
        <motion.p
          className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-3 font-medium"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          {scrambled}
        </motion.p>
        <SplitTitle
          text={'Что говорят\nклиенты'}
          className="text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] text-white tracking-tight mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        />

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6
                        sm:mx-0 sm:px-0 sm:overflow-x-visible sm:snap-none sm:pb-0
                        sm:grid sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 snap-start w-[78vw] sm:w-auto bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6"
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
        </div>
      </div>
    </div>
  )
}
