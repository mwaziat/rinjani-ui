import type { ReactNode } from 'react'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalScrollMode = 'dialog' | 'content'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: ModalSize
  scrollMode?: ModalScrollMode
  closeOnOutsideClick?: boolean
  className?: string
}

export interface ModalHeaderProps {
  title: string
  subtitle?: string
  onClose?: () => void
}

export interface ModalContentProps {
  children: ReactNode
  className?: string
}

export interface ModalFooterProps {
  children: ReactNode
  className?: string
}
