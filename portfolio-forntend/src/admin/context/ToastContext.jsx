import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, hiding: true } : t))
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
      delete timers.current[id]
    }, 280)
  }, [])

  const toast = useCallback((type, title, message, duration = 4000) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, type, title, message, hiding: false }])
    timers.current[id] = setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  const success = useCallback((title, message) => toast('success', title, message), [toast])
  const error   = useCallback((title, message) => toast('error',   title, message), [toast])
  const warning = useCallback((title, message) => toast('warning', title, message), [toast])
  const info    = useCallback((title, message) => toast('info',    title, message), [toast])

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, dismiss }) {
  if (toasts.length === 0) return null

  const icons = {
    success: 'bi-check-circle-fill',
    error:   'bi-x-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info:    'bi-info-circle-fill',
  }

  const titles = {
    success: 'Success',
    error:   'Error',
    warning: 'Warning',
    info:    'Info',
  }

  return (
    <div className="adm-toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`adm-toast ${t.type}${t.hiding ? ' hiding' : ''}`}>
          <i className={`bi ${icons[t.type] || icons.info} adm-toast-icon`}></i>
          <div className="adm-toast-text">
            <div className="adm-toast-title">{t.title || titles[t.type]}</div>
            {t.message && <div className="adm-toast-msg">{t.message}</div>}
          </div>
          <button className="adm-toast-close" onClick={() => dismiss(t.id)} aria-label="Dismiss">
            <i className="bi bi-x"></i>
          </button>
        </div>
      ))}
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
