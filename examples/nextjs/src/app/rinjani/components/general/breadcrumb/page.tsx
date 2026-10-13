import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { breadcrumbProps } from "@/content/components/breadcrumb/props"
import { breadcrumbCodes } from "@/content/components/breadcrumb/codes"
import {
  BasicDemo,
  ColorsDemo,
  ContainedDemo,
  WithIconsDemo,
  CustomSeparatorDemo,
  AlignmentDemo,
  SizesDemo,
} from "@/content/components/breadcrumb/demos"

const tocItems = [
  { id: "when-to-use", label: "When to use", depth: 2 as const },
  { id: "examples", label: "Examples", depth: 2 as const },
  { id: "basic", label: "Basic usage", depth: 3 as const },
  { id: "colors", label: "Colors", depth: 3 as const },
  { id: "contained", label: "Variants", depth: 3 as const },
  { id: "icons", label: "With icons", depth: 3 as const },
  { id: "separator", label: "Custom separator", depth: 3 as const },
  { id: "alignment", label: "Alignment & custom content", depth: 3 as const },
  { id: "sizes", label: "Sizes", depth: 3 as const },
  { id: "api", label: "API", depth: 2 as const },
  { id: "faq", label: "FAQ", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

export default async function BreadcrumbPage() {
  const [basicHl, colorsHl, containedHl, iconsHl, separatorHl, alignmentHl, sizesHl] = await Promise.all([
    highlight(breadcrumbCodes.basic, "tsx"),
    highlight(breadcrumbCodes.colors, "tsx"),
    highlight(breadcrumbCodes.contained, "tsx"),
    highlight(breadcrumbCodes.icons, "tsx"),
    highlight(breadcrumbCodes.separator, "tsx"),
    highlight(breadcrumbCodes.alignment, "tsx"),
    highlight(breadcrumbCodes.sizes, "tsx"),
  ])

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="General"
          title="Breadcrumb"
          description="Show the user's current location within a hierarchy of pages."
        />

        <section id="when-to-use" className="scroll-mt-24 mb-10">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">When to use</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Use Breadcrumb when a page belongs to a multi-level navigation structure and users may need to return to a parent level.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            <li>Keep previous levels clickable through <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">paths</code>.</li>
            <li>Keep the current page in <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">activeLabel</code> as plain text.</li>
            <li>Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">contained=false</code> for a lightweight navigation trail.</li>
            <li>Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">contained</code> when the trail needs its own visual surface.</li>
          </ul>
        </section>

        <section id="examples" className="scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Examples</h2>
          <p className="mb-6 text-sm leading-6 text-neutral-600">
            The examples below use the same story-box treatment as the component demos, so the breadcrumb remains easy to compare and scan.
          </p>

          <section id="basic" className="scroll-mt-24">
            <ComponentDemo
              title="Basic usage"
              description="Previous levels are links; the active page remains a non-clickable label."
              code={basicHl}
              rawCode={breadcrumbCodes.basic}
              centered={false}
            >
              <BasicDemo />
            </ComponentDemo>
          </section>

          <section id="colors" className="scroll-mt-24">
            <ComponentDemo
              title="Colors"
              description="Compare semantic colors while keeping the same Home to Management hierarchy in every row."
              code={colorsHl}
              rawCode={breadcrumbCodes.colors}
              centered={false}
            >
              <ColorsDemo />
            </ComponentDemo>
          </section>

          <section id="contained" className="scroll-mt-24">
            <ComponentDemo
              title="Variants"
              description="Compare the available trail variants without adding nested cards to the documentation preview."
              code={containedHl}
              rawCode={breadcrumbCodes.contained}
              centered={false}
            >
              <ContainedDemo />
            </ComponentDemo>
          </section>

          <section id="icons" className="scroll-mt-24">
            <ComponentDemo
              title="With icons"
              description="Add icons to path nodes when they reinforce the hierarchy."
              code={iconsHl}
              rawCode={breadcrumbCodes.icons}
              centered={false}
            >
              <WithIconsDemo />
            </ComponentDemo>
          </section>

          <section id="separator" className="scroll-mt-24">
            <ComponentDemo
              title="Custom separator"
              description="Replace the default chevron with a slash, dot, or custom ReactNode."
              code={separatorHl}
              rawCode={breadcrumbCodes.separator}
              centered={false}
            >
              <CustomSeparatorDemo />
            </ComponentDemo>
          </section>

          <section id="alignment" className="scroll-mt-24">
            <ComponentDemo
              title="Alignment & custom content"
              description="Use justify, currentPosition, and rightContent to shape the header and trail."
              code={alignmentHl}
              rawCode={breadcrumbCodes.alignment}
              centered={false}
            >
              <AlignmentDemo />
            </ComponentDemo>
          </section>

          <section id="sizes" className="scroll-mt-24">
            <ComponentDemo
              title="Sizes"
              description="Compare all supported sizes while keeping the breadcrumb content consistent. The default size is md."
              code={sizesHl}
              rawCode={breadcrumbCodes.sizes}
              centered={false}
            >
              <SizesDemo />
            </ComponentDemo>
          </section>
        </section>

        <section id="api" className="scroll-mt-24 mt-12">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">API</h2>
          <p className="mb-4 text-sm text-neutral-500">
            Breadcrumb exposes the props below for hierarchy, appearance, alignment, and custom content.
          </p>
          <PropsTable props={breadcrumbProps} />
        </section>

        <section id="faq" className="scroll-mt-24 mt-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">FAQ</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Should the current page be clickable?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                No. Keep the current page in activeLabel as plain text. Only previous levels in paths should be links.
              </p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">When should I use contained?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                Use contained=false for a lightweight trail inside an existing layout. Use contained when the breadcrumb needs its own visual surface.
              </p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">How many levels should a breadcrumb contain?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                Include only meaningful parent levels. Simplify the labels when the hierarchy becomes too long.
              </p>
            </details>
          </div>
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/components/general/badge", title: "Badge" }}
          next={{ href: "/rinjani/components/general/card", title: "Card" }}
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
              href: "/rinjani/components/general/badge",
              title: "Badge",
              description: "Display compact status and metadata labels.",
            },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
