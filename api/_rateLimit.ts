import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { VercelRequest } from '@vercel/node'

let ratelimit: Ratelimit | null = null

function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(3, '10 m'),
    prefix: 'lidinc:contact',
  })
  return ratelimit
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  const rl = getRatelimit()
  if (!rl) return true
  const { success } = await rl.limit(ip)
  return success
}

export function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  const real = req.headers['x-real-ip']
  return (
    (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : undefined) ||
    (typeof real === 'string' ? real : undefined) ||
    'unknown'
  )
}
