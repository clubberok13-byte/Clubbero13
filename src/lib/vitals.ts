import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'

type Metric = { name: string; value: number; rating: 'good' | 'needs-improvement' | 'poor' }

function sendToGA(metric: Metric) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).gtag?.('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    non_interaction: true,
  })
}

export function reportWebVitals() {
  onCLS(sendToGA)
  onINP(sendToGA)
  onLCP(sendToGA)
  onFCP(sendToGA)
  onTTFB(sendToGA)
}
