import { motion } from 'framer-motion'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#060606] flex flex-col items-center justify-center px-6 text-center">
      {/* Orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <svg width="32" height="32" viewBox="0 0 256 256" fill="none" className="mb-8 opacity-60">
          <path fill="url(#lidinc-grad)" d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z" />
        </svg>

        <p className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-4 font-medium">404</p>

        <h1 className="text-[3rem] sm:text-[5rem] leading-none text-white mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          Страница<br />не найдена
        </h1>

        <p className="text-white/40 text-[14px] max-w-sm leading-relaxed mb-10">
          Похоже, эта страница переехала или никогда не существовала. Вернитесь на главную.
        </p>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white/60 text-[13px] font-medium hover:text-white hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
        >
          ← На главную
        </button>
      </motion.div>

      {/* Gradient defs for logo */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id="lidinc-grad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
