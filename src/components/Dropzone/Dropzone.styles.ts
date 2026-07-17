import type { DropzoneColor, DropzoneSize, DropzoneVariant } from './Dropzone.types'

export const dropzoneActiveColorClasses: Record<DropzoneColor, { border: string; bg: string; text: string }> = {
  primary: { border: 'border-primary-500', bg: 'bg-primary-50', text: 'text-primary-600' },
  secondary: { border: 'border-secondary-500', bg: 'bg-secondary-50', text: 'text-secondary-600' },
  success: { border: 'border-success-500', bg: 'bg-success-50', text: 'text-success-600' },
  warning: { border: 'border-warning-500', bg: 'bg-warning-50', text: 'text-warning-600' },
  danger: { border: 'border-danger-500', bg: 'bg-danger-50', text: 'text-danger-600' },
  info: { border: 'border-info-500', bg: 'bg-info-50', text: 'text-info-600' },
  neutral: { border: 'border-neutral-400', bg: 'bg-neutral-100', text: 'text-neutral-600' },
}

export const dropzoneVariantClasses: Record<DropzoneVariant, Record<DropzoneColor, string>> = {
  outlined: {
    primary: 'border-2 border-neutral-300 bg-white hover:border-primary-400 hover:bg-primary-50',
    secondary: 'border-2 border-neutral-300 bg-white hover:border-secondary-400 hover:bg-secondary-50',
    success: 'border-2 border-neutral-300 bg-white hover:border-success-400 hover:bg-success-50',
    warning: 'border-2 border-neutral-300 bg-white hover:border-warning-400 hover:bg-warning-50',
    danger: 'border-2 border-neutral-300 bg-white hover:border-danger-400 hover:bg-danger-50',
    info: 'border-2 border-neutral-300 bg-white hover:border-info-400 hover:bg-info-50',
    neutral: 'border-2 border-neutral-300 bg-white hover:border-neutral-400 hover:bg-neutral-50',
  },
  filled: {
    primary: 'border-2 border-transparent bg-neutral-100 hover:border-primary-300 hover:bg-primary-50',
    secondary: 'border-2 border-transparent bg-neutral-100 hover:border-secondary-300 hover:bg-secondary-50',
    success: 'border-2 border-transparent bg-neutral-100 hover:border-success-300 hover:bg-success-50',
    warning: 'border-2 border-transparent bg-neutral-100 hover:border-warning-300 hover:bg-warning-50',
    danger: 'border-2 border-transparent bg-neutral-100 hover:border-danger-300 hover:bg-danger-50',
    info: 'border-2 border-transparent bg-neutral-100 hover:border-info-300 hover:bg-info-50',
    neutral: 'border-2 border-transparent bg-neutral-100 hover:border-neutral-300 hover:bg-neutral-50',
  },
  soft: {
    primary: 'border-2 border-transparent bg-primary-50/50 hover:bg-primary-100',
    secondary: 'border-2 border-transparent bg-secondary-50/50 hover:bg-secondary-100',
    success: 'border-2 border-transparent bg-success-50/50 hover:bg-success-100',
    warning: 'border-2 border-transparent bg-warning-50/50 hover:bg-warning-100',
    danger: 'border-2 border-transparent bg-danger-50/50 hover:bg-danger-100',
    info: 'border-2 border-transparent bg-info-50/50 hover:bg-info-100',
    neutral: 'border-2 border-transparent bg-neutral-50 hover:bg-neutral-100',
  },
}

export const dropzoneSizeClasses: Record<DropzoneSize, { container: string; iconSize: number; title: string; desc: string }> = {
  sm: { container: 'min-h-32 p-4', iconSize: 24, title: 'text-xs', desc: 'text-[10px]' },
  md: { container: 'min-h-40 p-6', iconSize: 32, title: 'text-sm', desc: 'text-xs' },
  lg: { container: 'min-h-48 p-8', iconSize: 40, title: 'text-base', desc: 'text-sm' },
}