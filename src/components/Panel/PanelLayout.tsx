'use client'
import React, { useState, useEffect } from 'react'
import { PanelSidebar } from './PanelSidebar'
import { PanelNavbar } from './PanelNavbar'
import type { PanelLayoutProps } from './Panel.types'

/**
 * The main layout wrapper for building admin panels and dashboards.
 * 
 * Provides a responsive layout containing a Sidebar (left) and a Navbar (top),
 * with built-in state management for collapsing and mobile view handling.
 * 
 * @example
 * ```tsx
 * <PanelLayout
 *   sidebar={{ menuItems: items, logo: <Logo /> }}
 *   navbar={{ userAccount: { ... }, notification: { ... } }}
 * >
 *   <main>Content goes here</main>
 * </PanelLayout>
 * ```
 */
export const PanelLayout = ({ 
  children, 
  sidebar,
  navbar
}: PanelLayoutProps) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isOpenMobile, setIsOpenMobile] = useState(false)

  const handleToggleMenuMobileDesk = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1024) {
        setIsOpenMobile(!isOpenMobile)
      } else {
        setIsMinimized(!isMinimized)
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setIsOpenMobile(false)
        } else {
          setIsMinimized(false)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50">
      
      <PanelSidebar 
        isMinimized={isMinimized} 
        isOpenMobile={isOpenMobile} 
        toggleMobile={() => setIsOpenMobile(false)} 
        {...sidebar}
      />
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${isMinimized ? 'lg:pl-20' : 'lg:pl-72'} pl-0`}>
        <PanelNavbar 
          isMinimized={isMinimized} 
          toggleSidebar={handleToggleMenuMobileDesk} 
          {...navbar}
        />
        <main className="p-4 lg:p-8 flex-1 overflow-x-hidden">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
