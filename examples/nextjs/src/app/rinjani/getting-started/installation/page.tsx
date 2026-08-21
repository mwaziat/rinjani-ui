import React from "react"
import { highlight } from "@/lib/highlight"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageHeader } from "@/components/docs/PageHeader"
import { TableOfContents } from "@/components/docs/TableOfContents"

const tocItems = [
  { id: "requirements", label: "Requirements", depth: 2 as const },
  { id: "install", label: "Install the package", depth: 2 as const },
  { id: "setup-css", label: "Set up CSS", depth: 2 as const },
  { id: "setup-provider", label: "Add providers", depth: 2 as const },
  { id: "first-component", label: "Use your first component", depth: 2 as const },
]

const codes = {
  npm: `npm install rinjani-ui`,
  yarn: `yarn add rinjani-ui`,
  pnpm: `pnpm add rinjani-ui`,
  css: `/* app/globals.css */
@import "tailwindcss";
@import "rinjani-ui/styles";`,
  provider: `// app/layout.tsx
import { DialogProvider, ToastProvider } from 'rinjani-ui'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DialogProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </DialogProvider>
      </body>
    </html>
  )
}`,
  firstComponent: `import { Button } from 'rinjani-ui'

export default function Page() {
  return <Button color="primary">Hello Rinjani</Button>
}`,
}

export default async function InstallationPage() {
  const [npmHl, yarnHl, pnpmHl, cssHl, providerHl, firstHl] = await Promise.all([
    highlight(codes.npm, "bash"),
    highlight(codes.yarn, "bash"),
    highlight(codes.pnpm, "bash"),
    highlight(codes.css, "css"),
    highlight(codes.provider, "tsx"),
    highlight(codes.firstComponent, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Getting Started"
          title="Installation"
          description="Get Rinjani UI running in your Next.js project in under five minutes."
        />

        <section id="requirements" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Requirements</h2>
          <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1.5">
            <li>Node.js 18 or later</li>
            <li>React 18 or later</li>
            <li>Next.js 14+ (App Router recommended)</li>
            <li>Tailwind CSS v4</li>
          </ul>
        </section>

        <section id="install" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Install the package</h2>
          <p className="text-sm text-neutral-600 mb-4">Pick your package manager:</p>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">npm</p>
              <CodeBlock code={npmHl} rawCode={codes.npm} />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">yarn</p>
              <CodeBlock code={yarnHl} rawCode={codes.yarn} />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">pnpm</p>
              <CodeBlock code={pnpmHl} rawCode={codes.pnpm} />
            </div>
          </div>
        </section>

        <section id="setup-css" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Set up CSS</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Import the Rinjani UI stylesheet after your Tailwind import in your global CSS file.
            This registers the design tokens and component base styles.
          </p>
          <CodeBlock code={cssHl} rawCode={codes.css} />
        </section>

        <section id="setup-provider" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Add providers</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Wrap your root layout with <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">DialogProvider</code> and{" "}
            <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">ToastProvider</code>.
            These enable the imperative <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">useDialog</code> and{" "}
            <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">useToast</code> hooks anywhere in your app.
          </p>
          <CodeBlock code={providerHl} rawCode={codes.provider} />
        </section>

        <section id="first-component" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Use your first component</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Import any component directly from <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">rinjani-ui</code>.
            All components are tree-shakeable — only what you import ends up in your bundle.
          </p>
          <CodeBlock code={firstHl} rawCode={codes.firstComponent} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
