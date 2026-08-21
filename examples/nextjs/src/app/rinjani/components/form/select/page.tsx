import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { selectProps } from "./_props"
import { BasicDemo, VariantsDemo, ClearableDemo, FloatingDemo, MultipleDemo, ErrorDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "variants", label: "Variants", depth: 2 as const },
  { id: "clearable", label: "Clearable", depth: 2 as const },
  { id: "floating", label: "Floating label", depth: 2 as const },
  { id: "multiple", label: "Multiple select", depth: 2 as const },
  { id: "error", label: "Error state", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Select } from 'rinjani-ui'
import { useState } from 'react'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

export default function Example() {
  const [value, setValue] = useState('')
  return (
    <Select
      label="Fruit"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select a fruit"
    />
  )
}`,
  variants: `<Select label="Outlined" variant="outlined" options={options} onChange={() => {}} placeholder="outlined" />
<Select label="Filled" variant="filled" options={options} onChange={() => {}} placeholder="filled" />
<Select label="Line" variant="line" options={options} onChange={() => {}} placeholder="line" />`,
  clearable: `<Select label="Country" options={options} value={value} onChange={setValue} isClearable />`,
  floating: `<Select label="Country" options={options} value={value} onChange={setValue} floating />`,
  multiple: `import { SelectMultiple } from 'rinjani-ui'

<SelectMultiple
  label="Fruits"
  options={options}
  value={values}
  onChange={setValues}
  placeholder="Select fruits"
  isClearable
/>`,
  error: `<Select label="Country" options={options} onChange={() => {}} error="Please select a country." />`,
}

export default async function SelectPage() {
  const [basicHl, variantsHl, clearableHl, floatingHl, multipleHl, errorHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.variants, "tsx"),
    highlight(codes.clearable, "tsx"),
    highlight(codes.floating, "tsx"),
    highlight(codes.multiple, "tsx"),
    highlight(codes.error, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Form"
          title="Select"
          description="Dropdown select with floating label, clearable, and multi-select via SelectMultiple. Three variants."
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

        <section id="clearable" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Clearable</h2>
          <ComponentDemo code={clearableHl} rawCode={codes.clearable}>
            <ClearableDemo />
          </ComponentDemo>
        </section>

        <section id="floating" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Floating label</h2>
          <ComponentDemo code={floatingHl} rawCode={codes.floating}>
            <FloatingDemo />
          </ComponentDemo>
        </section>

        <section id="multiple" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Multiple select</h2>
          <ComponentDemo code={multipleHl} rawCode={codes.multiple}>
            <MultipleDemo />
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
          <PropsTable props={selectProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
