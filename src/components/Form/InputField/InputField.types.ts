import type React from 'react'
import type { BaseFormProps } from '../types'

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size' | 'color' | 'required' | 'className'>, BaseFormProps {
  /** 
   * Special formatting behavior applied to the input.
   * If "currency", it will automatically format numbers with separators (e.g., 1,000.00).
   * @default "text"
   */
  format?: 'text' | 'currency'
  /** The currency symbol to display when `format` is "currency" (e.g., "USD", "IDR"). */
  currency?: string
  /** The locale used for formatting the currency (e.g., "id-ID", "en-US"). */
  locale?: string
  /** 
   * If true, enables the floating label design where the label starts inside the input 
   * and floats to the top edge when focused or filled.
   * @default false
   */
  floating?: boolean
  /** An optional icon rendered inside the input box on the left side. */
  leftIcon?: React.ReactNode
  /** An optional icon rendered inside the input box on the right side. */
  rightIcon?: React.ReactNode
  /** 
   * If true, treats the input as a password field and adds a built-in toggle button 
   * to show/hide the password text.
   * @default false
   */
  isPassword?: boolean
  /** 
   * If true, renders a `<textarea>` instead of a standard `<input>`.
   * @default false
   */
  isMultiline?: boolean
  /** 
   * Number of visible text lines when `isMultiline` is true.
   * @default 3
   */
  rows?: number
}
