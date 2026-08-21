import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { tooltipProps } from "./_props"
import { BasicDemo, PlacementsDemo, ColorsDemo, VariantsDemo, NoArrowDemo, PillDemo, RichContentDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "placements", label: "Placements", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "variants", label: "Variants", depth: 2 as const },
  { id: "no-arrow", label: "No arrow", depth: 2 as const },
  { id: "pill", label: "Pill", depth: 2 as const },
  { id: "rich", label: "Rich content", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Tooltip, Button } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip content="This is a tooltip">
      <Button variant="outlined">Hover me</Button>
    </Tooltip>
  )
}`,
  placements: `import { Tooltip, Button } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Tooltip content="Top" placement="top"><Button size="sm">top</Button></Tooltip>
      <Tooltip content="Bottom" placement="bottom"><Button size="sm">bottom</Button></Tooltip>
      <Tooltip content="Left" placement="left"><Button size="sm">left</Button></Tooltip>
      <Tooltip content="Right" placement="right"><Button size="sm">right</Button></Tooltip>
    </div>
  )
}`,
  colors: `import { Tooltip, Button } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Tooltip content="primary" color="primary"><Button size="sm" color="primary" variant="soft">primary</Button></Tooltip>
      <Tooltip content="success" color="success"><Button size="sm" color="success" variant="soft">success</Button></Tooltip>
      <Tooltip content="danger" color="danger"><Button size="sm" color="danger" variant="soft">danger</Button></Tooltip>
    </div>
  )
}`,
  variants: `import { Tooltip, Button } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Tooltip content="Filled" variant="filled"><Button size="sm" variant="soft">Filled</Button></Tooltip>
      <Tooltip content="Soft" variant="soft" color="primary"><Button size="sm" variant="soft">Soft</Button></Tooltip>
      <Tooltip content="Outlined" variant="outlined" color="primary"><Button size="sm" variant="soft">Outlined</Button></Tooltip>
    </div>
  )
}`,
  noArrow: `import { Tooltip, Button } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip content="No arrow" showArrow={false}>
      <Button variant="outlined" size="sm">No arrow</Button>
    </Tooltip>
  )
}`,
  pill: `import { Tooltip, Button } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip content="Pill tooltip" isPill>
      <Button variant="outlined" size="sm">Pill</Button>
    </Tooltip>
  )
}`,
  rich: `import { Tooltip, Button } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip
      content={
        <div className="space-y-1">
          <p className="font-semibold text-white">Rich tooltip</p>
          <p className="text-neutral-300 text-xs">Supports any ReactNode content.</p>
        </div>
      }
      maxWidth="md"
    >
      <Button variant="outlined" size="sm">Rich content</Button>
    </Tooltip>
  )
}`,
}

export default async function TooltipPage() {
  const [basicHl, placementsHl, colorsHl, variantsHl, noArrowHl, pillHl, richHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.placements, "tsx"),
    highlight(codes.colors, "tsx"),
    highlight(codes.variants, "tsx"),
    highlight(codes.noArrow, "tsx"),
    highlight(codes.pill, "tsx"),
    highlight(codes.rich, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="General"
          title="Tooltip"
          description="Floating label that appears on hover or focus. Powered by floating-ui with smart auto-positioning and arrow support."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="placements" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Placements</h2>
          <ComponentDemo code={placementsHl} rawCode={codes.placements} title="top / bottom / left / right">
            <PlacementsDemo />
          </ComponentDemo>
        </section>

        <section id="colors" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Colors</h2>
          <ComponentDemo code={colorsHl} rawCode={codes.colors}>
            <ColorsDemo />
          </ComponentDemo>
        </section>

        <section id="variants" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Variants</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants}>
            <VariantsDemo />
          </ComponentDemo>
        </section>

        <section id="no-arrow" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">No arrow</h2>
          <ComponentDemo code={noArrowHl} rawCode={codes.noArrow}>
            <NoArrowDemo />
          </ComponentDemo>
        </section>

        <section id="pill" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Pill</h2>
          <ComponentDemo code={pillHl} rawCode={codes.pill}>
            <PillDemo />
          </ComponentDemo>
        </section>

        <section id="rich" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Rich content</h2>
          <ComponentDemo code={richHl} rawCode={codes.rich}>
            <RichContentDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={tooltipProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
