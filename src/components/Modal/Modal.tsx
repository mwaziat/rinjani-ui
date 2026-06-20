'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ModalProps } from './Modal.types'
import { sizeClasses } from './Modal.styles'

let contentScrollLockCount = 0
let modalZIndexSeed = 9999

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md', 
  scrollMode = 'content', 
  closeOnOutsideClick = false, 
  className = '' 
}: ModalProps) => {
  const [layerZIndex, setLayerZIndex] = useState(10000)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    modalZIndexSeed += 2
    setLayerZIndex(modalZIndexSeed)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || scrollMode !== 'content') return

    const previousOverflow = document.body.style.overflow
    contentScrollLockCount += 1
    document.body.style.overflow = 'hidden'

    return () => {
      contentScrollLockCount = Math.max(0, contentScrollLockCount - 1)
      if (contentScrollLockCount === 0) {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [isOpen, scrollMode])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])



  const wrapperClasses = scrollMode === 'dialog'
    ? 'fixed inset-0 p-4 overflow-y-auto'
    : 'fixed inset-0 p-4'

  const alignClasses = scrollMode === 'dialog'
    ? 'relative min-h-full flex items-start justify-center'
    : 'relative min-h-full flex items-center justify-center'

  const modalHeightClasses = scrollMode === 'content'
    ? size === 'full'
      ? 'h-[95dvh]'
      : 'max-h-[calc(100dvh-2rem)]'
    : ''

  if (!mounted) return null

  return createPortal(
    <div className={`${wrapperClasses} ${isOpen ? 'visible' : 'invisible delay-300'}`} style={{ zIndex: layerZIndex + 1 }}>
      <div
        className={`fixed inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: layerZIndex }}
        onClick={closeOnOutsideClick ? onClose : undefined}
      />

      <div className={alignClasses} style={{ zIndex: layerZIndex + 1 }}>
        <div 
          className={`relative w-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'} ${sizeClasses[size]} ${modalHeightClasses} ${className}`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
