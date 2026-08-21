"use client"

import React, { useState } from "react"
import { DataTable } from "rinjani-ui"
import type { ColumnDef } from "rinjani-ui"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

const data: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "active" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer", status: "inactive" },
  { id: 4, name: "Dan Brown", email: "dan@example.com", role: "Editor", status: "active" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Viewer", status: "inactive" },
]

const columns: ColumnDef<User>[] = [
  { header: "Name", accessorKey: "name", sortable: true },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => (
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.status === "active" ? "bg-success-100 text-success-700" : "bg-neutral-100 text-neutral-500"}`}>
        {row.status}
      </span>
    ),
  },
]

export function BasicDemo() {
  return <DataTable data={data} columns={columns} rowKey={(r) => r.id} />
}

export function VariantsDemo() {
  const [variant, setVariant] = useState<"default" | "striped" | "bordered" | "compact">("striped")
  return (
    <div className="w-full space-y-3">
      <div className="flex gap-2">
        {(["default", "striped", "bordered", "compact"] as const).map((v) => (
          <button
            key={v}
            className={`text-xs px-3 py-1 rounded border ${variant === v ? "bg-primary-600 text-white border-primary-600" : "border-neutral-300 text-neutral-600"}`}
            onClick={() => setVariant(v)}
          >
            {v}
          </button>
        ))}
      </div>
      <DataTable data={data} columns={columns} rowKey={(r) => r.id} variant={variant} />
    </div>
  )
}

export function WithToolbarDemo() {
  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(r) => r.id}
      toolbar={{
        title: "Users",
        description: "Manage your team members",
        showSearch: true,
        showAdd: true,
        onAdd: () => alert("Add clicked"),
        showRefresh: true,
        onRefresh: () => alert("Refresh clicked"),
      }}
    />
  )
}

export function WithPaginationDemo() {
  const [page, setPage] = useState(1)
  const limit = 3
  const paged = data.slice((page - 1) * limit, page * limit)
  return (
    <DataTable
      data={paged}
      columns={columns}
      rowKey={(r) => r.id}
      pagination={{
        page,
        limit,
        totalItems: data.length,
        totalPages: Math.ceil(data.length / limit),
        onPaginationChange: ({ page: p }) => setPage(p),
      }}
    />
  )
}

export function WithActionsDemo() {
  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey={(r) => r.id}
      actionColumn={{
        type: "dropdown",
        onDetail: (row) => alert(`Detail: ${row.name}`),
        onEdit: (row) => alert(`Edit: ${row.name}`),
        onDelete: (row) => alert(`Delete: ${row.name}`),
      }}
    />
  )
}
