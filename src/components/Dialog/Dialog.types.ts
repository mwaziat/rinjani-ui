import type { ReactNode } from 'react'

export type DialogType = 'success' | 'error' | 'warning' | 'info' | 'confirm' | 'default'

export interface DialogAction {
  label: string
  onClick?: (close: () => void) => void | Promise<void>
  variant?: 'filled' | 'outlined' | 'soft' | 'text'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  disabled?: boolean
  closeAfter?: boolean
}

export interface DialogOptions {
  title?: string
  message: ReactNode
  type?: DialogType
  icon?: ReactNode
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  actions?: DialogAction[]
  closeOnBackdrop?: boolean
}

export interface DialogItem extends DialogOptions {
  id: string
}
