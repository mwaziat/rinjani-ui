import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PageHeader } from "@/components/docs/PageHeader"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { iconsCodes } from "@/content/components/icons/codes"
import { iconProps } from "@/content/components/icons/props"
import {
  BasicDemo,
  featherIcons,
  IconGallery,
  lucideIcons,
  SizingDemo,
} from "@/content/components/icons/demos"

const tocItems = [
  { id: "when-to-use", label: "When to use", depth: 2 as const },
  { id: "installation", label: "Installation", depth: 2 as const },
  { id: "examples", label: "Examples", depth: 2 as const },
  { id: "basic", label: "Basic usage", depth: 3 as const },
  { id: "sizing", label: "Size and color", depth: 3 as const },
  { id: "collections", label: "Icon collections", depth: 2 as const },
  { id: "feather", label: "Feather icons", depth: 3 as const },
  { id: "lucide", label: "Lucide icons", depth: 3 as const },
  { id: "api", label: "API", depth: 2 as const },
  { id: "faq", label: "FAQ", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

export default async function IconsPage() {
  const [basicHl, sizingHl] = await Promise.all([
    highlight(iconsCodes.basic, "tsx"),
    highlight(iconsCodes.sizing, "tsx"),
  ])

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="Layout"
          title="Icons"
          description="Rinjani UI does not bundle an icon library. These examples use react-icons with a consistent React API for size, color, accessibility, and layout."
        />

        <section id="when-to-use" className="mb-10 scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">When to use</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Use icons to reinforce a visible label, communicate a familiar action, or make compact controls easier to scan.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            <li>Keep a visible text label for important or unfamiliar actions.</li>
            <li>Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">aria-hidden="true"</code> when the icon is decorative and the nearby label already explains it.</li>
            <li>Use the same icon family within a related flow so stroke weight and proportions stay consistent.</li>
          </ul>
        </section>

        <section id="installation" className="mb-10 scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Installation</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Install react-icons when you use the icon examples in your application. See the <a className="text-primary-600 hover:underline" href="https://react-icons.github.io/react-icons/" target="_blank" rel="noreferrer">official react-icons documentation</a> for the complete icon catalog and usage details.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-neutral-800 px-4 py-3 text-sm text-neutral-100"><code>npm install react-icons</code></pre>
        </section>

        <section id="examples" className="scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Examples</h2>
          <p className="mb-6 text-sm leading-6 text-neutral-600">Import icons directly from their set and style them with normal React and Tailwind props.</p>

          <section id="basic" className="scroll-mt-24">
            <ComponentDemo title="Basic usage" description="Pair an icon with a visible label when the action needs to be clear." code={basicHl} rawCode={iconsCodes.basic} centered={false}>
              <BasicDemo />
            </ComponentDemo>
          </section>

          <section id="sizing" className="scroll-mt-24">
            <ComponentDemo title="Size and color" description="Use size for dimensions and className for theme colors and states." code={sizingHl} rawCode={iconsCodes.sizing} centered={false}>
              <SizingDemo />
            </ComponentDemo>
          </section>
        </section>

        <section id="collections" className="mt-12 scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Icon collections</h2>
          <p className="mb-8 text-sm leading-6 text-neutral-600">Browse a selection of Feather and Lucide icons available through react-icons.</p>

          <section id="feather" className="mb-10 scroll-mt-24">
            <h3 className="mb-1 text-lg font-semibold text-neutral-800">Feather icons</h3>
            <p className="mb-5 text-sm text-neutral-500">The first 80 icons from <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">react-icons/fi</code>.</p>
            <IconGallery icons={featherIcons} />
          </section>

          <section id="lucide" className="scroll-mt-24">
            <h3 className="mb-1 text-lg font-semibold text-neutral-800">Lucide icons</h3>
            <p className="mb-5 text-sm text-neutral-500">The first 80 icons from <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">react-icons/lu</code>.</p>
            <IconGallery icons={lucideIcons} />
          </section>
        </section>

        <section id="api" className="mt-12 scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">API</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">Every imported icon is a React component and accepts these common props plus standard SVG attributes.</p>
          <PropsTable props={iconProps} />
        </section>

        <section id="faq" className="mt-12 scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">FAQ</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Which icon sets are used here?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">The examples use Feather and Lucide icons from react-icons. Browse the <a className="text-primary-600 hover:underline" href="https://react-icons.github.io/react-icons/" target="_blank" rel="noreferrer">official catalog</a> to find other supported icon sets.</p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">How should I make a decorative icon accessible?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Add aria-hidden="true" when a nearby text label already communicates the icon's meaning. For an icon-only control, provide an accessible label on the control instead.</p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Can I use another icon set?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Yes. Any React icon component can be used in the same places as the examples as long as it accepts normal SVG props.</p>
            </details>
          </div>
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/components/navigation/tree", title: "Tree" }}
          related={[
            { href: "/rinjani/components/general/button", title: "Button", description: "Use icons inside action controls." },
            { href: "/rinjani/components/general/tooltip", title: "Tooltip", description: "Explain icon-only controls on hover or focus." },
            { href: "/rinjani/components/navigation/drawer", title: "Drawer", description: "Build navigation layouts with compact controls." },
            { href: "/rinjani/getting-started/theming", title: "Theming", description: "Use semantic color tokens for icon states." },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
