import type { ReactNode } from 'react'

/**
 * Theme colors derived from the Rinjani UI color palette.
 * Affects the background, text, and icon colors of the Alert.
 */
export type AlertColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/**
 * Visual styles available for the Alert.
 * - `filled`: Solid colored background with white text. High emphasis.
 * - `soft`: Light tinted background with colored text. Moderate emphasis.
 * - `outlined`: Transparent background with colored border. Low emphasis.
 */
export type AlertVariant = 'filled' | 'soft' | 'outlined'

/**
 * Determines the interactive button rendered on the top right of the Alert.
 * - `close`: Completely removes the alert from the DOM.
 * - `minimize`: Collapses the alert to only show its title.
 */
export type AlertAction = 'close' | 'minimize'

export interface AlertProps {
  /**
   * The visual style variant of the alert.
   * @default "soft"
   */
  variant?: AlertVariant
  /**
   * The color theme representing the status or intent of the alert.
   * @default "info"
   */
  color?: AlertColor
  /**
   * The main heading text for the alert.
   */
  title?: string
  /**
   * Detailed message or description.
   * Renders below the title.
   */
  message?: ReactNode
  /**
   * Additional content rendered inside the alert body.
   */
  children?: ReactNode
  /**
   * A custom icon to replace the default status icon.
   */
  icon?: ReactNode
  /**
   * Determines if the status icon (default or custom) should be displayed.
   * @default true
   */
  showIcon?: boolean
  /**
   * Type of action button displayed on the right edge.
   * If omitted but `onClose` is provided, defaults to 'close'.
   */
  action?: AlertAction
  /**
   * Time in milliseconds before the alert automatically closes.
   * Displays a shrinking progress bar at the bottom.
   */
  duration?: number
  /**
   * Callback fired when the alert is closed (either manually or via duration timeout).
   */
  onClose?: () => void
  /**
   * Additional CSS classes to apply to the root container.
   */
  className?: string
}
