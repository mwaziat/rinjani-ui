import type { ReactNode } from 'react'

/**
 * Defines which edge of the screen the drawer will slide in from.
 */
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'

/**
 * Determines the width (or height if position is top/bottom) of the drawer.
 * Supports absolute t-shirt sizes or relative percentage breakpoints.
 */
export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 'full'

export interface DrawerProps {
  /** 
   * Controls whether the drawer is currently visible on screen. 
   */
  isOpen: boolean
  /** 
   * Callback fired when the user attempts to close the drawer 
   * (e.g., clicking the backdrop or pressing the Escape key).
   */
  onClose: () => void
  /** 
   * The content to be rendered inside the drawer.
   * Typically composed of Drawer.Header, Drawer.Content, and Drawer.Footer.
   */
  children: ReactNode
  /** 
   * The edge from which the drawer will animate in.
   * @default "right"
   */
  position?: DrawerPosition
  /** 
   * The size constraints of the drawer.
   * @default "md"
   */
  size?: DrawerSize
  /** 
   * Additional CSS classes to apply to the drawer panel container.
   */
  className?: string
}

export interface DrawerHeaderProps {
  /** Main heading text for the drawer. */
  title: string
  /** Secondary context text displayed below the title. */
  subtitle?: string
  /** 
   * Callback fired when the default close icon button (X) is clicked.
   */
  onClose: () => void
}

export interface DrawerContentProps {
  /** The primary scrollable body content of the drawer. */
  children: ReactNode
  /** Additional CSS classes for the content area. */
  className?: string
}

export interface DrawerFooterProps {
  /** Content pinned to the bottom of the drawer, typically action buttons. */
  children: ReactNode
  /** Additional CSS classes for the footer area. */
  className?: string
}
