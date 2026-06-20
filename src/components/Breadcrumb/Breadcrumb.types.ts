import type { ReactNode } from 'react'

export type BreadcrumbColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type BreadcrumbVariant = 'filled' | 'outlined' | 'soft' | 'text' | 'line'
export type BreadcrumbSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface BreadcrumbPath {
  label: string
  href: string
  icon?: ReactNode
}

export interface BreadcrumbProps {
  activeLabel: string
  activeIcon?: ReactNode
  paths: BreadcrumbPath[]
  color?: BreadcrumbColor
  variant?: BreadcrumbVariant
  size?: BreadcrumbSize
  className?: string
  contained?: boolean
  separator?: ReactNode
}
