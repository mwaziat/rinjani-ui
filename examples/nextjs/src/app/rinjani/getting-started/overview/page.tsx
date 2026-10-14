import React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/docs/PageHeader"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { TableOfContents } from "@/components/docs/TableOfContents"
import {
  FiMousePointer,
  FiPackage,
  FiZap,
  FiCode,
  FiLayout,
  FiCheckCircle,
} from "react-icons/fi"

const tocItems = [
  { id: "introduction", label: "Introduction", depth: 2 as const },
  { id: "features", label: "Features", depth: 2 as const },
  { id: "components", label: "Components", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

const features = [
  {
    icon: <FiZap className="w-5 h-5 text-primary-600" />,
    title: "Tailwind-first",
    description:
      "Every component is built with Tailwind CSS v4. No extra CSS files, no runtime style injection.",
  },
  {
    icon: <FiCode className="w-5 h-5 text-primary-600" />,
    title: "Fully typed",
    description:
      "Complete TypeScript definitions for every prop, event, and callback. Autocomplete that actually works.",
  },
  {
    icon: <FiPackage className="w-5 h-5 text-primary-600" />,
    title: "Tree-shakeable",
    description:
      "Import only what you use. Each component is independently exported so your bundle stays lean.",
  },
  {
    icon: <FiLayout className="w-5 h-5 text-primary-600" />,
    title: "SSR-safe",
    description:
      "Designed for Next.js App Router. Server Components, client boundaries, and hydration all handled correctly.",
  },
  {
    icon: <FiMousePointer className="w-5 h-5 text-primary-600" />,
    title: "Accessible",
    description:
      "ARIA attributes, keyboard navigation, and focus management built into interactive components.",
  },
  {
    icon: <FiCheckCircle className="w-5 h-5 text-primary-600" />,
    title: "Composable",
    description:
      "Components accept className, children, and ref. Extend without forking.",
  },
]

const componentGroups = [
  {
    category: "General",
    components: ["Button", "Badge", "Breadcrumb", "Card", "Tooltip"],
    href: "/rinjani/components/general/button",
  },
  {
    category: "Navigation",
    components: ["Dropdown", "Tabs", "Drawer", "Tree"],
    href: "/rinjani/components/navigation/dropdown",
  },
  {
    category: "Feedback",
    components: ["Alert", "Dialog", "Toast", "Modal"],
    href: "/rinjani/components/feedback/alert",
  },
  {
    category: "Data Display",
    components: ["DataTable", "EditDataTable", "Panel", "Lightbox"],
    href: "/rinjani/components/data-display/data-table",
  },
  {
    category: "Form",
    components: ["InputField", "Select", "Autocomplete", "Checkbox", "Radio", "Switch", "DatePicker", "Dropzone"],
    href: "/rinjani/components/form/input-field",
  },
  {
    category: "Layout",
    components: ["Icons"],
    href: "/rinjani/components/layout/icons",
  },
]

export default function OverviewPage() {
  return (
    <div className="flex gap-10 mx-auto px-6 py-10 w-full">
      <div className="flex-1 min-w-0">
        <PageHeader
          title="Overview"
          description="Rinjani UI is a React component library built on Tailwind CSS v4. It provides a set of accessible, composable components for building modern web interfaces."
        />

        <section id="introduction" className="scroll-mt-24 mb-12">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Introduction</h2>
          <div className="prose prose-neutral max-w-none text-neutral-600 text-sm leading-relaxed space-y-4">
            <p>
              Rinjani UI is designed to give you building blocks — not a design system you have to fight against.
              Every component exposes the right props, accepts <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-700">className</code> for customization,
              and forwards <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-700">ref</code> where it matters.
            </p>
            <p>
              The library is framework-agnostic at its core but ships with first-class Next.js support.
              All interactive components are isolated as client components so your server component tree stays intact.
            </p>
            <p>
              Color tokens (primary, secondary, success, warning, danger, info, neutral) are defined as Tailwind
              CSS variables, making it straightforward to adapt the palette to any brand.
            </p>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 mb-12">
          <h2 className="text-xl font-semibold text-neutral-800 mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex gap-3 p-4 rounded-xl border border-neutral-200 bg-white hover:border-primary-200 hover:bg-primary-50/40 transition-colors"
              >
                <div className="mt-0.5 shrink-0">{f.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800 mb-1">{f.title}</p>
                  <p className="text-sm text-neutral-500">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="components" className="scroll-mt-24 mb-12">
          <h2 className="text-xl font-semibold text-neutral-800 mb-6">Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {componentGroups.map((group) => (
              <Link
                key={group.category}
                href={group.href}
                className="block p-4 rounded-xl border border-neutral-200 bg-white hover:border-primary-300 hover:shadow-sm transition-all group"
              >
                <p className="text-sm font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.components.map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <DocNavigation
          next={{ href: "/rinjani/getting-started/installation", title: "Installation" }}
          related={[
            {
              href: "/rinjani/getting-started/installation",
              title: "Installation",
              description: "Add Rinjani UI to your project.",
            },
            {
              href: "/rinjani/getting-started/theming",
              title: "Theming",
              description: "Customize tokens and color scales.",
            },
            {
              href: "/rinjani/components/general/button",
              title: "Button",
              description: "Start with a simple interactive component.",
            },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
