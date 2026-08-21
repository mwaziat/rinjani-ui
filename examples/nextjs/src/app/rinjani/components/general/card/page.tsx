import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { cardProps, cardHeaderProps, cardContentProps, cardFooterProps } from "./_props"
import { BasicDemo, HeaderActionsDemo, WithIconDemo, NoPaddingDemo, ContentOnlyDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "header-actions", label: "Header actions", depth: 2 as const },
  { id: "with-icon", label: "With icon", depth: 2 as const },
  { id: "no-padding", label: "No padding", depth: 2 as const },
  { id: "content-only", label: "Content only", depth: 2 as const },
  { id: "api-card", label: "Card API", depth: 2 as const },
  { id: "api-header", label: "Card.Header API", depth: 2 as const },
  { id: "api-content", label: "Card.Content API", depth: 2 as const },
  { id: "api-footer", label: "Card.Footer API", depth: 2 as const },
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

export default function Example() {
  return (
    <Card className="w-72" noPadding>
      <div className="h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-t-xl" />
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
    highlight(codes.basic, "tsx"),
    highlight(codes.headerActions, "tsx"),
    highlight(codes.withIcon, "tsx"),
    highlight(codes.noPadding, "tsx"),
    highlight(codes.contentOnly, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="General"
          title="Card"
          description="A versatile container with Header, Content, and Footer sub-components. Supports edge-to-edge content, icons, and action slots."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="header-actions" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Header actions</h2>
          <p className="text-sm text-neutral-500 mb-4">Pass children to <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">Card.Header</code> to render action content alongside the title.</p>
          <ComponentDemo code={headerActionsHl} rawCode={codes.headerActions}>
            <HeaderActionsDemo />
          </ComponentDemo>
        </section>

        <section id="with-icon" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">With icon</h2>
          <ComponentDemo code={withIconHl} rawCode={codes.withIcon}>
            <WithIconDemo />
          </ComponentDemo>
        </section>

        <section id="no-padding" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">No padding</h2>
          <p className="text-sm text-neutral-500 mb-4">Use <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">noPadding</code> to let images or tables touch the card edges.</p>
          <ComponentDemo code={noPaddingHl} rawCode={codes.noPadding}>
            <NoPaddingDemo />
          </ComponentDemo>
        </section>

        <section id="content-only" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Content only</h2>
          <ComponentDemo code={contentOnlyHl} rawCode={codes.contentOnly}>
            <ContentOnlyDemo />
          </ComponentDemo>
        </section>

        <section id="api-card" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Card API</h2>
          <PropsTable props={cardProps} />
        </section>

        <section id="api-header" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Card.Header API</h2>
          <PropsTable props={cardHeaderProps} />
        </section>

        <section id="api-content" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Card.Content API</h2>
          <PropsTable props={cardContentProps} />
        </section>

        <section id="api-footer" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Card.Footer API</h2>
          <PropsTable props={cardFooterProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
