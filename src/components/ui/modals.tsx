import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Check } from 'lucide-react'
import { TelegramIcon, MaxIcon, TELEGRAM, MAX_LINK } from './icons'
import { SECTIONS, type SectionData } from '../../data/sections'
import { ymGoal } from '../../lib/metrika'

function isValidContact(value: string): boolean {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const phone = /^[+]?[\d\s\-()+]{7,20}$/
  const telegram = /^@[\w]{3,32}$|^(?:https?:\/\/)?t\.me\/[\w]{3,32}$/i
  return email.test(value.trim()) || phone.test(value.trim()) || telegram.test(value.trim())
}

export function ContactForm({ defaultService, onClose }: { defaultService?: string; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [contactError, setContactError] = useState('')
  const [form, setForm] = useState({ name: '', contact: '', message: '', service: defaultService ?? SECTIONS[0].category })
  const honeypotRef = useRef<HTMLInputElement>(null)

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidContact(form.contact)) {
      setContactError('Введите корректный email или номер телефона')
      return
    }
    setContactError('')
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _h: honeypotRef.current?.value ?? '' }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      ymGoal('lead_sent')
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
          <form onSubmit={submit} className="space-y-4" style={{ position: 'relative' }}>
            <input ref={honeypotRef} type="text" name="_h" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-5000px', top: 'auto' }} />
            <div>
              <label className="block text-[11px] text-gray-400 mb-1.5 tracking-wide uppercase">Имя</label>
              <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Иван Иванов"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-400 transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1.5 tracking-wide uppercase">Телефон или Email</label>
              <input
                required
                value={form.contact}
                onChange={e => { setForm(p => ({ ...p, contact: e.target.value })); if (contactError) setContactError('') }}
                onBlur={() => { if (form.contact && !isValidContact(form.contact)) setContactError('Введите корректный email или номер телефона') }}
                placeholder="+7 999 000-00-00"
                className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none transition-colors ${contactError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-blue-400'}`}
              />
              {contactError && <p className="text-red-500 text-[11px] mt-1">{contactError}</p>}
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

export function DetailModal({ section, onClose, onContact }: { section: SectionData; onClose: () => void; onContact: () => void }) {
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
