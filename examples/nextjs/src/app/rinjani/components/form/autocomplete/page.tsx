import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { autocompleteProps } from "./_props"
import { BasicDemo, ClearableDemo, AddItemDemo, ErrorDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "clearable", label: "Clearable", depth: 2 as const },
  { id: "add-item", label: "Add item", depth: 2 as const },
  { id: "error", label: "Error state", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Autocomplete } from 'rinjani-ui'
import { useState } from 'react'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

export default function Example() {
  const [value, setValue] = useState('')
  return (
    <Autocomplete
      label="Fruit"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Type to search..."
    />
  )
}`,
  clearable: `<Autocomplete label="Fruit" options={options} value={value} onChange={setValue} isClearable />`,
  addItem: `<Autocomplete
  label="Fruit"
  options={options}
  value={value}
  onChange={setValue}
  enableAddItem
  addItemLabel="Add fruit"
  onAddItem={(opt) => setOptions((prev) => [...prev, opt])}
  placeholder="Type or add new..."
/>`,
  error: `<Autocomplete label="Fruit" options={options} onChange={() => {}} error="Please select a valid option." />`,
}

export default async function AutocompletePage() {
  const [basicHl, clearableHl, addItemHl, errorHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.clearable, "tsx"),
    highlight(codes.addItem, "tsx"),
    highlight(codes.error, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Form"
          title="Autocomplete"
          description="Searchable select with type-ahead filtering, clearable, and the ability to add new items inline or via a custom modal."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="clearable" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Clearable</h2>
          <ComponentDemo code={clearableHl} rawCode={codes.clearable}>
            <ClearableDemo />
          </ComponentDemo>
        </section>

        <section id="add-item" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Add item</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Enable <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">enableAddItem</code> to let users add options not in the list.
          </p>
          <ComponentDemo code={addItemHl} rawCode={codes.addItem}>
            <AddItemDemo />
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
          <PropsTable props={autocompleteProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
