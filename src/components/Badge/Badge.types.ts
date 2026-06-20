import React from 'react'

export type BadgeVariant = 'filled' | 'outlined' | 'soft' | 'text'
export type BadgeSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  color?: BadgeColor
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isPill?: boolean
}
