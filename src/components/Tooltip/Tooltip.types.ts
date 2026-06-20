import type { ReactNode } from 'react'

export type TooltipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type TooltipSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TooltipVariant = 'filled' | 'outlined' | 'soft'
export type TooltipMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | (string & {}) | number

export type TooltipPlacement =
  | 'auto'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export interface ContentPosition {
  top: number
  left: number
  isPositioned: boolean
  currentPlacement: TooltipPlacement
}

export interface TooltipProps {
  children: ReactNode
  content: ReactNode
  color?: TooltipColor
  size?: TooltipSize
  variant?: TooltipVariant
  placement?: TooltipPlacement
  showArrow?: boolean
  offset?: number
  className?: string
  isPill?: boolean
  delay?: number
  maxWidth?: TooltipMaxWidth
}
