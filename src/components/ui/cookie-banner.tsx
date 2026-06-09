import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      const t = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="bg-[#111] border border-white/10 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl backdrop-blur-sm">
            <p className="text-white/55 text-[12px] leading-relaxed flex-1">
              Мы используем cookies для улучшения работы сайта.{' '}
              <a href="/privacy" onClick={e => { e.preventDefault(); window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')) }}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                Политика конфиденциальности
              </a>
            </p>
            <div className="flex gap-2 shrink-0">
              <button type="button" onClick={decline}
                className="px-4 py-2 rounded-full border border-white/15 text-white/40 text-[12px] font-medium hover:text-white/60 hover:border-white/30 transition-colors">
                Отклонить
              </button>
              <button type="button" onClick={accept}
                className="px-5 py-2 rounded-full bg-white text-[#111] text-[12px] font-semibold hover:bg-white/90 transition-colors">
                Принять
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
