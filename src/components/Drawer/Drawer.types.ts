import type { ReactNode } from 'react'

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 'full'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  position?: DrawerPosition
  size?: DrawerSize
  className?: string
}

export interface DrawerHeaderProps {
  title: string
  subtitle?: string
  onClose: () => void
}

export interface DrawerContentProps {
  children: ReactNode
  className?: string
}

export interface DrawerFooterProps {
  children: ReactNode
  className?: string
}
