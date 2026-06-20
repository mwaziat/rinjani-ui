import type { AlertColor, AlertVariant } from './Alert.types'

export const baseAlertClasses = "relative w-full rounded-xl flex gap-3 transition-all duration-300 overflow-hidden"

export const colorStyles = {
  filled: {
    primary: 'bg-primary-600 text-white border-transparent',
    secondary: 'bg-secondary-600 text-white border-transparent',
    success: 'bg-success-600 text-white border-transparent',
    warning: 'bg-warning-500 text-white border-transparent',
    danger: 'bg-danger-600 text-white border-transparent',
    info: 'bg-info-600 text-white border-transparent',
    neutral: 'bg-neutral-800 text-white border-transparent',
  },
  soft: {
    primary: 'bg-primary-50 text-primary-800 border-transparent',
    secondary: 'bg-secondary-50 text-secondary-800 border-transparent',
    success: 'bg-success-50 text-success-800 border-transparent',
    warning: 'bg-warning-50 text-warning-800 border-transparent',
    danger: 'bg-danger-50 text-danger-800 border-transparent',
    info: 'bg-info-50 text-info-800 border-transparent',
    neutral: 'bg-neutral-50 text-neutral-800 border-transparent',
  },
  outlined: {
    primary: 'bg-primary-50 text-primary-800 border-primary-200 border',
    secondary: 'bg-secondary-50 text-secondary-800 border-secondary-200 border',
    success: 'bg-success-50 text-success-800 border-success-200 border',
    warning: 'bg-warning-50 text-warning-800 border-warning-200 border',
    danger: 'bg-danger-50 text-danger-800 border-danger-200 border',
    info: 'bg-info-50 text-info-800 border-info-200 border',
    neutral: 'bg-neutral-50 text-neutral-800 border-neutral-200 border',
  }
} satisfies Record<AlertVariant, Record<AlertColor, string>>
