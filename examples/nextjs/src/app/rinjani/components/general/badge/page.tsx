import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { badgeProps } from "@/content/components/badge/props"
import { badgeCodes } from "@/content/components/badge/codes"
import {
  BasicDemo,
  ColorsDemo,
  SizesDemo,
  PillDemo,
  WithIconsDemo,
  StatusDemo,
} from "@/content/components/badge/demos"

const tocItems = [
  { id: "when-to-use", label: "When to use", depth: 2 as const },
  { id: "examples", label: "Examples", depth: 2 as const },
  { id: "basic", label: "Basic usage", depth: 3 as const },
  { id: "colors", label: "Colors", depth: 3 as const },
  { id: "sizes", label: "Sizes", depth: 3 as const },
  { id: "pill", label: "Pill shape", depth: 3 as const },
  { id: "icons", label: "With icons", depth: 3 as const },
  { id: "status", label: "Status indicators", depth: 3 as const },
  { id: "api", label: "API", depth: 2 as const },
  { id: "faq", label: "FAQ", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

export default async function BadgePage() {
  const [basicHl, colorsHl, sizesHl, pillHl, iconsHl, statusHl] = await Promise.all([
    highlight(badgeCodes.basic, "tsx"),
    highlight(badgeCodes.colors, "tsx"),
    highlight(badgeCodes.sizes, "tsx"),
    highlight(badgeCodes.pill, "tsx"),
    highlight(badgeCodes.icons, "tsx"),
    highlight(badgeCodes.status, "tsx"),
  ])

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="General"
          title="Badge"
          description="Use Badge to display compact status, category, or metadata labels."
        />

        <section id="when-to-use" className="scroll-mt-24 mb-10">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">When to use</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Use a badge to show short, non-interactive information next to content. Badge is for metadata, not for actions.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            <li><code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">soft</code> for the default status or category label.</li>
            <li><code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">filled</code> when the label needs stronger emphasis.</li>
            <li><code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">outlined</code> or <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">text</code> for a lighter visual footprint.</li>
            <li><code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">isPill</code> for compact statuses, tags, and filters.</li>
          </ul>
        </section>

        <section id="examples" className="scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Examples</h2>
          <p className="mb-6 text-sm leading-6 text-neutral-600">
            Combine variants, colors, sizes, and icons to communicate short pieces of metadata.
          </p>

          <section id="basic" className="scroll-mt-24">
            <ComponentDemo
              title="Basic usage"
              description="Use the four variants to control the visual emphasis of a label."
              code={basicHl}
              rawCode={badgeCodes.basic}
            >
              <BasicDemo />
            </ComponentDemo>
          </section>

          <section id="colors" className="scroll-mt-24">
            <ComponentDemo
              title="Colors"
              description="Use semantic colors to communicate status or meaning."
              code={colorsHl}
              rawCode={badgeCodes.colors}
            >
              <ColorsDemo />
            </ComponentDemo>
          </section>

          <section id="sizes" className="scroll-mt-24">
            <ComponentDemo
              title="Sizes"
              description="Six sizes are available from xxs to xl. The default is sm."
              code={sizesHl}
              rawCode={badgeCodes.sizes}
            >
              <SizesDemo />
            </ComponentDemo>
          </section>

          <section id="pill" className="scroll-mt-24">
            <ComponentDemo
              title="Pill shape"
              description="Use isPill for compact statuses, tags, and filter labels."
              code={pillHl}
              rawCode={badgeCodes.pill}
            >
              <PillDemo />
            </ComponentDemo>
          </section>

          <section id="icons" className="scroll-mt-24">
            <ComponentDemo
              title="With icons"
              description="Use leftIcon or rightIcon when the icon adds meaning to the label."
              code={iconsHl}
              rawCode={badgeCodes.icons}
            >
              <WithIconsDemo />
            </ComponentDemo>
          </section>

          <section id="status" className="scroll-mt-24">
            <ComponentDemo
              title="Status indicators"
              description="Combine a soft pill with a status dot for compact state indicators."
              code={statusHl}
              rawCode={badgeCodes.status}
            >
              <StatusDemo />
            </ComponentDemo>
          </section>
        </section>

        <section id="api" className="scroll-mt-24 mt-12">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">API</h2>
          <p className="mb-4 text-sm text-neutral-500">
            Badge accepts the custom props below and standard HTML div attributes.
          </p>
          <PropsTable props={badgeProps} />
        </section>

        <section id="faq" className="scroll-mt-24 mt-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">FAQ</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Is Badge interactive?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                No. Badge is a non-interactive label. Use Button or another interactive component when the user needs to perform an action.
              </p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Which variant should I use for a status?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                Start with soft because it keeps the status visible without overpowering the surrounding content. Use filled only when the status needs stronger emphasis.
              </p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">When should I use isPill?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                Use isPill for compact statuses, tags, filters, and other labels where the fully rounded shape communicates a small, self-contained value.
              </p>
            </details>
          </div>
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/components/general/button", title: "Button" }}
          next={{ href: "/rinjani/components/general/breadcrumb", title: "Breadcrumb" }}
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
              description: "Trigger actions and submit user intent.",
            },
            {
              href: "/rinjani/components/general/tooltip",
              title: "Tooltip",
              description: "Add supporting context to interface elements.",
            },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
