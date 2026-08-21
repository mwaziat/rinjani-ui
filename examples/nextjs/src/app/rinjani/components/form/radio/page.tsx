import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { radioProps } from "./_props"
import { BasicDemo, RowDemo, ColorsDemo, CardDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "row", label: "Row orientation", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "card", label: "Card appearance", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Radio } from 'rinjani-ui'
import { useState } from 'react'

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
]

export default function Example() {
  const [value, setValue] = useState('a')
  return (
    <Radio label="Select an option" options={options} value={value} onChange={setValue} />
  )
}`,
  row: `<Radio options={options} value={value} onChange={setValue} orientation="row" />`,
  colors: `<Radio options={options} value={value} onChange={setValue} color="success" />`,
  card: `<Radio
  label="Plan"
  options={[
    { label: 'Starter', value: 'starter' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ]}
  value={value}
  onChange={setValue}
  appearance="card"
  orientation="row"
/>`,
}

export default async function RadioPage() {
  const [basicHl, rowHl, colorsHl, cardHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.row, "tsx"),
    highlight(codes.colors, "tsx"),
    highlight(codes.card, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Form"
          title="Radio"
          description="Controlled radio group with vertical/horizontal orientation, color themes, and a card appearance variant."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="row" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Row orientation</h2>
          <ComponentDemo code={rowHl} rawCode={codes.row}>
            <RowDemo />
          </ComponentDemo>
        </section>

        <section id="colors" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Colors</h2>
          <ComponentDemo code={colorsHl} rawCode={codes.colors}>
            <ColorsDemo />
          </ComponentDemo>
        </section>

        <section id="card" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Card appearance</h2>
          <ComponentDemo code={cardHl} rawCode={codes.card}>
            <CardDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={radioProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
