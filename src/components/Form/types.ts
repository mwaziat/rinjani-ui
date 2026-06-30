import type React from 'react'

/**
 * Standard sizes for form components.
 * Influences height, padding, and font size.
 */
export type FormSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Visual styles available for form inputs (like InputField, Select, Autocomplete).
 * - `filled`: Solid gray/colored background.
 * - `outlined`: Transparent background with a distinct border.
 * - `line`: Minimalist design with only a bottom border.
 */
export type FormVariant = 'filled' | 'outlined' | 'line'

/**
 * Theme colors derived from the Rinjani UI color palette.
 * Usually affects focus rings, active states, and checked states (e.g., Checkbox).
 */
export type FormColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export type SelectPrimitiveValue = string | number

/**
 * Represents an individual option in a Select or Autocomplete component.
 */
export interface SelectOption {
  /** The text displayed to the user. */
  label: string
  /** The underlying value used in form state/submission. */
  value: SelectPrimitiveValue
  /** If true, the user cannot select this option. */
  disabled?: boolean
  /** Additional metadata attached to the option. */
  data?: unknown
}

/**
 * Represents an individual option in a Radio group or Choice selection.
 */
export interface ChoiceOption {
  /** The text displayed next to the radio/checkbox. */
  label: string
  /** The underlying value of the choice. */
  value: SelectPrimitiveValue
  /** If true, the choice cannot be selected. */
  disabled?: boolean
}

/**
 * Common properties shared across most form components (Input, Select, Autocomplete).
 */
export interface BaseFormProps {
  /** The size of the component. @default "sm" */
  size?: FormSize
  /** The visual variant style. @default "outlined" */
  variant?: FormVariant
  /** The color theme. @default "primary" */
  color?: FormColor
  /** 
   * An error message to display below the input. 
   * Passing this will also visually style the input in an error state.
   */
  error?: string
  /** The label text displayed above or next to the input. */
  label?: React.ReactNode
  /** If true, marks the field as required (often adding an asterisk). */
  required?: boolean
  /** Additional CSS classes for the container. */
  className?: string
}

export type SelectValue = SelectPrimitiveValue | { value: SelectPrimitiveValue; data?: unknown }
export type SelectMultipleValue = SelectValue[]

export type MultiTagValueMode = 'string' | 'object'
export type MultiTagValue = string | { label: string; value: string | number; data?: unknown }
