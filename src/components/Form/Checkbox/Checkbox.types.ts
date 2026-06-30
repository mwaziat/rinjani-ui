import type React from 'react'
import type { BaseFormProps, SelectOption } from '../types'

export interface CheckboxProps extends Omit<BaseFormProps, 'label' | 'variant'> {
  label?: React.ReactNode
  options: SelectOption[]
  values: (string | number)[]
  onChange: (values: (string | number)[]) => void
  name?: string
  orientation?: 'row' | 'col'
  showOptionLabel?: boolean
  groupAriaLabel?: string
  disabled?: boolean
  readOnly?: boolean
}
