import { motion } from 'framer-motion'

export function Marquee() {
  const items = ['AI Контент', 'AI Автоматизация', 'AI для Бизнеса', 'AI Обучение', 'Автоматизация', 'Контент-завод', 'Чат-боты', 'LIDINC']
  const doubled = [...items, ...items, ...items]
  return (
    <div className="overflow-hidden border-y border-black/[0.07] py-3 select-none" style={{ backgroundColor: '#e8e9f0' }}>
      <motion.div className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-7 text-[11px] tracking-[0.3em] uppercase px-7"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, color: '#999' }}>
            {item}
            <span className="inline-block w-[3px] h-[3px] rounded-full shrink-0" style={{ backgroundColor: '#bbb' }} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
