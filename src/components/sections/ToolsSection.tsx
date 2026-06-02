import { motion } from 'framer-motion'
import { FloatingOrbs, SplitTitle, useScrambleOnView } from '../ui/animations'

interface Tool { name: string; tag: string; color: string }

const ROW1: Tool[] = [
  { name: 'ChatGPT',         tag: 'LLM',       color: '#10b981' },
  { name: 'Midjourney',      tag: 'Image AI',  color: '#6366f1' },
  { name: 'Runway ML',       tag: 'Video AI',  color: '#f97316' },
  { name: 'HeyGen',          tag: 'Avatars',   color: '#3b82f6' },
  { name: 'ElevenLabs',      tag: 'Voice AI',  color: '#a78bfa' },
  { name: 'n8n / Make',      tag: 'Automation',color: '#ef4444' },
  { name: 'GPT-4o',          tag: 'LLM',       color: '#10b981' },
  { name: 'Stable Diffusion',tag: 'Image AI',  color: '#8b5cf6' },
]

const ROW2: Tool[] = [
  { name: 'Telegram Bot',    tag: 'Messaging', color: '#2AABEE' },
  { name: 'Whisper',         tag: 'Speech',    color: '#64748b' },
  { name: 'Claude',          tag: 'LLM',       color: '#f59e0b' },
  { name: 'Perplexity',      tag: 'Search AI', color: '#22d3ee' },
  { name: 'Sora',            tag: 'Video AI',  color: '#f43f5e' },
  { name: 'Kling AI',        tag: 'Video AI',  color: '#ec4899' },
  { name: 'Figma AI',        tag: 'Design',    color: '#a855f7' },
  { name: 'Notion AI',       tag: 'Docs',      color: '#94a3b8' },
]

function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <div className="shrink-0 flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-2 mx-2">
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tool.color }} />
      <span className="text-white text-[13px] font-medium whitespace-nowrap">{tool.name}</span>
      <span className="text-white/30 text-[10px] tracking-wide uppercase whitespace-nowrap">{tool.tag}</span>
    </div>
  )
}

function MarqueeRow({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const doubled = [...tools, ...tools]
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((t, i) => <ToolBadge key={i} tool={t} />)}
        {doubled.map((t, i) => <ToolBadge key={`b${i}`} tool={t} />)}
      </motion.div>
    </div>
  )
}

export default function ToolsSection() {
  const { ref, scrambled } = useScrambleOnView('Инструменты')

  return (
    <div
      ref={ref}
      className="relative snap-start overflow-hidden flex flex-col justify-center"
      style={{ width: '100vw', height: '100vh', scrollSnapStop: 'always', backgroundColor: '#060606' }}
    >
      <FloatingOrbs accent="#10b981" />
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/15 via-transparent to-blue-950/10 pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 mb-10">
        <motion.p
          className="text-[11px] tracking-[0.3em] uppercase text-blue-400 mb-3 font-medium"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          {scrambled}
        </motion.p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SplitTitle
            text={'Работаем\nс лучшим AI'}
            className="text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] text-white tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          />
          <motion.p
            className="text-white/40 text-[13px] max-w-xs leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Используем актуальные модели и платформы — выбираем лучший инструмент под каждую задачу.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-3"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <MarqueeRow tools={ROW1} />
        <MarqueeRow tools={ROW2} reverse />
      </motion.div>
    </div>
  )
}
