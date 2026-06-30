import type React from 'react'
import type { BaseFormProps, SelectOption, SelectMultipleValue } from '../types'

export interface AutocompleteMultipleProps extends Omit<BaseFormProps, 'label'> {
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
  enableAddItem?: boolean
  addItemLabel?: string
  addItemPlaceholder?: string
  addItemMode?: 'default' | 'custom'
  onAddItem?: (option: SelectOption) => void
  onAddItemClick?: (query: string) => void
  onSearch?: (query: string) => void
}
