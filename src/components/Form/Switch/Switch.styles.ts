import type { FormColor, FormSize } from '../types'

export const sizeClasses: Record<FormSize, { track: string; thumb: string; translate: string; label: string }> = {
  xxs: { track: 'w-7 h-4', thumb: 'w-3 h-3', translate: 'translate-x-3', label: 'text-[10px]' },
  xs: { track: 'w-8 h-4.5', thumb: 'w-3.5 h-3.5', translate: 'translate-x-[14px]', label: 'text-xs' },
  sm: { track: 'w-9 h-5', thumb: 'w-4 h-4', translate: 'translate-x-4', label: 'text-sm' },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5', label: 'text-base' },
  lg: { track: 'w-14 h-7.5', thumb: 'w-6 h-6', translate: 'translate-x-7', label: 'text-lg' },
  xl: { track: 'w-16 h-9', thumb: 'w-7.5 h-7.5', translate: 'translate-x-7.5', label: 'text-xl' },
}

export const colorClasses: Record<FormColor, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  info: 'bg-info-500',
  neutral: 'bg-neutral-900',
}

export const focusClasses: Record<FormColor, string> = {
  primary: 'peer-focus:ring-primary-500/30',
  secondary: 'peer-focus:ring-secondary-500/30',
  success: 'peer-focus:ring-success-500/30',
  warning: 'peer-focus:ring-warning-500/30',
  danger: 'peer-focus:ring-danger-500/30',
  info: 'peer-focus:ring-info-500/30',
  neutral: 'peer-focus:ring-neutral-900/30',
}

export const placementClasses = {
  top: 'flex-col-reverse items-center justify-end',
  bottom: 'flex-col items-center',
  left: 'flex-row-reverse items-center justify-end',
  right: 'flex-row items-center',
}
