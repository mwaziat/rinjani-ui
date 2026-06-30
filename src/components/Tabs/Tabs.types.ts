import type { ReactNode } from 'react'

/**
 * Size constraints for the tab triggers.
 * Influences font size, padding, and icon sizing.
 */
export type TabSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Visual styles available for the tab triggers.
 * - `line`: A sleek underline that indicates the active tab.
 * - `filled`: Solid colored background for the active tab.
 * - `soft`: Light tinted background for the active tab.
 * - `outlined`: Bordered active tab with transparent background.
 * - `text`: No background or border, just color changes.
 */
export type TabVariant = 'filled' | 'outlined' | 'soft' | 'text' | 'line'

/**
 * Theme colors derived from the Rinjani UI color palette.
 * Affects the active tab indicator and text color.
 */
export type TabColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/**
 * Determines how the tab triggers are aligned within the tab list container.
 */
export type TabAlign = 'left' | 'center' | 'right' | 'fullWidth'

/**
 * Determines the text alignment inside each individual tab trigger button.
 */
export type TabAlignLabel = 'left' | 'center' | 'right' | 'wrapped-left' | 'wrapped-center' | 'wrapped-right'

/**
 * Defines the layout orientation and positioning of the tab list relative to the tab content.
 */
export type TabPlacement = 'horizontal-top' | 'horizontal-bottom' | 'vertical-left' | 'vertical-right'

export interface TabsProps {
  /** 
   * The `value` of the currently active tab. 
   * This ties `Tabs.Item` values to `Tabs.Content` values.
   */
  activeTab: string
  /** 
   * Callback fired when a user clicks a different tab trigger.
   */
  onChange: (value: string) => void
  /** 
   * Color theme applied to the active tab. 
   * @default "primary"
   */
  color?: TabColor
  /** 
   * Visual variant style of the tabs. 
   * @default "line"
   */
  variant?: TabVariant
  /** 
   * Size of the tabs. 
   * @default "sm"
   */
  size?: TabSize
  /** 
   * Alignment of the tab list items. 
   * @default "left"
   */
  align?: TabAlign
  /** 
   * Alignment of the text within each tab button. 
   * @default "center"
   */
  alignLabel?: TabAlignLabel
  /** 
   * Placement of the tab list relative to the content area. 
   * @default "horizontal-top"
   */
  placement?: TabPlacement
  /** Additional CSS classes for the root container. */
  className?: string
  /** 
   * Typically a composition of `Tabs.List`, `Tabs.Content`, and optionally `Tabs.Footer`.
   */
  children: ReactNode
}

export interface TabsListProps {
  /** Additional CSS classes for the list container. */
  className?: string
  /** 
   * If true, enables horizontal scrolling when tabs exceed container width. 
   * @default true
   */
  scrollable?: boolean
  /** Typically contains `Tabs.Item` components. */
  children: ReactNode
}

export interface TabsItemProps {
  /** 
   * Unique identifier for this tab. 
   * Must match a corresponding `Tabs.Content` value.
   */
  value: string
  /** The text label of the tab. */
  children?: ReactNode
  /** An optional icon rendered alongside the text. */
  icon?: ReactNode
  /** 
   * Position of the icon relative to the text.
   * @default "start"
   */
  iconPosition?: 'start' | 'end' | 'top' | 'bottom'
  /** If true, the tab cannot be clicked or activated. */
  disabled?: boolean
  /** Additional CSS classes for this specific tab button. */
  className?: string
}

export interface TabsContentProps {
  /** 
   * The unique value this content panel is associated with. 
   * Will only be rendered when `activeTab` matches this value.
   */
  value: string
  /** The content to display when this tab is active. */
  children: ReactNode
  /** Additional CSS classes for the content panel. */
  className?: string
}

export interface TabsFooterProps {
  /** Shared footer content rendered below all tab panels. */
  children: ReactNode
  /** Additional CSS classes for the footer area. */
  className?: string
}
