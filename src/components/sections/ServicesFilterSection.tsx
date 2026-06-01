import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FloatingOrbs, useScrambleOnView, TiltCard } from '../ui/animations'
import { GlowCard } from '../ui/spotlight-card'

type GlowColor = 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan'

interface Card {
  id: string
  title: string
  size: 'large' | 'small'
  image?: string
  accent?: string
  glow?: GlowColor
}

interface Tab {
  label: string
  cards: Card[]
}

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop`

// Each tab: [large, small, large, small, small, small] — fits 4-col × 2-row grid
const TABS: Tab[] = [
  {
    label: 'По задачам',
    cards: [
      // AI-аватар / видео с нейросетью
      { id: 'content',  title: 'Создать AI-контент',     size: 'large', image: U('1677442136019-21780ecad995'), accent: '#22d3ee', glow: 'cyan' },
      { id: 'automate', title: 'Автоматизировать процессы', size: 'small' },
      // Диалоговый интерфейс / мессенджер
      { id: 'chatbot',  title: 'Запустить чат-бота',     size: 'large', image: U('1611606063065-ee7946f0787a'), accent: '#a78bfa', glow: 'purple' },
      { id: 'parse',    title: 'Парсить данные',          size: 'small' },
      { id: 'train',    title: 'Обучить команду',         size: 'small' },
      { id: 'website',  title: 'Разработать сайт с AI',  size: 'small' },
    ],
  },
  {
    label: 'По технологиям',
    cards: [
      // Экран с кодом / LLM интерфейс
      { id: 'gpt',    title: 'ChatGPT / GPT-4o', size: 'large', image: U('1555066931-4365d14bab8c'), accent: '#60a5fa', glow: 'blue' },
      { id: 'mj',     title: 'Midjourney',        size: 'small' },
      // Видеопроизводство
      { id: 'runway', title: 'Runway ML',          size: 'large', image: U('1536240478700-b869ad10e128'), accent: '#f472b6', glow: 'red' },
      { id: 'heygen', title: 'HeyGen',             size: 'small' },
      { id: 'n8n',    title: 'n8n / Make',         size: 'small' },
      { id: 'eleven', title: 'ElevenLabs',         size: 'small' },
    ],
  },
  {
    label: 'По отраслям',
    cards: [
      // Онлайн-шопинг / e-commerce
      { id: 'ecom',  title: 'E-commerce',          size: 'large', image: U('1556742049-0cfed4f6a45d'), accent: '#fbbf24', glow: 'orange' },
      { id: 'mkt',   title: 'Маркетинг и реклама', size: 'small' },
      // Человек с планшетом / обучение
      { id: 'edu',   title: 'Образование',         size: 'large', image: U('1571260899304-425eee4c7efc'), accent: '#a78bfa', glow: 'purple' },
      { id: 'hr',    title: 'HR / Рекрутинг',      size: 'small' },
      { id: 'media', title: 'Медиа и блогеры',     size: 'small' },
      { id: 'retail',title: 'Розничная торговля',  size: 'small' },
    ],
  },
]

export default function ServicesFilterSection() {
  const [activeTab, setActiveTab] = useState(0)
  const { ref, scrambled } = useScrambleOnView('Решения')
  const cards = TABS[activeTab].cards

  return (
    <div
      ref={ref}
      className="relative snap-start overflow-hidden flex flex-col"
      style={{ width: '100vw', height: '100vh', scrollSnapStop: 'always', backgroundColor: '#070707' }}
    >
      <FloatingOrbs accent="#60a5fa" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/15 via-transparent to-purple-950/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full px-6 sm:px-12 md:px-20 lg:px-28 pt-20 sm:pt-24 pb-5">

        {/* Header + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 shrink-0">
          <div>
            <motion.p
              className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-2 font-medium"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              {scrambled}
            </motion.p>
            <motion.h2
              className="text-[1.9rem] sm:text-[2.4rem] leading-[1.08] text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Чем можем<br />помочь
            </motion.h2>
          </div>

          {/* Tab switcher */}
          <motion.div
            className="flex gap-2 flex-wrap"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg text-[12px] font-medium tracking-wide transition-all duration-200 ${
                  activeTab === i
                    ? 'bg-white text-gray-900'
                    : 'border border-white/15 text-white/45 hover:text-white/75 hover:border-white/30'
                }`}
              >
                / {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex-1 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 pr-6 min-h-0
                       md:grid md:grid-cols-4 md:overflow-x-visible md:snap-none md:pb-0 md:pr-0
                       md:[grid-template-rows:repeat(2,1fr)]"
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer snap-start shrink-0
                  w-[62vw] sm:w-[40vw] md:w-auto
                  ${card.size === 'large' ? 'md:row-span-2' : ''}`}
              >
                {card.size === 'large' ? (
                  <TiltCard className="h-full">
                  <GlowCard
                    glowColor={card.glow ?? 'blue'}
                    customSize
                    className="relative h-full w-full !p-0 !gap-0 overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 z-[1]" style={{ backgroundColor: (card.accent ?? '#3b82f6') + '25' }} />
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-500"
                    />
                    <div className="absolute inset-0 z-[2]" style={{
                      background: `linear-gradient(to top, ${card.accent ?? '#3b82f6'}bb 0%, ${card.accent ?? '#3b82f6'}11 45%, transparent 70%)`
                    }} />
                    <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 z-[4] p-4 sm:p-5">
                      <p className="text-white text-[12px] sm:text-[13px] font-semibold leading-snug uppercase tracking-wider mb-3">
                        {card.title}
                      </p>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        <ArrowRight size={13} className="text-white" />
                      </div>
                    </div>
                  </GlowCard>
                  </TiltCard>
                ) : (
                  <GlowCard
                    glowColor="blue"
                    customSize
                    className="h-full w-full p-4 sm:p-5 flex flex-col justify-between cursor-pointer"
                  >
                    <p className="text-white text-[12px] sm:text-[13px] font-medium leading-snug uppercase tracking-wide">
                      {card.title}
                    </p>
                    <ArrowRight size={14} className="text-white/25 group-hover:text-white/55 transition-colors duration-200" />
                  </GlowCard>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
