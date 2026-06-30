import type { ReactNode } from 'react'

/**
 * Pre-defined contextual types for the toast.
 * Influences the default icon and color palette (background/text colors).
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

/**
 * Defines which corner or edge of the screen the toast will animate into and rest at.
 */
export type ToastPlacement = 
  | 'top-right' 
  | 'top-left' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'top-center' 
  | 'bottom-center' 
  | 'top-full' 
  | 'bottom-full'

/**
 * Configuration options provided when invoking a toast imperatively.
 */
export interface ToastOptions {
  /** The main heading text. */
  title?: string
  /** Detailed content or description. */
  message: ReactNode
  /** Contextual type determining icons and colors. @default "default" */
  type?: ToastType
  /** 
   * Time in milliseconds before the toast automatically dismisses itself.
   * If set to 0, the toast will persist until manually closed.
   * @default 3000 
   */
  duration?: number
  /** Where the toast will appear on the screen. @default "bottom-right" */
  placement?: ToastPlacement
  /** Custom icon to override the default type-based icon. */
  icon?: ReactNode
  /** Callback fired when the toast is dismissed (either manually or via timeout). */
  onClose?: () => void
}

/**
 * Internal interface representing an active toast instance in the provider state.
 */
export interface ToastItem extends ToastOptions {
  /** Unique identifier for the toast instance. */
  id: string
}
