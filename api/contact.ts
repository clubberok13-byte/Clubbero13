import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkRateLimit, getClientIp } from './_rateLimit.js'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const ALLOWED_ORIGINS = ['https://lidinc.ru', 'https://www.lidinc.ru', 'https://clubbero13.vercel.app']

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? ''
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const contentLength = Number(req.headers['content-length'] ?? 0)
  if (contentLength > 10_000) return res.status(413).json({ error: 'Request too large' })

  const ip = getClientIp(req)
  if (!checkRateLimit(ip, 3, 10 * 60_000)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  const { name, contact, service, message, _h } = req.body as {
    name: string; contact: string; service: string; message: string; _h?: string
  }

  // Honeypot: bots fill this field, humans don't
  if (_h) return res.status(200).json({ ok: true })

  if (!name || !contact) return res.status(400).json({ error: 'Missing required fields' })

  const isValidContact = (v: string) => {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    const phone = /^[+]?[\d\s\-()+]{7,20}$/
    const telegram = /^@[\w]{3,32}$|^(?:https?:\/\/)?t\.me\/[\w]{3,32}$/i
    return email.test(v) || phone.test(v) || telegram.test(v)
  }
  if (!isValidContact(contact.trim())) {
    return res.status(400).json({ error: 'Invalid contact format' })
  }

  const safeName    = escapeHtml(String(name).slice(0, 200))
  const safeContact = escapeHtml(String(contact).slice(0, 200))
  const safeService = escapeHtml(String(service ?? '').slice(0, 200))
  const safeMessage = escapeHtml(String(message ?? '').slice(0, 1000))

  const text = `🔔 <b>Новая заявка — LIDINC</b>\n\n👤 <b>Имя:</b> ${safeName}\n📱 <b>Контакт:</b> ${safeContact}\n🔧 <b>Услуга:</b> ${safeService}\n💬 <b>Сообщение:</b> ${safeMessage || '—'}`

  const errors: string[] = []

  // ── Telegram ──
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (botToken && chatId) {
    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      })
      if (!tgRes.ok) errors.push('telegram')
    } catch {
      errors.push('telegram')
    }
  }

  // ── Email via Resend ──
  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL
  if (resendKey && toEmail) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'LIDINC Form <onboarding@resend.dev>',
          to: [toEmail],
          subject: `Новая заявка от ${safeName} — ${safeService}`,
          html: `<p><b>Имя:</b> ${safeName}</p><p><b>Контакт:</b> ${safeContact}</p><p><b>Услуга:</b> ${safeService}</p><p><b>Сообщение:</b> ${safeMessage || '—'}</p>`,
        }),
      })
      if (!emailRes.ok) errors.push('email')
    } catch {
      errors.push('email')
    }
  }

  const configured = [botToken && chatId, resendKey && toEmail].filter(Boolean).length
  if (configured > 0 && errors.length >= configured) {
    console.error('All notification channels failed:', errors)
    return res.status(500).json({ error: 'Notification delivery failed' })
  }

  if (errors.length > 0) console.error('Some channels failed:', errors)

  res.status(200).json({ ok: true })
}
