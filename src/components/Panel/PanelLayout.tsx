'use client'
import React, { useState, useEffect } from 'react'
import { PanelSidebar } from './PanelSidebar'
import { PanelNavbar } from './PanelNavbar'
import type { PanelLayoutProps } from './Panel.types'

export const PanelLayout = ({ 
  children, 
  menuItems,
  activeMenuIds,
  logo,
  collapsedLogo,
  userProfile,
  notifications,
  activeModuleChildren,
  businessContextNode,
  switchLocaleNode,
  onLogout,
  onSettingsClick,
  onUserGuideClick,
  onViewAllNotifications,
  renderUserGuideModal,
  isLoggingOut,
  textSignOut,
  textSigningOut,
  textAccount,
  textSettings,
  textUserGuide,
  textAllManual,
  textModuleGuides,
  textNotifications,
  textViewAllActivities,
  textNew,
  LinkComponent
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
        menuItems={menuItems}
        activeMenuIds={activeMenuIds}
        logo={logo}
        collapsedLogo={collapsedLogo}
        onLogout={onLogout}
        isLoggingOut={isLoggingOut}
        textSignOut={textSignOut}
        textSigningOut={textSigningOut}
        LinkComponent={LinkComponent}
      />
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${isMinimized ? 'lg:pl-20' : 'lg:pl-72'} pl-0`}>
        <PanelNavbar 
          isMinimized={isMinimized} 
          toggleSidebar={handleToggleMenuMobileDesk} 
          userProfile={userProfile}
          notifications={notifications}
          activeModuleChildren={activeModuleChildren}
          businessContextNode={businessContextNode}
          switchLocaleNode={switchLocaleNode}
          onLogout={onLogout}
          onSettingsClick={onSettingsClick}
          onUserGuideClick={onUserGuideClick}
          onViewAllNotifications={onViewAllNotifications}
          renderUserGuideModal={renderUserGuideModal}
          isLoggingOut={isLoggingOut}
          textSignOut={textSignOut}
          textSigningOut={textSigningOut}
          textAccount={textAccount}
          textSettings={textSettings}
          textUserGuide={textUserGuide}
          textAllManual={textAllManual}
          textModuleGuides={textModuleGuides}
          textNotifications={textNotifications}
          textViewAllActivities={textViewAllActivities}
          textNew={textNew}
          LinkComponent={LinkComponent}
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
