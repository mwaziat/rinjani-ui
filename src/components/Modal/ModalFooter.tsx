import React from 'react'
import type { ModalFooterProps } from './Modal.types'

export const ModalFooter = ({ children, className = '' }: ModalFooterProps) => {
  return (
    <div className={`shrink-0 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-3 px-6 py-5 ${className}`}>
      {children}
    </div>
  )
}
