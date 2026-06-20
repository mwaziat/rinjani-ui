import type { BreadcrumbColor, BreadcrumbVariant, BreadcrumbSize } from './Breadcrumb.types'

export const baseBreadcrumbWrapperStyles = "flex flex-col justify-between gap-4 md:flex-row md:items-center"
export const containedBreadcrumbStyles = "rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"

export const colorVariants = {
  primary: 'text-primary-600 bg-primary-50',
  secondary: 'text-secondary-600 bg-secondary-50',
  success: 'text-success-600 bg-success-50',
  warning: 'text-warning-600 bg-warning-50',
  danger: 'text-danger-600 bg-danger-50',
  info: 'text-info-600 bg-info-50',
  neutral: 'text-neutral-900 bg-neutral-100',
} satisfies Record<BreadcrumbColor, string>

export const pathVariants = {
  filled: {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm border-transparent',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 shadow-sm border-transparent',
    success: 'bg-success-500 text-white hover:bg-success-600 shadow-sm border-transparent',
    warning: 'bg-warning-500 text-white hover:bg-warning-600 shadow-sm border-transparent',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 shadow-sm border-transparent',
    info: 'bg-info-500 text-white hover:bg-info-600 shadow-sm border-transparent',
    neutral: 'bg-neutral-800 text-white hover:bg-neutral-900 shadow-sm border-transparent',
  },
  outlined: {
    primary: 'bg-transparent border-primary-500 text-primary-600 hover:bg-primary-50',
    secondary: 'bg-transparent border-secondary-500 text-secondary-600 hover:bg-secondary-50',
    success: 'bg-transparent border-success-500 text-success-600 hover:bg-success-50',
    warning: 'bg-transparent border-warning-500 text-warning-600 hover:bg-warning-50',
    danger: 'bg-transparent border-danger-500 text-danger-600 hover:bg-danger-50',
    info: 'bg-transparent border-info-500 text-info-600 hover:bg-info-50',
    neutral: 'bg-transparent border-neutral-300 text-neutral-700 hover:bg-neutral-50',
  },
  soft: {
    primary: 'bg-primary-50 text-primary-600 hover:bg-primary-100 border-transparent',
    secondary: 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100 border-transparent',
    success: 'bg-success-50 text-success-600 hover:bg-success-100 border-transparent',
    warning: 'bg-warning-50 text-warning-600 hover:bg-warning-100 border-transparent',
    danger: 'bg-danger-50 text-danger-600 hover:bg-danger-100 border-transparent',
    info: 'bg-info-50 text-info-600 hover:bg-info-100 border-transparent',
    neutral: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-transparent',
  },
  text: {
    primary: 'bg-transparent text-neutral-500 hover:bg-primary-50 hover:text-primary-700 border-transparent',
    secondary: 'bg-transparent text-neutral-500 hover:bg-secondary-50 hover:text-secondary-700 border-transparent',
    success: 'bg-transparent text-neutral-500 hover:bg-success-50 hover:text-success-700 border-transparent',
    warning: 'bg-transparent text-neutral-500 hover:bg-warning-50 hover:text-warning-700 border-transparent',
    danger: 'bg-transparent text-neutral-500 hover:bg-danger-50 hover:text-danger-700 border-transparent',
    info: 'bg-transparent text-neutral-500 hover:bg-info-50 hover:text-info-700 border-transparent',
    neutral: 'bg-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800 border-transparent',
  },
  line: {
    primary: 'relative bg-transparent text-neutral-500 hover:text-primary-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary-600 after:transition-all after:duration-300 group-hover:after:w-full border-transparent rounded-none',
    secondary: 'relative bg-transparent text-neutral-500 hover:text-secondary-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-secondary-600 after:transition-all after:duration-300 group-hover:after:w-full border-transparent rounded-none',
    success: 'relative bg-transparent text-neutral-500 hover:text-success-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-success-600 after:transition-all after:duration-300 group-hover:after:w-full border-transparent rounded-none',
    warning: 'relative bg-transparent text-neutral-500 hover:text-warning-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-warning-600 after:transition-all after:duration-300 group-hover:after:w-full border-transparent rounded-none',
    danger: 'relative bg-transparent text-neutral-500 hover:text-danger-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-danger-600 after:transition-all after:duration-300 group-hover:after:w-full border-transparent rounded-none',
    info: 'relative bg-transparent text-neutral-500 hover:text-info-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-info-600 after:transition-all after:duration-300 group-hover:after:w-full border-transparent rounded-none',
    neutral: 'relative bg-transparent text-neutral-500 hover:text-neutral-800 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-neutral-800 after:transition-all after:duration-300 group-hover:after:w-full border-transparent rounded-none',
  }
} satisfies Record<BreadcrumbVariant, Record<BreadcrumbColor, string>>

export const activeIconSizes = {
  xxs: 'p-1.5',
  xs: 'p-2',
  sm: 'p-2',
  md: 'p-2.5',
  lg: 'p-3',
  xl: 'p-3.5',
} satisfies Record<BreadcrumbSize, string>

export const activeLabelSizes = {
  xxs: 'text-sm',
  xs: 'text-base',
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
} satisfies Record<BreadcrumbSize, string>

export const activeSubtitleSizes = {
  xxs: 'text-[8px]',
  xs: 'text-[9px]',
  sm: 'text-[10px]',
  md: 'text-[11px]',
  lg: 'text-xs',
  xl: 'text-sm',
} satisfies Record<BreadcrumbSize, string>

export const pathSizes = {
  xxs: 'px-1.5 py-1 text-[9px] gap-1',
  xs: 'px-2 py-1 text-[10px] gap-1',
  sm: 'px-2.5 py-1.5 text-[11px] gap-1.5',
  md: 'px-3 py-2 text-xs gap-1.5',
  lg: 'px-4 py-2.5 text-sm gap-2',
  xl: 'px-5 py-3 text-base gap-2',
} satisfies Record<BreadcrumbSize, string>
