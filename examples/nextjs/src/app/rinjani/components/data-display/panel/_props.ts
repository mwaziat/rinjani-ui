import type { PropRow } from "@/components/docs/PropsTable"

export const panelLayoutProps: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Main content area rendered beside the sidebar.",
  },
  {
    name: "sidebar",
    type: "PanelSidebarProps",
    default: "—",
    description: "Sidebar configuration: menuItems, activeMenuIds, logo, onLogout, etc.",
  },
  {
    name: "navbar",
    type: "PanelNavbarProps",
    default: "—",
    description: "Navbar configuration: notifications, custom elements.",
  },
]

export const sidebarProps: PropRow[] = [
  {
    name: "menuItems",
    type: "SidebarMenuNode[]",
    default: "—",
    description: "Hierarchical menu tree. Each node can have id, label, href, icon, and children.",
  },
  {
    name: "activeMenuIds",
    type: "Set<number>",
    default: "—",
    description: "Set of node IDs that are currently active or expanded.",
  },
  {
    name: "logo",
    type: "ReactNode",
    default: "—",
    description: "Full logo shown when the sidebar is expanded.",
  },
  {
    name: "collapsedLogo",
    type: "ReactNode",
    default: "—",
    description: "Minimized logo shown when the sidebar is collapsed.",
  },
  {
    name: "onLogout",
    type: "() => void",
    default: "—",
    description: "Callback for the sign-out button.",
  },
  {
    name: "LinkComponent",
    type: "ElementType",
    default: "—",
    description: "Custom link component (e.g. Next.js Link or React Router Link).",
  },
]
