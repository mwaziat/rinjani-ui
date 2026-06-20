import type { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export interface CardHeaderProps {
  title?: string
  subtitle?: string
  children?: ReactNode
  className?: string
  icon?: ReactNode
}

export interface CardContentProps {
  children: ReactNode
  className?: string
}

export interface CardFooterProps {
  children: ReactNode
  className?: string
}
