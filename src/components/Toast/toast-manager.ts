import type { ToastItem, ToastOptions } from './Toast.types'

type Listener = (toasts: ToastItem[]) => void

let toasts: ToastItem[] = []
let listeners: Listener[] = []

export const toastManager = {
  add: (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const toast: ToastItem = { ...options, id, duration: options.duration ?? 5000 }
    toasts = [...toasts, toast]
    toastManager.notify()
    return id
  },
  remove: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id)
    toastManager.notify()
  },
  subscribe: (listener: Listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  notify: () => {
    listeners.forEach((l) => l(toasts))
  }
}
