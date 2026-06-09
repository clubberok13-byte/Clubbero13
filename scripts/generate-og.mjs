import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../public/og-image.png')

const SERVICES = [
  { label: 'AI Контент',       color: '#22d3ee', bg: 'rgba(34,211,238,0.12)' },
  { label: 'AI Автоматизация', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  { label: 'AI для Бизнеса',   color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  { label: 'AI Обучение',      color: '#fbbf24', bg: 'rgba(251,191,36,0.12)'  },
]

const pills = SERVICES.map((s, i) => {
  const x = 72 + i * 218
  return `
    <rect x="${x}" y="556" width="208" height="42" rx="21"
      fill="${s.bg}" stroke="${s.color}" stroke-opacity="0.35" stroke-width="1"/>
    <text x="${x + 104}" y="582" font-size="15" fill="${s.color}"
      text-anchor="middle" dominant-baseline="middle">${s.label}</text>`
}).join('')

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630"
  xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="80%" cy="10%" r="45%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="5%" cy="95%" r="40%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#080810"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Logo mark -->
  <rect x="72" y="58" width="40" height="40" rx="10" fill="#3b82f6"/>
  <text x="92" y="83" font-size="22" font-weight="900" fill="white"
    text-anchor="middle" dominant-baseline="middle">L</text>

  <!-- Brand name -->
  <text x="124" y="79" font-size="22" font-weight="700" fill="rgba(255,255,255,0.85)"
    dominant-baseline="middle" letter-spacing="4">LIDINC</text>

  <!-- Badge -->
  <rect x="870" y="58" width="260" height="40" rx="20"
    fill="rgba(59,130,246,0.1)" stroke="rgba(96,165,250,0.35)" stroke-width="1"/>
  <text x="1000" y="78" font-size="14" fill="rgba(255,255,255,0.55)"
    text-anchor="middle" dominant-baseline="middle">AI-агентство полного цикла</text>

  <!-- Headline line 1 -->
  <text x="72" y="295" font-size="82" font-weight="300" fill="rgba(255,255,255,0.88)"
    letter-spacing="-2">Будущее вашего</text>

  <!-- Headline line 2 -->
  <text x="72" y="388" font-size="82" font-weight="300" fill="#60a5fa"
    letter-spacing="-2">бизнеса — с AI</text>

  <!-- Service pills -->
  ${pills}

  <!-- Domain -->
  <text x="1128" y="579" font-size="16" fill="rgba(255,255,255,0.2)"
    text-anchor="end" dominant-baseline="middle" letter-spacing="2">lidinc.ru</text>
</svg>`

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
const png = resvg.render().asPng()
writeFileSync(OUT, png)
console.log('✓ OG image generated:', OUT)
