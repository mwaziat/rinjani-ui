import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { switchProps } from "./_props"
import { BasicDemo, ColorsDemo, SizesDemo, LabelPlacementDemo, DisabledDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "sizes", label: "Sizes", depth: 2 as const },
  { id: "label-placement", label: "Label placement", depth: 2 as const },
  { id: "disabled", label: "Disabled", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Switch } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [checked, setChecked] = useState(false)
  return (
    <Switch label="Enable notifications" checked={checked} onChange={setChecked} />
  )
}`,
  colors: `// color: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"
<Switch label="Success" checked={true} onChange={() => {}} color="success" />`,
  sizes: `// size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl"
<Switch label="Large" checked={true} onChange={() => {}} size="lg" />`,
  labelPlacement: `// labelPlacement: "left" | "right" | "top" | "bottom"
<Switch label="Left label" checked={true} onChange={() => {}} labelPlacement="left" />`,
  disabled: `<Switch label="Disabled off" checked={false} onChange={() => {}} disabled />
<Switch label="Disabled on" checked={true} onChange={() => {}} disabled />`,
}

export default async function SwitchPage() {
  const [basicHl, colorsHl, sizesHl, labelHl, disabledHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.colors, "tsx"),
    highlight(codes.sizes, "tsx"),
    highlight(codes.labelPlacement, "tsx"),
    highlight(codes.disabled, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Form"
          title="Switch"
          description="Toggle switch with configurable label placement, six sizes, seven colors, and disabled/read-only states."
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

        <section id="sizes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Sizes</h2>
          <ComponentDemo code={sizesHl} rawCode={codes.sizes} centered={false}>
            <SizesDemo />
          </ComponentDemo>
        </section>

        <section id="label-placement" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Label placement</h2>
          <ComponentDemo code={labelHl} rawCode={codes.labelPlacement}>
            <LabelPlacementDemo />
          </ComponentDemo>
        </section>

        <section id="disabled" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Disabled</h2>
          <ComponentDemo code={disabledHl} rawCode={codes.disabled} centered={false}>
            <DisabledDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={switchProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
