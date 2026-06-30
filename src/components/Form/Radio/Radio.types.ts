import type React from 'react'
import type { BaseFormProps, SelectOption } from '../types'

export interface RadioProps extends Omit<BaseFormProps, 'label' | 'variant'> {
  label?: React.ReactNode
  options: SelectOption[]
  value?: string | number
  onChange: (value: string | number) => void
  name?: string
  orientation?: 'row' | 'col'
  showOptionLabel?: boolean
  groupAriaLabel?: string
  disabled?: boolean
  readOnly?: boolean
}
