import type React from 'react'
import type { BaseFormProps, SelectOption } from '../types'

export interface RadioProps extends Omit<BaseFormProps, 'label' | 'variant'> {
  /** The main title or question displayed above the radio group. */
  label?: React.ReactNode
  /** 
   * An array of options to be rendered as radio buttons.
   * Each option requires at least a `label` and a `value`.
   */
  options: SelectOption[]
  /** 
   * The currently selected value.
   * This component is controlled, meaning it relies on this state to show selected status.
   */
  value?: string | number
  /** 
   * Callback fired whenever a radio button is selected.
   * Returns the value of the newly selected option.
   */
  onChange: (value: string | number) => void
  /** The HTML `name` attribute applied to all underlying radio inputs. If omitted, a random ID is generated. */
  name?: string
  /** 
   * Determines whether the radio buttons are stacked vertically or side-by-side. 
   * @default "col" 
   */
  orientation?: 'row' | 'col'
  /**
   * If false, hides the text label next to each radio dot.
   * @default true
   */
  showOptionLabel?: boolean
  appearance?: 'default' | 'card'
  /** Accessible label for the entire group (useful for screen readers if `label` is omitted). */
  groupAriaLabel?: string
  /** 
   * If true, disables the entire radio group, making it unclickable. 
   * @default false
   */
  disabled?: boolean
  /** 
   * If true, the user can see the selected state but cannot interact with or change it.
   * @default false 
   */
  readOnly?: boolean
}
