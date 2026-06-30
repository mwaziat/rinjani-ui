import { toastManager } from './toast-manager'
import type { ToastOptions } from './Toast.types'

const createToast = (type: ToastOptions['type']) => (options: ToastOptions | string) => {
  const opts = typeof options === 'string' ? { message: options } : options
  return toastManager.add({ ...opts, type: type || opts.type || 'default' })
}

/**
 * A utility object to imperatively trigger "snackbar" style toast notifications from anywhere in your application.
 * 
 * Note: Requires `<ToastContainer />` to be mounted somewhere high in your React tree 
 * (typically in `App.tsx` or your layout).
 * 
 * @example
 * ```tsx
 * // Simple usage
 * Toast.success('Your settings have been saved!')
 * 
 * // Advanced usage
 * Toast.error({
 *   title: 'Network Error',
 *   message: 'Failed to connect to the server. Please try again.',
 *   placement: 'bottom-center',
 *   duration: 5000
 * })
 * ```
 */
export const Toast = {
  show: createToast('default'),
  success: createToast('success'),
  error: createToast('error'),
  warning: createToast('warning'),
  info: createToast('info'),
  dismiss: (id: string) => toastManager.remove(id)
}
