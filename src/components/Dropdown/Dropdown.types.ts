import React from 'react'

/**
 * Theme colors derived from the Rinjani UI color palette.
 * Affects the trigger button and the hover states of dropdown items.
 */
export type DropdownColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/**
 * Size constraints for the trigger button and the dropdown items.
 */
export type DropdownSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Visual styles available for the trigger button.
 */
export type DropdownVariant = 'filled' | 'outlined' | 'soft' | 'text'

/**
 * Determines where the dropdown menu will appear relative to the trigger button.
 * Uses floating-ui conventions. 'auto' will let the browser decide based on available space.
 */
export type DropdownPlacement =
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

export interface DropdownContentPosition {
  top: number
  left: number
  isPositioned: boolean
}

export interface DropdownProps {
  /**
   * The text label displayed on the trigger button.
   */
  label?: string
  /**
   * An optional icon placed before the label on the trigger button.
   */
  icon?: React.ReactNode
  /**
   * The content to be rendered inside the dropdown. 
   * Typically a `Dropdown.List` containing `Dropdown.Item`s.
   */
  children: React.ReactNode
  /**
   * The color theme applied to the trigger button.
   * @default "neutral"
   */
  color?: DropdownColor
  /**
   * The size of the trigger button.
   * @default "sm"
   */
  size?: DropdownSize
  /**
   * The visual style variant of the trigger button.
   * @default "soft"
   */
  variant?: DropdownVariant
  /**
   * The preferred position of the dropdown menu relative to the trigger.
   * @default "bottom-start"
   */
  placement?: DropdownPlacement
  /**
   * If true, displays a small chevron arrow on the trigger button.
   * @default true
   */
  showArrow?: boolean
  /**
   * The distance (in pixels) between the trigger button and the dropdown menu.
   * @default 8
   */
  offset?: number
  /**
   * If true, disables the trigger button and prevents the dropdown from opening.
   * @default false
   */
  disabled?: boolean
  /**
   * Additional CSS classes applied to the trigger button.
   */
  className?: string
  /**
   * Additional CSS classes applied to the dropdown menu container (portal).
   */
  classNameList?: string
  /**
   * Unique identifier for the dropdown component.
   */
  id?: string
  /**
   * If true, rounds the trigger button corners completely into a pill shape.
   * @default false
   */
  isPill?: boolean
}

export interface DropdownListProps {
  /**
   * The items to be rendered inside the dropdown list.
   */
  children: React.ReactNode
  /**
   * Additional CSS classes applied to the list container.
   */
  className?: string
}

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * An optional icon placed before the item's label.
   */
  leftIcon?: React.ReactNode
  /**
   * An optional icon placed after the item's label.
   */
  rightIcon?: React.ReactNode
  /**
   * The color theme applied to the item when hovered or active.
   * Useful for destructive actions (e.g., color="danger").
   */
  color?: DropdownColor
  /**
   * The text or content of the dropdown item.
   */
  children: React.ReactNode
}
