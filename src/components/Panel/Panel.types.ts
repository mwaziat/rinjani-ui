import type { ReactNode, Dispatch, SetStateAction, ElementType, RefObject } from 'react'

/**
 * Represents a single node (item or group) in the sidebar menu.
 */
export type SidebarMenuNode = {
  /** Unique identifier for the menu node. */
  id: number
  /** Optional code/key for the menu node, often used for permissions or routing. */
  code?: string
  /** The text displayed for the menu item. */
  label: string
  /** The URL/path the menu item links to. */
  href?: string
  /** Icon rendered next to the label. */
  icon?: ReactNode
  /** Nested sub-menu items. */
  children?: SidebarMenuNode[]
}

/**
 * Represents a notification item in the navbar notification dropdown.
 */
export type PanelNotificationItem = {
  /** Unique identifier for the notification. */
  id: string | number
  /** The primary title of the notification. */
  title: string
  /** The secondary description/content of the notification. */
  desc: string
  /** The timestamp or relative time string. */
  time: string
  /** Callback fired when the notification is clicked. */
  onClick?: () => void
}

/**
 * Properties for the PanelSidebar component.
 */
export interface PanelSidebarProps {
  /** If true, the sidebar is collapsed into a minimized state (icons only). */
  isMinimized?: boolean | undefined
  /** If true, the sidebar is visible on mobile devices (slides in). */
  isOpenMobile?: boolean | undefined
  /** Callback to toggle the mobile sidebar visibility. */
  toggleMobile?: (() => void) | undefined
  /** The hierarchical array of menu items to render. */
  menuItems?: SidebarMenuNode[] | undefined
  /** A Set of menu IDs that are currently active (selected or expanded). */
  activeMenuIds?: Set<number> | undefined
  /** Callback fired when the logout button is clicked. */
  onLogout?: (() => void) | undefined
  /** If true, the logout button shows a loading state. */
  isLoggingOut?: boolean | undefined
  /** Text to display on the logout button. @default "Sign out" */
  textSignOut?: string | undefined
  /** Text to display when logging out. @default "Signing out..." */
  textSigningOut?: string | undefined
  /** The main logo element (typically an image or SVG). */
  logo?: ReactNode | undefined
  /** The minimized logo element (e.g., just an icon). */
  collapsedLogo?: ReactNode | undefined
  /** Custom wrapper component for links (e.g., Next.js Link or React Router Link). */
  LinkComponent?: ElementType | undefined
}

/**
 * Determines where a custom element is placed in the navbar.
 */
export type NavbarPlacement = 'left' | 'center' | 'right'

/**
 * Represents a custom element injected into the navbar.
 */
export type NavbarElement = {
  /** Unique key for React rendering. */
  key: string
  /** Order in which the element appears relative to others in the same placement. */
  order: number
  /** Where to place the element. @default "right" */
  placement?: NavbarPlacement
  /** If true, indicates the element is in an active state. */
  isActive?: boolean
  /** The React node to render. */
  element: ReactNode
}

/**
 * Properties for the NavbarNotification component (the bell icon dropdown).
 */
export interface NavbarNotificationProps {
  /** If true, the notification dropdown is rendered. */
  isActive?: boolean | undefined
  /** Sorting order relative to other elements in the placement area. */
  order?: number | undefined
  /** Where to place the notification icon. @default "right" */
  placement?: NavbarPlacement | undefined
  /** The list of notifications to display. */
  notifications?: PanelNotificationItem[] | undefined
  /** Callback fired when "View all" is clicked. */
  onViewAllNotifications?: (() => void) | undefined
  /** Text for the header title. @default "Notifications" */
  textNotifications?: string | undefined
  /** Text for the footer link. @default "View all activities" */
  textViewAllActivities?: string | undefined
  /** Text for the new items badge. @default "New" */
  textNew?: string | undefined
}

/**
 * Properties for the NavbarUserAccount component (the user profile dropdown).
 */
export interface NavbarUserAccountProps {
  /** If true, the user account dropdown is rendered. */
  isActive?: boolean | undefined
  /** Sorting order relative to other elements. */
  order?: number | undefined
  /** Where to place the user account element. @default "right" */
  placement?: NavbarPlacement | undefined
  /** The user profile data to display. */
  userProfile?: {
    displayName?: string
    initials?: string
    roleName?: string
    roleCode?: string
  } | undefined
  /** Callback fired when the logout option is clicked. */
  onLogout?: (() => void) | undefined
  /** If true, shows a loading state for the logout action. */
  isLoggingOut?: boolean | undefined
  /** Text for the logout option. @default "Sign out" */
  textSignOut?: string | undefined
  /** Text when logging out. @default "Signing out..." */
  textSigningOut?: string | undefined
  /** Text for the account header. @default "Account" */
  textAccount?: string | undefined
  /** Text for the settings option. @default "Settings" */
  textSettings?: string | undefined
  /** Callback fired when the settings option is clicked. */
  onSettingsClick?: (() => void) | undefined
}

/**
 * Properties for the main PanelNavbar component.
 */
export interface PanelNavbarProps {
  /** If true, the accompanying sidebar is currently minimized. */
  isMinimized?: boolean | undefined
  /** Callback to toggle the sidebar's minimized state. */
  toggleSidebar?: (() => void) | undefined
  /** Configuration for the user account dropdown. */
  userAccount?: NavbarUserAccountProps | undefined
  /** Configuration for the notifications dropdown. */
  notification?: NavbarNotificationProps | undefined
  /** Array of custom React elements to inject into the navbar. */
  customElements?: NavbarElement[] | undefined
}

/**
 * Properties for the PanelLayout wrapper component.
 */
export interface PanelLayoutProps {
  /** The main content area rendered next to the sidebar and below the navbar. */
  children: ReactNode
  /** Configuration for the sidebar. (Omits state managed by layout). */
  sidebar?: Omit<PanelSidebarProps, 'isMinimized' | 'isOpenMobile' | 'toggleMobile'> | undefined
  /** Configuration for the navbar. (Omits state managed by layout). */
  navbar?: Omit<PanelNavbarProps, 'isMinimized' | 'toggleSidebar'> | undefined
}

/**
 * Context provided to components within a navbar dropdown to manage open/close state.
 */
export interface NavbarDropdownContextType {
  /** True if the dropdown is currently open. */
  isOpen: boolean
  /** Function to update the dropdown's open state. */
  setIsOpen: Dispatch<SetStateAction<boolean>>
  /** Ref to the trigger element (e.g., the button) for positioning and focus management. */
  triggerRef: RefObject<HTMLDivElement | null>
}
