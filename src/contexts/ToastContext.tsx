import { createContext, useCallback } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Toast as ToastApp } from '../components/Toast'

export interface ToastMessage {
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface ToastContextData {
  addToast(message: ToastMessage): void
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData
)

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(({ type, title, description }: ToastMessage) => {
    const message = {
      type,
      title,
      description,
    }

    toast(<ToastApp message={message} />)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}
