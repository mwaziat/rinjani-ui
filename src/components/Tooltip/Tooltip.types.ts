import type { ReactNode } from 'react'

/**
 * Theme colors derived from the Rinjani UI color palette.
 * Affects the background and text colors of the tooltip bubble.
 */
export type TooltipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/**
 * Size constraints for the tooltip.
 * Influences the padding and font size of the tooltip text.
 */
export type TooltipSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Visual styles available for the tooltip bubble.
 * - `filled`: Solid colored background with white text.
 * - `soft`: Light tinted background with colored text.
 * - `outlined`: Transparent background with a colored border.
 */
export type TooltipVariant = 'filled' | 'outlined' | 'soft'

/**
 * Pre-defined maximum width constraints for the tooltip bubble to prevent it from stretching too far.
 * Also accepts arbitrary strings (e.g., '250px') or raw numbers.
 */
export type TooltipMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | (string & {}) | number

/**
 * Determines where the tooltip will appear relative to the wrapped element.
 * Uses floating-ui conventions. 'auto' will let the browser decide based on available space.
 */
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
  /**
   * The element that triggers the tooltip on hover or focus.
   * This element will be wrapped in a `div` to capture events.
   */
  children: ReactNode
  /**
   * The text or elements to display inside the tooltip bubble.
   */
  content: ReactNode
  /**
   * The color theme applied to the tooltip bubble.
   * @default "neutral"
   */
  color?: TooltipColor
  /**
   * The size of the tooltip.
   * @default "sm"
   */
  size?: TooltipSize
  /**
   * The visual style variant of the tooltip bubble.
   * @default "filled"
   */
  variant?: TooltipVariant
  /**
   * The preferred position of the tooltip relative to the trigger.
   * @default "top"
   */
  placement?: TooltipPlacement
  /**
   * If true, displays a small directional arrow pointing towards the trigger.
   * @default true
   */
  showArrow?: boolean
  /**
   * The distance (in pixels) between the trigger element and the tooltip.
   * @default 8
   */
  offset?: number
  /**
   * Additional CSS classes applied to the tooltip bubble container.
   */
  className?: string
  /**
   * If true, applies fully rounded corners (pill shape) to the tooltip bubble.
   * Best used for short, single-line text.
   * @default false
   */
  isPill?: boolean
  /**
   * Delay in milliseconds before the tooltip appears after hovering.
   * @default 200
   */
  delay?: number
  /**
   * The maximum width of the tooltip bubble before text wraps to a new line.
   * @default "sm"
   */
  maxWidth?: TooltipMaxWidth
}
