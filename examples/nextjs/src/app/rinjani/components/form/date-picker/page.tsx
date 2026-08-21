import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { datePickerProps } from "./_props"
import { BasicDemo, FloatingDemo, ClearableDemo, MinMaxDemo, ErrorDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "floating", label: "Floating label", depth: 2 as const },
  { id: "clearable", label: "Clearable", depth: 2 as const },
  { id: "min-max", label: "Min / max date", depth: 2 as const },
  { id: "adapters", label: "Date adapters", depth: 2 as const },
  { id: "error", label: "Error state", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { DatePicker } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [value, setValue] = useState<Date | null>(null)
  return <DatePicker label="Date" value={value} onChange={setValue} />
}`,
  floating: `<DatePicker label="Date of birth" value={value} onChange={setValue} floating />`,
  clearable: `<DatePicker label="Appointment" value={value} onChange={setValue} isClearable />`,
  minMax: `const min = new Date(2024, 0, 1)
const max = new Date(2024, 11, 31)

<DatePicker label="Year 2024 only" value={value} onChange={setValue} minDate={min} maxDate={max} />`,
  adapters: `// Using Day.js adapter
import { DatePicker, DayjsAdapter } from 'rinjani-ui'
import dayjs from 'dayjs'

const adapter = new DayjsAdapter(dayjs)

<DatePicker label="Date" adapter={adapter} value={value} onChange={setValue} format="DD/MM/YYYY" />`,
  error: `<DatePicker label="Start date" onChange={() => {}} error="Start date is required." />`,
}

export default async function DatePickerPage() {
  const [basicHl, floatingHl, clearableHl, minMaxHl, adaptersHl, errorHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.floating, "tsx"),
    highlight(codes.clearable, "tsx"),
    highlight(codes.minMax, "tsx"),
    highlight(codes.adapters, "tsx"),
    highlight(codes.error, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Form"
          title="DatePicker"
          description="Date picker with year/month/day views, min/max constraints, floating label, and an adapter pattern for Day.js, Moment, or native Date."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="floating" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Floating label</h2>
          <ComponentDemo code={floatingHl} rawCode={codes.floating}>
            <FloatingDemo />
          </ComponentDemo>
        </section>

        <section id="clearable" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Clearable</h2>
          <ComponentDemo code={clearableHl} rawCode={codes.clearable}>
            <ClearableDemo />
          </ComponentDemo>
        </section>

        <section id="min-max" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Min / max date</h2>
          <ComponentDemo code={minMaxHl} rawCode={codes.minMax}>
            <MinMaxDemo />
          </ComponentDemo>
        </section>

        <section id="adapters" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Date adapters</h2>
          <p className="text-sm text-neutral-600 mb-4">
            By default, DatePicker works with native <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">Date</code>.
            Pass an adapter instance to use Day.js or Moment.js instead.
            The adapter implements the <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">DateAdapter&lt;T&gt;</code> interface.
          </p>
          <div className="rounded-xl border border-neutral-200 overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: adaptersHl }} />
          </div>
        </section>

        <section id="error" className="scroll-mt-24 mt-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Error state</h2>
          <ComponentDemo code={errorHl} rawCode={codes.error}>
            <ErrorDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={datePickerProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
