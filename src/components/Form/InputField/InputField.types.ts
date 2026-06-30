import type React from 'react'
import type { BaseFormProps } from '../types'

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size' | 'color' | 'required' | 'className'>, BaseFormProps {
  format?: 'text' | 'currency'
  currency?: string
  locale?: string
  floating?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isPassword?: boolean
  isMultiline?: boolean
  rows?: number
}
