import type { TreeSize, TreeColor, TreeVariant } from './Tree.types'

export const borderClassByVariant: Record<TreeVariant, string> = {
  minimal: 'bg-white',
  lined: 'bg-white',
  filled: 'bg-neutral-50',
}

export const resolveVariantClass = (v: TreeVariant): string => {
  return borderClassByVariant[v]
}

export const titleClassBySize: Record<TreeSize, string> = {
  xxs: 'text-[10px]',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

export const variantColorMap = {
  active: {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    success: "bg-success-50 text-success-600",
    warning: "bg-warning-50 text-warning-600",
    danger: "bg-danger-50 text-danger-600",
    info: "bg-info-50 text-info-600",
    neutral: "bg-neutral-100 text-neutral-800",
  },
  activeFilled: {
    primary: "bg-primary-500 text-white shadow-sm border-primary-500",
    secondary: "bg-secondary-500 text-white shadow-sm border-secondary-500",
    success: "bg-success-500 text-white shadow-sm border-success-500",
    warning: "bg-warning-500 text-white shadow-sm border-warning-500",
    danger: "bg-danger-500 text-white shadow-sm border-danger-500",
    info: "bg-info-500 text-white shadow-sm border-info-500",
    neutral: "bg-neutral-800 text-white shadow-sm border-neutral-800",
  }
}

export const hoverBgClass = (color: TreeColor): string => {
  const map: Record<TreeColor, string> = {
    primary: 'hover:bg-primary-100',
    secondary: 'hover:bg-secondary-100',
    success: 'hover:bg-success-100',
    warning: 'hover:bg-warning-100',
    danger: 'hover:bg-danger-100',
    info: 'hover:bg-info-100',
    neutral: 'hover:bg-neutral-100',
  }
  return map[color]
}

export const lineColorClass = (color: TreeColor): string => {
  const map: Record<TreeColor, string> = {
    primary: 'border-primary-300',
    secondary: 'border-secondary-300',
    success: 'border-success-300',
    warning: 'border-warning-300',
    danger: 'border-danger-300',
    info: 'border-info-300',
    neutral: 'border-neutral-300',
  }
  return map[color]
}

export const getRowStyle = (variant: TreeVariant, isActive: boolean, color: TreeColor) => {
  if (isActive) {
    if (variant === 'filled') return variantColorMap.activeFilled[color]
    return variantColorMap.active[color]
  }

  const hover = hoverBgClass(color)
  if (variant === 'filled') return `bg-white ${hover} text-neutral-700 shadow-sm border border-neutral-200`
  if (variant === 'lined') return `${hover} text-neutral-700`
  return `${hover} text-neutral-700`
}

export const actionColorClass = (color: TreeColor) => {
  if (color === 'primary') return 'text-primary-600 hover:bg-primary-50'
  if (color === 'secondary') return 'text-secondary-600 hover:bg-secondary-50'
  if (color === 'success') return 'text-success-600 hover:bg-success-50'
  if (color === 'warning') return 'text-warning-600 hover:bg-warning-50'
  if (color === 'danger') return 'text-danger-600 hover:bg-danger-50'
  if (color === 'info') return 'text-info-600 hover:bg-info-50'
  return 'text-neutral-600 hover:bg-neutral-100'
}

export const nodeSizeClass = (size: TreeSize) => {
  if (size === 'xxs') return 'min-h-7 py-1 px-2 text-[10px]'
  if (size === 'xs') return 'min-h-8 py-1.5 px-2.5 text-xs'
  if (size === 'sm') return 'min-h-9 py-2 px-3 text-sm'
  if (size === 'md') return 'min-h-11 py-2.5 px-4 text-base'
  if (size === 'lg') return 'min-h-13 py-3 px-5 text-lg'
  if (size === 'xl') return 'min-h-14 py-3.5 px-6 text-xl'
  return 'min-h-9 py-2 px-3 text-sm'
}

export const getBasePadding = (size: TreeSize) => {
  if (size === 'xxs') return 8
  if (size === 'xs') return 10
  if (size === 'sm') return 12
  if (size === 'md') return 16
  if (size === 'lg') return 20
  if (size === 'xl') return 24
  return 12
}

export const iconButtonSizeClass = (size: TreeSize) => {
  if (size === 'xxs') return 'w-5 h-5'
  if (size === 'xs') return 'w-6 h-6'
  if (size === 'sm') return 'w-7 h-7'
  if (size === 'md') return 'w-8 h-8'
  if (size === 'lg') return 'w-10 h-10'
  if (size === 'xl') return 'w-12 h-12'
  return 'w-7 h-7'
}

export const getIconWidth = (size: TreeSize) => {
  if (size === 'xxs') return 20
  if (size === 'xs') return 24
  if (size === 'sm') return 28
  if (size === 'md') return 32
  if (size === 'lg') return 40
  if (size === 'xl') return 48
  return 28
}

export const labelTextClass = (size: TreeSize) => {
  if (size === 'xxs') return 'text-[10px]'
  if (size === 'xs') return 'text-xs'
  if (size === 'sm') return 'text-sm'
  if (size === 'md') return 'text-base'
  if (size === 'lg') return 'text-lg'
  if (size === 'xl') return 'text-xl'
  return 'text-sm'
}
