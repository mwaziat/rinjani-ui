import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { tooltipCodes } from "@/content/components/tooltip/codes"
import { tooltipProps } from "@/content/components/tooltip/props"
import {
  BasicDemo,
  ColorsDemo,
  NoArrowDemo,
  PlacementsDemo,
  PillDemo,
  RichContentDemo,
  VariantsDemo,
} from "@/content/components/tooltip/demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 3 as const },
  { id: "placements", label: "Placements", depth: 3 as const },
  { id: "colors", label: "Colors", depth: 3 as const },
  { id: "variants", label: "Variants", depth: 3 as const },
  { id: "no-arrow", label: "No arrow", depth: 3 as const },
  { id: "pill", label: "Pill", depth: 3 as const },
  { id: "rich", label: "Rich content", depth: 3 as const },
  { id: "api", label: "API", depth: 2 as const },
  { id: "faq", label: "FAQ", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

export default async function TooltipPage() {
  const [basicHl, placementsHl, colorsHl, variantsHl, noArrowHl, pillHl, richHl] = await Promise.all([
    highlight(tooltipCodes.basic, "tsx"),
    highlight(tooltipCodes.placements, "tsx"),
    highlight(tooltipCodes.colors, "tsx"),
    highlight(tooltipCodes.variants, "tsx"),
    highlight(tooltipCodes.noArrow, "tsx"),
    highlight(tooltipCodes.pill, "tsx"),
    highlight(tooltipCodes.rich, "tsx"),
  ])

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="General"
          title="Tooltip"
          description="Show brief contextual information on hover or focus, with viewport-aware placement and variant-aware arrows."
        />

        <section id="when-to-use" className="mb-10 scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">When to use</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Use Tooltip for short, supplementary information that helps users understand an unfamiliar control without changing the page layout.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            <li>Wrap an interactive control so the tooltip opens on hover or keyboard focus.</li>
            <li>Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">placement</code> when the direction matters; use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">auto</code> to let the available viewport space decide.</li>
            <li>Keep the content short. Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">maxWidth</code> only when the explanation needs to wrap.</li>
          </ul>
        </section>

        <section id="examples" className="scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Examples</h2>
          <p className="mb-6 text-sm leading-6 text-neutral-600">
            Hover or focus each control to inspect its placement, color, variant, and arrow behavior.
          </p>

          <section id="basic" className="scroll-mt-24">
            <ComponentDemo title="Basic usage" description="The default tooltip opens above the trigger and includes an arrow." code={basicHl} rawCode={tooltipCodes.basic} centered={false}>
              <BasicDemo />
            </ComponentDemo>
          </section>

          <section id="placements" className="scroll-mt-24">
            <ComponentDemo title="Placements" description="The arrow follows the resolved placement, including top, bottom, left, and right." code={placementsHl} rawCode={tooltipCodes.placements} centered={false}>
              <PlacementsDemo />
            </ComponentDemo>
          </section>

          <section id="colors" className="scroll-mt-24">
            <ComponentDemo title="Colors" description="The arrow uses the same color scale as the tooltip surface." code={colorsHl} rawCode={tooltipCodes.colors} centered={false}>
              <ColorsDemo />
            </ComponentDemo>
          </section>

          <section id="variants" className="scroll-mt-24">
            <ComponentDemo title="Variants" description="Filled, soft, and outlined variants keep their surface and arrow styling in sync." code={variantsHl} rawCode={tooltipCodes.variants} centered={false}>
              <VariantsDemo />
            </ComponentDemo>
          </section>

          <section id="no-arrow" className="scroll-mt-24">
            <ComponentDemo title="No arrow" description="Set showArrow to false when the directional cue is unnecessary." code={noArrowHl} rawCode={tooltipCodes.noArrow} centered={false}>
              <NoArrowDemo />
            </ComponentDemo>
          </section>

          <section id="pill" className="scroll-mt-24">
            <ComponentDemo title="Pill" description="Use isPill for short labels that benefit from fully rounded corners." code={pillHl} rawCode={tooltipCodes.pill} centered={false}>
              <PillDemo />
            </ComponentDemo>
          </section>

          <section id="rich" className="scroll-mt-24">
            <ComponentDemo title="Rich content" description="Tooltip content accepts any ReactNode. Set maxWidth when the content needs to wrap." code={richHl} rawCode={tooltipCodes.rich} centered={false}>
              <RichContentDemo />
            </ComponentDemo>
          </section>
        </section>

        <section id="api" className="mt-12 scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">API</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">Props for the Tooltip component.</p>
          <PropsTable props={tooltipProps} />
        </section>

        <section id="faq" className="mt-12 scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">FAQ</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Why does the tooltip move when placement is auto?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Auto compares the available viewport space and chooses the placement with the least overflow. The arrow follows that resolved placement.</p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Can the tooltip show on keyboard focus?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Yes. Tooltip listens for focus as well as pointer hover, so wrapped buttons and links remain discoverable with the keyboard.</p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">When should I hide the arrow?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Use showArrow=false when the tooltip is used as a compact label or when the trigger and tooltip relationship is already obvious.</p>
            </details>
          </div>
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/components/general/card", title: "Card" }}
          next={{ href: "/rinjani/components/navigation/drawer", title: "Drawer" }}
          related={[
            { href: "/rinjani/components/general/button", title: "Button", description: "Trigger actions and submit user intent." },
            { href: "/rinjani/components/general/breadcrumb", title: "Breadcrumb", description: "Show the current location in a page hierarchy." },
            { href: "/rinjani/getting-started/theming", title: "Theming", description: "Customize the color scales used by tooltip variants." },
            { href: "/rinjani/getting-started/installation", title: "Installation", description: "Add Rinjani UI to your project." },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
