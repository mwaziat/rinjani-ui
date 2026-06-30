import React from 'react'

/**
 * Visual styles available for the buttons.
 * - `filled`: Solid background. Best for primary actions.
 * - `outlined`: Transparent background with a border. Best for secondary actions.
 * - `soft`: Light background with colored text. Good for subtle emphasis.
 * - `text`: No background and no border. Ideal for tertiary actions or inline buttons.
 */
export type ButtonVariant = 'filled' | 'outlined' | 'soft' | 'text'

/**
 * Size constraints for the buttons.
 * Represents different scaling ratios for padding, font size, and internal spacing.
 */
export type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Theme colors derived from the standard Rinjani UI color palette.
 */
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button.
   * @default "filled"
   */
  variant?: ButtonVariant
  /**
   * The size of the button affecting padding, font-size, and icon scaling.
   * @default "sm"
   */
  size?: ButtonSize
  /**
   * The color theme applied to the button variant.
   * @default "primary"
   */
  color?: ButtonColor
  /**
   * Shows a loading spinner inside the button and disables user interactions.
   * @default false
   */
  isLoading?: boolean
  /**
   * Element placed before the button text (typically an Icon).
   */
  leftIcon?: React.ReactNode
  /**
   * Element placed after the button text (typically an Icon).
   */
  rightIcon?: React.ReactNode
  /**
   * If true, the button will expand to fill 100% of its parent's width.
   * @default false
   */
  fullWidth?: boolean
  /**
   * If true, applies fully rounded corners (pill shape) to the button.
   * @default false
   */
  isPill?: boolean
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button.
   * @default "filled"
   */
  variant?: ButtonVariant
  /**
   * The size of the button affecting padding and icon scaling.
   * @default "sm"
   */
  size?: ButtonSize
  /**
   * The color theme applied to the button variant.
   * @default "primary"
   */
  color?: ButtonColor
  /**
   * Shows a loading spinner and disables user interaction.
   * @default false
   */
  isLoading?: boolean
  /**
   * The icon element to render inside the button.
   */
  icon?: React.ReactNode
  /**
   * If true, applies fully rounded corners (resulting in a circular button instead of a rounded square).
   * @default false
   */
  isPill?: boolean
}
