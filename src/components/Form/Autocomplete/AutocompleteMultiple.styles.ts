import type { FormColor, FormSize } from '../types'

export const colorMap: Record<FormColor, { active: string; label: string; input: string; badge: string; itemSelected: string }> = {
  primary: { active: 'border-primary-500 ring-0', label: 'text-primary-600', input: 'focus:border-primary-500 focus:ring-0', badge: 'bg-transparent border border-primary-500 text-primary-600', itemSelected: 'bg-primary-50 text-primary-600' },
  secondary: { active: 'border-secondary-500 ring-0', label: 'text-secondary-600', input: 'focus:border-secondary-500 focus:ring-0', badge: 'bg-transparent border border-secondary-500 text-secondary-600', itemSelected: 'bg-secondary-50 text-secondary-600' },
  success: { active: 'border-success-500 ring-0', label: 'text-success-600', input: 'focus:border-success-500 focus:ring-0', badge: 'bg-transparent border border-success-500 text-success-600', itemSelected: 'bg-success-50 text-success-600' },
  warning: { active: 'border-warning-500 ring-0', label: 'text-warning-600', input: 'focus:border-warning-500 focus:ring-0', badge: 'bg-transparent border border-warning-500 text-warning-600', itemSelected: 'bg-warning-50 text-warning-600' },
  danger: { active: 'border-danger-500 ring-0', label: 'text-danger-600', input: 'focus:border-danger-500 focus:ring-0', badge: 'bg-transparent border border-danger-500 text-danger-600', itemSelected: 'bg-danger-50 text-danger-600' },
  info: { active: 'border-info-500 ring-0', label: 'text-info-600', input: 'focus:border-info-500 focus:ring-0', badge: 'bg-transparent border border-info-500 text-info-600', itemSelected: 'bg-info-50 text-info-600' },
  neutral: { active: 'border-neutral-500 ring-0', label: 'text-neutral-900', input: 'focus:border-neutral-500 focus:ring-0', badge: 'bg-transparent border border-neutral-400 text-neutral-700', itemSelected: 'bg-neutral-100 text-neutral-800' }
}

export const lineActive: Record<FormColor, string> = {
  primary: 'border-b-primary-500 ring-0',
  secondary: 'border-b-secondary-500 ring-0',
  success: 'border-b-success-500 ring-0',
  warning: 'border-b-warning-500 ring-0',
  danger: 'border-b-danger-500 ring-0',
  info: 'border-b-info-500 ring-0',
  neutral: 'border-b-neutral-500 ring-0',
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

export const chipSizes: Record<FormSize, string> = {
  xxs: 'px-1 py-0.5 text-[9px]',
  xs: 'px-1.5 py-0.5 text-[9px]',
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
  xl: 'px-3.5 py-1.5 text-[15px]',
}
