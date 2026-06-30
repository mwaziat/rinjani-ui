import type { FormColor, FormSize } from '../types'

export const colorMap: Record<FormColor, { focus: string; label: string }> = {
  primary: {
    focus: 'focus:border-primary-500 focus:ring-0',
    label: 'peer-focus:text-primary-600',
  },
  secondary: {
    focus: 'focus:border-secondary-500 focus:ring-0',
    label: 'peer-focus:text-secondary-600',
  },
  success: {
    focus: 'focus:border-success-500 focus:ring-0',
    label: 'peer-focus:text-success-600',
  },
  warning: {
    focus: 'focus:border-warning-500 focus:ring-0',
    label: 'peer-focus:text-warning-600',
  },
  danger: {
    focus: 'focus:border-danger-500 focus:ring-0',
    label: 'peer-focus:text-danger-600',
  },
  info: {
    focus: 'focus:border-info-500 focus:ring-0',
    label: 'peer-focus:text-info-600',
  },
  neutral: {
    focus: 'focus:border-neutral-500 focus:ring-0',
    label: 'peer-focus:text-neutral-900',
  }
}

export const lineFocus: Record<FormColor, string> = {
  primary: 'focus:border-b-primary-500 focus:ring-0',
  secondary: 'focus:border-b-secondary-500 focus:ring-0',
  success: 'focus:border-b-success-500 focus:ring-0',
  warning: 'focus:border-b-warning-500 focus:ring-0',
  danger: 'focus:border-b-danger-500 focus:ring-0',
  info: 'focus:border-b-info-500 focus:ring-0',
  neutral: 'focus:border-b-neutral-500 focus:ring-0',
}

export const textSizeMap: Record<FormSize, string> = {
  xxs: 'text-[10px]',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

export const labelSizeMap: Record<FormSize, string> = {
  xxs: 'text-[9px]',
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
}

export const floatingActiveSizeMap: Record<FormSize, string> = {
  xxs: 'text-[8px]',
  xs: 'text-[9px]',
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
  xl: 'text-base',
}

export const sizeMap: Record<FormSize, string> = {
  xxs: `min-h-7 py-1 ${textSizeMap.xxs}`,
  xs: `min-h-8 py-1.5 ${textSizeMap.xs}`,
  sm: `min-h-9 py-1.5 ${textSizeMap.sm}`,
  md: `min-h-11 py-2 ${textSizeMap.md}`,
  lg: `min-h-[52px] py-2.5 ${textSizeMap.lg}`,
  xl: `min-h-14 py-3 ${textSizeMap.xl}`,
}

export const radiusMap: Record<FormSize, string> = {
  xxs: 'rounded',
  xs: 'rounded-md',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-xl',
}
