import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { badgeProps } from "./_props"
import { BasicDemo, ColorsDemo, SizesDemo, PillDemo, WithIconsDemo, StatusDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "sizes", label: "Sizes", depth: 2 as const },
  { id: "pill", label: "Pill shape", depth: 2 as const },
  { id: "icons", label: "With icons", depth: 2 as const },
  { id: "status", label: "Status indicators", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Badge } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Badge variant="filled">Filled</Badge>
      <Badge variant="outlined">Outlined</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="text">Text</Badge>
    </div>
  )
}`,
  colors: `import { Badge } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="neutral">Neutral</Badge>
    </div>
  )
}`,
  sizes: `import { Badge } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="xxs">XXSmall</Badge>
      <Badge size="xs">XSmall</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">XLarge</Badge>
    </div>
  )
}`,
  pill: `import { Badge } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Badge isPill>Default</Badge>
      <Badge isPill color="success">Success</Badge>
      <Badge isPill color="danger" variant="outlined">Danger</Badge>
    </div>
  )
}`,
  icons: `import { Badge } from 'rinjani-ui'
import { FiCheck, FiX, FiStar } from 'react-icons/fi'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Badge leftIcon={<FiCheck size={12} />} color="success">Approved</Badge>
      <Badge leftIcon={<FiX size={12} />} color="danger">Rejected</Badge>
      <Badge leftIcon={<FiStar size={12} />} color="warning">Featured</Badge>
    </div>
  )
}`,
  status: `import { Badge } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Badge color="success" variant="soft" isPill
        leftIcon={<span className="w-1.5 h-1.5 rounded-full bg-success-500 inline-block" />}>
        Active
      </Badge>
      <Badge color="warning" variant="soft" isPill
        leftIcon={<span className="w-1.5 h-1.5 rounded-full bg-warning-500 inline-block" />}>
        Pending
      </Badge>
    </div>
  )
}`,
}

export default async function BadgePage() {
  const [basicHl, colorsHl, sizesHl, pillHl, iconsHl, statusHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.colors, "tsx"),
    highlight(codes.sizes, "tsx"),
    highlight(codes.pill, "tsx"),
    highlight(codes.icons, "tsx"),
    highlight(codes.status, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="General"
          title="Badge"
          description="Compact labels used to highlight status, categories, or metadata. Supports four variants, seven colors, and icon slots."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic} title="Variants">
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="colors" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Colors</h2>
          <ComponentDemo code={colorsHl} rawCode={codes.colors} title="Color palette">
            <ColorsDemo />
          </ComponentDemo>
        </section>

        <section id="sizes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Sizes</h2>
          <ComponentDemo code={sizesHl} rawCode={codes.sizes} title="Size scale">
            <SizesDemo />
          </ComponentDemo>
        </section>

        <section id="pill" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Pill shape</h2>
          <ComponentDemo code={pillHl} rawCode={codes.pill} title="isPill">
            <PillDemo />
          </ComponentDemo>
        </section>

        <section id="icons" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">With icons</h2>
          <ComponentDemo code={iconsHl} rawCode={codes.icons} title="leftIcon / rightIcon">
            <WithIconsDemo />
          </ComponentDemo>
        </section>

        <section id="status" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Status indicators</h2>
          <ComponentDemo code={statusHl} rawCode={codes.status} title="Online / offline dots">
            <StatusDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Badge extends standard HTML div attributes in addition to the props below.
          </p>
          <PropsTable props={badgeProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
