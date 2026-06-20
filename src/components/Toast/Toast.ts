import { toastManager } from './toast-manager'
import type { ToastOptions } from './Toast.types'

const createToast = (type: ToastOptions['type']) => (options: ToastOptions | string) => {
  const opts = typeof options === 'string' ? { message: options } : options
  return toastManager.add({ ...opts, type: type || opts.type || 'default' })
}

export const Toast = {
  show: createToast('default'),
  success: createToast('success'),
  error: createToast('error'),
  warning: createToast('warning'),
  info: createToast('info'),
  dismiss: (id: string) => toastManager.remove(id)
}
