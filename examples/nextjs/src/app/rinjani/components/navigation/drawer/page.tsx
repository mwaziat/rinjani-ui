import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { drawerProps, drawerHeaderProps } from "./_props"
import { BasicDemo, PositionsDemo, SizesDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "positions", label: "Positions", depth: 2 as const },
  { id: "sizes", label: "Sizes", depth: 2 as const },
  { id: "api", label: "Drawer API", depth: 2 as const },
  { id: "api-header", label: "Drawer.Header API", depth: 2 as const },
]

const codes = {
  basic: `import { Drawer, Button } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <Drawer.Header title="Drawer title" subtitle="Optional subtitle" onClose={() => setOpen(false)} />
        <Drawer.Content>
          <p className="text-sm text-neutral-600">Drawer content goes here.</p>
        </Drawer.Content>
        <Drawer.Footer>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
}`,
  positions: `// position prop: "right" | "left" | "top" | "bottom"
<Drawer isOpen={open} onClose={close} position="left">`,
  sizes: `// size prop: "xs" | "sm" | "md" | "lg" | "xl" | "1/4" | "1/3" | "1/2" | "2/3" | "3/4" | "full"
<Drawer isOpen={open} onClose={close} size="1/2">`,
}

export default async function DrawerPage() {
  const [basicHl, positionsHl, sizesHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.positions, "tsx"),
    highlight(codes.sizes, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Navigation"
          title="Drawer"
          description="A panel that slides in from any screen edge. Composes Header, Content, and Footer sub-components. Supports percentage-based sizes."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="positions" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Positions</h2>
          <p className="text-sm text-neutral-500 mb-4">Use the <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">position</code> prop to control which edge the drawer slides in from.</p>
          <ComponentDemo code={positionsHl} rawCode={codes.positions}>
            <PositionsDemo />
          </ComponentDemo>
        </section>

        <section id="sizes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Sizes</h2>
          <p className="text-sm text-neutral-500 mb-4">Supports t-shirt sizes and percentage fractions like <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">1/2</code> or <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">3/4</code>.</p>
          <ComponentDemo code={sizesHl} rawCode={codes.sizes}>
            <SizesDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Drawer API</h2>
          <PropsTable props={drawerProps} />
        </section>

        <section id="api-header" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Drawer.Header API</h2>
          <PropsTable props={drawerHeaderProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
