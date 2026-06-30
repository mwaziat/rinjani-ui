'use client'
import React from 'react'
import type { NavbarUserAccountProps } from './Panel.types'
import { NavbarDropdown, useDropdown } from './NavbarDropdown'
import { SettingsIcon, LogOutIcon, XIcon } from '../Icons'

const UserAccountMobileHeader = ({ title }: { title: string }) => {
  const { setIsOpen } = useDropdown()
  return (
    <div className="flex items-center justify-between px-4 py-3 lg:hidden mb-2 border-b border-neutral-50">
      <span className="text-xs font-black uppercase tracking-widest text-neutral-900">{title}</span>
      <button
        onClick={() => setIsOpen(false)}
        className="text-neutral-500 hover:text-primary-600"
      >
        <XIcon size={18} />
      </button>
    </div>
  )
}

const SETTINGS_ROLE_CODES = ['super', 'admin']

export const NavbarUserAccount = ({
  userProfile,
  onLogout,
  isLoggingOut = false,
  textSignOut = 'Sign Out',
  textSigningOut = 'Signing Out...',
  textAccount = 'Account',
  textSettings = 'Settings',
  onSettingsClick,
}: NavbarUserAccountProps) => {
  const displayName = userProfile?.displayName ?? 'Guest'
  const initials = userProfile?.initials ?? (displayName || 'G').split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
  const roleCode = userProfile?.roleCode?.toLowerCase()
  const canAccessSettings = roleCode ? SETTINGS_ROLE_CODES.includes(roleCode) : false

  return (
    <NavbarDropdown>
      <NavbarDropdown.Menu>
        <div className="flex items-center gap-3 rounded-xl p-1.5 lg:pr-4 transition-all hover:bg-neutral-50 active:scale-95">
          <div className="h-9 w-9 rounded-lg bg-primary-500 flex items-center justify-center text-white font-black text-sm shadow-sm shadow-primary-500/20">
            {initials}
          </div>
          <div className="hidden text-left lg:block">
            <p className="text-xs font-black uppercase tracking-tight text-neutral-900 leading-none transition-all group-hover:text-primary-600">{displayName}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-tighter text-neutral-400">{userProfile?.roleName ?? userProfile?.roleCode ?? ''}</p>
          </div>
        </div>
      </NavbarDropdown.Menu>

      <NavbarDropdown.List placement="right" className="w-56!">
        <UserAccountMobileHeader title={textAccount} />
        
        <NavbarDropdown.Content>
          {canAccessSettings && onSettingsClick && (
            <NavbarDropdown.Item onClick={onSettingsClick}>
              <SettingsIcon size={18} /> {textSettings}
            </NavbarDropdown.Item>
          )}
          
          {(canAccessSettings && onSettingsClick) && <div className="my-1 border-t border-neutral-50" />}
          
          <NavbarDropdown.Item 
            onClick={onLogout} 
            disabled={isLoggingOut} 
            className="text-red-600! hover:bg-red-50! hover:font-semibold! hover:text-red-600!"
          >
            <LogOutIcon size={18} /> {isLoggingOut ? textSigningOut : textSignOut}
          </NavbarDropdown.Item>
        </NavbarDropdown.Content>
      </NavbarDropdown.List>
    </NavbarDropdown>
  )
}
