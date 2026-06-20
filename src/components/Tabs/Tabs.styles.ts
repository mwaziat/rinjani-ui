import type { TabSize, TabColor } from './Tabs.types'

export const sizeMap: Record<TabSize, string> = {
  xxs: 'min-h-7 px-2 py-1 text-[10px] gap-1',
  xs: 'min-h-8 px-2.5 py-1.5 text-xs gap-1.5',
  sm: 'min-h-9 px-3 py-2 text-sm gap-1.5',
  md: 'min-h-11 px-4 py-2.5 text-base gap-2',
  lg: 'min-h-[52px] px-5 py-3 text-lg gap-2.5',
  xl: 'min-h-14 px-6 py-3.5 text-xl gap-3',
}

export const radiusMap: Record<TabSize, string> = {
  xxs: 'rounded-md',
  xs: 'rounded-md',
  sm: 'rounded-lg',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-xl',
}

export const variantColorMap: Record<'filled' | 'outlined' | 'soft' | 'text' | 'line', Record<TabColor, string>> = {
  filled: {
    primary: "bg-primary-500 text-white shadow-sm hover:bg-primary-600",
    secondary: "bg-secondary-500 text-white shadow-sm hover:bg-secondary-600",
    success: "bg-success-500 text-white shadow-sm hover:bg-success-600",
    warning: "bg-warning-500 text-white shadow-sm hover:bg-warning-600",
    danger: "bg-danger-500 text-white shadow-sm hover:bg-danger-600",
    info: "bg-info-500 text-white shadow-sm hover:bg-info-600",
    neutral: "bg-neutral-800 text-white shadow-sm hover:bg-neutral-900",
  },
  outlined: {
    primary: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
    secondary: "border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50",
    success: "border-2 border-success-500 text-success-600 hover:bg-success-50",
    warning: "border-2 border-warning-500 text-warning-600 hover:bg-warning-50",
    danger: "border-2 border-danger-500 text-danger-600 hover:bg-danger-50",
    info: "border-2 border-info-500 text-info-600 hover:bg-info-50",
    neutral: "border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50",
  },
  soft: {
    primary: "bg-primary-50 text-primary-600 hover:bg-primary-100",
    secondary: "bg-secondary-50 text-secondary-600 hover:bg-secondary-100",
    success: "bg-success-50 text-success-600 hover:bg-success-100",
    warning: "bg-warning-50 text-warning-600 hover:bg-warning-100",
    danger: "bg-danger-50 text-danger-600 hover:bg-danger-100",
    info: "bg-info-50 text-info-600 hover:bg-info-100",
    neutral: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
  },
  text: {
    primary: "bg-transparent text-primary-600 hover:bg-primary-50",
    secondary: "bg-transparent text-secondary-600 hover:bg-secondary-50",
    success: "bg-transparent text-success-600 hover:bg-success-50",
    warning: "bg-transparent text-warning-600 hover:bg-warning-50",
    danger: "bg-transparent text-danger-600 hover:bg-danger-50",
    info: "bg-transparent text-info-600 hover:bg-info-50",
    neutral: "bg-transparent text-neutral-600 hover:bg-neutral-50",
  },
  line: {
    primary: "border-primary-500 text-primary-600 bg-transparent hover:bg-primary-50",
    secondary: "border-secondary-500 text-secondary-600 bg-transparent hover:bg-secondary-50",
    success: "border-success-500 text-success-600 bg-transparent hover:bg-success-50",
    warning: "border-warning-500 text-warning-600 bg-transparent hover:bg-warning-50",
    danger: "border-danger-500 text-danger-600 bg-transparent hover:bg-danger-50",
    info: "border-info-500 text-info-600 bg-transparent hover:bg-info-50",
    neutral: "border-neutral-500 text-neutral-700 bg-transparent hover:bg-neutral-50",
  }
}

export const justifyMap: Record<string, string> = { 
  left: 'justify-start', 
  center: 'justify-center', 
  right: 'justify-end' 
}
