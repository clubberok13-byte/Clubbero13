import './index.css'
import Lenis from 'lenis'
import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { SECTIONS, HERO, type SectionData } from './data/sections'
import { TelegramIcon, MaxIcon, WhatsAppIcon, LogoIcon, SvgDefs, TELEGRAM, MAX_LINK, WHATSAPP } from './components/ui/icons'
import { GrainOverlay, Preloader, SectionProgress, ScrollProgress, ScrollToTop, CustomCursor, CursorTrail } from './components/ui/overlays'
import { ymGoal } from './lib/metrika'
import { ContactForm } from './components/ui/modals'
import HeroSection from './components/sections/HeroSection'

const ServicesSection        = lazy(() => import('./components/sections/ServicesSection'))
const AboutSection           = lazy(() => import('./components/sections/AboutSection'))
const TeamSection              = lazy(() => import('./components/sections/TeamSection'))
const CasesTestimonialsSection = lazy(() => import('./components/sections/CasesTestimonialsSection'))
const HowWeWorkSection       = lazy(() => import('./components/sections/HowWeWorkSection'))
const FaqSection             = lazy(() => import('./components/sections/FaqSection'))
const CtaSection             = lazy(() => import('./components/sections/CtaSection'))
const ChatWidget             = lazy(() => import('./components/ui/chat-widget'))
const CookieBanner           = lazy(() => import('./components/ui/cookie-banner'))

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [serviceTab, setServiceTab] = useState(0)
  const [inServices, setInServices] = useState(false)
  const [sectionIdx, setSectionIdx] = useState(0)
  const [contactSection, setContactSection] = useState<SectionData | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // iOS has superior native momentum scroll — Lenis can hang the page there
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return
    const lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis
    let rafId: number
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); lenisRef.current = null }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight
      setInServices(window.scrollY >= vh - 30)
      setShowTopBtn(window.scrollY > vh / 2)
      setSectionIdx(Math.min(Math.floor(window.scrollY / vh), 5))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = useCallback((idx: number) => {
    lenisRef.current?.scrollTo(idx * window.innerHeight)
    setMenuOpen(false)
  }, [])

  const scrollToServices = useCallback(() => scrollToSection(1), [scrollToSection])
  const scrollToHero = useCallback(() => scrollToSection(0), [scrollToSection])

  const cursorAccent = `${[HERO.accent, SECTIONS[serviceTab]?.accent ?? '#3b82f6'][Math.min(sectionIdx, 1)] ?? HERO.accent}55`

  return (
    <div className="bg-[#f0f0ee] text-gray-900">
      <SvgDefs />
      <GrainOverlay />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3">
        <motion.button type="button" onClick={scrollToHero}
          className="flex items-center gap-2 rounded-full px-3 sm:px-4 h-10 sm:h-11 shrink-0 backdrop-blur-md transition-colors duration-500"
          animate={{ backgroundColor: inServices ? 'rgba(255,255,255,0.12)' : '#EDEDED' }}
          transition={{ duration: 0.4 }}>
          <LogoIcon />
          <motion.span className="hidden sm:block text-[13px] font-semibold tracking-[0.1em]"
            animate={{ color: inServices ? 'rgba(255,255,255,0.82)' : 'rgb(55,65,81)' }}
            transition={{ duration: 0.3 }}>
            LIDINC
          </motion.span>
        </motion.button>

        <motion.div className="hidden sm:flex items-center gap-6 sm:gap-10 rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 backdrop-blur-md transition-colors duration-500"
          animate={{ backgroundColor: inServices ? 'rgba(255,255,255,0.1)' : '#EDEDED' }}
          transition={{ duration: 0.4 }}>
          {[
            { label: 'Услуги', onClick: scrollToServices },
            { label: 'О нас', onClick: () => scrollToSection(2) },
            { label: 'Кейсы', onClick: () => scrollToSection(3) },
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

        <button type="button"
          className={`sm:hidden ml-auto transition-colors ${inServices ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          onClick={() => setMenuOpen(true)}>
          <Menu size={20} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[55] backdrop-blur-xl flex flex-col items-center justify-center gap-6 px-8"
            style={{ backgroundColor: inServices ? 'rgba(8,8,8,0.96)' : 'rgba(240,240,238,0.96)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button"
              className={`absolute top-5 right-5 transition-colors ${inServices ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
              onClick={() => setMenuOpen(false)}>
              <X size={22} />
            </button>
            {[
              { label: 'Главная', idx: 0 },
              { label: 'Услуги', idx: 1 },
              { label: 'О нас', idx: 2 },
              { label: 'Кейсы', idx: 3 },
              { label: 'Процесс', idx: 4 },
            ].map((item, i) => (
              <motion.button key={item.label} type="button" onClick={() => scrollToSection(item.idx)}
                initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className={`text-[1.3rem] font-semibold transition-colors ${inServices ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
                {item.label}
              </motion.button>
            ))}
            <motion.a initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
              href={TELEGRAM} target="_blank" rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2.5 bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold">
              <TelegramIcon size={15} />Написать в Telegram
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sections */}
      <HeroSection onContact={() => setContactSection(SECTIONS[0])} onScrollToServices={scrollToServices} />
      <Suspense fallback={<div style={{ width: '100vw', height: '100vh', backgroundColor: '#080808' }} />}>
        <ServicesSection activeTabIdx={serviceTab} onTabChange={setServiceTab}
          onContact={(s) => setContactSection(s)} />
      </Suspense>
      <Suspense fallback={<div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a0a' }} />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<div style={{ width: '100vw', backgroundColor: '#0a0a0a' }} />}>
        <TeamSection />
      </Suspense>
      <Suspense fallback={<div style={{ width: '100vw', height: '100vh', backgroundColor: '#080808' }} />}>
        <CasesTestimonialsSection />
      </Suspense>
      <Suspense fallback={<div style={{ width: '100vw', height: '100vh', backgroundColor: '#060606' }} />}>
        <HowWeWorkSection />
      </Suspense>
      <Suspense fallback={<div style={{ width: '100vw', height: '100vh', backgroundColor: '#060606' }} />}>
        <FaqSection />
      </Suspense>
      <Suspense fallback={<div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505' }} />}>
        <CtaSection onContact={() => setContactSection(SECTIONS[0])}
          onScrollTo={(idx) => lenisRef.current?.scrollTo(idx * window.innerHeight)} />
      </Suspense>

      {/* FABs */}
      <div className="fixed right-5 bottom-8 z-40 flex flex-col gap-2 items-end">
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => ymGoal('whatsapp_click')}
          className="flex items-center gap-2 text-[12px] font-medium text-white/50 border border-white/15 rounded-full px-4 py-2 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all duration-200 backdrop-blur-sm">
          <WhatsAppIcon size={13} />WhatsApp
        </a>
        <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" onClick={() => ymGoal('telegram_click')}
          className="flex items-center gap-2 text-[12px] font-medium text-white/50 border border-white/15 rounded-full px-4 py-2 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all duration-200 backdrop-blur-sm">
          <TelegramIcon size={13} />Telegram
        </a>
        <a href={MAX_LINK} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-[12px] font-medium text-white/50 border border-white/15 rounded-full px-4 py-2 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all duration-200 backdrop-blur-sm">
          <MaxIcon size={13} />MAX
        </a>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {contactSection && <ContactForm defaultService={contactSection.category} onClose={() => setContactSection(null)} />}
      </AnimatePresence>

      {/* Effects & widgets */}
      <Suspense fallback={null}><ChatWidget /></Suspense>
      <SectionProgress idx={sectionIdx} visible={inServices} />
      <ScrollProgress />
      <CursorTrail active={inServices} />
      <Preloader done={loaded} />
      <Suspense fallback={null}><CookieBanner /></Suspense>
      <ScrollToTop visible={showTopBtn} />
      {inServices && <CustomCursor accent={cursorAccent} />}

    </div>
  )
}
