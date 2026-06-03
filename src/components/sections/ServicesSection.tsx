import { motion, AnimatePresence } from 'framer-motion'
import { GlowCard } from '../ui/spotlight-card'
import { FloatingOrbs } from '../ui/animations'
import { MagneticButton } from '../ui/overlays'
import { ContentBg, DevelopmentBg, BusinessBg, EducationBg } from '../ui/background-paper-shaders'
import { SECTIONS, type SectionData } from '../../data/sections'

export default function ServicesSection({ activeTabIdx, onTabChange, onDetail, onContact }: {
  activeTabIdx: number
  onTabChange: (idx: number) => void
  onDetail: (s: SectionData) => void
  onContact: (s: SectionData) => void
}) {
  const section = SECTIONS[activeTabIdx]

  return (
    <div className="relative overflow-hidden" style={{ width: '100vw', height: '100vh' }}>
      {SECTIONS.map((s, i) => (
        <motion.div key={s.id} className="absolute inset-0"
          animate={{ opacity: i === activeTabIdx ? 1 : 0 }} transition={{ duration: 0.45 }}>
          {s.id === 'content'     ? <ContentBg /> :
           s.id === 'development' ? <DevelopmentBg /> :
           s.id === 'business'    ? <BusinessBg /> :
           s.id === 'education'   ? <EducationBg /> : null}
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-black/38" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <FloatingOrbs accent={section.accent} />

      <div className="absolute top-20 sm:top-24 left-0 right-0 z-20 flex items-center justify-center gap-1 px-4">
        {SECTIONS.map((s, i) => (
          <button key={s.id} type="button" onClick={() => onTabChange(i)}
            className={`shrink-0 transition-all duration-300 border rounded-full ${
              activeTabIdx === i
                ? 'bg-white/12 text-white border-white/25 backdrop-blur-sm'
                : 'text-white/35 border-transparent hover:text-white/60'
            }`}>
            <span className="sm:hidden block text-[11px] tracking-[0.1em] px-3 py-1.5">
              {s.category.split(' / ')[0]}
            </span>
            <span className="hidden sm:block text-[11px] tracking-[0.12em] uppercase px-4 py-1.5 whitespace-nowrap">
              {s.category.split(' / ')[1]}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={section.id}
          className="relative z-10 h-full flex flex-col items-center justify-center pt-28 pb-8 px-6 sm:px-12 md:px-20 lg:px-28"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex flex-col gap-3 w-full max-w-lg">
            {section.services.map((svc) => {
              const Icon = svc.icon
              return (
                <GlowCard key={svc.name} glowColor="blue" customSize className="w-full py-4 px-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-blue-500/10 border border-blue-400/20">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-[14px] font-medium leading-snug mb-1">{svc.name}</p>
                    <p className="text-white/40 text-[12px] leading-snug">{svc.desc}</p>
                  </div>
                </GlowCard>
              )
            })}
          </div>
          <div className="flex gap-3 mt-8">
            <MagneticButton>
              <button type="button" onClick={() => onDetail(section)}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 border border-white/20 rounded-full px-5 py-2.5 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-200 group backdrop-blur-sm">
                Подробнее
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 opacity-60 group-hover:opacity-100">→</span>
              </button>
            </MagneticButton>
            <MagneticButton>
              <button type="button" onClick={() => onContact(section)}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-white/25 border border-white/10 rounded-full px-5 py-2.5 hover:text-white/60 hover:border-white/25 transition-all duration-200 group backdrop-blur-sm">
                Заказать
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 opacity-40 group-hover:opacity-70">→</span>
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
