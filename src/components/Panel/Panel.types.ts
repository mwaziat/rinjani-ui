import type { ReactNode } from 'react'

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
  menuItems: SidebarMenuNode[]
  activeMenuIds?: Set<number> | undefined
  onLogout?: (() => void) | undefined
  isLoggingOut?: boolean | undefined
  textSignOut?: string | undefined
  textSigningOut?: string | undefined
  logo?: ReactNode | undefined
  collapsedLogo?: ReactNode | undefined
  LinkComponent?: React.ElementType | undefined
}

export interface PanelNavbarProps {
  isMinimized?: boolean | undefined
  toggleSidebar?: (() => void) | undefined
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
  textUserGuide?: string | undefined
  textAllManual?: string | undefined
  textModuleGuides?: string | undefined
  activeModuleChildren?: SidebarMenuNode[] | undefined
  businessContextNode?: ReactNode | undefined
  switchLocaleNode?: ReactNode | undefined
  notifications?: PanelNotificationItem[] | undefined
  onViewAllNotifications?: (() => void) | undefined
  textNotifications?: string | undefined
  textViewAllActivities?: string | undefined
  textNew?: string | undefined
  onUserGuideClick?: ((menu: SidebarMenuNode) => void) | undefined
  onSettingsClick?: (() => void) | undefined
  LinkComponent?: React.ElementType | undefined
  renderUserGuideModal?: ((props: { isOpen: boolean, onClose: () => void, menuNode: SidebarMenuNode | null }) => ReactNode) | undefined
}

export interface PanelLayoutProps extends Omit<PanelSidebarProps, 'isMinimized' | 'isOpenMobile' | 'toggleMobile'>, Omit<PanelNavbarProps, 'isMinimized' | 'toggleSidebar'> {
  children: ReactNode
}
