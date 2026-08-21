import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { toastProps } from "./_props"
import { BasicDemo, TypesDemo, PlacementsDemo, PersistentDemo } from "./_demos"

const tocItems = [
  { id: "setup", label: "Setup", depth: 2 as const },
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "types", label: "Types", depth: 2 as const },
  { id: "placements", label: "Placements", depth: 2 as const },
  { id: "persistent", label: "Persistent", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  setup: `// app/layout.tsx
import { ToastProvider } from 'rinjani-ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}`,
  basic: `import { useToast, Button } from 'rinjani-ui'

export default function Example() {
  const toast = useToast()
  return (
    <Button onClick={() => toast.show({ message: 'Saved!', type: 'success' })}>
      Show Toast
    </Button>
  )
}`,
  types: `// type: "success" | "error" | "warning" | "info" | "default"
toast.show({ title: 'Done', message: 'Changes saved.', type: 'success' })
toast.show({ title: 'Error', message: 'Request failed.', type: 'error' })`,
  placements: `// placement: "top-right" | "top-left" | "bottom-right" | "bottom-left" 
//           | "top-center" | "bottom-center" | "top-full" | "bottom-full"
toast.show({ message: 'Top center', placement: 'top-center' })`,
  persistent: `// Set duration to 0 for a persistent toast
toast.show({ title: 'Notice', message: 'Will not auto-dismiss.', duration: 0 })`,
}

export default async function ToastPage() {
  const [setupHl, basicHl, typesHl, placementsHl, persistentHl] = await Promise.all([
    highlight(codes.setup, "tsx"),
    highlight(codes.basic, "tsx"),
    highlight(codes.types, "tsx"),
    highlight(codes.placements, "tsx"),
    highlight(codes.persistent, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Feedback"
          title="Toast"
          description="Imperative notification toasts triggered via the useToast hook. Eight placement positions, five types, and persistent mode."
        />

        <section id="setup" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Setup</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Add <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">ToastProvider</code> to your root layout once.
          </p>
          <div className="rounded-xl border border-neutral-200 overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: setupHl }} />
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

        <section id="placements" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Placements</h2>
          <ComponentDemo code={placementsHl} rawCode={codes.placements}>
            <PlacementsDemo />
          </ComponentDemo>
        </section>

        <section id="persistent" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Persistent</h2>
          <ComponentDemo code={persistentHl} rawCode={codes.persistent}>
            <PersistentDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <p className="text-sm text-neutral-500 mb-4">Options passed to <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">toast.show()</code>.</p>
          <PropsTable props={toastProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
