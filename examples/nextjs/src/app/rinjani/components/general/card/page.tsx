import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { cardCodes } from "@/content/components/card/codes"
import {
  cardProps,
  cardHeaderProps,
  cardContentProps,
  cardMediaProps,
  cardFooterProps,
} from "@/content/components/card/props"
import {
  BasicDemo,
  HeaderActionsDemo,
  WithIconDemo,
  NoPaddingDemo,
  ContentOnlyDemo,
} from "@/content/components/card/demos"

const tocItems = [
  { id: "when-to-use", label: "When to use", depth: 2 as const },
  { id: "examples", label: "Examples", depth: 2 as const },
  { id: "basic", label: "Basic usage", depth: 3 as const },
  { id: "header-actions", label: "Header actions", depth: 3 as const },
  { id: "with-icon", label: "With an icon", depth: 3 as const },
  { id: "no-padding", label: "Edge-to-edge media", depth: 3 as const },
  { id: "content-only", label: "Content only", depth: 3 as const },
  { id: "api", label: "API", depth: 2 as const },
  { id: "api-card", label: "Card props", depth: 3 as const },
  { id: "api-header", label: "CardHeader props", depth: 3 as const },
  { id: "api-content", label: "CardContent props", depth: 3 as const },
  { id: "api-media", label: "CardMedia props", depth: 3 as const },
  { id: "api-footer", label: "CardFooter props", depth: 3 as const },
  { id: "faq", label: "FAQ", depth: 2 as const },
  { id: "related-docs", label: "Related documentation", depth: 2 as const },
]

const codes = {
  basic: `import { Card, Button } from 'rinjani-ui'

export default function Example() {
  return (
    <Card className="w-72">
      <Card.Header title="Card title" subtitle="A short description" />
      <Card.Content>
        <p className="text-sm text-neutral-600">Main content goes here.</p>
      </Card.Content>
      <Card.Footer>
        <Button size="sm">Action</Button>
        <Button size="sm" variant="outlined">Cancel</Button>
      </Card.Footer>
    </Card>
  )
}`,
  headerActions: `import { Card, Badge } from 'rinjani-ui'

export default function Example() {
  return (
    <Card className="w-72">
      <Card.Header title="Server status" subtitle="Production">
        <Badge color="success" isPill>Online</Badge>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-neutral-600">All systems operational.</p>
      </Card.Content>
    </Card>
  )
}`,
  withIcon: `import { Card } from 'rinjani-ui'
import { FiSettings } from 'react-icons/fi'

export default function Example() {
  return (
    <Card className="w-72">
      <Card.Header
        title="Settings"
        subtitle="Manage your preferences"
        icon={<FiSettings size={18} className="text-primary-600" />}
      />
      <Card.Content>
        <p className="text-sm text-neutral-600">Configure your account here.</p>
      </Card.Content>
    </Card>
  )
}`,
  noPadding: `import { Card } from 'rinjani-ui'
import { CardMedia } from 'rinjani-ui'

export default function Example() {
  return (
    <Card className="w-72" noPadding>
      <CardMedia
        src="/hotel.jpg"
        alt="Hotel"
        height={128}
      />
      <div className="p-4">
        <p className="text-sm font-semibold">Edge-to-edge image</p>
      </div>
    </Card>
  )
}`,
  contentOnly: `import { Card } from 'rinjani-ui'

export default function Example() {
  return (
    <Card className="w-72">
      <Card.Content>
        <p className="text-sm text-neutral-600">
          A minimal card with only Card.Content.
        </p>
      </Card.Content>
    </Card>
  )
}`,
}

export default async function CardPage() {
  const [basicHl, headerActionsHl, withIconHl, noPaddingHl, contentOnlyHl] = await Promise.all([
    highlight(cardCodes.basic),
    highlight(cardCodes.headerActions),
    highlight(cardCodes.withIcon),
    highlight(cardCodes.noPadding),
    highlight(cardCodes.contentOnly),
  ])

  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="General"
          title="Card"
          description="Group related content and actions in a structured surface."
        />

        <section id="when-to-use" className="mb-10 scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">When to use</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            Use Card when content belongs together but needs separation from the surrounding page.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
            <li>Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">CardHeader</code> for a title, context, icon, or status.</li>
            <li>Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">CardContent</code> for the primary body content.</li>
            <li>Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">CardFooter</code> for actions that apply to the card.</li>
            <li>Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">noPadding</code> when media should touch the card edges.</li>
          </ul>
        </section>

        <section id="examples" className="scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Examples</h2>
          <p className="mb-6 text-sm leading-6 text-neutral-600">
            Compose the card from the parts you need. Each example uses one focused surface so the structure stays easy to scan.
          </p>

          <section id="basic" className="scroll-mt-24">
            <ComponentDemo
              title="Basic usage"
              description="Combine CardHeader, CardContent, and CardFooter for a complete content-and-action surface."
              code={basicHl}
              rawCode={cardCodes.basic}
              centered={false}
            >
              <BasicDemo />
            </ComponentDemo>
          </section>

          <section id="header-actions" className="scroll-mt-24">
            <ComponentDemo
              title="Header actions"
              description="Pass a Badge or another compact element as CardHeader children."
              code={headerActionsHl}
              rawCode={cardCodes.headerActions}
              centered={false}
            >
              <HeaderActionsDemo />
            </ComponentDemo>
          </section>

          <section id="with-icon" className="scroll-mt-24">
            <ComponentDemo
              title="With an icon"
              description="Use the icon prop when it reinforces the meaning of the card title."
              code={withIconHl}
              rawCode={cardCodes.withIcon}
              centered={false}
            >
              <WithIconDemo />
            </ComponentDemo>
          </section>

          <section id="no-padding" className="scroll-mt-24">
            <ComponentDemo
              title="Edge-to-edge media"
              description="Set noPadding when media should touch the card edges."
              code={noPaddingHl}
              rawCode={cardCodes.noPadding}
              centered={false}
            >
              <NoPaddingDemo />
            </ComponentDemo>
          </section>

          <section id="content-only" className="scroll-mt-24">
            <ComponentDemo
              title="Content only"
              description="Use CardContent by itself for a minimal content surface."
              code={contentOnlyHl}
              rawCode={cardCodes.contentOnly}
              centered={false}
            >
              <ContentOnlyDemo />
            </ComponentDemo>
          </section>
        </section>

        <section id="api" className="mt-12 scroll-mt-24">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">API</h2>
          <p className="mb-4 text-sm text-neutral-500">
            Card is composed from the main container and four optional subcomponents.
          </p>

          <section id="api-card" className="mt-8 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">Card props</h3>
            <PropsTable props={cardProps} />
          </section>

          <section id="api-header" className="mt-10 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">CardHeader props</h3>
            <PropsTable props={cardHeaderProps} />
          </section>

          <section id="api-content" className="mt-10 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">CardContent props</h3>
            <PropsTable props={cardContentProps} />
          </section>

          <section id="api-media" className="mt-10 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">CardMedia props</h3>
            <PropsTable props={cardMediaProps} />
          </section>

          <section id="api-footer" className="mt-10 scroll-mt-24">
            <h3 className="mb-1 text-base font-semibold text-neutral-800">CardFooter props</h3>
            <PropsTable props={cardFooterProps} />
          </section>
        </section>

        <section id="faq" className="mt-12 scroll-mt-24">
          <h2 className="mb-3 text-xl font-semibold text-neutral-800">FAQ</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Should every Card have a header and footer?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                No. Use only the subcomponents that match the content structure. CardContent can be used by itself.
              </p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">When should I use noPadding?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                Use noPadding when media, tables, or another edge-to-edge block should touch the card boundary.
              </p>
            </details>
            <details className="group py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-800">Can I put actions in CardHeader?</summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                Yes. Pass a Badge, Button, or another compact element as CardHeader children when it belongs beside the title.
              </p>
            </details>
          </div>
        </section>

        <DocNavigation
          previous={{ href: "/rinjani/components/general/breadcrumb", title: "Breadcrumb" }}
          next={{ href: "/rinjani/components/general/tooltip", title: "Tooltip" }}
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
              href: "/rinjani/components/general/breadcrumb",
              title: "Breadcrumb",
              description: "Show the current location in a page hierarchy.",
            },
            {
              href: "/rinjani/components/general/button",
              title: "Button",
              description: "Trigger actions and submit user intent.",
            },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
