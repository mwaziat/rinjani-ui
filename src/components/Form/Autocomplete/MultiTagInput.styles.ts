import type { FormColor, FormSize } from '../types'

export const colorMap: Record<FormColor, { bg: string; border: string; text: string; ring: string }> = {
  primary: { bg: 'bg-transparent', border: 'border-primary-500', text: 'text-primary-600', ring: 'focus:ring-primary-400' },
  secondary: { bg: 'bg-transparent', border: 'border-secondary-500', text: 'text-secondary-600', ring: 'focus:ring-secondary-400' },
  success: { bg: 'bg-transparent', border: 'border-success-500', text: 'text-success-600', ring: 'focus:ring-success-400' },
  warning: { bg: 'bg-transparent', border: 'border-warning-500', text: 'text-warning-600', ring: 'focus:ring-warning-400' },
  danger: { bg: 'bg-transparent', border: 'border-danger-500', text: 'text-danger-600', ring: 'focus:ring-danger-400' },
  info: { bg: 'bg-transparent', border: 'border-info-500', text: 'text-info-600', ring: 'focus:ring-info-400' },
  neutral: { bg: 'bg-transparent', border: 'border-neutral-400', text: 'text-neutral-700', ring: 'focus:ring-neutral-400' }
}

export const focusBorder: Record<FormColor, string> = {
  primary: 'focus:border-primary-500',
  secondary: 'focus:border-secondary-500',
  success: 'focus:border-success-500',
  warning: 'focus:border-warning-500',
  danger: 'focus:border-danger-500',
  info: 'focus:border-info-500',
  neutral: 'focus:border-neutral-900',
}

export const inputColorMap: Record<FormColor, { focus: string; label: string; icon: string }> = {
  primary: { focus: 'focus:border-primary-500 focus:ring-0', label: 'peer-focus:text-primary-600', icon: 'group-focus-within:text-primary-500' },
  secondary: { focus: 'focus:border-secondary-500 focus:ring-0', label: 'peer-focus:text-secondary-600', icon: 'group-focus-within:text-secondary-500' },
  success: { focus: 'focus:border-success-500 focus:ring-0', label: 'peer-focus:text-success-600', icon: 'group-focus-within:text-success-500' },
  warning: { focus: 'focus:border-warning-500 focus:ring-0', label: 'peer-focus:text-warning-600', icon: 'group-focus-within:text-warning-500' },
  danger: { focus: 'focus:border-danger-500 focus:ring-0', label: 'peer-focus:text-danger-600', icon: 'group-focus-within:text-danger-500' },
  info: { focus: 'focus:border-info-500 focus:ring-0', label: 'peer-focus:text-info-600', icon: 'group-focus-within:text-info-500' },
  neutral: { focus: 'focus:border-neutral-500 focus:ring-0', label: 'peer-focus:text-neutral-900', icon: 'group-focus-within:text-neutral-900' }
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

export const iconSizes: Record<FormSize, number> = {
  xxs: 14,
  xs: 14,
  sm: 15,
  md: 18,
  lg: 18,
  xl: 20,
}
