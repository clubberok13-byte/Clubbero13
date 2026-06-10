import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Привет! Я AI-ассистент LIDINC. Расскажи что тебя интересует — помогу подобрать услугу или ответить на вопросы 👋' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [nudge, setNudge] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const userInteracted = useRef(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
      setNudge(false)
      userInteracted.current = true
    }
  }, [open])

  useEffect(() => {
    if (sessionStorage.getItem('chat_nudge_shown')) return
    const t = setTimeout(() => {
      if (!userInteracted.current) {
        setNudge(true)
        sessionStorage.setItem('chat_nudge_shown', '1')
      }
    }, 20_000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const { message } = (e as CustomEvent<{ message: string }>).detail
      if (!message) return
      setOpen(true)
      userInteracted.current = true
      setNudge(false)
      setTimeout(() => {
        setInput(message)
        setTimeout(() => {
          setInput('')
          const text = message.trim()
          if (!text) return
          const next: Message[] = [
            { role: 'assistant', content: 'Привет! Я AI-ассистент LIDINC. Расскажи что тебя интересует — помогу подобрать услугу или ответить на вопросы 👋' },
            { role: 'user', content: text },
          ]
          setMessages(next)
          setLoading(true)
          fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: next }),
          })
            .then(r => r.json())
            .then((data: { reply?: string }) => {
              if (data.reply) setMessages(m => [...m, { role: 'assistant', content: data.reply! }])
            })
            .catch(() => setMessages(m => [...m, { role: 'assistant', content: 'Ошибка соединения. Попробуй ещё раз.' }]))
            .finally(() => setLoading(false))
        }, 50)
      }, 300)
    }
    window.addEventListener('lidinc-ask', handler)
    return () => window.removeEventListener('lidinc-ask', handler)
  }, [])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setLoading(true)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      })
      clearTimeout(timeout)
      if (res.status === 429) {
        setMessages(m => [...m, { role: 'assistant', content: 'Слишком много запросов. Подожди минуту и попробуй снова.' }])
        return
      }
      if (!res.ok) throw new Error(`status ${res.status}`)
      const data = await res.json() as { reply: string }
      if (!data.reply) throw new Error('empty reply')
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch (err) {
      clearTimeout(timeout)
      const msg = err instanceof Error && err.name === 'AbortError'
        ? 'Запрос занял слишком много времени. Попробуй ещё раз.'
        : 'Ошибка соединения. Попробуй ещё раз.'
      setMessages(m => [...m, { role: 'assistant', content: msg }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 left-0 sm:left-auto bottom-0 sm:bottom-48 sm:right-5 z-50 w-full sm:w-[380px] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl border-t sm:border border-white/10"
            style={{ backgroundColor: '#0f0f0f', height: '70vh', maxHeight: 520 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-400/25 flex items-center justify-center">
                  <Bot size={15} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-[13px] font-medium leading-none">LIDINC AI</p>
                  <p className="text-white/35 text-[11px] mt-0.5">Обычно отвечает мгновенно</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <div key={`${msg.role}-${i}-${msg.content.slice(0,8)}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-white/8 text-white/85 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/8 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/8">
              <div className="flex gap-2 items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Написать..."
                  className="flex-1 bg-transparent text-[13px] text-white placeholder-white/25 focus:outline-none"
                />
                <button onClick={send} disabled={!input.trim() || loading}
                  className="text-blue-400 disabled:text-white/20 hover:text-blue-300 transition-colors">
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nudge tooltip */}
      <AnimatePresence>
        {nudge && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[calc(3rem+3.5rem+0.75rem)] right-5 z-50 max-w-[220px]"
          >
            <div className="bg-[#0f0f0f] border border-white/12 rounded-xl px-4 py-2.5 shadow-xl text-white/75 text-[12px] leading-snug">
              Нужна помощь с выбором услуги?
              <span className="text-blue-400"> Спроси меня →</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-48 right-5 z-50 w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-xl transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {nudge && !open && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={18} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
