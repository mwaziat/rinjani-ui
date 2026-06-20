import type { ReactNode } from 'react'

export type AlertColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type AlertVariant = 'filled' | 'soft' | 'outlined'
export type AlertAction = 'close' | 'minimize'

export interface AlertProps {
  variant?: AlertVariant
  color?: AlertColor
  title?: string
  message?: ReactNode
  children?: ReactNode
  icon?: ReactNode
  showIcon?: boolean
  action?: AlertAction
  duration?: number
  onClose?: () => void
  className?: string
}
