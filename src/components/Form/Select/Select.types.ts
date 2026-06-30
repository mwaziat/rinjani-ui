import type React from 'react'
import type { BaseFormProps, SelectOption, SelectValue, SelectMultipleValue } from '../types'

export interface SelectProps extends Omit<BaseFormProps, 'label' | 'className'> {
  label?: string
  options: SelectOption[]
  value?: SelectValue
  onChange: (value: SelectValue) => void
  placeholder?: string
  floating?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isClearable?: boolean
  disabled?: boolean
  readOnly?: boolean
  id?: string
  className?: string
}

export interface SelectMultipleProps extends Omit<BaseFormProps, 'label' | 'className'> {
  label?: string
  options: SelectOption[]
  value?: SelectMultipleValue
  onChange: (value: SelectMultipleValue) => void
  placeholder?: string
  floating?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isClearable?: boolean
  disabled?: boolean
  readOnly?: boolean
  id?: string
  emptyText?: string
  className?: string
}
