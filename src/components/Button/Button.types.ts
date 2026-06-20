import React from 'react'

export type ButtonVariant = 'filled' | 'outlined' | 'soft' | 'text'
export type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  isPill?: boolean
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  isLoading?: boolean
  icon?: React.ReactNode
  isPill?: boolean
}
