import React from "react"
import { highlight } from "@/lib/highlight"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PageHeader } from "@/components/docs/PageHeader"
import { TableOfContents } from "@/components/docs/TableOfContents"

const tocItems = [
  { id: "design-tokens", label: "Design tokens", depth: 2 as const },
  { id: "colors", label: "Color palette", depth: 2 as const },
  { id: "override", label: "Overriding tokens", depth: 2 as const },
  { id: "dark-mode", label: "Dark mode", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
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
@import "rinjani-ui/theme.css";

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
@import "rinjani-ui/theme.css";

/* Tailwind v4 dark mode via class strategy */
@variant dark (&:where(.dark, .dark *));

.dark {
  --color-primary-500: #818cf8;
  --color-primary-600: #6366f1;
}`,
}

const palette = [
  {
    name: "Primary",
    token: "primary",
    shades: {
      50: "#f6faf2",
      100: "#ebf5e3",
      200: "#d8ebca",
      300: "#b9db9f",
      400: "#93c56b",
      500: "#6cb33f",
      600: "#55912f",
      700: "#427028",
      800: "#375924",
      900: "#304d22",
      950: "#172b0f",
    },
  },
  {
    name: "Secondary",
    token: "secondary",
    shades: {
      50: "#f1f7fd",
      100: "#e0eef9",
      200: "#badcf2",
      300: "#7ebce7",
      400: "#389ad6",
      500: "#005daa",
      600: "#006eb5",
      700: "#005893",
      800: "#044b7a",
      900: "#093f66",
      950: "#062844",
    },
  },
  {
    name: "Success",
    token: "success",
    shades: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
      950: "#022c22",
    },
  },
  {
    name: "Warning",
    token: "warning",
    shades: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03",
    },
  },
  {
    name: "Danger",
    token: "danger",
    shades: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    },
  },
  {
    name: "Info",
    token: "info",
    shades: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
      950: "#082f49",
    },
  },
  {
    name: "Neutral",
    token: "neutral",
    shades: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },
  },
]

function getContrastColor(hex: string) {
  const red = Number.parseInt(hex.slice(1, 3), 16)
  const green = Number.parseInt(hex.slice(3, 5), 16)
  const blue = Number.parseInt(hex.slice(5, 7), 16)
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000

  return luminance > 165 ? "#0f172a" : "#ffffff"
}

export default async function ThemingPage() {
  const [tokensHl, overrideHl, darkHl] = await Promise.all([
    highlight(codes.tokens, "css"),
    highlight(codes.override, "css"),
    highlight(codes.darkMode, "css"),
  ])

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="Getting Started"
          title="Theming"
          description="Rinjani UI is built on CSS custom properties. Customizing the design system is a matter of overriding a few variables."
        />

        <section id="design-tokens" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Design tokens</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            All visual properties — colors, radius, spacing — are expressed as CSS custom
            properties injected by <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs">rinjani-ui/theme.css</code>.
            Because they live in <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs">:root</code>,
            every Tailwind utility that references them automatically picks up any override you apply.
          </p>
          <CodeBlock html={tokensHl} source={codes.tokens} language="css" />
        </section>

        <section id="colors" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Color palette</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            The library ships with seven semantic color scales. Each scale includes shades from 50 to 950.
          </p>
          <div className="space-y-5 overflow-x-auto pb-2">
            {palette.map((scale) => (
              <div key={scale.token} className="min-w-[920px]">
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-neutral-800">{scale.name}</h3>
                  <code className="font-mono text-xs text-neutral-400">--color-{scale.token}-*</code>
                </div>
                <div className="grid grid-cols-11 gap-1.5">
                  {Object.entries(scale.shades).map(([shade, hex]) => (
                    <div key={shade} className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
                      <div
                        className="flex h-16 items-end p-2 font-mono text-[11px] font-medium"
                        style={{ backgroundColor: hex, color: getContrastColor(hex) }}
                      >
                        {shade}
                      </div>
                      <div className="px-2 py-2">
                        <code className="font-mono text-[10px] text-neutral-500">{hex}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="override" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Overriding tokens</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Declare your overrides in your global CSS file after the library import. The cascade
            handles the rest — no config files or build steps required.
          </p>
          <CodeBlock html={overrideHl} source={codes.override} language="css" />
        </section>

        <section id="dark-mode" className="scroll-mt-24 mb-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">Dark mode</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Use Tailwind v4&apos;s <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">@variant dark</code> directive
            to scope token overrides to a <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">.dark</code> class on
            the <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">html</code> element.
            Toggle the class with JavaScript to switch modes at runtime.
          </p>
          <CodeBlock html={darkHl} source={codes.darkMode} language="css" />
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/getting-started/installation", title: "Installation" }}
          next={{ href: "/rinjani/getting-started/changelog", title: "Changelog" }}
          related={[
            {
              href: "/rinjani/getting-started/installation",
              title: "Installation",
              description: "Add Rinjani UI to your project.",
            },
            {
              href: "/rinjani/getting-started/changelog",
              title: "Changelog",
              description: "Review the latest release notes.",
            },
            {
              href: "/rinjani/components/general/button",
              title: "Button",
              description: "See tokens applied to a live component.",
            },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
