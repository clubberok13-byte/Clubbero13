interface Entry { count: number; reset: number }

const store = new Map<string, Entry>()

function cleanup() {
  const now = Date.now()
  for (const [key, val] of store) {
    if (now > val.reset) store.delete(key)
  }
}

export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  if (store.size > 5000) cleanup()

  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.reset) {
    store.set(ip, { count: 1, reset: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false
  entry.count++
  return true
}

import type { VercelRequest } from '@vercel/node'

export function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  const real = req.headers['x-real-ip']
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : undefined) ||
    (typeof real === 'string' ? real : undefined) ||
    'unknown'
  return ip
}
