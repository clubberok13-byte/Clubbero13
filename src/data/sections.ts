import type { LucideIcon } from 'lucide-react'
import { Video, Code2, Bot, GraduationCap, Play, Zap, BookOpen, BarChart2, Cpu, Users, Monitor, Layers } from 'lucide-react'

export interface ServiceItem { icon: LucideIcon; name: string; desc: string }
export interface SectionData {
  id: string; category: string; title: string; description: string
  image: string; accent: string; services: ServiceItem[]; price: string; details: string[]
}

export const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

export const HERO = {
  label: '01 / LIDINC',
  badge: 'AI-решения нового поколения',
  title: ['Будущее', 'Вашего бизнеса —', 'вместе с AI'],
  sub: 'Автоматизация, контент, разработка и обучение под ключ.',
  accent: '#3b82f6',
}

export const SECTIONS: SectionData[] = [
  {
    id: 'content', category: '01 / AI Контент',
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
    id: 'development', category: '02 / AI Автоматизация',
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
    id: 'business', category: '03 / AI для Бизнеса',
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
    details: ['Корпоративные чат-боты', 'Интеграция с Telegram, WhatsApp, Bitrix', 'Автоматизация клиентского сервиса', 'AI-аналитика продаж и маркетинга', 'Голосовые помощники на телефонию'],
  },
  {
    id: 'education', category: '04 / AI Обучение',
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
