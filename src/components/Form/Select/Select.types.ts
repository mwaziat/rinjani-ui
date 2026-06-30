import type React from 'react'
import type { BaseFormProps, SelectOption, SelectValue, SelectMultipleValue } from '../types'

export interface SelectProps extends Omit<BaseFormProps, 'label' | 'className'> {
  /** The text label displayed above or inside the select (if floating). */
  label?: string
  /** 
   * An array of options available for selection. 
   * Each option should at least have a `label` and a `value`. 
   */
  options: SelectOption[]
  /** 
   * The currently selected value.
   * Can be a simple string/number or an object if you need to retain metadata.
   */
  value?: SelectValue
  /** 
   * Callback fired when the user selects a new option.
   */
  onChange: (value: SelectValue) => void
  /** Placeholder text shown when no option is currently selected. */
  placeholder?: string
  /** 
   * If true, enables the floating label design where the label shrinks and moves to the top edge. 
   * @default false
   */
  floating?: boolean
  /** Optional icon to render on the left side of the select box. */
  leftIcon?: React.ReactNode
  /** Optional icon to render on the right side (overriding the default dropdown arrow if necessary). */
  rightIcon?: React.ReactNode
  /** 
   * If true, displays a small 'X' icon allowing the user to clear their selection.
   * @default false
   */
  isClearable?: boolean
  /** Disables the entire select component. */
  disabled?: boolean
  /** Makes the component read-only (visually normal but unchangeable). */
  readOnly?: boolean
  /** Unique HTML id attribute for the underlying element. */
  id?: string
  /** Additional CSS classes for the container. */
  className?: string
}

export interface SelectMultipleProps extends Omit<BaseFormProps, 'label' | 'className'> {
  /** The text label displayed above or inside the select (if floating). */
  label?: string
  /** 
   * An array of options available for selection. 
   */
  options: SelectOption[]
  /** 
   * An array of the currently selected values.
   */
  value?: SelectMultipleValue
  /** 
   * Callback fired when the user adds or removes an option.
   */
  onChange: (value: SelectMultipleValue) => void
  /** Placeholder text shown when no options are selected. */
  placeholder?: string
  /** 
   * If true, enables the floating label design. 
   * @default false
   */
  floating?: boolean
  /** Optional icon to render on the left side. */
  leftIcon?: React.ReactNode
  /** Optional icon to render on the right side. */
  rightIcon?: React.ReactNode
  /** 
   * If true, displays a small 'X' icon allowing the user to clear all selections at once.
   * @default false
   */
  isClearable?: boolean
  /** Disables the entire select component. */
  disabled?: boolean
  /** Makes the component read-only. */
  readOnly?: boolean
  /** Unique HTML id attribute. */
  id?: string
  /** Text to display inside the dropdown menu if there are no options available. */
  emptyText?: string
  /** Additional CSS classes for the container. */
  className?: string
}
