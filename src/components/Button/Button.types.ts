import React from 'react'

export type ButtonVariant = 'solid' | 'outline' | 'surface' | 'subtle'

export type ButtonColor =
  | 'gray' | 'red' | 'green' | 'blue'
  | 'teal' | 'pink' | 'purple' | 'cyan'
  | 'orange' | 'yellow' | 'indigo'

export type ButtonSize =
  | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    color?: ButtonColor
    variant?: ButtonVariant
    size?: ButtonSize
    className?: string
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    isLoading?: boolean
    loadingIndicator?: React.ReactNode
  }
