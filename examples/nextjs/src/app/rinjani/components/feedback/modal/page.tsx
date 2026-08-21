import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { modalProps, modalHeaderProps } from "./_props"
import { BasicDemo, SizesDemo, ScrollModeDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "sizes", label: "Sizes", depth: 2 as const },
  { id: "scroll-mode", label: "Scroll mode", depth: 2 as const },
  { id: "api", label: "Modal API", depth: 2 as const },
  { id: "api-header", label: "Modal.Header API", depth: 2 as const },
]

const codes = {
  basic: `import { Modal, Button } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Header title="Modal title" subtitle="Optional subtitle" onClose={() => setOpen(false)} />
        <Modal.Content>
          <p className="text-sm text-neutral-600">Modal body content.</p>
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}`,
  sizes: `// size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
<Modal isOpen={open} onClose={close} size="lg">`,
  scrollMode: `// scrollMode: "dialog" | "content"
// "dialog" — the entire modal scrolls inside the viewport
// "content" — only Modal.Content scrolls; header/footer stay fixed
<Modal isOpen={open} onClose={close} scrollMode="content">`,
}

export default async function ModalPage() {
  const [basicHl, sizesHl, scrollModeHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.sizes, "tsx"),
    highlight(codes.scrollMode, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Feedback"
          title="Modal"
          description="Centered overlay dialog with Header, Content, and Footer sub-components. Supports eight sizes and two scroll modes."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="sizes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Sizes</h2>
          <ComponentDemo code={sizesHl} rawCode={codes.sizes}>
            <SizesDemo />
          </ComponentDemo>
        </section>

        <section id="scroll-mode" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Scroll mode</h2>
          <p className="text-sm text-neutral-500 mb-4">
            <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">dialog</code> scrolls the whole modal.{" "}
            <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">content</code> keeps the header and footer fixed.
          </p>
          <ComponentDemo code={scrollModeHl} rawCode={codes.scrollMode}>
            <ScrollModeDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Modal API</h2>
          <PropsTable props={modalProps} />
        </section>

        <section id="api-header" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Modal.Header API</h2>
          <PropsTable props={modalHeaderProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
