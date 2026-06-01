import './index.css'
import { GlowCard } from './components/ui/spotlight-card'
import ChatWidget from './components/ui/chat-widget'
import { ContentBg, DevelopmentBg, BusinessBg, EducationBg } from './components/ui/background-paper-shaders'
import AboutSection from './components/sections/AboutSection'
import CasesSection from './components/sections/CasesSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import HowWeWorkSection from './components/sections/HowWeWorkSection'
import CtaSection from './components/sections/CtaSection'
import ServicesFilterSection from './components/sections/ServicesFilterSection'
import { useState, useRef, useEffect, useCallback } from 'react'

import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform, useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Video, Code2, Bot, GraduationCap, X, Play, Zap,
  BookOpen, BarChart2, Cpu, Users, Monitor, Layers, Menu,
  Check, Send,
} from 'lucide-react'

const TELEGRAM = 'https://t.me/AlexSTETSKIY'
const MAX_LINK = 'https://max.ru/u/f9LHodD0cOK2v_PtEXNb7pWiymoRrudHZ6CrhiUuyKhSVxnT4byEtDb3yz8'

function TelegramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function MaxIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect width="24" height="24" rx="5" fill="currentColor" opacity="0.15"/>
      <text x="12" y="16.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="currentColor" fontFamily="Arial, sans-serif">MAX</text>
    </svg>
  )
}


const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

interface ServiceItem { icon: LucideIcon; name: string; desc: string }
interface SectionData {
  id: string; category: string; title: string; description: string
  image: string; accent: string; services: ServiceItem[]; price: string; details: string[]
}

const SECTIONS: SectionData[] = [
  {
    id: 'content', category: '01 / AI Content',
    title: 'Создаём\nконтент\nбудущего',
    description: 'Фото и видео производство, создание текстов и презентаций, AI-аватары и контент-завод для вашего бренда',
    image: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1920&q=85&auto=format&fit=crop',
    accent: '#22d3ee',
    services: [
      { icon: Video, name: 'AI Видеопроизводство', desc: 'Ролики с AI за часы, не недели' },
      { icon: Play, name: 'AI Аватары', desc: 'Цифровые ведущие для контента' },
      { icon: BookOpen, name: 'Генерация текстов', desc: 'Контент в едином стиле бренда' },
    ],
    price: 'от 15 000 ₽',
    details: ['Видеоролики с AI-персонажами', 'Озвучка на любом языке без студии', 'Автоматические субтитры и перевод', 'Контент-план и автопубликация', 'AI-копирайтинг для соцсетей'],
  },
  {
    id: 'development', category: '02 / AI Development',
    title: 'Разрабатываем\nумные\nрешения',
    description: 'Фотообработка, 3D-моделирование, сайты и парсинг данных',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=85&auto=format&fit=crop',
    accent: '#a78bfa',
    services: [
      { icon: Layers, name: '3D и фотообработка', desc: 'AI-ретушь и генерация' },
      { icon: Code2, name: 'Разработка сайтов', desc: 'Платформы с AI-функционалом' },
      { icon: Cpu, name: 'Парсинг данных', desc: 'Сбор и анализ любых источников' },
    ],
    price: 'от 30 000 ₽',
    details: ['AI-инструменты под ключ', 'Парсинг сайтов и маркетплейсов', 'Автоматизация рутинных задач', '3D-моделирование с AI', 'Пакетная обработка фотографий'],
  },
  {
    id: 'business', category: '03 / AI Business',
    title: 'Масштабируем\nваш\nбизнес',
    description: 'Умные ассистенты и автоматизация бизнес-процессов',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=85&auto=format&fit=crop',
    accent: '#60a5fa',
    services: [
      { icon: Bot, name: 'AI-ассистенты', desc: 'Чат-боты и голосовые помощники' },
      { icon: Zap, name: 'Автоматизация', desc: 'AI в CRM, воронки, HR' },
      { icon: BarChart2, name: 'Аналитика', desc: 'Отчёты и прогнозы на AI' },
    ],
    price: 'от 50 000 ₽',
    details: ['Корпоративные чат-боты', 'Интеграция с Telegram, Telegram, Bitrix', 'Автоматизация клиентского сервиса', 'AI-аналитика продаж и маркетинга', 'Голосовые помощники на телефонию'],
  },
  {
    id: 'education', category: '04 / AI Education',
    title: 'Обучаем\nработать\nс AI',
    description: 'Корпоративное обучение, воркшопы и лекции по AI',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1920&q=85&auto=format&fit=crop',
    accent: '#fbbf24',
    services: [
      { icon: GraduationCap, name: 'Корпоративное обучение', desc: 'Программы для команд' },
      { icon: Monitor, name: 'Онлайн-лекции', desc: 'Вебинары и курсы' },
      { icon: Users, name: 'Воркшопы', desc: 'Практические интенсивы' },
    ],
    price: 'от 20 000 ₽',
    details: ['Индивидуальные программы для компаний', 'ChatGPT, Midjourney, Runway ML', 'Воркшопы по автоматизации с AI', 'Сертификация сотрудников', 'Корпоративные лекции и мастер-классы'],
  },
]

const HERO = {
  label: '01 / LIDINC',
  badge: 'AI-решения нового поколения',
  title: ['Будущее', 'Вашего бизнеса —', 'вместе с AI'],
  sub: 'Автоматизация, контент, разработка и обучение под ключ.',
  accent: '#3b82f6',
}

// ── SVG Gradient Defs (once in DOM, referenced everywhere) ───────────────────
function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <linearGradient id="lidinc-grad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── Logo ──────────────────────────────────────────────────────────────────────
function LogoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none">
      <path fill="url(#lidinc-grad)" d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z" />
    </svg>
  )
}

// ── Contact Form ───────────────────────────────────────────────────────────────
function ContactForm({ defaultService, onClose }: { defaultService?: string; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', contact: '', message: '', service: defaultService ?? SECTIONS[0].category })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <motion.div className="relative z-10 bg-white border border-gray-200 rounded-2xl w-full max-w-md p-8 shadow-xl"
        initial={{ scale: 0.92, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }} transition={{ type: 'spring', damping: 26 }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Отправить заявку</h2>
          <button type="button" onClick={onClose} aria-label="Закрыть" className="text-gray-400 hover:text-gray-700 transition-colors"><X size={18} /></button>
        </div>
        {sent ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4"><Check size={20} className="text-blue-500" /></div>
            <p className="text-gray-900 font-medium mb-2">Заявка отправлена!</p>
            <p className="text-gray-400 text-sm">Свяжемся с вами в течение часа.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1.5 tracking-wide uppercase">Имя</label>
              <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Иван Иванов"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-400 transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1.5 tracking-wide uppercase">Телефон или Email</label>
              <input required value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="+7 999 000-00-00"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-400 transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1.5 tracking-wide uppercase">Услуга</label>
              <select value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-400 transition-colors">
                {SECTIONS.map(s => <option key={s.id} value={s.category}>{s.category}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1.5 tracking-wide uppercase">Сообщение</label>
              <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder="Расскажите о вашей задаче..." rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-400 transition-colors resize-none" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-60 transition-colors">
                <Send size={13} />{loading ? 'Отправка...' : 'Отправить заявку'}
              </button>
              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2AABEE]/10 border border-[#2AABEE]/30 text-[#2AABEE] hover:bg-[#2AABEE]/20 transition-colors">
                <TelegramIcon size={16} />
              </a>
              <a href={MAX_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-gray-500 hover:bg-white/10 transition-colors">
                <MaxIcon size={16} />
              </a>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Detail Modal ───────────────────────────────────────────────────────────────
function DetailModal({ section, onClose, onContact }: { section: SectionData; onClose: () => void; onContact: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <motion.div className="relative z-10 bg-white border border-gray-200 rounded-2xl max-w-lg w-full p-8 shadow-xl"
        initial={{ scale: 0.91, y: 28, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.91, y: 28, opacity: 0 }} transition={{ type: 'spring', damping: 24 }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-1.5 text-blue-500">{section.category}</p>
            <h2 className="text-2xl font-semibold text-gray-900 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {section.title.replace(/\n/g, ' ')}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1 shrink-0 mt-0.5"><X size={18} /></button>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{section.description}</p>
        <div className="space-y-2 mb-6">
          {section.details.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-700 text-[13px]">
              <Check size={12} className="text-blue-500 shrink-0" />{item}
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-5 py-3.5 mb-6 flex items-center justify-between">
          <p className="text-gray-400 text-xs">Стоимость от</p>
          <p className="text-lg font-semibold text-gray-900">{section.price} / проект</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => { onClose(); onContact() }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors">
            <Send size={13} />Отправить заявку
          </button>
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2AABEE]/10 border border-[#2AABEE]/30 text-[#2AABEE] text-[13px] font-medium hover:bg-[#2AABEE]/18 transition-colors">
            <TelegramIcon size={15} />Telegram
          </a>
          <a href={MAX_LINK} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-[13px] font-medium hover:bg-gray-100 transition-colors">
            <MaxIcon size={15} />MAX
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Reveal Hero ───────────────────────────────────────────────────────────────
function RevealHero({ onContact, onScrollToServices }: {
  onContact: () => void
  onScrollToServices: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative h-screen overflow-hidden bg-[#f0f0ee] snap-start" style={{ scrollSnapStop: 'always' }}>
      <video
        src={VIDEO_SRC}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 20%', backgroundColor: '#0d0d0d' }}
      />

      {/* Reveal mask */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(22% 12% 22% 12% round 18px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      >
        <div className="absolute inset-0 bg-black/38" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
        <FloatingOrbs accent={HERO.accent} />
      </motion.div>

      {/* Top-left content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-start pt-24 sm:pt-28 px-6 sm:px-12 md:px-20 lg:px-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.a
            href="#"
            onClick={e => { e.preventDefault(); onScrollToServices() }}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-gradient-anim hover:opacity-80 transition-opacity mb-5 group"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            {HERO.badge}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </motion.a>

          {/* Title — big */}
          <h1
            className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] leading-[1.12] text-white tracking-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            {HERO.title.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.95 + i * 0.1, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            className="text-[13px] sm:text-[15px] text-white/55 font-normal mb-6 max-w-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.28, duration: 0.5 }}
          >
            {HERO.sub}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <MagneticButton>
              <button type="button" onClick={onContact}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 border border-white/20 rounded-full px-5 py-2.5 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-200 group backdrop-blur-sm">
                Заказать консультацию
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 opacity-60 group-hover:opacity-100">→</span>
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 1.8 }}
          >
            <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase select-none">scroll</p>
            <motion.div
              className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent"
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating stat badges */}
      {[
        { text: '50+ проектов',  x: '68%', y: '32%', delay: 1.7 },
        { text: '150+ клиентов', x: '74%', y: '52%', delay: 1.95 },
        { text: '3 года опыта',  x: '65%', y: '68%', delay: 2.15 },
      ].map(b => (
        <motion.div
          key={b.text}
          className="absolute hidden md:flex items-center gap-1.5 bg-white/8 backdrop-blur-md border border-white/12 rounded-full px-3 py-1.5 text-white/65 text-[11px] font-medium z-20 select-none"
          style={{ left: b.x, top: b.y }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
          transition={{
            opacity: { delay: b.delay, duration: 0.5 },
            scale:   { delay: b.delay, duration: 0.5 },
            y: { delay: b.delay + 0.5, duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {b.text}
        </motion.div>
      ))}

      {/* Marquee strip at hero bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Marquee />
      </div>
    </div>
  )
}

// ── Magnetic Button ───────────────────────────────────────────────────────────
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 12, stiffness: 120 })
  const springY = useSpring(y, { damping: 12, stiffness: 120 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.38)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.38)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className={className ?? 'inline-block'}>
      <motion.div style={{ x: springX, y: springY }}>{children}</motion.div>
    </div>
  )
}

// ── Floating Orbs ─────────────────────────────────────────────────────────────
function FloatingOrbs({ accent }: { accent: string }) {
  const orbs = [
    { size: 380, x: ['8%', '22%', '5%', '8%'],   y: ['12%', '30%', '55%', '12%'], duration: 18 },
    { size: 260, x: ['72%', '55%', '80%', '72%'], y: ['60%', '20%', '75%', '60%'], duration: 24 },
    { size: 200, x: ['45%', '65%', '30%', '45%'], y: ['80%', '50%', '15%', '80%'], duration: 20 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size, height: orb.size,
            background: `radial-gradient(circle, ${accent}30 0%, ${accent}08 60%, transparent 100%)`,
            left: orb.x[0], top: orb.y[0],
            filter: 'blur(40px)',
          }}
          animate={{ left: orb.x, top: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
        />
      ))}
    </div>
  )
}

// ── Count Up ─────────────────────────────────────────────────────────────────
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null
    const duration = 1300
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to])

  return <span ref={ref}>{value.toLocaleString('ru-RU')}</span>
}

// ── Infinite Marquee ──────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    'AI Content', 'AI Development', 'AI Business', 'AI Education',
    'Автоматизация', 'Контент-завод', 'Чат-боты', 'LIDINC',
  ]
  const doubled = [...items, ...items, ...items]
  return (
    <div className="overflow-hidden border-y border-gray-200 bg-[#f0f0ee] py-3 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-7 text-[11px] tracking-[0.3em] uppercase text-gray-400 px-7"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            {item}
            <span className="inline-block w-[3px] h-[3px] rounded-full bg-gray-300 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Text Scramble hook ────────────────────────────────────────────────────────
function useTextScramble(text: string, active: boolean) {
  const [output, setOutput] = useState(text)
  const CHARS = '!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  useEffect(() => {
    if (!active) return
    let frame = 0
    const total = 20
    const id = setInterval(() => {
      frame++
      setOutput(text.split('').map((ch, i) => {
        if (ch === ' ' || ch === '/') return ch
        if (frame >= Math.floor((i / text.length) * total) + 4) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      if (frame > total + 4) clearInterval(id)
    }, 38)
    return () => clearInterval(id)
  }, [active, text])
  return output
}

// ── Split Text + Clip-path Reveal ────────────────────────────────────────────
const lineVariants = {
  hidden: { y: '108%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { delay: 0.08 + i * 0.1, duration: 0.72, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

function SplitTitle({ text, className, style }: {
  text: string; className?: string; style?: React.CSSProperties
}) {
  const lines = text.split('\n')
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden', lineHeight: '1.08' }}>
          <motion.div custom={i} variants={lineVariants}>{line}</motion.div>
        </div>
      ))}
    </motion.div>
  )
}

// ── Custom Cursor Blob ────────────────────────────────────────────────────────
function CustomCursor({ accent }: { accent: string }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [visible, setVisible] = useState(false)
  const springX = useSpring(x, { damping: 22, stiffness: 180 })
  const springY = useSpring(y, { damping: 22, stiffness: 180 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 22); y.set(e.clientY - 22); setVisible(true) }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', leave) }
  }, [x, y])

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full hidden md:block"
      style={{ left: springX, top: springY, width: 44, height: 44, backgroundColor: accent }}
      animate={{ opacity: visible ? 0.18 : 0, scale: visible ? 1 : 0.4 }}
      transition={{ duration: 0.2 }}
    />
  )
}

// ── Service Panel ─────────────────────────────────────────────────────────────
function Panel({ section, onDetail, onContact }: {
  section: SectionData; onDetail: () => void; onContact: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [scrambleActive, setScrambleActive] = useState(false)
  const scrambledCategory = useTextScramble(section.category, scrambleActive)
  // Parallax background
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  // Trigger scramble when panel enters view
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setScrambleActive(true) },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={panelRef} className="relative overflow-hidden snap-start" style={{ width: '100vw', height: '100vh', scrollSnapStop: 'always' as const }}>

      {/* Background */}
      {section.id === 'content'     ? <ContentBg /> :
       section.id === 'development' ? <DevelopmentBg /> :
       section.id === 'business'    ? <BusinessBg /> :
       section.id === 'education'   ? <EducationBg /> : (
        <motion.img
          src={section.image} alt=""
          className="absolute w-full object-cover pointer-events-none"
          style={{ height: '130%', top: '-15%', y: bgY }}
        />
      )}
      <div className="absolute inset-0 bg-black/38" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <FloatingOrbs accent={section.accent} />


      {/* Top content */}
      <div className="relative z-10 h-full flex flex-col justify-start pt-24 sm:pt-28 px-6 sm:px-12 md:px-20 lg:px-28">
        <div className="flex items-start justify-between w-full">

          {/* Left: main text */}
          <div className="max-w-xs shrink-0">
            <motion.p
              className="text-[11.5px] font-medium text-blue-400 mb-3"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.1 }}
            >
              {scrambledCategory}
            </motion.p>

            <SplitTitle
              text={section.title}
              className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem] leading-[1.12] text-white tracking-tight mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            />

            <motion.p
              className="text-[13px] text-white/60 font-normal mb-3"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.35 }}
            >
              {section.description}
            </motion.p>

            <motion.p
              className="text-[12px] text-white/35 mb-4"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.42 }}
            >
              от <CountUp to={parseInt(section.price.replace(/\D/g, ''), 10)} /> ₽ / проект
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.5 }}
            >
              <MagneticButton>
                <button type="button" onClick={onDetail}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 border border-white/20 rounded-full px-5 py-2.5 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-200 group backdrop-blur-sm">
                  Подробнее
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 opacity-60 group-hover:opacity-100">→</span>
                </button>
              </MagneticButton>
              <MagneticButton>
                <button type="button" onClick={onContact}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-white/25 border border-white/10 rounded-full px-5 py-2.5 hover:text-white/60 hover:border-white/25 transition-all duration-200 group backdrop-blur-sm">
                  Заказать
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 opacity-40 group-hover:opacity-70">→</span>
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: GlowCards */}
          <div className="hidden md:flex flex-col gap-3 w-[300px] lg:w-[340px] shrink-0">
            {section.services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <motion.div key={svc.name}
                  initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                  <GlowCard glowColor="blue" customSize className="w-full py-4 px-5 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-blue-500/10 border border-blue-400/20">
                      <Icon size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white text-[13px] font-medium leading-snug mb-1">{svc.name}</p>
                      <p className="text-white/40 text-[12px] leading-snug">{svc.desc}</p>
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Scroll progress bar ───────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(to right, #60a5fa, #22d3ee, #a78bfa)',
      }}
    />
  )
}

// ── Cursor trail ──────────────────────────────────────────────────────────────
function CursorTrail({ active }: { active: boolean }) {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    if (!active) { setTrail([]); return }
    let id = 0
    const move = (e: MouseEvent) => {
      setTrail(t => [...t.slice(-10), { id: id++, x: e.clientX, y: e.clientY }])
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [active])

  if (!active || trail.length === 0) return null
  return (
    <>
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[49] rounded-full bg-blue-400"
          style={{
            left: dot.x - 3, top: dot.y - 3,
            width: 6, height: 6,
            opacity: ((i + 1) / trail.length) * 0.35,
            transform: `scale(${((i + 1) / trail.length) * 0.9})`,
          }}
        />
      ))}
    </>
  )
}

// ── Preloader ─────────────────────────────────────────────────────────────────
function Preloader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <svg width="36" height="36" viewBox="0 0 256 256" fill="none">
              <path fill="url(#lidinc-grad)" d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z" />
            </svg>
            <motion.p
              className="text-white/50 text-[11px] tracking-[0.45em] uppercase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              LIDINC
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Scroll to top ─────────────────────────────────────────────────────────────
function ScrollToTop({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-5 z-40 w-10 h-10 rounded-full border border-white/15 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white/35 transition-colors duration-200"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          aria-label="Наверх"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [inServices, setInServices] = useState(false)
  const [inOutro, setInOutro] = useState(false)
  const [detailSection, setDetailSection] = useState<SectionData | null>(null)
  const [contactSection, setContactSection] = useState<SectionData | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900)
    return () => clearTimeout(t)
  }, [])

  const heroHeight = useRef(0)
  useEffect(() => { heroHeight.current = window.innerHeight }, [])

  useEffect(() => {
    const onScroll = () => {
      const hero = window.innerHeight
      const inSvc = window.scrollY >= hero - 30
      const outro = window.scrollY >= hero + SECTIONS.length * window.innerHeight - 30
      setInServices(inSvc)
      setInOutro(outro)
      setShowTopBtn(window.scrollY > window.innerHeight / 2)

      if (inSvc) {
        const scrollInSvc = window.scrollY - hero
        const idx = Math.floor(scrollInSvc / window.innerHeight)
        setActiveIdx(Math.max(0, Math.min(idx, SECTIONS.length - 1)))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToService = useCallback((idx: number) => {
    window.scrollTo({ top: window.innerHeight + idx * window.innerHeight, behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  const scrollToServices = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }, [])

  const scrollToHero = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }, [])


  return (
    <div className="bg-[#f0f0ee] text-gray-900">
      <SvgDefs />

      {/* ── Navbar — two-pill, context-aware ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3">
        {/* Logo circle */}
        <motion.button
          type="button" onClick={scrollToHero}
          className="flex items-center gap-2 rounded-full px-3 sm:px-4 h-10 sm:h-11 shrink-0 backdrop-blur-md transition-colors duration-500"
          animate={{ backgroundColor: inServices ? 'rgba(255,255,255,0.12)' : '#EDEDED' }}
          transition={{ duration: 0.4 }}
        >
          <LogoIcon />
          <motion.span
            className="hidden sm:block text-[13px] font-semibold tracking-[0.1em]"
            animate={{ color: inServices ? 'rgba(255,255,255,0.82)' : 'rgb(55,65,81)' }}
            transition={{ duration: 0.3 }}
          >
            LIDINC
          </motion.span>
        </motion.button>

        {/* Links pill */}
        <motion.div
          className="hidden sm:flex items-center gap-6 sm:gap-10 rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 backdrop-blur-md transition-colors duration-500"
          animate={{ backgroundColor: inServices ? 'rgba(255,255,255,0.1)' : '#EDEDED' }}
          transition={{ duration: 0.4 }}
        >
          {[
            { label: 'О нас', onClick: scrollToHero },
            { label: 'Услуги', onClick: scrollToServices },
            { label: 'Цены', onClick: scrollToServices },
            { label: 'Контакты', href: TELEGRAM },
          ].map(item =>
            item.href ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className={`text-[12px] sm:text-[14px] font-medium transition-colors duration-300 ${inServices ? 'text-white/60 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                {item.label}
              </a>
            ) : (
              <button key={item.label} type="button" onClick={item.onClick}
                className={`text-[12px] sm:text-[14px] font-medium transition-colors duration-300 ${inServices ? 'text-white/60 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                {item.label}
              </button>
            )
          )}
        </motion.div>

        {/* Mobile menu button */}
        <button type="button"
          className={`sm:hidden ml-auto transition-colors ${inServices ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          onClick={() => setMenuOpen(true)}>
          <Menu size={20} />
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[55] bg-[#f0f0ee]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 px-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="absolute top-5 right-5 text-gray-400 hover:text-gray-900" onClick={() => setMenuOpen(false)}>
              <X size={22} />
            </button>
            <motion.button type="button" onClick={scrollToHero}
              initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}
              className="text-[1.3rem] font-semibold text-gray-400 hover:text-gray-900 transition-colors">
              Главная
            </motion.button>
            {SECTIONS.map((s, i) => (
              <motion.button key={s.id} type="button"
                onClick={() => { scrollToServices(); setTimeout(() => scrollToService(i), 400) }}
                initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (i + 1) * 0.06 }}
                className="text-[1.3rem] font-semibold text-gray-400 hover:text-gray-900 transition-colors">
                {s.category}
              </motion.button>
            ))}
            <motion.button type="button" onClick={scrollToServices}
              initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 }}
              className="text-[1.3rem] font-semibold text-gray-400 hover:text-gray-900 transition-colors">
              Цены
            </motion.button>
            <motion.a initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
              href={TELEGRAM} target="_blank" rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2.5 bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold">
              <TelegramIcon size={15} />Написать в Telegram
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Reveal hero ── */}
      <RevealHero
        onContact={() => setContactSection(SECTIONS[0])}
        onScrollToServices={scrollToServices}
      />

      {/* ── Service panels (vertical) ── */}
      {SECTIONS.map(s => (
        <Panel key={s.id} section={s}
          onDetail={() => setDetailSection(s)}
          onContact={() => setContactSection(s)} />
      ))}

      {/* ── Outro sections ── */}
      <ServicesFilterSection />
      <AboutSection />
      <CasesSection />
      <TestimonialsSection />
      <HowWeWorkSection />
      <CtaSection onContact={() => setContactSection(SECTIONS[0])} />

      {/* ── Service dots (only in services section) ── */}
      <AnimatePresence>
        {inServices && !inOutro && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
            {SECTIONS.map((s, i) => (
              <button key={s.id} type="button" onClick={() => scrollToService(i)} aria-label={s.category}
                className="rounded-full transition-all duration-300"
                style={{ height: 5, width: activeIdx === i ? 22 : 5, backgroundColor: activeIdx === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── Custom cursor (service panels only) ── */}
      {inServices && <CustomCursor accent="rgba(255,255,255,0.15)" />}

      {/* ── Messenger FABs ── */}
      <div className="fixed right-5 bottom-8 z-40 flex flex-col gap-2 items-end">
        <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-[12px] font-medium text-white/50 border border-white/15 rounded-full px-4 py-2 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all duration-200 backdrop-blur-sm">
          <TelegramIcon size={13} />Telegram
        </a>
        <a href={MAX_LINK} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-[12px] font-medium text-white/50 border border-white/15 rounded-full px-4 py-2 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all duration-200 backdrop-blur-sm">
          <MaxIcon size={13} />MAX
        </a>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {detailSection && (
          <DetailModal section={detailSection} onClose={() => setDetailSection(null)}
            onContact={() => { const s = detailSection; setDetailSection(null); setContactSection(s) }} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {contactSection && <ContactForm defaultService={contactSection.category} onClose={() => setContactSection(null)} />}
      </AnimatePresence>
      {/* Modals use z-[60] to stay above mobile menu z-[55] */}

      {/* ── AI Chat Widget ── */}
      <ChatWidget />

      {/* ── Scroll progress bar ── */}
      <ScrollProgress />

      {/* ── Cursor trail (service sections only) ── */}
      <CursorTrail active={inServices} />

      {/* ── Preloader ── */}
      <Preloader done={loaded} />

      {/* ── Scroll to top ── */}
      <ScrollToTop visible={showTopBtn} />

    </div>
  )
}
