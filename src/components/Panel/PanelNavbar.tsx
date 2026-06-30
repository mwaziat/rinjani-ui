'use client'
import React, { useState, useRef, useEffect } from 'react'
import { MenuIcon, MenuUnfoldIcon, SettingsIcon, XIcon, ChevronDownIcon, BellIcon, BookOpenIcon, LogOutIcon, MessageSquareIcon } from '../Icons'
import type { PanelNavbarProps, SidebarMenuNode } from './Panel.types'

const SETTINGS_ROLE_CODES = ['super', 'admin']

export const PanelNavbar = ({ 
  isMinimized = false, 
  toggleSidebar,
  userProfile,
  onLogout,
  isLoggingOut,
  textSignOut = 'Sign Out',
  textSigningOut = 'Signing Out...',
  textAccount = 'Account',
  textSettings = 'Settings',
  textUserGuide = 'User Guide',
  textAllManual = 'All Manual',
  textModuleGuides = 'Module Guides',
  textNotifications = 'Notifications',
  textViewAllActivities = 'View All Activities',
  textNew = 'New',
  activeModuleChildren = [],
  businessContextNode,
  switchLocaleNode,
  notifications,
  onViewAllNotifications,
  onUserGuideClick,
  onSettingsClick,
  LinkComponent = 'a',
  renderUserGuideModal
}: PanelNavbarProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const guideRef = useRef<HTMLDivElement>(null)
  const [activeGuideNode, setActiveGuideNode] = useState<SidebarMenuNode | null>(null)

  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (guideRef.current && !guideRef.current.contains(event.target as Node)) {
        setIsGuideOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = userProfile?.displayName ?? 'Guest'
  const initials = userProfile?.initials ?? (displayName || 'G').split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
  const roleCode = userProfile?.roleCode?.toLowerCase()
  const canAccessSettings = roleCode ? SETTINGS_ROLE_CODES.includes(roleCode) : false

  return (
    <nav className="sticky top-0 z-60 flex h-16 items-center justify-between border-b border-neutral-100 bg-white/80 px-4 lg:px-8 backdrop-blur-md">
      <div className="flex items-center gap-3">
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

        <div className="relative" ref={guideRef}>
          <button
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className="flex items-center gap-2 rounded-xl bg-neutral-50 px-3 py-2.5 text-sm font-medium text-neutral-600 transition-all hover:bg-primary-50 hover:text-primary-600 active:scale-95"
          >
            <BookOpenIcon size={18} />
            <span className="hidden lg:block uppercase tracking-wider text-[11px] font-bold">{textUserGuide}</span>
            <ChevronDownIcon size={14} className={`transition-transform ${isGuideOpen ? 'rotate-180' : ''}`} />
          </button>

          {isGuideOpen && (
            <div className="absolute left-0 mt-3 w-64 origin-top-left rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl z-50">
              <div className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-neutral-200 bg-white" />
              <div className="relative z-10">
                <LinkComponent
                  href="/user-guide"
                  onClick={() => setIsGuideOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-widest text-primary-600 transition-all hover:bg-neutral-50 hover:text-primary-600"
                >
                  {textAllManual}
                </LinkComponent>

                {activeModuleChildren.length > 0 && (
                  <>
                    <div className="my-1 border-t border-neutral-50" />
                    <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      {textModuleGuides}
                    </div>
                    <div className="flex max-h-60 flex-col overflow-y-auto">
                      {activeModuleChildren.map((menu) => (
                        <button
                          key={menu.id}
                          onClick={() => {
                            setActiveGuideNode(menu)
                            setIsGuideOpen(false)
                            if (onUserGuideClick) onUserGuideClick(menu)
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-[11px] uppercase tracking-wider text-neutral-600 transition-all hover:bg-neutral-50 hover:font-semibold hover:text-primary-600"
                        >
                          <span>{menu.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        {businessContextNode}
        {switchLocaleNode}

        {notifications !== undefined && (
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative rounded-full p-2.5 text-neutral-500 hover:bg-neutral-50 transition-all active:scale-95"
            >
              <BellIcon size={22} />
              {notifications.length > 0 && (
                <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-72 lg:w-80 origin-top-right rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl z-50">
                <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-neutral-200 bg-white" />
                <div className="flex items-center justify-between px-4 py-3 lg:hidden mb-2 border-b border-neutral-50">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-900">{textNotifications}</span>
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-neutral-500 hover:text-primary-600"
                  >
                    <XIcon size={18} />
                  </button>
                </div>
                <div className="relative z-10">
                  <div className="hidden lg:flex items-center justify-between border-b border-neutral-50 px-4 py-3">
                    <span className="text-xs font-black uppercase tracking-widest text-neutral-900">{textNotifications}</span>
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-600 uppercase">{notifications.length} {textNew}</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((item) => (
                      <button key={item.id} onClick={item.onClick} className="group/item flex w-full gap-3 rounded-xl p-3 text-left transition-all hover:bg-neutral-50">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 group-hover/item:bg-white transition-colors">
                          <MessageSquareIcon size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase tracking-tight text-neutral-900 group-hover/item:font-semibold">{item.title}</span>
                          <span className="text-[11px] text-neutral-500 line-clamp-1">{item.desc}</span>
                          <span className="mt-1 text-[9px] font-medium uppercase text-neutral-400">{item.time}</span>
                        </div>
                      </button>
                    ))}
                    {notifications.length === 0 && (
                      <div className="p-6 text-center text-xs text-neutral-400 uppercase tracking-widest">No new notifications</div>
                    )}
                  </div>
                  {onViewAllNotifications && (
                    <div className="border-t border-neutral-50 p-2">
                      <button onClick={onViewAllNotifications} className="w-full rounded-lg py-2 text-center text-[10px] font-bold uppercase tracking-widest text-primary-600 hover:bg-primary-50 transition-all">
                        {textViewAllActivities}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 rounded-xl p-1.5 lg:pr-4 transition-all hover:bg-neutral-50 active:scale-95">
            <div className="h-9 w-9 rounded-lg bg-primary-500 flex items-center justify-center text-white font-black text-sm shadow-sm shadow-primary-500/20">
              {initials}
            </div>
            <div className="hidden text-left lg:block">
              <p className="text-xs font-black uppercase tracking-tight text-neutral-900 leading-none transition-all group-hover:text-primary-600">{displayName}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-tighter text-neutral-400">{userProfile?.roleName ?? userProfile?.roleCode ?? ''}</p>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl z-50">
              <div className="absolute -top-1.5 right-6 h-3 w-3 rotate-45 border-l border-t border-neutral-200 bg-white" />
              <div className="relative z-10">
                <div className="flex items-center justify-between px-4 py-3 lg:hidden mb-2 border-b border-neutral-50">
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-900">{textAccount}</span>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="text-neutral-500 hover:text-primary-600"
                  >
                    <XIcon size={18} />
                  </button>
                </div>
                {/* <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs uppercase text-neutral-600 transition-all hover:bg-neutral-50 hover:font-semibold hover:text-primary-600">
                <UserIcon size={18} /> Profile
              </button> */}
                {canAccessSettings && (
                  <button onClick={onSettingsClick} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs uppercase text-neutral-600 transition-all hover:bg-neutral-50 hover:font-semibold hover:text-primary-600">
                    <SettingsIcon size={18} /> {textSettings}
                  </button>
                )}
                <div className="my-1 border-t border-neutral-50" />
                <button
                  onClick={onLogout}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs uppercase text-red-600 transition-all hover:bg-red-50 hover:font-semibold disabled:opacity-60"
                >
                  <LogOutIcon size={18} /> {isLoggingOut ? textSigningOut : textSignOut}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {renderUserGuideModal?.({
        isOpen: !!activeGuideNode,
        onClose: () => setActiveGuideNode(null),
        menuNode: activeGuideNode
      })}
    </nav>
  )
}
