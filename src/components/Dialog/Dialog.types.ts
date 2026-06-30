import type { ReactNode } from 'react'

/**
 * Pre-defined contextual types for the dialog.
 * Influences the default icon and button colors.
 */
export type DialogType = 'success' | 'error' | 'warning' | 'info' | 'confirm' | 'default'

/**
 * Configuration for a custom action button within the dialog.
 */
export interface DialogAction {
  /** Text label displayed on the button. */
  label: string
  /** 
   * Callback executed when the button is clicked. 
   * Receives a `close` function parameter to manually dismiss the dialog.
   */
  onClick?: (close: () => void) => void | Promise<void>
  /** Visual variant of the button. */
  variant?: 'filled' | 'outlined' | 'soft' | 'text'
  /** Color theme of the button. */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  /** Disables user interaction with the button. */
  disabled?: boolean
  /** 
   * If true, the dialog will automatically close immediately after the `onClick` handler resolves. 
   * @default true
   */
  closeAfter?: boolean
}

/**
 * Configuration options provided when invoking a dialog imperatively.
 */
export interface DialogOptions {
  /** The main heading text. */
  title?: string
  /** Detailed content or question for the user. */
  message: ReactNode
  /** Contextual type determining icons and colors. @default "default" */
  type?: DialogType
  /** Custom icon to override the default type-based icon. */
  icon?: ReactNode
  /** If true, renders a cancel button alongside the confirm button. */
  showCancel?: boolean
  /** Text for the cancel button. @default "Cancel" */
  cancelText?: string
  /** Text for the primary confirm button. @default "Confirm" */
  confirmText?: string
  /** Callback fired when the primary confirm button is clicked. */
  onConfirm?: () => void | Promise<void>
  /** Callback fired when the cancel button or backdrop is clicked. */
  onCancel?: () => void
  /** Array of fully custom action buttons to replace the default Confirm/Cancel buttons. */
  actions?: DialogAction[]
  /** 
   * If true, clicking outside the dialog will close it. 
   * @default true 
   */
  closeOnBackdrop?: boolean
}

/**
 * Internal interface representing an active dialog instance in the provider state.
 */
export interface DialogItem extends DialogOptions {
  /** Unique identifier for the dialog instance. */
  id: string
}
