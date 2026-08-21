import React from "react"
import { highlight } from "@/lib/highlight"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageHeader } from "@/components/docs/PageHeader"
import { TableOfContents } from "@/components/docs/TableOfContents"

const tocItems = [
  { id: "design-tokens", label: "Design tokens", depth: 2 as const },
  { id: "colors", label: "Color palette", depth: 2 as const },
  { id: "override", label: "Overriding tokens", depth: 2 as const },
  { id: "dark-mode", label: "Dark mode", depth: 2 as const },
]

const codes = {
  tokens: `/* Rinjani UI exposes CSS custom properties you can inspect and override */
:root {
  --color-primary-50:  #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  /* ... and so on for secondary, success, warning, danger, info, neutral */
}`,
  override: `/* globals.css — override after the rinjani-ui import */
@import "tailwindcss";
@import "rinjani-ui/styles";

:root {
  /* Change the primary palette to indigo */
  --color-primary-50:  #eef2ff;
  --color-primary-100: #e0e7ff;
  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
  --color-primary-700: #4338ca;
}`,
  darkMode: `/* globals.css */
@import "tailwindcss";
@import "rinjani-ui/styles";

/* Tailwind v4 dark mode via class strategy */
@variant dark (&:where(.dark, .dark *));

.dark {
  --color-primary-500: #818cf8;
  --color-primary-600: #6366f1;
}`,
}

export default async function ThemingPage() {
  const [tokensHl, overrideHl, darkHl] = await Promise.all([
    highlight(codes.tokens, "css"),
    highlight(codes.override, "css"),
    highlight(codes.darkMode, "css"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Getting Started"
          title="Theming"
          description="Rinjani UI is built on CSS custom properties. Customizing the design system is a matter of overriding a few variables."
        />

        <section id="design-tokens" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Design tokens</h2>
          <p className="text-sm text-neutral-600 mb-4">
            All visual properties — colors, radius, spacing — are expressed as CSS custom
            properties injected by <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">rinjani-ui/styles</code>.
            Because they live in <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">:root</code>,
            every Tailwind utility that references them automatically picks up any override you apply.
          </p>
          <CodeBlock code={tokensHl} rawCode={codes.tokens} />
        </section>

        <section id="colors" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Color palette</h2>
          <p className="text-sm text-neutral-600 mb-4">
            The library ships with seven semantic color scales. Each scale has shades from 50 to 900.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["primary", "secondary", "success", "warning", "danger", "info", "neutral"].map((color) => (
              <div key={color} className="rounded-lg overflow-hidden border border-neutral-200">
                <div className={`h-10 bg-${color}-500`} />
                <div className="px-2 py-1.5 bg-white">
                  <p className="text-xs font-medium text-neutral-700 capitalize">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="override" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Overriding tokens</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Declare your overrides in your global CSS file after the library import. The cascade
            handles the rest — no config files or build steps required.
          </p>
          <CodeBlock code={overrideHl} rawCode={codes.override} />
        </section>

        <section id="dark-mode" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">Dark mode</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Use Tailwind v4&apos;s <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">@variant dark</code> directive
            to scope token overrides to a <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">.dark</code> class on
            the <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">html</code> element.
            Toggle the class with JavaScript to switch modes at runtime.
          </p>
          <CodeBlock code={darkHl} rawCode={codes.darkMode} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
