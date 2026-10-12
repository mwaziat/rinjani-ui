import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { buttonProps, iconButtonProps } from "@/content/components/button/props"
import { buttonCodes } from "@/content/components/button/codes"
import {
  BasicDemo,
  ColorsDemo,
  SizesDemo,
  WithIconsDemo,
  PillDemo,
  LoadingDemo,
  DisabledDemo,
  FullWidthDemo,
  IconButtonDemo,
} from "@/content/components/button/demos"

const tocItems = [
  { id: "when-to-use", label: "When to use", depth: 2 as const },
  { id: "examples", label: "Examples", depth: 2 as const },
  { id: "basic", label: "Basic usage", depth: 3 as const },
  { id: "colors", label: "Colors", depth: 3 as const },
  { id: "sizes", label: "Sizes", depth: 3 as const },
  { id: "with-icons", label: "With icons", depth: 3 as const },
  { id: "pill", label: "Pill shape", depth: 3 as const },
  { id: "loading", label: "Loading state", depth: 3 as const },
  { id: "disabled", label: "Disabled", depth: 3 as const },
  { id: "full-width", label: "Full width", depth: 3 as const },
  { id: "icon-button", label: "IconButton", depth: 3 as const },
  { id: "api", label: "API", depth: 2 as const },
  { id: "api-button", label: "Button props", depth: 3 as const },
  { id: "api-iconbutton", label: "IconButton props", depth: 3 as const },
  { id: "faq", label: "FAQ", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

export default async function ButtonPage() {
  const [
    basicHl,
    colorsHl,
    sizesHl,
    withIconsHl,
    pillHl,
    loadingHl,
    disabledHl,
    fullWidthHl,
    iconButtonHl,
  ] = await Promise.all([
    highlight(buttonCodes.basic),
    highlight(buttonCodes.colors),
    highlight(buttonCodes.sizes),
    highlight(buttonCodes.withIcons),
    highlight(buttonCodes.pill),
    highlight(buttonCodes.loading),
    highlight(buttonCodes.disabled),
    highlight(buttonCodes.fullWidth),
    highlight(buttonCodes.iconButton),
  ])

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="General"
          title="Button"
          description="Use Button to trigger an action, submit a form, or represent a clear next step."
        />

        <section id="when-to-use" className="scroll-mt-24 mb-10">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">When to use</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Use a button when the user needs to perform an action in the current context. Prefer one primary button per section.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            <li><code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">filled</code> for the primary action.</li>
            <li><code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">outlined</code> for a secondary action.</li>
            <li><code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">soft</code> for subtle emphasis and <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">text</code> for inline actions.</li>
            <li><code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">danger</code> for destructive actions.</li>
          </ul>
        </section>

        <section id="examples" className="scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Examples</h2>
          <p className="mb-6 text-sm leading-6 text-neutral-600">
            Combine variants, colors, sizes, and states to match the importance of the action.
          </p>

        <section id="basic" className="scroll-mt-24">
          <ComponentDemo
            title="Basic usage"
            description="Four variants cover most use cases: filled for primary actions, outlined for secondary, soft for subtle emphasis, and text for inline."
            code={basicHl}
            rawCode={buttonCodes.basic}
          >
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="colors" className="scroll-mt-24">
          <ComponentDemo
            title="Colors"
            description="All seven color tokens are available across every variant."
            code={colorsHl}
            rawCode={buttonCodes.colors}
          >
            <ColorsDemo />
          </ComponentDemo>
        </section>

        <section id="sizes" className="scroll-mt-24">
          <ComponentDemo
            title="Sizes"
            description="Six sizes from xxs to xl. The default is sm."
            code={sizesHl}
            rawCode={buttonCodes.sizes}
          >
            <SizesDemo />
          </ComponentDemo>
        </section>

        <section id="with-icons" className="scroll-mt-24">
          <ComponentDemo
            title="With icons"
            description="Use leftIcon or rightIcon to attach any ReactNode icon."
            code={withIconsHl}
            rawCode={buttonCodes.withIcons}
          >
            <WithIconsDemo />
          </ComponentDemo>
        </section>

        <section id="pill" className="scroll-mt-24">
          <ComponentDemo
            title="Pill shape"
            description="isPill applies fully rounded corners for a pill-style button."
            code={pillHl}
            rawCode={buttonCodes.pill}
          >
            <PillDemo />
          </ComponentDemo>
        </section>

        <section id="loading" className="scroll-mt-24">
          <ComponentDemo
            title="Loading state"
            description="isLoading shows a spinner and disables interaction. Useful for async actions."
            code={loadingHl}
            rawCode={buttonCodes.loading}
          >
            <LoadingDemo />
          </ComponentDemo>
        </section>

        <section id="disabled" className="scroll-mt-24">
          <ComponentDemo
            title="Disabled"
            description="Applies reduced opacity and removes pointer events."
            code={disabledHl}
            rawCode={buttonCodes.disabled}
          >
            <DisabledDemo />
          </ComponentDemo>
        </section>

        <section id="full-width" className="scroll-mt-24">
          <ComponentDemo
            title="Full width"
            description="fullWidth stretches the button to its parent container width."
            code={fullWidthHl}
            rawCode={buttonCodes.fullWidth}
            centered={false}
          >
            <div className="w-full">
              <FullWidthDemo />
            </div>
          </ComponentDemo>
        </section>

        <section id="icon-button" className="scroll-mt-24">
          <ComponentDemo
            title="IconButton"
            description="A square (or circular) button optimized for a single icon. Uses the same variant, color, and size props."
            code={iconButtonHl}
            rawCode={buttonCodes.iconButton}
          >
            <IconButtonDemo />
          </ComponentDemo>
        </section>

        </section>

        <section id="api" className="scroll-mt-24 mt-12">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">API</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Button accepts the custom props below and all standard HTML button attributes.
          </p>

          <section id="api-button" className="scroll-mt-24 mt-8">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">Button props</h3>
            <p className="mb-4 text-sm text-neutral-500">Props specific to the Button component.</p>
            <PropsTable props={buttonProps} />
          </section>

          <section id="api-iconbutton" className="scroll-mt-24 mt-10">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">IconButton props</h3>
            <p className="mb-4 text-sm text-neutral-500">IconButton shares the same variant, color, size, and state system.</p>
            <PropsTable props={iconButtonProps} />
          </section>
        </section>

        <section id="faq" className="scroll-mt-24 mt-12">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">FAQ</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Which variant should I use?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                Start with filled for the main action, outlined for a secondary action, soft for subtle emphasis, and text for a low-priority inline action.
              </p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">When should I use isLoading instead of disabled?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                Use isLoading while an async action is in progress. Use disabled when the action is not currently available.
              </p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Should an IconButton have visible text?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                IconButton is intended for icon-only actions. Always add an aria-label that describes the action.
              </p>
            </details>
          </div>
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/getting-started/changelog", title: "Changelog" }}
          next={{ href: "/rinjani/components/general/badge", title: "Badge" }}
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
              href: "/rinjani/components/general/badge",
              title: "Badge",
              description: "Explore compact status and metadata labels.",
            },
            {
              href: "/rinjani/components/data-display/data-table",
              title: "DataTable",
              description: "Build tables with sorting and pagination.",
            },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
