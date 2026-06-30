import React from 'react'

/**
 * Visual styles available for the badges.
 * - `filled`: Solid colored background. Best for strong emphasis.
 * - `outlined`: Transparent background with colored border. Best for subtle emphasis.
 * - `soft`: Light tinted background with colored text. Good for general tags.
 * - `text`: No background and no border. Minimal visual footprint.
 */
export type BadgeVariant = 'filled' | 'outlined' | 'soft' | 'text'

/**
 * Size constraints for the badges.
 * Controls the padding, font size, and overall height of the badge.
 */
export type BadgeSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Theme colors derived from the standard Rinjani UI color palette.
 */
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style variant of the badge.
   * @default "soft"
   */
  variant?: BadgeVariant
  /**
   * The size of the badge.
   * @default "sm"
   */
  size?: BadgeSize
  /**
   * The color theme applied to the badge.
   * @default "primary"
   */
  color?: BadgeColor
  /**
   * Element placed before the badge text (typically a small Icon).
   */
  leftIcon?: React.ReactNode
  /**
   * Element placed after the badge text (typically a small Icon).
   */
  rightIcon?: React.ReactNode
  /**
   * If true, applies fully rounded corners (pill shape).
   * @default false
   */
  isPill?: boolean
}
