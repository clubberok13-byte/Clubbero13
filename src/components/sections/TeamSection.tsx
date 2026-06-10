import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../ui/animations'

const TEAM = [
  {
    name: 'Алекс Стецкий',
    role: 'Основатель, AI-стратег',
    bio: '5+ лет в AI-решениях для бизнеса. Строил автоматизации для ритейла, e-commerce и медиа.',
    initials: 'АС',
    accent: '#60a5fa',
    tg: 'https://t.me/AlexSTETSKIY',
  },
  {
    name: 'AI-команда',
    role: 'Разработка и интеграция',
    bio: 'Специалисты по LLM, автоматизации на n8n/Make, Telegram-ботам и промпт-инжинирингу.',
    initials: '🤖',
    accent: '#22d3ee',
    tg: null,
  },
  {
    name: 'Контент-продакшн',
    role: 'AI Видео и медиа',
    bio: 'Производим AI-видео, аватары, озвучку и контент-планы для соцсетей и брендов.',
    initials: '🎬',
    accent: '#a78bfa',
    tg: null,
  },
  {
    name: 'AI Лидогенерация',
    role: 'Трафик и лиды',
    bio: 'Настраиваем AI-воронки, автоматический прогрев и квалификацию лидов через чат-боты и автоматизации.',
    initials: '📈',
    accent: '#34d399',
    tg: null,
  },
]

export default function TeamSection() {
  return (
    <section className="relative px-6 sm:px-12 md:px-20 lg:px-28 py-20"
      style={{ backgroundColor: '#0a0a0a', width: '100vw' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] pointer-events-none" />

      <div className="relative z-10">
        <motion.p className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-3 font-medium"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Команда
        </motion.p>
        <motion.h2 className="text-[2rem] sm:text-[2.6rem] text-white tracking-tight mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}>
          Кто за этим стоит
        </motion.h2>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl"
          variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {TEAM.map(member => (
            <motion.div key={member.name} variants={staggerItem}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-[20px]"
                style={{ background: `${member.accent}18`, border: `1px solid ${member.accent}30` }}>
                {member.initials.length <= 2 && !member.initials.match(/[а-яА-Я]/) ? (
                  <span>{member.initials}</span>
                ) : (
                  <span className="text-[13px] font-semibold" style={{ color: member.accent }}>
                    {member.initials}
                  </span>
                )}
              </div>
              <p className="text-white text-[14px] font-medium mb-0.5">{member.name}</p>
              <p className="text-[11px] tracking-[0.15em] uppercase mb-3" style={{ color: member.accent }}>
                {member.role}
              </p>
              <p className="text-white/40 text-[13px] leading-relaxed mb-4">{member.bio}</p>
              {member.tg && (
                <a href={member.tg} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] text-white/30 hover:text-white/60 transition-colors">
                  Написать →
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
