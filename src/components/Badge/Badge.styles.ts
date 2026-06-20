import type { BadgeSize, BadgeVariant, BadgeColor } from './Badge.types'

export const baseStyles = "inline-flex items-center justify-center font-semibold tracking-wide whitespace-nowrap transition-colors"

export const sizes: Record<BadgeSize, string> = {
  xxs: "px-1.5 py-0.5 text-[9px] gap-1",
  xs: "px-2 py-0.5 text-[10px] gap-1",
  sm: "px-2.5 py-1 text-xs gap-1.5",
  md: "px-3 py-1.5 text-sm gap-1.5",
  lg: "px-3.5 py-2 text-base gap-2",
  xl: "px-4 py-2 text-lg gap-2"
}

export const radiusBySize: Record<BadgeSize, string> = {
  xxs: 'rounded',
  xs: 'rounded-md',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
}

export const variants: Record<BadgeVariant, Record<BadgeColor, string>> = {
  filled: {
    primary: "bg-primary-500 text-white shadow-sm",
    secondary: "bg-secondary-500 text-white shadow-sm",
    success: "bg-success-500 text-white shadow-sm",
    warning: "bg-warning-500 text-white shadow-sm",
    danger: "bg-danger-500 text-white shadow-sm",
    info: "bg-info-500 text-white shadow-sm",
    neutral: "bg-neutral-800 text-white shadow-sm",
  },
  outlined: {
    primary: "border border-primary-500 text-primary-600",
    secondary: "border border-secondary-500 text-secondary-600",
    success: "border border-success-500 text-success-600",
    warning: "border border-warning-500 text-warning-600",
    danger: "border border-danger-500 text-danger-600",
    info: "border border-info-500 text-info-600",
    neutral: "border border-neutral-300 text-neutral-700",
  },
  soft: {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    success: "bg-success-50 text-success-600",
    warning: "bg-warning-50 text-warning-600",
    danger: "bg-danger-50 text-danger-600",
    info: "bg-info-50 text-info-600",
    neutral: "bg-neutral-100 text-neutral-700",
  },
  text: {
    primary: "bg-transparent text-primary-600",
    secondary: "bg-transparent text-secondary-600",
    success: "bg-transparent text-success-600",
    warning: "bg-transparent text-warning-600",
    danger: "bg-transparent text-danger-600",
    info: "bg-transparent text-info-600",
    neutral: "bg-transparent text-neutral-600",
  }
}
