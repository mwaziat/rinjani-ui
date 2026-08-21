import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { checkboxProps } from "./_props"
import { BasicDemo, RowDemo, ColorsDemo, ErrorDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "row", label: "Row orientation", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "error", label: "Error state", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Checkbox } from 'rinjani-ui'
import { useState } from 'react'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

export default function Example() {
  const [values, setValues] = useState(['apple'])
  return (
    <Checkbox label="Select fruits" options={options} values={values} onChange={setValues} />
  )
}`,
  row: `<Checkbox options={options} values={values} onChange={setValues} orientation="row" />`,
  colors: `<Checkbox options={options} values={values} onChange={setValues} color="success" />`,
  error: `<Checkbox
  label="Required"
  options={options}
  values={[]}
  onChange={() => {}}
  error="Please select at least one option."
  required
/>`,
}

export default async function CheckboxPage() {
  const [basicHl, rowHl, colorsHl, errorHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.row, "tsx"),
    highlight(codes.colors, "tsx"),
    highlight(codes.error, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Form"
          title="Checkbox"
          description="Controlled checkbox group with multi-value selection, vertical/horizontal orientation, and color themes."
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

        <section id="error" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Error state</h2>
          <ComponentDemo code={errorHl} rawCode={codes.error}>
            <ErrorDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={checkboxProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
