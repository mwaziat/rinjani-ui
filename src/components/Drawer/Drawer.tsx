'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DrawerProps } from './Drawer.types'

export const Drawer = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = 'md',
  className = '',
}: DrawerProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const sizeClasses: Record<string, string> = {
    xs: isHorizontal ? 'w-64' : 'h-64',
    sm: isHorizontal ? 'w-80' : 'h-80',
    md: isHorizontal ? 'w-[450px]' : 'h-[450px]',
    lg: isHorizontal ? 'w-[600px]' : 'h-[600px]',
    xl: isHorizontal ? 'w-[800px]' : 'h-[800px]',
    '1/4': isHorizontal ? 'w-[25vw]' : 'h-[25vh]',
    '1/3': isHorizontal ? 'w-[33.33vw]' : 'h-[33.33vh]',
    '1/2': isHorizontal ? 'w-[50vw]' : 'h-[50vh]',
    '2/3': isHorizontal ? 'w-[66.66vw]' : 'h-[66.66vh]',
    '3/4': isHorizontal ? 'w-[75vw]' : 'h-[75vh]',
    full: isHorizontal ? 'w-screen' : 'h-screen',
  }

  const getTransformClass = () => {
    if (!isOpen) {
      switch (position) {
        case 'right': return 'translate-x-full'
        case 'left': return '-translate-x-full'
        case 'top': return '-translate-y-full'
        case 'bottom': return 'translate-y-full'
        default: return ''
      }
    }
    return 'translate-x-0 translate-y-0'
  }

  const positionStyles: Record<string, string> = {
    right: 'right-0 top-0 h-screen border-l',
    left: 'left-0 top-0 h-screen border-r',
    top: 'top-0 left-0 w-screen border-b',
    bottom: 'bottom-0 left-0 w-screen border-t',
  }

  if (!mounted) return null

  return createPortal(
    <div className={`fixed inset-0 z-9999 ${isOpen ? 'visible' : 'invisible transition-all delay-300'}`}>
      <div
        className={`absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`absolute bg-white border-neutral-200 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${positionStyles[position]} ${sizeClasses[size]} ${getTransformClass()} ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  )
}
