import { StrictMode, useState, useEffect, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
