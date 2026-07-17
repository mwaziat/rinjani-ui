'use client'
import React, { useState, useMemo } from 'react'
import { ChevronDownIcon, ChevronRightIcon, XIcon, LogOutIcon } from '../Icons'
import type { PanelSidebarProps, SidebarMenuNode } from './Panel.types'

/**
 * The sidebar component for the Panel layout.
 * 
 * Renders a hierarchical navigation menu with support for collapsing (minimized mode)
 * and sliding out on mobile devices.
 * 
 * Usually rendered automatically by `PanelLayout`, but can be used standalone.
 */
export const PanelSidebar = ({
  isMinimized = false,
  isOpenMobile = false,
  toggleMobile,
  menuItems = [],
  activeMenuIds = new Set(),
  onLogout,
  isLoggingOut,
  textSignOut = 'Sign Out',
  textSigningOut = 'Signing Out...',
  logo,
  collapsedLogo,
  LinkComponent = 'a'
}: PanelSidebarProps) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const mergedOpenMenus = useMemo(() => {
    const ids = new Set<string>()
    Object.entries(openMenus).forEach(([key, value]) => {
      if (value) ids.add(key)
    })
    activeMenuIds.forEach((id) => {
      if (!(String(id) in openMenus)) {
        ids.add(String(id))
      }
    })
    return Array.from(ids)
  }, [openMenus, activeMenuIds])

  const handleToggleMenu = (id: string, level: number) => {
    if (level === 1) {
      setOpenMenus((prev) => {
        const isOpen = id in prev ? prev[id] : activeMenuIds.has(Number(id))
        if (isOpen) {
          return { ...prev, [id]: false }
        }

        const next: Record<string, boolean> = {}
        Object.keys(prev).forEach((key) => {
          if (key !== id) next[key] = false
        })
        activeMenuIds.forEach((activeId) => {
          if (String(activeId) !== id) next[String(activeId)] = false
        })
        next[id] = true
        return next
      })
      return
    }

    setOpenMenus((prev) => {
      const isOpen = id in prev ? prev[id] : activeMenuIds.has(Number(id))
      return { ...prev, [id]: !isOpen }
    })
  }

  return (
    <>
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-55 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={toggleMobile}
        />
      )}

      <aside className={`fixed top-0 z-60 h-screen border-r border-neutral-200 bg-white transition-all duration-300 ${isOpenMobile ? 'left-0' : '-left-full lg:left-0'} ${isMinimized ? 'w-20 overflow-visible' : 'w-72 overflow-hidden'}`}>
        <div className="flex h-16 items-center border-b-2 border-b-neutral-100 px-6">
          {(!isMinimized || isOpenMobile) ? (
            <div className="flex w-full items-center justify-between lg:justify-center">
              {logo || (
                <h1 className="text-lg md:text-xl font-black tracking-tighter text-neutral-900 uppercase">
                  RINJANI <span className="text-primary-500">UI</span>
                </h1>
              )}
              <button onClick={toggleMobile} className="lg:hidden text-neutral-500 hover:text-primary-600">
                <XIcon size={22} />
              </button>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {collapsedLogo || (
                <div className="h-10 w-10 bg-primary-500 text-white flex items-center justify-center font-black rounded-lg">R</div>
              )}
            </div>
          )}
        </div>

        <nav className={`mt-2 h-[calc(100vh-4rem)] flex flex-col gap-1 px-3 pb-28 ${isMinimized ? 'overflow-visible' : 'overflow-y-auto'}`}>
          {menuItems.map((menu) => (
            <MenuItem 
              key={menu.id} 
              item={menu} 
              isMinimized={isMinimized || false} 
              isOpenMobile={isOpenMobile || false} 
              openMenus={mergedOpenMenus} 
              activeMenuIds={activeMenuIds} 
              onToggle={handleToggleMenu} 
              level={1} 
              LinkComponent={LinkComponent}
            />
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full bg-white/95 px-3 py-3 backdrop-blur-sm border-t border-neutral-100">
          <button
            onClick={onLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 group disabled:opacity-60"
          >
            <LogOutIcon size={20} />
            {(!isMinimized || isOpenMobile) && <span className="text-xs uppercase tracking-widest">{isLoggingOut ? textSigningOut : textSignOut}</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

type MenuItemProps = {
  item: SidebarMenuNode
  isMinimized: boolean
  isOpenMobile: boolean
  openMenus: string[]
  activeMenuIds: ReadonlySet<number>
  onToggle: (id: string, level: number) => void
  level: number
  LinkComponent: React.ElementType
}

const MenuItem = ({ item, isMinimized, isOpenMobile, openMenus, activeMenuIds, onToggle, level, LinkComponent }: MenuItemProps) => {
  const hasChildren = item.children && item.children.length > 0
  const isOpen = openMenus.includes(String(item.id))
  const isActive = activeMenuIds.has(item.id)

  if (!isMinimized || isOpenMobile) {
    return (
      <div className="w-full">
        {hasChildren ? (
          <button
            onClick={() => onToggle(String(item.id), level)}
            className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 transition-all ${level === 1 ? (isActive ? 'bg-neutral-50 text-primary-600' : 'hover:bg-neutral-50 text-neutral-700') : (isActive ? 'bg-neutral-50 text-primary-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-primary-600')}`}
          >
            <div className="flex items-center gap-3">
              <span className={isOpen || isActive ? 'text-primary-500' : 'text-neutral-400 group-hover:text-primary-600'}>{item.icon}</span>
              <span className={`text-xs uppercase tracking-wider transition-all group-hover:font-semibold`}>{item.label}</span>
            </div>
            {isOpen ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />}
          </button>
        ) : (
          <LinkComponent href={item.href || '#'} className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${level === 1 ? (isActive ? 'bg-neutral-50 text-primary-600' : 'hover:bg-neutral-50 text-neutral-700') : (isActive ? 'bg-neutral-50 text-primary-600' : 'text-neutral-500 hover:bg-neutral-50 hover:text-primary-600')}`}>
            <span className={isActive ? 'text-primary-500' : 'text-neutral-400 group-hover:text-primary-600'}>{item.icon}</span>
            <span className={`text-xs uppercase tracking-wider transition-all group-hover:font-semibold`}>{item.label}</span>
          </LinkComponent>
        )}

        {hasChildren && isOpen && (
          <div className="ml-5 mt-1 border-l-2 border-neutral-100 pl-2 flex flex-col gap-1">
            {item.children?.map((child) => (
              <MenuItem key={child.id} item={child} isMinimized={false} isOpenMobile={isOpenMobile} openMenus={openMenus} activeMenuIds={activeMenuIds} onToggle={onToggle} level={level + 1} LinkComponent={LinkComponent} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="group relative flex justify-center py-2">
      {hasChildren ? (
        <div className={`rounded-lg p-2.5 transition-all group-hover:bg-primary-50 group-hover:text-primary-600 cursor-default ${isActive ? 'bg-primary-50 text-primary-600' : 'text-neutral-500'}`}>
          {item.icon}
        </div>
      ) : (
        <LinkComponent href={item.href || '#'} className={`rounded-lg p-2.5 transition-all hover:bg-primary-50 hover:text-primary-600 ${isActive ? 'bg-primary-50 text-primary-600' : 'text-neutral-500'}`}>
          {item.icon}
        </LinkComponent>
      )}

      <div className="pointer-events-none invisible absolute left-16 top-0 z-60 w-60 translate-x-2 rounded-lg border border-neutral-200 bg-white p-3 shadow-2xl opacity-0 transition-all group-hover:pointer-events-auto group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
        <div className="absolute -left-1.5 top-5 h-3 w-3 rotate-45 border-b border-l border-neutral-200 bg-white" />
        <div className="mb-2 border-b border-neutral-50 px-2 py-1">
          {hasChildren ? (
            <span className="text-xs uppercase tracking-widest text-primary-600">{item.label}</span>
          ) : (
            <LinkComponent href={item.href || '#'} className="text-xs uppercase tracking-widest text-primary-600 hover:font-semibold hover:text-primary-600 transition-all block text-nowrap">
              {item.label}
            </LinkComponent>
          )}
        </div>

        {hasChildren && (
          <div className="flex flex-col gap-1">
            {item.children?.map((child) => (
              <div key={child.id} className="flex flex-col">
                <LinkComponent href={child.href || '#'} className={`rounded-lg px-2 py-2 text-xs uppercase transition-all hover:bg-neutral-50 hover:font-semibold hover:text-primary-600 ${activeMenuIds.has(child.id) ? 'bg-neutral-50 font-semibold text-primary-600' : 'text-neutral-600'}`}>
                  {child.label}
                </LinkComponent>
                {child.children && (
                  <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-neutral-100 pl-3">
                    {child.children.map((subChild) => (
                      <LinkComponent key={subChild.id} href={subChild.href || '#'} className={`py-1 text-[11px] uppercase transition-all hover:font-semibold hover:text-primary-500 ${activeMenuIds.has(subChild.id) ? 'font-semibold text-primary-500' : 'text-neutral-400'}`}>
                        {subChild.label}
                      </LinkComponent>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
