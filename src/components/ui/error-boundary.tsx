import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State { return { hasError: true } }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white gap-4 px-6">
          <p className="text-white/40 text-[13px] text-center">Что-то пошло не так. Обновите страницу.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-[13px] px-5 py-2.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
          >
            Обновить
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
