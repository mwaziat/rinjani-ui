import React from 'react'

export type DropdownColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type DropdownSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DropdownVariant = 'filled' | 'outlined' | 'soft' | 'text'

export type DropdownPlacement =
  | 'auto'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export interface DropdownContentPosition {
  top: number
  left: number
  isPositioned: boolean
}

export interface DropdownProps {
  label?: string
  icon?: React.ReactNode
  children: React.ReactNode
  color?: DropdownColor
  size?: DropdownSize
  variant?: DropdownVariant
  placement?: DropdownPlacement
  showArrow?: boolean
  offset?: number
  disabled?: boolean
  className?: string
  classNameList?: string
  id?: string
  isPill?: boolean
}

export interface DropdownListProps {
  children: React.ReactNode
  className?: string
}

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  color?: DropdownColor
  children: React.ReactNode
}
