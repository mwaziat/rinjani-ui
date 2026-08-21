import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { dropzoneProps } from "./_props"
import { BasicDemo, MultipleDemo, DashedDemo, ErrorDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "multiple", label: "Multiple files", depth: 2 as const },
  { id: "dashed", label: "Dashed border", depth: 2 as const },
  { id: "error", label: "Error state", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Dropzone } from 'rinjani-ui'
import type { FileWithPreview } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  return <Dropzone label="Attachment" values={files} onChange={setFiles} />
}`,
  multiple: `<Dropzone
  label="Images"
  values={files}
  onChange={setFiles}
  accept="image/*"
  multiple
  maxFiles={5}
  maxSize={2}
/>`,
  dashed: `<Dropzone label="Upload" values={files} onChange={setFiles} dashed />`,
  error: `<Dropzone label="Required file" values={[]} onChange={() => {}} error="Please upload a file." />`,
}

export default async function DropzonePage() {
  const [basicHl, multipleHl, dashedHl, errorHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.multiple, "tsx"),
    highlight(codes.dashed, "tsx"),
    highlight(codes.error, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Form"
          title="Dropzone"
          description="File upload area with drag-and-drop, file previews, size/type validation, and grid layout support."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic} centered={false}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="multiple" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Multiple files</h2>
          <ComponentDemo code={multipleHl} rawCode={codes.multiple} centered={false}>
            <MultipleDemo />
          </ComponentDemo>
        </section>

        <section id="dashed" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Dashed border</h2>
          <ComponentDemo code={dashedHl} rawCode={codes.dashed} centered={false}>
            <DashedDemo />
          </ComponentDemo>
        </section>

        <section id="error" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Error state</h2>
          <ComponentDemo code={errorHl} rawCode={codes.error} centered={false}>
            <ErrorDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={dropzoneProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
