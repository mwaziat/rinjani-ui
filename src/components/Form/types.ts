import type React from 'react'

export type FormSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type FormVariant = 'filled' | 'outlined' | 'line'
export type FormColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export type SelectPrimitiveValue = string | number

export interface SelectOption {
  label: string
  value: SelectPrimitiveValue
  disabled?: boolean
  data?: unknown
}

export interface ChoiceOption {
  label: string
  value: SelectPrimitiveValue
  disabled?: boolean
}

export interface BaseFormProps {
  size?: FormSize
  variant?: FormVariant
  color?: FormColor
  error?: string
  label?: React.ReactNode
  required?: boolean
  className?: string
}

export type SelectValue = SelectPrimitiveValue | { value: SelectPrimitiveValue; data?: unknown }
export type SelectMultipleValue = SelectValue[]

export type MultiTagValueMode = 'string' | 'object'
export type MultiTagValue = string | { label: string; value: string | number; data?: unknown }
