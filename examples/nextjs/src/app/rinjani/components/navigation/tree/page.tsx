import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { treeProps } from "./_props"
import { BasicDemo, VariantsDemo, NumberingDemo, ActiveNodeDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "variants", label: "Variants", depth: 2 as const },
  { id: "numbering", label: "Deep numbering", depth: 2 as const },
  { id: "active", label: "Active node", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Tree } from 'rinjani-ui'
import { FiFolder, FiFile } from 'react-icons/fi'

const data = [
  {
    id: '1', label: 'src', icon: <FiFolder size={14} />,
    children: [
      { id: '1-1', label: 'components', icon: <FiFolder size={14} />,
        children: [
          { id: '1-1-1', label: 'Button.tsx', icon: <FiFile size={14} /> },
        ],
      },
    ],
  },
]

export default function Example() {
  return <Tree data={data} title="Project files" />
}`,
  variants: `// variant: "minimal" | "lined" | "filled"
<Tree data={data} variant="lined" />`,
  numbering: `<Tree data={data} deepLevelNumbering defaultExpanded />`,
  active: `import { useState } from 'react'

export default function Example() {
  const [activeId, setActiveId] = useState('1-1-1')
  return (
    <Tree
      data={data}
      activeNodeId={activeId}
      onNodeClick={(node) => setActiveId(node.id)}
      defaultExpanded
    />
  )
}`,
}

export default async function TreePage() {
  const [basicHl, variantsHl, numberingHl, activeHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.variants, "tsx"),
    highlight(codes.numbering, "tsx"),
    highlight(codes.active, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Navigation"
          title="Tree"
          description="Hierarchical node viewer with expand/collapse, async loading, drag-and-drop, node actions, and structural numbering."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="variants" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Variants</h2>
          <p className="text-sm text-neutral-500 mb-4">Three visual styles — <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">minimal</code>, <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">lined</code>, and <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">filled</code>.</p>
          <ComponentDemo code={variantsHl} rawCode={codes.variants}>
            <VariantsDemo />
          </ComponentDemo>
        </section>

        <section id="numbering" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Deep numbering</h2>
          <p className="text-sm text-neutral-500 mb-4">Enable <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">deepLevelNumbering</code> to generate structural numbering like 1.1.2.</p>
          <ComponentDemo code={numberingHl} rawCode={codes.numbering}>
            <NumberingDemo />
          </ComponentDemo>
        </section>

        <section id="active" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Active node</h2>
          <ComponentDemo code={activeHl} rawCode={codes.active}>
            <ActiveNodeDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={treeProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
