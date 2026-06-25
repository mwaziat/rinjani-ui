'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { DrawerProps } from './Drawer.types'
import { positionStyles, baseBackdropClasses, baseDrawerClasses } from './Drawer.styles'
import { getSizeClasses, getTransformClass } from './Drawer.utils'

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = 'md',
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const isHorizontal = position === 'left' || position === 'right'

  if (typeof document === 'undefined') return null

  return createPortal(
    <div className={`fixed inset-0 z-9999 ${isOpen ? 'visible' : 'invisible transition-all delay-300'}`}>
      <div
        className={`${baseBackdropClasses} ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`${baseDrawerClasses} ${positionStyles[position]} ${getSizeClasses(size, isHorizontal)} ${getTransformClass(isOpen, position)} ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  )
}
