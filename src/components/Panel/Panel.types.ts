import type { ReactNode, Dispatch, SetStateAction, ElementType, RefObject } from 'react'

export type SidebarMenuNode = {
  id: number
  code?: string
  label: string
  href?: string
  icon?: ReactNode
  children?: SidebarMenuNode[]
}

export type PanelNotificationItem = {
  id: string | number
  title: string
  desc: string
  time: string
  onClick?: () => void
}

export interface PanelSidebarProps {
  isMinimized?: boolean | undefined
  isOpenMobile?: boolean | undefined
  toggleMobile?: (() => void) | undefined
  menuItems?: SidebarMenuNode[] | undefined
  activeMenuIds?: Set<number> | undefined
  onLogout?: (() => void) | undefined
  isLoggingOut?: boolean | undefined
  textSignOut?: string | undefined
  textSigningOut?: string | undefined
  logo?: ReactNode | undefined
  collapsedLogo?: ReactNode | undefined
  LinkComponent?: ElementType | undefined
}

export type NavbarPlacement = 'left' | 'center' | 'right'

export type NavbarElement = {
  key: string
  order: number
  placement?: NavbarPlacement
  isActive?: boolean
  element: ReactNode
}

export interface NavbarNotificationProps {
  isActive?: boolean | undefined
  order?: number | undefined
  placement?: NavbarPlacement | undefined
  notifications?: PanelNotificationItem[] | undefined
  onViewAllNotifications?: (() => void) | undefined
  textNotifications?: string | undefined
  textViewAllActivities?: string | undefined
  textNew?: string | undefined
}

export interface NavbarUserAccountProps {
  isActive?: boolean | undefined
  order?: number | undefined
  placement?: NavbarPlacement | undefined
  userProfile?: {
    displayName?: string
    initials?: string
    roleName?: string
    roleCode?: string
  } | undefined
  onLogout?: (() => void) | undefined
  isLoggingOut?: boolean | undefined
  textSignOut?: string | undefined
  textSigningOut?: string | undefined
  textAccount?: string | undefined
  textSettings?: string | undefined
  onSettingsClick?: (() => void) | undefined
}

export interface PanelNavbarProps {
  isMinimized?: boolean | undefined
  toggleSidebar?: (() => void) | undefined
  userAccount?: NavbarUserAccountProps | undefined
  notification?: NavbarNotificationProps | undefined
  customElements?: NavbarElement[] | undefined
}

export interface PanelLayoutProps {
  children: ReactNode
  sidebar?: Omit<PanelSidebarProps, 'isMinimized' | 'isOpenMobile' | 'toggleMobile'> | undefined
  navbar?: Omit<PanelNavbarProps, 'isMinimized' | 'toggleSidebar'> | undefined
}

export interface NavbarDropdownContextType {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: RefObject<HTMLDivElement | null>
}
