'use client'
import React, { useState, useRef, useEffect, createContext, useContext, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { XIcon } from '../Icons'
import type { NavbarPlacement, NavbarDropdownContextType } from './Panel.types'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const DropdownContext = createContext<NavbarDropdownContextType | undefined>(undefined)

export function useDropdown() {
  const context = useContext(DropdownContext)
  if (!context) throw new Error('Dropdown components must be used within NavbarDropdown')
  return context
}

export const NavbarDropdown = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className="relative inline-block" ref={triggerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

NavbarDropdown.Menu = function NavbarDropdownMenu({ children, className = '' }: { children: ReactNode, className?: string }) {
  const { isOpen, setIsOpen } = useDropdown()
  return (
    <div onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  )
}

NavbarDropdown.List = function NavbarDropdownList({ children, placement = 'right', className = '' }: { children: ReactNode, placement?: NavbarPlacement, className?: string }) {
  const { isOpen, setIsOpen, triggerRef } = useDropdown()
  const [coords, setCoords] = useState<{ top: number, left: number, right: number, width: number } | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  useIsomorphicLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom + 12,
        left: rect.left,
        right: window.innerWidth - rect.right,
        width: rect.width
      })
      
      const timer = requestAnimationFrame(() => {
        setIsVisible(true)
      })
      
      const handleScroll = (e: Event) => {
        if (listRef.current && listRef.current.contains(e.target as Node)) return
        setIsOpen(false)
      }
      
      window.addEventListener('scroll', handleScroll, true)
      
      const handleResize = () => setIsOpen(false)
      window.addEventListener('resize', handleResize)
      
      return () => {
        cancelAnimationFrame(timer)
        window.removeEventListener('scroll', handleScroll, true)
        window.removeEventListener('resize', handleResize)
      }
    } else {
      setIsVisible(false)
      setCoords(null)
    }
  }, [isOpen, triggerRef, setIsOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current && !listRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setIsOpen, triggerRef])

  if (!isOpen || !mounted || !coords) return null

  const placementClasses = {
    left: 'origin-top-left',
    center: '-translate-x-1/2 origin-top',
    right: 'origin-top-right',
  }

  const arrowClasses = {
    left: 'left-6',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-6',
  }

  const style: React.CSSProperties = {
    top: coords.top,
    position: 'fixed',
    zIndex: 9999,
  }

  if (placement === 'left') style.left = coords.left
  else if (placement === 'right') style.right = coords.right
  else style.left = coords.left + coords.width / 2

  return createPortal(
    <div 
      ref={listRef} 
      style={style} 
      className={`w-56 lg:w-72 rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl transition-all duration-200 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'} ${placementClasses[placement]} ${className}`}
    >
      <div className={`absolute -top-1.5 h-3 w-3 rotate-45 border-l border-t border-neutral-200 bg-white transition-all duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'} ${arrowClasses[placement]}`} />
      <div className="relative z-10 flex flex-col">
        {children}
      </div>
    </div>,
    document.body
  )
}

NavbarDropdown.Header = function NavbarDropdownHeader({ title, onClose, className = '' }: { title: ReactNode, onClose?: (() => void) | undefined, className?: string }) {
  const { setIsOpen } = useDropdown()
  
  return (
    <div className={`flex items-center justify-between px-4 py-3 border-b border-neutral-50 mb-2 ${className}`}>
      <span className="text-xs font-black uppercase tracking-widest text-neutral-900">{title}</span>
      {onClose && (
        <button
          onClick={() => {
            onClose()
            setIsOpen(false)
          }}
          className="text-neutral-500 hover:text-primary-600"
        >
          <XIcon size={18} />
        </button>
      )}
    </div>
  )
}

NavbarDropdown.Content = function NavbarDropdownContent({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`max-h-80 overflow-y-auto ${className}`}>
      {children}
    </div>
  )
}

NavbarDropdown.Item = function NavbarDropdownItem({ children, onClick, className = '', disabled = false }: { children: ReactNode, onClick?: (() => void) | undefined, className?: string, disabled?: boolean }) {
  const { setIsOpen } = useDropdown()
  return (
    <button
      onClick={() => {
        if (disabled) return
        if (onClick) onClick()
        setIsOpen(false)
      }}
      disabled={disabled}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs uppercase text-neutral-600 transition-all hover:bg-neutral-50 hover:font-semibold hover:text-primary-600 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  )
}
