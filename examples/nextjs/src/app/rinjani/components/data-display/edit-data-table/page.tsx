import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { editDataTableProps } from "./_props"
import { BasicDemo, WithToolbarDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "toolbar", label: "With toolbar", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { EditDataTable } from 'rinjani-ui'
import type { EditColumnDef } from 'rinjani-ui'

const columns: EditColumnDef<Product>[] = [
  { header: 'Name', accessorKey: 'name', editable: true },
  { header: 'Price', accessorKey: 'price', type: 'number', editable: true },
]

export default function Example() {
  const [data, setData] = useState(initialData)
  return (
    <EditDataTable
      data={data}
      columns={columns}
      rowKey={(r) => String(r.id)}
      actionColumn={{
        onEdit: () => {},
        onSave: (rowState) => setData((prev) =>
          prev.map((r) => r.id === rowState.edited.id ? rowState.edited : r)
        ),
        onDelete: (row) => setData((prev) => prev.filter((r) => r.id !== row.id)),
      }}
    />
  )
}`,
  toolbar: `<EditDataTable
  data={data}
  columns={columns}
  rowKey={(r) => String(r.id)}
  toolbar={{
    title: 'Products',
    showSearch: true,
    showAdd: true,
    onAdd: () => addNewRow(),
  }}
  actionColumn={{ onEdit: () => {}, onSave: handleSave, onDelete: handleDelete }}
/>`,
}

export default async function EditDataTablePage() {
  const [basicHl, toolbarHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.toolbar, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Data Display"
          title="EditDataTable"
          description="Inline-editable data table. Supports per-cell editing, save/cancel per row or globally via toolbar, and custom edit components."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Set <code className="text-xs bg-neutral-100 px-1 py-0.5 rounded font-mono">editable: true</code> on any column to make it inline-editable. Click the edit icon to activate a row.
          </p>
          <ComponentDemo code={basicHl} rawCode={codes.basic} centered={false}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="toolbar" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">With toolbar</h2>
          <ComponentDemo code={toolbarHl} rawCode={codes.toolbar} centered={false}>
            <WithToolbarDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={editDataTableProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
