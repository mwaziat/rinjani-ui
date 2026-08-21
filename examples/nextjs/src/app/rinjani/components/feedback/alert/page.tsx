import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { alertProps } from "./_props"
import { BasicDemo, VariantsDemo, CloseableDemo, MinimizeDemo, AutoDismissDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "variants", label: "Variants", depth: 2 as const },
  { id: "closeable", label: "Closeable", depth: 2 as const },
  { id: "minimize", label: "Minimize", depth: 2 as const },
  { id: "auto-dismiss", label: "Auto-dismiss", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Alert } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="space-y-3">
      <Alert title="Information" message="This is an informational alert." color="info" />
      <Alert title="Success" message="Your changes have been saved." color="success" />
      <Alert title="Warning" message="Please review before proceeding." color="warning" />
      <Alert title="Error" message="Something went wrong." color="danger" />
    </div>
  )
}`,
  variants: `import { Alert } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="space-y-3">
      <Alert title="Soft" message="Default variant." variant="soft" color="primary" />
      <Alert title="Filled" message="High emphasis." variant="filled" color="primary" />
      <Alert title="Outlined" message="Low emphasis." variant="outlined" color="primary" />
    </div>
  )
}`,
  closeable: `import { Alert } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [show, setShow] = useState(true)
  return show ? (
    <Alert
      title="Closeable"
      message="Click the X to dismiss."
      color="info"
      action="close"
      onClose={() => setShow(false)}
    />
  ) : null
}`,
  minimize: `import { Alert } from 'rinjani-ui'

export default function Example() {
  return (
    <Alert
      title="Minimizable"
      message="Click the chevron to collapse."
      color="warning"
      action="minimize"
    />
  )
}`,
  autoDismiss: `import { Alert } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(true)}>Show alert</button>
      {show && (
        <Alert
          title="Auto-dismiss"
          message="Disappears after 3 seconds."
          color="success"
          duration={3000}
          onClose={() => setShow(false)}
        />
      )}
    </>
  )
}`,
}

export default async function AlertPage() {
  const [basicHl, variantsHl, closeableHl, minimizeHl, autoDismissHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.variants, "tsx"),
    highlight(codes.closeable, "tsx"),
    highlight(codes.minimize, "tsx"),
    highlight(codes.autoDismiss, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Feedback"
          title="Alert"
          description="Inline status messages with close, minimize, and auto-dismiss actions. Three variants, seven colors."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic} centered={false}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="variants" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Variants</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants} centered={false}>
            <VariantsDemo />
          </ComponentDemo>
        </section>

        <section id="closeable" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Closeable</h2>
          <ComponentDemo code={closeableHl} rawCode={codes.closeable} centered={false}>
            <CloseableDemo />
          </ComponentDemo>
        </section>

        <section id="minimize" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Minimize</h2>
          <ComponentDemo code={minimizeHl} rawCode={codes.minimize} centered={false}>
            <MinimizeDemo />
          </ComponentDemo>
        </section>

        <section id="auto-dismiss" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Auto-dismiss</h2>
          <ComponentDemo code={autoDismissHl} rawCode={codes.autoDismiss} centered={false}>
            <AutoDismissDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={alertProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
