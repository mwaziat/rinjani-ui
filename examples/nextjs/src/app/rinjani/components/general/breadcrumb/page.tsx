import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { breadcrumbProps } from "./_props"
import { BasicDemo, ColorsDemo, ContainedDemo, WithIconsDemo, CustomSeparatorDemo, SizesDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "contained", label: "Contained variants", depth: 2 as const },
  { id: "icons", label: "With icons", depth: 2 as const },
  { id: "separator", label: "Custom separator", depth: 2 as const },
  { id: "sizes", label: "Sizes", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  return (
    <Breadcrumb
      paths={[
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/components' },
      ]}
      activeLabel="Breadcrumb"
    />
  )
}`,
  colors: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Primary" color="primary" />
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Success" color="success" />
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Danger" color="danger" />
    </div>
  )
}`,
  contained: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  const paths = [{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }]
  return (
    <div className="flex flex-col gap-3 w-full">
      <Breadcrumb paths={paths} activeLabel="Filled" contained variant="filled" />
      <Breadcrumb paths={paths} activeLabel="Outlined" contained variant="outlined" />
      <Breadcrumb paths={paths} activeLabel="Soft" contained variant="soft" />
      <Breadcrumb paths={paths} activeLabel="Line" contained variant="line" />
    </div>
  )
}`,
  icons: `import { Breadcrumb } from 'rinjani-ui'
import { FiHome } from 'react-icons/fi'

export default function Example() {
  return (
    <Breadcrumb
      paths={[
        { label: 'Home', href: '/', icon: <FiHome size={14} /> },
        { label: 'Components', href: '/components' },
      ]}
      activeLabel="Breadcrumb"
    />
  )
}`,
  separator: `import { Breadcrumb } from 'rinjani-ui'
import { FiChevronRight } from 'react-icons/fi'

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Slash" separator="/" />
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Arrow" separator={<FiChevronRight size={14} />} />
    </div>
  )
}`,
  sizes: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="XSmall" size="xs" />
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Small" size="sm" />
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Medium" size="md" />
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Large" size="lg" />
    </div>
  )
}`,
}

export default async function BreadcrumbPage() {
  const [basicHl, colorsHl, containedHl, iconsHl, separatorHl, sizesHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.colors, "tsx"),
    highlight(codes.contained, "tsx"),
    highlight(codes.icons, "tsx"),
    highlight(codes.separator, "tsx"),
    highlight(codes.sizes, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="General"
          title="Breadcrumb"
          description="Navigation aid that shows the user's location in a hierarchy. Supports contained variants, custom separators, and icons."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="colors" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Colors</h2>
          <ComponentDemo code={colorsHl} rawCode={codes.colors} centered={false}>
            <ColorsDemo />
          </ComponentDemo>
        </section>

        <section id="contained" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Contained variants</h2>
          <p className="text-sm text-neutral-500 mb-4">Set <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">contained</code> to wrap the trail in a styled block.</p>
          <ComponentDemo code={containedHl} rawCode={codes.contained} centered={false}>
            <ContainedDemo />
          </ComponentDemo>
        </section>

        <section id="icons" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">With icons</h2>
          <ComponentDemo code={iconsHl} rawCode={codes.icons}>
            <WithIconsDemo />
          </ComponentDemo>
        </section>

        <section id="separator" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Custom separator</h2>
          <ComponentDemo code={separatorHl} rawCode={codes.separator} centered={false}>
            <CustomSeparatorDemo />
          </ComponentDemo>
        </section>

        <section id="sizes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Sizes</h2>
          <ComponentDemo code={sizesHl} rawCode={codes.sizes} centered={false}>
            <SizesDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={breadcrumbProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
