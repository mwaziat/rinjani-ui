import React from "react"
import { highlight } from "@/lib/highlight"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { panelLayoutProps, sidebarProps } from "./_props"
import { CodeBlock } from "@/components/docs/CodeBlock"

const tocItems = [
  { id: "overview", label: "Overview", depth: 2 as const },
  { id: "setup", label: "Setup", depth: 2 as const },
  { id: "menu", label: "Menu items", depth: 2 as const },
  { id: "active", label: "Active state", depth: 2 as const },
  { id: "api-layout", label: "PanelLayout API", depth: 2 as const },
  { id: "api-sidebar", label: "Sidebar props", depth: 2 as const },
]

const codes = {
  setup: `// layouts/AppLayout.tsx
"use client"
import { PanelLayout } from 'rinjani-ui'
import { menuItems, useActiveIds } from './menu'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const activeIds = useActiveIds()
  return (
    <PanelLayout sidebar={{ menuItems, activeMenuIds: activeIds }}>
      {children}
    </PanelLayout>
  )
}`,
  menu: `import type { SidebarMenuNode } from 'rinjani-ui'
import { FiHome, FiSettings } from 'react-icons/fi'

export const menuItems: SidebarMenuNode[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: <FiHome className="w-5 h-5" />,
    href: '/dashboard',
  },
  {
    id: 2,
    label: 'Settings',
    icon: <FiSettings className="w-5 h-5" />,
    children: [
      { id: 3, label: 'Profile', href: '/settings/profile' },
      { id: 4, label: 'Security', href: '/settings/security' },
    ],
  },
]`,
  active: `"use client"
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export function useActiveIds() {
  const pathname = usePathname()
  return useMemo(() => {
    const ids = new Set<number>()
    menuItems.forEach((item) => {
      item.children?.forEach((child) => {
        if (child.href && pathname.startsWith(child.href)) {
          ids.add(item.id)
          ids.add(child.id)
        }
      })
      if (item.href && pathname.startsWith(item.href)) ids.add(item.id)
    })
    return ids
  }, [pathname])
}`,
}

export default async function PanelPage() {
  const [setupHl, menuHl, activeHl] = await Promise.all([
    highlight(codes.setup, "tsx"),
    highlight(codes.menu, "tsx"),
    highlight(codes.active, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Data Display"
          title="Panel / PanelLayout"
          description="Full-page app shell with a collapsible sidebar, responsive navbar, and nested menu support. This very documentation site is built with it."
        />

        <section id="overview" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Overview</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">PanelLayout</code> renders a full-page admin shell.
            It manages the sidebar collapse state, mobile overlay, and navbar toggle internally.
            You only need to provide the menu items, active IDs, and optional logo/navbar configuration.
          </p>
        </section>

        <section id="setup" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Setup</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Wrap your page content in <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">PanelLayout</code> in a client layout component.
          </p>
          <CodeBlock code={setupHl} rawCode={codes.setup} />
        </section>

        <section id="menu" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Menu items</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Each <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">SidebarMenuNode</code> requires a unique numeric <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">id</code> and a <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">label</code>.
            Set <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">href</code> for leaf items and <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">children</code> for groups.
          </p>
          <CodeBlock code={menuHl} rawCode={codes.menu} />
        </section>

        <section id="active" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Active state</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Pass a <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">Set&lt;number&gt;</code> of active node IDs.
            In Next.js, derive this from <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">usePathname()</code>.
          </p>
          <CodeBlock code={activeHl} rawCode={codes.active} />
        </section>

        <section id="api-layout" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">PanelLayout API</h2>
          <PropsTable props={panelLayoutProps} />
        </section>

        <section id="api-sidebar" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Sidebar props</h2>
          <PropsTable props={sidebarProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
