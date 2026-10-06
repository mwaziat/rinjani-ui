import type { ReactNode } from 'react'

/**
 * Theme colors derived from the standard Rinjani UI color palette.
 * Affects the active breadcrumb item and hover states of links.
 */
export type BreadcrumbColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/**
 * Visual styles available for the breadcrumb container (if `contained` is true).
 * - `filled`: Solid colored background block.
 * - `outlined`: Transparent background with a border.
 * - `soft`: Light tinted background block.
 * - `text`: No background (default behavior for uncontained breadcrumbs).
 * - `line`: A bottom border line spanning the width.
 */
export type BreadcrumbVariant = 'filled' | 'outlined' | 'soft' | 'text' | 'line'

/**
 * Size constraints for the breadcrumb text and icons.
 */
export type BreadcrumbSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Horizontal distribution of the breadcrumb header and trail.
 */
export type BreadcrumbJustify = 'between' | 'start' | 'end'

/**
 * Defines a single historical path node in the breadcrumb trail.
 */
export interface BreadcrumbPath {
  /** The clickable text label for this path. */
  label: string
  /** The URL destination when this path is clicked. */
  href: string
  /** An optional icon rendered beside the label. */
  icon?: ReactNode
}

export interface BreadcrumbProps {
  /**
   * The text label representing the current active page (the final unclickable node).
   */
  activeLabel: string
  /**
   * An optional icon rendered beside the active label.
   */
  activeIcon?: ReactNode
  /**
   * Array of historical path nodes leading up to the current page.
   */
  paths: BreadcrumbPath[]
  /**
   * The color theme applied to the active item and hover effects.
   * @default "primary"
   */
  color?: BreadcrumbColor
  /**
   * The visual style variant of the breadcrumb.
   * Note: Only clearly visible if `contained` is set to true.
   * @default "text"
   */
  variant?: BreadcrumbVariant
  /**
   * The size of the breadcrumb affecting font-size and spacing.
   * @default "sm"
   */
  size?: BreadcrumbSize
  /**
   * Controls how the header and breadcrumb trail are distributed horizontally.
   * @default "between"
   */
  justify?: BreadcrumbJustify
  /**
   * Additional CSS classes to apply to the root container.
   */
  className?: string
  /**
   * If true, wraps the breadcrumb trail inside a styled container block 
   * based on the chosen `variant`.
   * @default false
   */
  contained?: boolean
  /**
   * Text or custom content shown below the active label. Pass null to hide it.
   * @default "Current Position"
   */
  currentPosition?: ReactNode
  /**
   * Optional content rendered after the breadcrumb trail on its right side.
   */
  rightContent?: ReactNode
  /**
   * A custom element to use as the separator between nodes.
   * Defaults to a subtle slash or chevron icon.
   */
  separator?: ReactNode
}
