import type { ReactNode } from 'react'
import type { FormColor, FormSize } from '../types'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  name?: string
  size?: FormSize
  color?: FormColor
  error?: string
  required?: boolean
  className?: string
  disabled?: boolean
  readOnly?: boolean
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right'
}
