'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ModalProps } from './Modal.types'
import { sizeClasses } from './Modal.styles'

let contentScrollLockCount = 0
let modalZIndexSeed = 9999

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md', 
  scrollMode = 'content', 
  closeOnOutsideClick = false, 
  className = '' 
}, ref) => {
  const backdropRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const alignRef = useRef<HTMLDivElement>(null)
  const baseZIndex = useRef(10000)

  useEffect(() => {
    if (!isOpen) return

    modalZIndexSeed += 2
    const zIndex = modalZIndexSeed
    baseZIndex.current = zIndex

    if (wrapperRef.current) wrapperRef.current.style.zIndex = `${zIndex + 1}`
    if (backdropRef.current) backdropRef.current.style.zIndex = `${zIndex}`
    if (alignRef.current) alignRef.current.style.zIndex = `${zIndex + 1}`
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

  if (typeof document === 'undefined') return null

  return createPortal(
    <div ref={wrapperRef} className={`${wrapperClasses} ${isOpen ? 'visible' : 'invisible delay-300'}`} style={{ zIndex: baseZIndex.current + 1 }}>
      <div
        ref={backdropRef}
        className={`fixed inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: baseZIndex.current }}
        onClick={closeOnOutsideClick ? onClose : undefined}
      />

      <div ref={alignRef} className={alignClasses} style={{ zIndex: baseZIndex.current + 1 }}>
        <div 
          ref={ref}
          className={`relative w-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'} ${sizeClasses[size]} ${modalHeightClasses} ${className}`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
})

Modal.displayName = 'Modal'
