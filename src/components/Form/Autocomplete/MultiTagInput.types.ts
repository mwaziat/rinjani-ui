import type React from 'react'
import type { BaseFormProps, MultiTagValue, MultiTagValueMode } from '../types'

export interface MultiTagInputProps extends Omit<BaseFormProps, 'label'> {
  label?: string
  values?: MultiTagValue[]
  onChange: (values: MultiTagValue[]) => void
  placeholder?: string
  floating?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  maxTags?: number
  valueMode?: MultiTagValueMode
  allowDuplicates?: boolean
  disabled?: boolean
  readOnly?: boolean
  id?: string
}
