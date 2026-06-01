import type { VercelRequest, VercelResponse } from '@vercel/node'

const SYSTEM_PROMPT = `Ты AI-ассистент компании LIDINC — агентства AI-решений для бизнеса. Отвечай на русском, кратко и по делу.

Услуги LIDINC:
• AI Content (от 15 000 ₽) — видеопроизводство, AI-аватары, генерация текстов, контент-завод
• AI Development (от 30 000 ₽) — разработка сайтов, 3D-моделирование, парсинг данных, фотообработка
• AI Business (от 50 000 ₽) — чат-боты, автоматизация CRM, голосовые помощники, AI-аналитика
• AI Education (от 20 000 ₽) — корпоративное обучение, воркшопы, онлайн-курсы по AI

Если клиент хочет заказать или узнать подробнее — предложи оставить имя и контакт. Не придумывай несуществующих услуг. Будь дружелюбным и профессиональным.`

const MAX_MESSAGES = 20
const MAX_CONTENT_LENGTH = 2000

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { messages } = req.body as {
    messages: Array<{ role: string; content: string }>
  }

  // Input validation
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages' })
  }

  const validRoles = new Set(['user', 'assistant'])
  const sanitized = messages
    .slice(-MAX_MESSAGES)
    .filter(m => validRoles.has(m.role) && typeof m.content === 'string')
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content.slice(0, MAX_CONTENT_LENGTH) }))

  if (sanitized.length === 0) {
    return res.status(400).json({ error: 'No valid messages' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Service unavailable' })

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 400,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...sanitized,
        ],
      }),
    })

    if (!response.ok) {
      console.error('OpenAI error:', response.status)
      return res.status(502).json({ error: 'AI service error' })
    }

    const data = await response.json() as {
      choices: Array<{ message: { content: string } }>
    }

    const reply = data.choices?.[0]?.message?.content
    if (!reply) return res.status(502).json({ error: 'Empty response from AI' })

    res.json({ reply })
  } catch (err) {
    console.error('Chat handler error:', err)
    res.status(500).json({ error: 'Internal error' })
  }
}
