import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PrivacyPage from './pages/PrivacyPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import AiContentPage from './pages/AiContentPage.tsx'
import AiAutomationPage from './pages/AiAutomationPage.tsx'
import AiBusinessPage from './pages/AiBusinessPage.tsx'
import AiEducationPage from './pages/AiEducationPage.tsx'
import FitLifePage from './pages/cases/FitLifePage.tsx'
import SkyStorePage from './pages/cases/SkyStorePage.tsx'
import DevGroupPage from './pages/cases/DevGroupPage.tsx'

// eslint-disable-next-line react-refresh/only-export-components
function Router() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handler = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  if (path === '/') return <App />
  if (path === '/privacy') return <PrivacyPage />
  if (path === '/ai-content') return <AiContentPage />
  if (path === '/ai-automation') return <AiAutomationPage />
  if (path === '/ai-business') return <AiBusinessPage />
  if (path === '/ai-education') return <AiEducationPage />
  if (path === '/cases/fitlife') return <FitLifePage />
  if (path === '/cases/skystore') return <SkyStorePage />
  if (path === '/cases/devgroup') return <DevGroupPage />
  return <NotFoundPage />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
