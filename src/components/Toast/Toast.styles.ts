import type { ToastPlacement, ToastType } from './Toast.types'

export const placementClasses: Record<ToastPlacement, string> = {
  'top-right': 'top-0 right-0 max-w-sm',
  'top-left': 'top-0 left-0 max-w-sm',
  'bottom-right': 'bottom-0 right-0 max-w-sm',
  'bottom-left': 'bottom-0 left-0 max-w-sm',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 max-w-sm',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 max-w-sm',
  'top-full': 'top-0 left-0',
  'bottom-full': 'bottom-0 left-0'
}

export const bgColors: Record<ToastType, string> = {
  success: 'bg-success-50 border-success-200',
  error: 'bg-danger-50 border-danger-200',
  warning: 'bg-warning-50 border-warning-200',
  info: 'bg-info-50 border-info-200',
  default: 'bg-white border-neutral-200'
}

export const barColors: Record<ToastType, string> = {
  success: 'bg-success-500',
  error: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  default: 'bg-neutral-400'
}

export const baseToastClasses = "relative w-full overflow-hidden rounded-xl border p-4 shadow-xl pointer-events-auto transition-all duration-300 ease-out"
