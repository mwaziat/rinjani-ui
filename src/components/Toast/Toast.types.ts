import type { ReactNode } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export type ToastPlacement = 
  | 'top-right' 
  | 'top-left' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'top-center' 
  | 'bottom-center' 
  | 'top-full' 
  | 'bottom-full'

export interface ToastOptions {
  title?: string
  message: ReactNode
  type?: ToastType
  duration?: number
  placement?: ToastPlacement
  icon?: ReactNode
  onClose?: () => void
}

export interface ToastItem extends ToastOptions {
  id: string
}
