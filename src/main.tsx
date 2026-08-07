import { StrictMode, useState, useEffect, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ui/error-boundary.tsx'
import { reportWebVitals } from './lib/vitals.ts'

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false })],
  })
}

const PrivacyPage = lazy(() => import('./pages/PrivacyPage.tsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'))
const AiContentPage = lazy(() => import('./pages/AiContentPage.tsx'))
const AiAutomationPage = lazy(() => import('./pages/AiAutomationPage.tsx'))
const AiBusinessPage = lazy(() => import('./pages/AiBusinessPage.tsx'))
const AiEducationPage = lazy(() => import('./pages/AiEducationPage.tsx'))

// eslint-disable-next-line react-refresh/only-export-components
function Router() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handler = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  if (path === '/') return <App />

  return (
    <Suspense fallback={null}>
      {path === '/privacy' ? <PrivacyPage /> :
       path === '/ai-content' ? <AiContentPage /> :
       path === '/ai-automation' ? <AiAutomationPage /> :
       path === '/ai-business' ? <AiBusinessPage /> :
       path === '/ai-education' ? <AiEducationPage /> :
       <NotFoundPage />}
    </Suspense>
  )
}

reportWebVitals()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </StrictMode>,
)
