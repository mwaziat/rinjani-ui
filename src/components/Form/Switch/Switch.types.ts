import type { ReactNode } from 'react'
import type { FormColor, FormSize } from '../types'

export interface SwitchProps {
  /** 
   * The current toggle state of the switch. 
   * If true, the switch is "on" (active).
   */
  checked: boolean
  /** Callback fired when the user toggles the switch. */
  onChange: (checked: boolean) => void
  /** The text label displayed alongside the switch. */
  label?: ReactNode
  /** The HTML `name` attribute applied to the underlying checkbox input. */
  name?: string
  /** The size of the switch. @default "md" */
  size?: FormSize
  /** The color theme applied when the switch is in the "on" state. @default "primary" */
  color?: FormColor
  /** An error message to display below the switch. */
  error?: string
  /** If true, marks the field as required (often adding an asterisk to the label). */
  required?: boolean
  /** Additional CSS classes for the container. */
  className?: string
  /** If true, disables the switch, making it unclickable. */
  disabled?: boolean
  /** If true, the user can see the state but cannot interact with it. */
  readOnly?: boolean
  /** 
   * Position of the text label relative to the switch toggle. 
   * @default "right"
   */
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right'
}
