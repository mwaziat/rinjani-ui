import type { TooltipColor, TooltipSize, TooltipVariant } from './Tooltip.types'

export const baseTooltipStyles = "fixed z-[160] whitespace-nowrap font-medium transition-opacity duration-200 animate-in fade-in zoom-in-95"

export const maxWidths = {
  sm: '200px',
  md: '300px',
  lg: '400px',
  xl: '500px',
  '2xl': '600px',
} as Record<string, string>

export const sizes = {
  xxs: "px-1.5 py-0.5 text-[10px]",
  xs: "px-2 py-1 text-[11px]",
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2.5 text-base",
  xl: "px-5 py-3 text-lg"
} satisfies Record<TooltipSize, string>

export const radiusBySize = {
  xxs: 'rounded',
  xs: 'rounded',
  sm: 'rounded-md',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
} satisfies Record<TooltipSize, string>

export const variants = {
  filled: {
    primary: "bg-primary-600 text-white",
    secondary: "bg-secondary-600 text-white",
    success: "bg-success-600 text-white",
    warning: "bg-warning-600 text-white",
    danger: "bg-danger-600 text-white",
    info: "bg-info-600 text-white",
    neutral: "bg-neutral-800 text-white",
  },
  outlined: {
    primary: "bg-white border border-primary-500 text-primary-700 shadow-sm",
    secondary: "bg-white border border-secondary-500 text-secondary-700 shadow-sm",
    success: "bg-white border border-success-500 text-success-700 shadow-sm",
    warning: "bg-white border border-warning-500 text-warning-700 shadow-sm",
    danger: "bg-white border border-danger-500 text-danger-700 shadow-sm",
    info: "bg-white border border-info-500 text-info-700 shadow-sm",
    neutral: "bg-white border border-neutral-300 text-neutral-700 shadow-sm",
  },
  soft: {
    primary: "bg-primary-50 border border-primary-100 text-primary-700 shadow-sm",
    secondary: "bg-secondary-50 border border-secondary-100 text-secondary-700 shadow-sm",
    success: "bg-success-50 border border-success-100 text-success-700 shadow-sm",
    warning: "bg-warning-50 border border-warning-100 text-warning-700 shadow-sm",
    danger: "bg-danger-50 border border-danger-100 text-danger-700 shadow-sm",
    info: "bg-info-50 border border-info-100 text-info-700 shadow-sm",
    neutral: "bg-neutral-100 border border-neutral-200 text-neutral-800 shadow-sm",
  }
} satisfies Record<TooltipVariant, Record<TooltipColor, string>>
