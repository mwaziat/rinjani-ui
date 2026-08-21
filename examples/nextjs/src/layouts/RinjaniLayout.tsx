"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { PanelLayout } from "rinjani-ui"
import {
  LuMousePointerClick,
  LuBadge,
  LuMenu,
  LuLayoutTemplate,
  LuMessageSquare,
  LuListTree,
  LuTable2,
  LuLayoutGrid,
  LuNavigation,
  LuFileText,
} from "react-icons/lu"
import { FiBookOpen, FiFileText, FiLayout } from "react-icons/fi"

const MenuItems = [
  {
    id: 1,
    label: "Getting Started",
    icon: <FiBookOpen className="w-5 h-5" />,
    children: [
      { id: 2, label: "Overview",     href: "/rinjani/getting-started/overview" },
      { id: 3, label: "Installation", href: "/rinjani/getting-started/installation" },
      { id: 4, label: "Theming",      href: "/rinjani/getting-started/theming" },
      { id: 5, label: "Changelog",    href: "/rinjani/getting-started/changelog" },
    ],
  },
  {
    id: 10,
    label: "General",
    icon: <LuMousePointerClick className="w-5 h-5" />,
    children: [
      { id: 11, label: "Button",     href: "/rinjani/components/general/button" },
      { id: 12, label: "Badge",      href: "/rinjani/components/general/badge" },
      { id: 13, label: "Breadcrumb", href: "/rinjani/components/general/breadcrumb" },
      { id: 14, label: "Card",       href: "/rinjani/components/general/card" },
      { id: 15, label: "Tooltip",    href: "/rinjani/components/general/tooltip" },
    ],
  },
  {
    id: 20,
    label: "Navigation",
    icon: <LuNavigation className="w-5 h-5" />,
    children: [
      { id: 21, label: "Dropdown", href: "/rinjani/components/navigation/dropdown" },
      { id: 22, label: "Tabs",     href: "/rinjani/components/navigation/tabs" },
      { id: 23, label: "Drawer",   href: "/rinjani/components/navigation/drawer" },
      { id: 24, label: "Tree",     href: "/rinjani/components/navigation/tree" },
    ],
  },
  {
    id: 30,
    label: "Feedback",
    icon: <LuMessageSquare className="w-5 h-5" />,
    children: [
      { id: 31, label: "Alert",  href: "/rinjani/components/feedback/alert" },
      { id: 32, label: "Dialog", href: "/rinjani/components/feedback/dialog" },
      { id: 33, label: "Toast",  href: "/rinjani/components/feedback/toast" },
      { id: 34, label: "Modal",  href: "/rinjani/components/feedback/modal" },
    ],
  },
  {
    id: 40,
    label: "Data Display",
    icon: <LuTable2 className="w-5 h-5" />,
    children: [
      { id: 41, label: "DataTable",     href: "/rinjani/components/data-display/data-table" },
      { id: 42, label: "EditDataTable", href: "/rinjani/components/data-display/edit-data-table" },
      { id: 43, label: "Panel",         href: "/rinjani/components/data-display/panel" },
      { id: 44, label: "Lightbox",      href: "/rinjani/components/data-display/lightbox" },
    ],
  },
  {
    id: 50,
    label: "Form",
    icon: <FiFileText className="w-5 h-5" />,
    children: [
      { id: 51, label: "InputField",   href: "/rinjani/components/form/input-field" },
      { id: 52, label: "Select",       href: "/rinjani/components/form/select" },
      { id: 53, label: "Autocomplete", href: "/rinjani/components/form/autocomplete" },
      { id: 54, label: "Checkbox",     href: "/rinjani/components/form/checkbox" },
      { id: 55, label: "Radio",        href: "/rinjani/components/form/radio" },
      { id: 56, label: "Switch",       href: "/rinjani/components/form/switch" },
      { id: 57, label: "DatePicker",   href: "/rinjani/components/form/date-picker" },
      { id: 58, label: "Dropzone",     href: "/rinjani/components/form/dropzone" },
    ],
  },
  {
    id: 60,
    label: "Layout",
    icon: <LuLayoutGrid className="w-5 h-5" />,
    children: [
      { id: 61, label: "Icons", href: "/rinjani/components/layout/icons" },
    ],
  },
]

export default function RinjaniLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const activeIds = React.useMemo(() => {
    const ids = new Set<number>()

    MenuItems.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (child.href && pathname.startsWith(child.href)) {
            ids.add(item.id)
            ids.add(child.id)
          }
        })
      }
    })

    if (ids.size === 0) ids.add(1)

    return ids
  }, [pathname])

  return (
    <PanelLayout sidebar={{ menuItems: MenuItems, activeMenuIds: activeIds }}>
      {children}
    </PanelLayout>
  )
}
