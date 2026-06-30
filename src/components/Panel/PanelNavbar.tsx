'use client'
import React from 'react'
import { MenuIcon, MenuUnfoldIcon } from '../Icons'
import type { PanelNavbarProps, NavbarElement } from './Panel.types'
import { NavbarNotification } from './NavbarNotification'
import { NavbarUserAccount } from './NavbarUserAccount'

export const PanelNavbar = ({ 
  isMinimized = false, 
  toggleSidebar,
  userAccount,
  notification,
  customElements = [],
}: PanelNavbarProps) => {

  const allElements: NavbarElement[] = [...customElements]

  if (notification?.isActive !== false) {
    allElements.push({
      key: 'default-notification',
      order: notification?.order ?? 1,
      placement: notification?.placement ?? 'right',
      isActive: true,
      element: <NavbarNotification {...notification} />
    })
  }

  if (userAccount?.isActive !== false) {
    allElements.push({
      key: 'default-user-account',
      order: userAccount?.order ?? 2,
      placement: userAccount?.placement ?? 'right',
      isActive: true,
      element: <NavbarUserAccount {...userAccount} />
    })
  }

  const activeElements = allElements.filter(el => el.isActive !== false)
  
  const leftElements = activeElements.filter(el => el.placement === 'left').sort((a, b) => a.order - b.order)
  const centerElements = activeElements.filter(el => el.placement === 'center').sort((a, b) => a.order - b.order)
  const rightElements = activeElements.filter(el => !el.placement || el.placement === 'right').sort((a, b) => a.order - b.order)

  return (
    <nav className="sticky top-0 z-60 flex h-16 items-center justify-between border-b border-neutral-100 bg-white/80 px-4 lg:px-8 backdrop-blur-sm">
      
      <div className="flex shrink-0 items-center">
        <button
          onClick={toggleSidebar}
          className="group flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50 text-neutral-600 transition-all hover:bg-primary-50 hover:text-primary-600 active:scale-90"
        >
          {isMinimized ? (
            <MenuUnfoldIcon size={20} className="transition-transform group-hover:translate-x-0.5" />
          ) : (
            <MenuIcon size={20} />
          )}
        </button>
      </div>

      <div className="flex flex-1 items-center ml-4 h-full">
        
        <div className="flex items-center gap-3 lg:gap-5 justify-start">
          {leftElements.map(el => (
            <React.Fragment key={el.key}>
              {el.element}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-center gap-3 lg:gap-5 h-full">
          {centerElements.map(el => (
            <React.Fragment key={el.key}>
              {el.element}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-3 lg:gap-5 justify-end">
          {rightElements.map(el => (
            <React.Fragment key={el.key}>
              {el.element}
            </React.Fragment>
          ))}
        </div>

      </div>
    </nav>
  )
}
