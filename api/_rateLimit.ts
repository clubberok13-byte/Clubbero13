import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { VercelRequest } from '@vercel/node'

let redis: Redis | null = null

function getRedis(): Redis | null {
  if (redis) return redis
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  redis = new Redis({ url, token })
  return redis
}

const limiters = new Map<string, Ratelimit>()

function getLimiter(prefix: string, limit: number, window: string): Ratelimit | null {
  const r = getRedis()
  if (!r) return null
  if (!limiters.has(prefix)) {
    limiters.set(prefix, new Ratelimit({ redis: r, limiter: Ratelimit.slidingWindow(limit, window), prefix }))
  }
  return limiters.get(prefix)!
}

export async function checkRateLimit(ip: string, endpoint: 'contact' | 'chat' = 'contact'): Promise<boolean> {
  const cfg = endpoint === 'chat'
    ? { prefix: 'lidinc:chat', limit: 12, window: '1 m' }
    : { prefix: 'lidinc:contact', limit: 3, window: '10 m' }
  const rl = getLimiter(cfg.prefix, cfg.limit, cfg.window)
  if (!rl) return true
  const { success } = await rl.limit(ip)
  return success
}

export function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  const real = req.headers['x-real-ip']
  const vercel = req.headers['x-vercel-proxied-for']
  return (
    (typeof vercel === 'string' ? vercel.trim() : undefined) ||
    (typeof forwarded === 'string' ? forwarded.split(',').at(-1)?.trim() : undefined) ||
    (typeof real === 'string' ? real : undefined) ||
    'unknown'
  )
}
