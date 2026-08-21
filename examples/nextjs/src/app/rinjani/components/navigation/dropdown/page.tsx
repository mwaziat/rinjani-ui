import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { dropdownProps, dropdownItemProps } from "./_props"
import { BasicDemo, VariantsDemo, ColorsDemo, WithIconDemo, PlacementsDemo, NoArrowDemo, IconOnlyDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "variants", label: "Variants", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "with-icon", label: "With icon", depth: 2 as const },
  { id: "placements", label: "Placements", depth: 2 as const },
  { id: "no-arrow", label: "No arrow", depth: 2 as const },
  { id: "icon-only", label: "Icon only", depth: 2 as const },
  { id: "api", label: "Dropdown API", depth: 2 as const },
  { id: "api-item", label: "Dropdown.Item API", depth: 2 as const },
]

const codes = {
  basic: `import { Dropdown } from 'rinjani-ui'
import { FiEdit, FiDownload, FiTrash2 } from 'react-icons/fi'

export default function Example() {
  return (
    <Dropdown label="Options">
      <Dropdown.List>
        <Dropdown.Item leftIcon={<FiEdit size={14} />}>Edit</Dropdown.Item>
        <Dropdown.Item leftIcon={<FiDownload size={14} />}>Download</Dropdown.Item>
        <Dropdown.Item leftIcon={<FiTrash2 size={14} />} color="danger">Delete</Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  )
}`,
  variants: `import { Dropdown } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Dropdown label="Filled" variant="filled"><Dropdown.List><Dropdown.Item>Item</Dropdown.Item></Dropdown.List></Dropdown>
      <Dropdown label="Outlined" variant="outlined"><Dropdown.List><Dropdown.Item>Item</Dropdown.Item></Dropdown.List></Dropdown>
      <Dropdown label="Soft" variant="soft"><Dropdown.List><Dropdown.Item>Item</Dropdown.Item></Dropdown.List></Dropdown>
      <Dropdown label="Text" variant="text"><Dropdown.List><Dropdown.Item>Item</Dropdown.Item></Dropdown.List></Dropdown>
    </div>
  )
}`,
  withIcon: `import { Dropdown } from 'rinjani-ui'
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi'

export default function Example() {
  return (
    <Dropdown label="Account" icon={<FiUser size={14} />}>
      <Dropdown.List>
        <Dropdown.Item leftIcon={<FiSettings size={14} />}>Settings</Dropdown.Item>
        <Dropdown.Item leftIcon={<FiLogOut size={14} />} color="danger">Sign out</Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  )
}`,
  iconOnly: `import { Dropdown } from 'rinjani-ui'
import { FiSettings, FiEdit, FiTrash2 } from 'react-icons/fi'

export default function Example() {
  return (
    <Dropdown icon={<FiSettings size={16} />} showArrow={false} variant="outlined">
      <Dropdown.List>
        <Dropdown.Item leftIcon={<FiEdit size={14} />}>Edit</Dropdown.Item>
        <Dropdown.Item leftIcon={<FiTrash2 size={14} />} color="danger">Delete</Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  )
}`,
}

export default async function DropdownPage() {
  const [basicHl, variantsHl, withIconHl, iconOnlyHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.variants, "tsx"),
    highlight(codes.withIcon, "tsx"),
    highlight(codes.iconOnly, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Navigation"
          title="Dropdown"
          description="A trigger button that reveals a floating list of actions. Composes Dropdown.List and Dropdown.Item for flexible menu building."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="variants" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Variants</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants}>
            <VariantsDemo />
          </ComponentDemo>
        </section>

        <section id="colors" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Colors</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants}>
            <ColorsDemo />
          </ComponentDemo>
        </section>

        <section id="with-icon" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">With icon</h2>
          <ComponentDemo code={withIconHl} rawCode={codes.withIcon}>
            <WithIconDemo />
          </ComponentDemo>
        </section>

        <section id="placements" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Placements</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants}>
            <PlacementsDemo />
          </ComponentDemo>
        </section>

        <section id="no-arrow" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">No arrow</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants}>
            <NoArrowDemo />
          </ComponentDemo>
        </section>

        <section id="icon-only" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Icon only</h2>
          <ComponentDemo code={iconOnlyHl} rawCode={codes.iconOnly}>
            <IconOnlyDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Dropdown API</h2>
          <PropsTable props={dropdownProps} />
        </section>

        <section id="api-item" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Dropdown.Item API</h2>
          <p className="text-sm text-neutral-500 mb-4">Extends standard HTML button attributes.</p>
          <PropsTable props={dropdownItemProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
