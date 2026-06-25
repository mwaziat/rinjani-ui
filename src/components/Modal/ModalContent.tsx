import React from 'react'
import type { ModalContentProps } from './Modal.types'

export const ModalContent: React.FC<ModalContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex-1 overflow-y-auto p-6 text-neutral-600 scrollbar-thin scrollbar-thumb-neutral-200 ${className}`}>
      {children}
    </div>
  )
}
