import React from "react"
import { highlight } from "@/lib/highlight"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PackageManagerTabs } from "@/components/docs/PackageManagerTabs"
import { PageHeader } from "@/components/docs/PageHeader"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { currentReleaseVersion } from "../changelog/changelog"

const tocItems = [
  { id: "requirements", label: "Requirements", depth: 2 as const },
  { id: "install", label: "Install the package", depth: 2 as const },
  { id: "setup-css", label: "Set up CSS", depth: 2 as const },
  { id: "setup-locale", label: "Optional locale", depth: 2 as const },
  { id: "first-component", label: "Use your first component", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

const codes = {
  npm: `npm install rinjani-ui`,
  yarn: `yarn add rinjani-ui`,
  pnpm: `pnpm add rinjani-ui`,
  css: `/* app/globals.css */
@import "tailwindcss";
@import "rinjani-ui/theme.css";`,
  locale: `// app/layout.tsx
import { RinjaniLocaleProvider } from "rinjani-ui"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <RinjaniLocaleProvider locale="en">
          {children}
        </RinjaniLocaleProvider>
      </body>
    </html>
  )
}`,
  firstComponent: `import { Button } from "rinjani-ui"

export default function Page() {
  return <Button color="primary">Hello Rinjani</Button>
}`,
}

export default async function InstallationPage() {
  const [npmHl, yarnHl, pnpmHl, cssHl, localeHl, firstHl] = await Promise.all([
    highlight(codes.npm, "bash"),
    highlight(codes.yarn, "bash"),
    highlight(codes.pnpm, "bash"),
    highlight(codes.css, "css"),
    highlight(codes.locale, "tsx"),
    highlight(codes.firstComponent, "tsx"),
  ])

  const packageManagers = [
    { name: "npm", highlighted: npmHl, source: codes.npm },
    { name: "yarn", highlighted: yarnHl, source: codes.yarn },
    { name: "pnpm", highlighted: pnpmHl, source: codes.pnpm },
  ]

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="Getting Started"
          title="Installation"
          description={`Install Rinjani UI v${currentReleaseVersion} in your Next.js project with a small, predictable setup.`}
        />

        <section id="requirements" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Requirements</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-neutral-600">
            <li>Node.js 18 or later</li>
            <li>React 18 or later</li>
            <li>Next.js 14+ with the App Router recommended</li>
            <li>Tailwind CSS v4</li>
          </ul>
        </section>

        <section id="install" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Install the package</h2>
          <p className="mb-4 text-sm text-neutral-600">Choose your package manager:</p>
          <PackageManagerTabs options={packageManagers.map((manager) => ({ name: manager.name, html: manager.highlighted, source: manager.source }))} />
        </section>

        <section id="setup-css" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Set up CSS</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Import the Rinjani theme after Tailwind in your global stylesheet. This provides the default design tokens and precompiled component utilities without adding another reset.
          </p>
          <CodeBlock html={cssHl} source={codes.css} language="css" />
        </section>

        <section id="setup-locale" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Configure locale <span className="text-sm font-normal text-neutral-400">(optional)</span></h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Rinjani works without a provider. Add <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">RinjaniLocaleProvider</code> only when you want to localize built-in component messages.
          </p>
          <CodeBlock html={localeHl} source={codes.locale} language="tsx" />
        </section>

        <section id="first-component" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Use your first component</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Import components directly from <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">rinjani-ui</code> and compose them like regular React components.
          </p>
          <CodeBlock html={firstHl} source={codes.firstComponent} language="tsx" />
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/getting-started/overview", title: "Overview" }}
          next={{ href: "/rinjani/getting-started/theming", title: "Theming" }}
          related={[
            {
              href: "/rinjani/getting-started/overview",
              title: "Overview",
              description: "Learn how the library is structured.",
            },
            {
              href: "/rinjani/getting-started/theming",
              title: "Theming",
              description: "Customize tokens and color scales.",
            },
            {
              href: "/rinjani/getting-started/changelog",
              title: "Changelog",
              description: "Review the latest release notes.",
            },
            {
              href: "/rinjani/components/general/button",
              title: "Button",
              description: "Build your first interactive action.",
            },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
