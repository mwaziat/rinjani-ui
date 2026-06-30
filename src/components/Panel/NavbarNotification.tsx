'use client'
import React from 'react'
import { NavbarDropdown } from './NavbarDropdown'
import { BellIcon, MessageSquareIcon, XIcon } from '../Icons'
import type { NavbarNotificationProps } from './Panel.types'
import { useDropdown } from './NavbarDropdown'

const NotificationMobileHeader = ({ title }: { title: string }) => {
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

export const NavbarNotification = ({
  notifications = [],
  onViewAllNotifications,
  textNotifications = 'Notifications',
  textViewAllActivities = 'View All Activities',
  textNew = 'New',
}: NavbarNotificationProps) => {
  if (!notifications) return null

  return (
    <NavbarDropdown>
      <NavbarDropdown.Menu>
        <div className="relative rounded-full p-2.5 text-neutral-500 hover:bg-neutral-50 transition-all active:scale-95">
          <BellIcon size={22} />
          {notifications.length > 0 && (
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
          )}
        </div>
      </NavbarDropdown.Menu>

      <NavbarDropdown.List placement="right" className="w-72! lg:w-80!">
        <NotificationMobileHeader title={textNotifications} />

        <div className="hidden lg:flex items-center justify-between border-b border-neutral-50 px-4 py-3">
          <span className="text-xs font-black uppercase tracking-widest text-neutral-900">{textNotifications}</span>
          <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-600 uppercase">{notifications.length} {textNew}</span>
        </div>

        <NavbarDropdown.Content>
          {notifications.map((item) => (
            <NavbarDropdown.Item key={item.id} onClick={item.onClick} className="group/item flex items-start! w-full gap-3 p-3!">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 group-hover/item:bg-white transition-colors">
                <MessageSquareIcon size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-tight text-neutral-900 group-hover/item:font-semibold">{item.title}</span>
                <span className="text-[11px] text-neutral-500 line-clamp-1">{item.desc}</span>
                <span className="mt-1 text-[9px] font-medium uppercase text-neutral-400">{item.time}</span>
              </div>
            </NavbarDropdown.Item>
          ))}
          {notifications.length === 0 && (
            <div className="p-6 text-center text-xs text-neutral-400 uppercase tracking-widest">No new notifications</div>
          )}
        </NavbarDropdown.Content>

        {onViewAllNotifications && (
          <div className="border-t border-neutral-50 p-2">
            <button onClick={onViewAllNotifications} className="w-full rounded-lg py-2 text-center text-[10px] font-bold uppercase tracking-widest text-primary-600 hover:bg-primary-50 transition-all">
              {textViewAllActivities}
            </button>
          </div>
        )}
      </NavbarDropdown.List>
    </NavbarDropdown>
  )
}
