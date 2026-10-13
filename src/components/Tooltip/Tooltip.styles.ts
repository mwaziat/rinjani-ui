import type { CSSProperties } from 'react'
import type { TooltipColor, TooltipPlacement, TooltipSize, TooltipVariant } from './Tooltip.types'

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
  md: 'rounded-lg',
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

const tooltipColorVariables = {
  primary: {
    filled: 'var(--color-primary-600)',
    soft: 'var(--color-primary-50)',
    outlined: 'var(--color-white)',
    border: 'var(--color-primary-500)',
  },
  secondary: {
    filled: 'var(--color-secondary-600)',
    soft: 'var(--color-secondary-50)',
    outlined: 'var(--color-white)',
    border: 'var(--color-secondary-500)',
  },
  success: {
    filled: 'var(--color-success-600)',
    soft: 'var(--color-success-50)',
    outlined: 'var(--color-white)',
    border: 'var(--color-success-500)',
  },
  warning: {
    filled: 'var(--color-warning-600)',
    soft: 'var(--color-warning-50)',
    outlined: 'var(--color-white)',
    border: 'var(--color-warning-500)',
  },
  danger: {
    filled: 'var(--color-danger-600)',
    soft: 'var(--color-danger-50)',
    outlined: 'var(--color-white)',
    border: 'var(--color-danger-500)',
  },
  info: {
    filled: 'var(--color-info-600)',
    soft: 'var(--color-info-50)',
    outlined: 'var(--color-white)',
    border: 'var(--color-info-500)',
  },
  neutral: {
    filled: 'var(--color-neutral-800)',
    soft: 'var(--color-neutral-100)',
    outlined: 'var(--color-white)',
    border: 'var(--color-neutral-300)',
  },
} satisfies Record<TooltipColor, Record<'filled' | 'soft' | 'outlined' | 'border', string>>

export const getTooltipArrowStyle = (
  placement: Exclude<TooltipPlacement, 'auto'>,
  variant: TooltipVariant,
  color: TooltipColor,
  offset: number,
): CSSProperties => {
  const isVerticalPlacement = placement.startsWith('top') || placement.startsWith('bottom')
  const isFilled = variant === 'filled'
  const arrowStyle: CSSProperties = {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: tooltipColorVariables[color][variant],
    borderColor: tooltipColorVariables[color].border,
    borderStyle: 'solid',
    borderWidth: isFilled ? 0 : '1px',
    pointerEvents: 'none',
    ...(isVerticalPlacement
      ? { left: `${offset}px`, transform: 'translateX(-50%) rotate(45deg)' }
      : { top: `${offset}px`, transform: 'translateY(-50%) rotate(45deg)' }),
  }

  if (placement.startsWith('top')) {
    return { ...arrowStyle, bottom: isFilled ? '-4px' : '-5px', ...(isFilled ? {} : { borderTopWidth: 0, borderLeftWidth: 0 }) }
  }

  if (placement.startsWith('bottom')) {
    return { ...arrowStyle, top: isFilled ? '-4px' : '-5px', ...(isFilled ? {} : { borderBottomWidth: 0, borderRightWidth: 0 }) }
  }

  if (placement.startsWith('left')) {
    return { ...arrowStyle, right: isFilled ? '-4px' : '-5px', ...(isFilled ? {} : { borderBottomWidth: 0, borderLeftWidth: 0 }) }
  }

  return { ...arrowStyle, left: isFilled ? '-4px' : '-5px', ...(isFilled ? {} : { borderTopWidth: 0, borderRightWidth: 0 }) }
}
