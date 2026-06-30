import type React from 'react'
import type { BaseFormProps, SelectOption } from '../types'

export interface CheckboxProps extends Omit<BaseFormProps, 'label' | 'variant'> {
  /** The main title or question displayed above the checkbox group. */
  label?: React.ReactNode
  /** 
   * An array of options to be rendered as checkboxes.
   * Each option requires at least a `label` and a `value`.
   */
  options: SelectOption[]
  /** 
   * An array of the currently selected values.
   * This component is controlled, meaning it relies on this state to show checked status.
   */
  values: (string | number)[]
  /** 
   * Callback fired whenever a checkbox is toggled.
   * Returns a new array containing all currently selected values.
   */
  onChange: (values: (string | number)[]) => void
  /** The HTML `name` attribute applied to all underlying checkbox inputs (useful for native form submissions). */
  name?: string
  /** 
   * Determines whether the checkboxes are stacked vertically or side-by-side. 
   * @default "col" 
   */
  orientation?: 'row' | 'col'
  /** 
   * If false, hides the text label next to each checkbox box (useful for icon-only usage).
   * @default true
   */
  showOptionLabel?: boolean
  /** Accessible label for the entire group (useful for screen readers if `label` is omitted). */
  groupAriaLabel?: string
  /** 
   * If true, disables the entire checkbox group, making it unclickable. 
   * Individual options can also be disabled via the `options` array.
   * @default false
   */
  disabled?: boolean
  /** 
   * If true, the user can see the checked state but cannot interact with or change it.
   * @default false 
   */
  readOnly?: boolean
}
