import type { FormColor, FormSize } from '../types'

export const sizeClasses: Record<FormSize, { box: string; label: string; icon: number; radius: string; rowGap: string }> = {
  xxs: { box: 'h-3.5 w-3.5', label: 'text-[9px]', icon: 10, radius: 'rounded-sm', rowGap: 'gap-2' },
  xs: { box: 'h-4 w-4', label: 'text-[10px]', icon: 12, radius: 'rounded-sm', rowGap: 'gap-2' },
  sm: { box: 'h-4 w-4', label: 'text-xs', icon: 12, radius: 'rounded-sm', rowGap: 'gap-2.5' },
  md: { box: 'h-5 w-5', label: 'text-sm', icon: 14, radius: 'rounded-md', rowGap: 'gap-3' },
  lg: { box: 'h-6 w-6', label: 'text-base', icon: 16, radius: 'rounded-lg', rowGap: 'gap-3.5' },
  xl: { box: 'h-7 w-7', label: 'text-lg', icon: 20, radius: 'rounded-lg', rowGap: 'gap-4' },
}

export const colors: Record<FormColor, { checked: string; focus: string }> = {
  primary: {
    checked: 'border-primary-500 bg-primary-500 text-white',
    focus: 'peer-focus:ring-0 peer-focus:border-primary-500',
  },
  secondary: {
    checked: 'border-secondary-500 bg-secondary-500 text-white',
    focus: 'peer-focus:ring-0 peer-focus:border-secondary-500',
  },
  success: {
    checked: 'border-success-500 bg-success-500 text-white',
    focus: 'peer-focus:ring-0 peer-focus:border-success-500',
  },
  warning: {
    checked: 'border-warning-500 bg-warning-500 text-white',
    focus: 'peer-focus:ring-0 peer-focus:border-warning-500',
  },
  danger: {
    checked: 'border-danger-500 bg-danger-500 text-white',
    focus: 'peer-focus:ring-0 peer-focus:border-danger-500',
  },
  info: {
    checked: 'border-info-500 bg-info-500 text-white',
    focus: 'peer-focus:ring-0 peer-focus:border-info-500',
  },
  neutral: {
    checked: 'border-neutral-900 bg-neutral-900 text-white',
    focus: 'peer-focus:ring-0 peer-focus:border-neutral-900',
  },
}
