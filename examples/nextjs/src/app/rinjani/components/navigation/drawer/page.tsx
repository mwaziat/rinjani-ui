import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PageHeader } from "@/components/docs/PageHeader"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { drawerCodes } from "@/content/components/drawer/codes"
import {
  drawerContentProps,
  drawerFooterProps,
  drawerHeaderProps,
  drawerProps,
} from "@/content/components/drawer/props"
import {
  BackdropCloseDemo,
  BasicDemo,
  CustomHeaderDemo,
  CustomFooterDemo,
  NonDismissibleBackdropDemo,
  PositionsDemo,
  ScrollableContentDemo,
  SizesDemo,
} from "@/content/components/drawer/demos"

const tocItems = [
  { id: "when-to-use", label: "When to use", depth: 2 as const },
  { id: "examples", label: "Examples", depth: 2 as const },
  { id: "basic", label: "Basic usage", depth: 3 as const },
  { id: "positions", label: "Positions", depth: 3 as const },
  { id: "sizes", label: "Sizes", depth: 3 as const },
  { id: "scrollable", label: "Scrollable content", depth: 3 as const },
  { id: "custom-header", label: "Custom header", depth: 3 as const },
  { id: "custom-footer", label: "Custom footer", depth: 3 as const },
  { id: "backdrop", label: "Backdrop behavior", depth: 3 as const },
  { id: "api", label: "API", depth: 2 as const },
  { id: "api-drawer", label: "Drawer props", depth: 3 as const },
  { id: "api-header", label: "DrawerHeader props", depth: 3 as const },
  { id: "api-content", label: "DrawerContent props", depth: 3 as const },
  { id: "api-footer", label: "DrawerFooter props", depth: 3 as const },
  { id: "faq", label: "FAQ", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

export default async function DrawerPage() {
  const [basicHl, positionsHl, sizesHl, scrollableHl, customHeaderHl, customFooterHl, backdropHl, nonDismissibleBackdropHl] = await Promise.all([
    highlight(drawerCodes.basic, "tsx"),
    highlight(drawerCodes.positions, "tsx"),
    highlight(drawerCodes.sizes, "tsx"),
    highlight(drawerCodes.scrollable, "tsx"),
    highlight(drawerCodes.customHeader, "tsx"),
    highlight(drawerCodes.customFooter, "tsx"),
    highlight(drawerCodes.backdrop, "tsx"),
    highlight(drawerCodes.nonDismissibleBackdrop, "tsx"),
  ])

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="Navigation"
          title="Drawer"
          description="Reveal navigation, filters, settings, or detail content from the edge of the current page."
        />

        <section id="when-to-use" className="mb-10 scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">When to use</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Use Drawer when secondary content should be available without navigating away from the current page.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            <li>Use it for navigation, filters, settings, or a focused detail view.</li>
            <li>Keep the primary task visible behind the drawer so users retain context.</li>
            <li>Use DrawerHeader, DrawerContent, and DrawerFooter to keep the panel structure predictable.</li>
          </ul>
        </section>

        <section id="examples" className="scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Examples</h2>
          <p className="mb-6 text-sm leading-6 text-neutral-600">Open each example to inspect the panel behavior. The backdrop can call onClose by default, or be disabled when closing must be explicit.</p>

          <section id="basic" className="scroll-mt-24">
            <ComponentDemo title="Basic usage" description="Compose the drawer from a header, scrollable content area, and optional footer actions." code={basicHl} rawCode={drawerCodes.basic} centered={false}>
              <BasicDemo />
            </ComponentDemo>
          </section>

          <section id="positions" className="scroll-mt-24">
            <ComponentDemo title="Positions" description="Choose the edge from which the drawer enters with the position prop." code={positionsHl} rawCode={drawerCodes.positions} centered={false}>
              <PositionsDemo />
            </ComponentDemo>
          </section>

          <section id="sizes" className="scroll-mt-24">
            <ComponentDemo title="Sizes" description="Use preset sizes or percentage fractions for the panel width or height." code={sizesHl} rawCode={drawerCodes.sizes} centered={false}>
              <SizesDemo />
            </ComponentDemo>
          </section>

          <section id="scrollable" className="scroll-mt-24">
            <ComponentDemo title="Scrollable content" description="DrawerContent scrolls independently while the header and footer stay fixed." code={scrollableHl} rawCode={drawerCodes.scrollable} centered={false}>
              <ScrollableContentDemo />
            </ComponentDemo>
          </section>

          <section id="custom-header" className="scroll-mt-24">
            <ComponentDemo title="Custom header" description="Use any React content as a header when DrawerHeader does not fit the layout." code={customHeaderHl} rawCode={drawerCodes.customHeader} centered={false}>
              <CustomHeaderDemo />
            </ComponentDemo>
          </section>

          <section id="custom-footer" className="scroll-mt-24">
            <ComponentDemo title="Custom footer" description="Use any React content as a footer when DrawerFooter does not fit the action layout." code={customFooterHl} rawCode={drawerCodes.customFooter} centered={false}>
              <CustomFooterDemo />
            </ComponentDemo>
          </section>

          <section id="backdrop" className="scroll-mt-24">
            <ComponentDemo title="Close on backdrop" description="The controlled onClose handler is called when the shaded area outside the panel is clicked." code={backdropHl} rawCode={drawerCodes.backdrop} centered={false}>
              <BackdropCloseDemo />
            </ComponentDemo>
            <div className="mt-8">
              <ComponentDemo title="Disable backdrop close" description="Set closeOnBackdrop to false when the Drawer must close only through an explicit control." code={nonDismissibleBackdropHl} rawCode={drawerCodes.nonDismissibleBackdrop} centered={false}>
                <NonDismissibleBackdropDemo />
              </ComponentDemo>
            </div>
          </section>
        </section>

        <section id="api" className="mt-12 scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">API</h2>

          <section id="api-drawer" className="mt-6 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">Drawer props</h3>
            <PropsTable props={drawerProps} />
          </section>

          <section id="api-header" className="mt-10 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">DrawerHeader props</h3>
            <PropsTable props={drawerHeaderProps} />
          </section>

          <section id="api-content" className="mt-10 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">DrawerContent props</h3>
            <PropsTable props={drawerContentProps} />
          </section>

          <section id="api-footer" className="mt-10 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">DrawerFooter props</h3>
            <PropsTable props={drawerFooterProps} />
          </section>
        </section>

        <section id="faq" className="mt-12 scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">FAQ</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Does Drawer lock page scrolling?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Yes. While it is open, the document body cannot scroll. The original body overflow state is restored when the drawer closes.</p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">How does the drawer close?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Drawer is controlled. Pass the same onClose handler to your buttons or DrawerHeader. By default, the backdrop also calls it; set closeOnBackdrop to false to disable that behavior.</p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Can the drawer open from the top or bottom?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Yes. Set position to top or bottom. In those positions, size controls the panel height instead of its width.</p>
            </details>
          </div>
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/components/general/tooltip", title: "Tooltip" }}
          next={{ href: "/rinjani/components/navigation/dropdown", title: "Dropdown" }}
          related={[
            { href: "/rinjani/components/general/button", title: "Button", description: "Trigger and submit drawer actions." },
            { href: "/rinjani/components/navigation/dropdown", title: "Dropdown", description: "Present compact navigation and action menus." },
            { href: "/rinjani/components/navigation/tabs", title: "Tabs", description: "Switch between related views in the same context." },
            { href: "/rinjani/getting-started/theming", title: "Theming", description: "Customize the tokens used by navigation surfaces." },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
