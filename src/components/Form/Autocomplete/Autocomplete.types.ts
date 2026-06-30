import type React from 'react'
import type { BaseFormProps, SelectOption, SelectValue } from '../types'

export interface AutocompleteProps extends Omit<BaseFormProps, 'label'> {
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
  emptyText?: string
  enableAddItem?: boolean
  addItemLabel?: string
  addItemPlaceholder?: string
  addItemMode?: 'default' | 'custom'
  onAddItem?: (option: SelectOption) => void
  onAddItemClick?: (query: string) => void
  onSearch?: (query: string) => void
}
