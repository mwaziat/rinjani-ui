import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { dataTableProps } from "./_props"
import { BasicDemo, VariantsDemo, WithToolbarDemo, WithPaginationDemo, WithActionsDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "variants", label: "Variants", depth: 2 as const },
  { id: "toolbar", label: "Toolbar", depth: 2 as const },
  { id: "pagination", label: "Pagination", depth: 2 as const },
  { id: "actions", label: "Action column", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { DataTable } from 'rinjani-ui'
import type { ColumnDef } from 'rinjani-ui'

interface User { id: number; name: string; email: string; role: string }

const columns: ColumnDef<User>[] = [
  { header: 'Name', accessorKey: 'name', sortable: true },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Role', accessorKey: 'role' },
]

export default function Example() {
  return <DataTable data={users} columns={columns} rowKey={(r) => r.id} />
}`,
  variants: `// variant: "default" | "striped" | "bordered" | "borderless" | "hover" | "compact" | "comfortable" | "spacious"
<DataTable data={data} columns={columns} variant="striped" />`,
  toolbar: `<DataTable
  data={data}
  columns={columns}
  rowKey={(r) => r.id}
  toolbar={{
    title: 'Users',
    showSearch: true,
    showAdd: true,
    onAdd: () => {},
    showRefresh: true,
    onRefresh: () => {},
  }}
/>`,
  pagination: `const [page, setPage] = useState(1)
const limit = 10

<DataTable
  data={pagedData}
  columns={columns}
  rowKey={(r) => r.id}
  pagination={{
    page,
    limit,
    totalItems: 100,
    totalPages: 10,
    onPaginationChange: ({ page: p }) => setPage(p),
  }}
/>`,
  actions: `<DataTable
  data={data}
  columns={columns}
  rowKey={(r) => r.id}
  actionColumn={{
    type: 'dropdown',
    onDetail: (row) => console.log('detail', row),
    onEdit: (row) => console.log('edit', row),
    onDelete: (row) => console.log('delete', row),
  }}
/>`,
}

export default async function DataTablePage() {
  const [basicHl, variantsHl, toolbarHl, paginationHl, actionsHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.variants, "tsx"),
    highlight(codes.toolbar, "tsx"),
    highlight(codes.pagination, "tsx"),
    highlight(codes.actions, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Data Display"
          title="DataTable"
          description="Feature-rich data table with sorting, pagination, row selection, expandable rows, toolbar, and action columns."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic} centered={false}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="variants" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Variants</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants} centered={false}>
            <VariantsDemo />
          </ComponentDemo>
        </section>

        <section id="toolbar" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Toolbar</h2>
          <ComponentDemo code={toolbarHl} rawCode={codes.toolbar} centered={false}>
            <WithToolbarDemo />
          </ComponentDemo>
        </section>

        <section id="pagination" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Pagination</h2>
          <ComponentDemo code={paginationHl} rawCode={codes.pagination} centered={false}>
            <WithPaginationDemo />
          </ComponentDemo>
        </section>

        <section id="actions" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Action column</h2>
          <ComponentDemo code={actionsHl} rawCode={codes.actions} centered={false}>
            <WithActionsDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={dataTableProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
