import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { dialogProps } from "./_props"
import { BasicDemo, TypesDemo, CustomActionsDemo } from "./_demos"

const tocItems = [
  { id: "setup", label: "Setup", depth: 2 as const },
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "types", label: "Types", depth: 2 as const },
  { id: "custom-actions", label: "Custom actions", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  setup: `// app/layout.tsx
import { DialogProvider } from 'rinjani-ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DialogProvider>{children}</DialogProvider>
      </body>
    </html>
  )
}`,
  basic: `import { useDialog, Button } from 'rinjani-ui'

export default function Example() {
  const dialog = useDialog()
  return (
    <Button
      onClick={() =>
        dialog.open({
          title: 'Confirm action',
          message: 'Are you sure you want to proceed?',
          type: 'confirm',
          showCancel: true,
          onConfirm: () => console.log('confirmed'),
        })
      }
    >
      Open Dialog
    </Button>
  )
}`,
  types: `// type: "success" | "error" | "warning" | "info" | "confirm" | "default"
dialog.open({ title: 'Success', message: 'Done!', type: 'success' })
dialog.open({ title: 'Error', message: 'Failed.', type: 'error' })`,
  customActions: `dialog.open({
  title: 'Delete item',
  message: 'This action cannot be undone.',
  type: 'error',
  actions: [
    { label: 'Cancel', variant: 'outlined', color: 'neutral', onClick: (close) => close() },
    { label: 'Delete', variant: 'filled', color: 'danger', onClick: (close) => { doDelete(); close() } },
  ],
})`,
}

export default async function DialogPage() {
  const [setupHl, basicHl, typesHl, customActionsHl] = await Promise.all([
    highlight(codes.setup, "tsx"),
    highlight(codes.basic, "tsx"),
    highlight(codes.types, "tsx"),
    highlight(codes.customActions, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Feedback"
          title="Dialog"
          description="Imperative confirmation dialog triggered via the useDialog hook. Supports typed icons, cancel/confirm buttons, and fully custom action sets."
        />

        <section id="setup" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Setup</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Wrap your root layout with <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">DialogProvider</code> once.
            Then call <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">useDialog()</code> anywhere in your component tree.
          </p>
          <div className="rounded-xl border border-neutral-200 overflow-hidden">
            <div className="border-t border-neutral-200">
              <div dangerouslySetInnerHTML={{ __html: setupHl }} />
            </div>
          </div>
        </section>

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="types" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Types</h2>
          <ComponentDemo code={typesHl} rawCode={codes.types}>
            <TypesDemo />
          </ComponentDemo>
        </section>

        <section id="custom-actions" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Custom actions</h2>
          <ComponentDemo code={customActionsHl} rawCode={codes.customActions}>
            <CustomActionsDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <p className="text-sm text-neutral-500 mb-4">Options passed to <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">dialog.open()</code>.</p>
          <PropsTable props={dialogProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
