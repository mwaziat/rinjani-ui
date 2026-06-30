import type { FormColor, FormSize } from '../types'

export const sizeClasses: Record<FormSize, { box: string; dot: string; label: string; rowGap: string }> = {
  xxs: { box: 'h-3.5 w-3.5', dot: 'before:h-1.5 before:w-1.5', label: 'text-[9px]', rowGap: 'gap-2' },
  xs: { box: 'h-4 w-4', dot: 'before:h-1.5 before:w-1.5', label: 'text-[10px]', rowGap: 'gap-2' },
  sm: { box: 'h-4 w-4', dot: 'before:h-1.5 before:w-1.5', label: 'text-xs', rowGap: 'gap-2.5' },
  md: { box: 'h-5 w-5', dot: 'before:h-2 before:w-2', label: 'text-sm', rowGap: 'gap-3' },
  lg: { box: 'h-6 w-6', dot: 'before:h-2.5 before:w-2.5', label: 'text-base', rowGap: 'gap-3.5' },
  xl: { box: 'h-7 w-7', dot: 'before:h-3 before:w-3', label: 'text-lg', rowGap: 'gap-4' },
}

export const colors: Record<FormColor, { active: string; focus: string }> = {
  primary: { active: 'border-primary-500 before:scale-100 before:bg-primary-500', focus: 'peer-focus:ring-0 peer-focus:border-primary-500' },
  secondary: { active: 'border-secondary-500 before:scale-100 before:bg-secondary-500', focus: 'peer-focus:ring-0 peer-focus:border-secondary-500' },
  success: { active: 'border-success-500 before:scale-100 before:bg-success-500', focus: 'peer-focus:ring-0 peer-focus:border-success-500' },
  warning: { active: 'border-warning-500 before:scale-100 before:bg-warning-500', focus: 'peer-focus:ring-0 peer-focus:border-warning-500' },
  danger: { active: 'border-danger-500 before:scale-100 before:bg-danger-500', focus: 'peer-focus:ring-0 peer-focus:border-danger-500' },
  info: { active: 'border-info-500 before:scale-100 before:bg-info-500', focus: 'peer-focus:ring-0 peer-focus:border-info-500' },
  neutral: { active: 'border-neutral-900 before:scale-100 before:bg-neutral-900', focus: 'peer-focus:ring-0 peer-focus:border-neutral-900' },
}
