import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { tabsProps, tabsItemProps } from "./_props"
import { BasicDemo, VariantsDemo, ColorsDemo, WithIconsDemo, VerticalDemo, ScrollBehaviorDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "variants", label: "Variants", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "icons", label: "With icons", depth: 2 as const },
  { id: "vertical", label: "Vertical placement", depth: 2 as const },
  { id: "scroll", label: "Scroll behavior", depth: 2 as const },
  { id: "api", label: "Tabs API", depth: 2 as const },
  { id: "api-item", label: "Tabs.Item API", depth: 2 as const },
]

const codes = {
  basic: `import { Tabs } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [tab, setTab] = useState('profile')
  return (
    <Tabs activeTab={tab} onChange={setTab}>
      <Tabs.List>
        <Tabs.Item value="profile">Profile</Tabs.Item>
        <Tabs.Item value="settings">Settings</Tabs.Item>
        <Tabs.Item value="notifications">Notifications</Tabs.Item>
      </Tabs.List>
      <Tabs.Content value="profile"><p className="py-4">Profile content</p></Tabs.Content>
      <Tabs.Content value="settings"><p className="py-4">Settings content</p></Tabs.Content>
      <Tabs.Content value="notifications"><p className="py-4">Notifications content</p></Tabs.Content>
    </Tabs>
  )
}`,
  variants: `import { Tabs } from 'rinjani-ui'

// variant prop: "line" | "filled" | "soft" | "outlined" | "text"
<Tabs activeTab={tab} onChange={setTab} variant="filled">`,
  icons: `import { Tabs } from 'rinjani-ui'
import { FiUser, FiSettings } from 'react-icons/fi'

<Tabs activeTab={tab} onChange={setTab}>
  <Tabs.List>
    <Tabs.Item value="profile" icon={<FiUser size={14} />}>Profile</Tabs.Item>
    <Tabs.Item value="settings" icon={<FiSettings size={14} />}>Settings</Tabs.Item>
  </Tabs.List>
</Tabs>`,
  vertical: `import { Tabs } from 'rinjani-ui'

<Tabs activeTab={tab} onChange={setTab} placement="vertical-left">
  <Tabs.List>
    <Tabs.Item value="profile">Profile</Tabs.Item>
    <Tabs.Item value="settings">Settings</Tabs.Item>
  </Tabs.List>
  <Tabs.Content value="profile">Profile content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs>`,
  scroll: `import { Tabs } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [tab, setTab] = useState('profile')

  return (
    <Tabs
      activeTab={tab}
      onChange={setTab}
      behavior="scroll"
      scrollOffset={80}
      scrollBehavior="smooth"
      scrollSpy
      scrollContainer
      scrollMaxHeight="24rem"
    >
      <Tabs.List>
        <Tabs.Item value="profile">Hotel Profile</Tabs.Item>
        <Tabs.Item value="contacts">Contacts & Location</Tabs.Item>
      </Tabs.List>

      <Tabs.Content value="profile">Profile section</Tabs.Content>
      <Tabs.Content value="contacts">Contacts section</Tabs.Content>
    </Tabs>
  )
}`,
}

export default async function TabsPage() {
  const [basicHl, variantsHl, iconsHl, verticalHl, scrollHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.variants, "tsx"),
    highlight(codes.icons, "tsx"),
    highlight(codes.vertical, "tsx"),
    highlight(codes.scroll, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Navigation"
          title="Tabs"
          description="Organizes content into switchable panels. Supports horizontal and vertical layouts, five variants, icons, and full-width alignment."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic} centered={false}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="variants" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Variants</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants} centered={false}>
            <VariantsDemo />
          </ComponentDemo>
        </section>

        <section id="colors" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Colors</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants} centered={false}>
            <ColorsDemo />
          </ComponentDemo>
        </section>

        <section id="icons" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">With icons</h2>
          <ComponentDemo code={iconsHl} rawCode={codes.icons} centered={false}>
            <WithIconsDemo />
          </ComponentDemo>
        </section>

        <section id="vertical" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Vertical placement</h2>
          <ComponentDemo code={verticalHl} rawCode={codes.vertical} centered={false}>
            <VerticalDemo />
          </ComponentDemo>
        </section>

        <section id="scroll" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Scroll behavior</h2>
          <p className="text-sm text-neutral-500 mb-4">Set <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">behavior="scroll"</code> to keep all sections visible. Clicking a tab scrolls to its section, while <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">scrollSpy</code> keeps the active tab synchronized with manual scrolling.</p>
          <ComponentDemo code={scrollHl} rawCode={codes.scroll} centered={false}>
            <ScrollBehaviorDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Tabs API</h2>
          <PropsTable props={tabsProps} />
        </section>

        <section id="api-item" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Tabs.Item API</h2>
          <PropsTable props={tabsItemProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
