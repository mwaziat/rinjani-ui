"use client"

import React, { useState } from "react"
import { EditDataTable } from "rinjani-ui"
import type { EditColumnDef } from "rinjani-ui"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

const initialData: Product[] = [
  { id: 1, name: "Widget A", category: "Electronics", price: 29.99, stock: 150 },
  { id: 2, name: "Widget B", category: "Electronics", price: 49.99, stock: 80 },
  { id: 3, name: "Gadget X", category: "Accessories", price: 14.99, stock: 300 },
  { id: 4, name: "Gadget Y", category: "Accessories", price: 9.99, stock: 500 },
]

const columns: EditColumnDef<Product>[] = [
  { header: "Name", accessorKey: "name", editable: true },
  { header: "Category", accessorKey: "category", editable: true },
  { header: "Price ($)", accessorKey: "price", type: "number", editable: true, align: "right" },
  { header: "Stock", accessorKey: "stock", type: "number", editable: true, align: "right" },
]

export function BasicDemo() {
  const [data, setData] = useState(initialData)
  return (
    <EditDataTable
      data={data}
      columns={columns}
      rowKey={(r) => String(r.id)}
      actionColumn={{
        onEdit: () => {},
        onSave: (editedRow) => {
          setData((prev) =>
            prev.map((r) => (r.id === editedRow.id ? editedRow : r))
          )
        },
        onDelete: (row) => setData((prev) => prev.filter((r) => r.id !== row.id)),
      }}
    />
  )
}

export function WithToolbarDemo() {
  const [data, setData] = useState(initialData)
  return (
    <EditDataTable
      data={data}
      columns={columns}
      rowKey={(r) => String(r.id)}
      toolbar={{
        title: "Products",
        showSearch: true,
        showAdd: true,
        onAdd: () => {
          const newId = Math.max(...data.map((r) => r.id)) + 1
          setData((prev) => [...prev, { id: newId, name: "New Item", category: "—", price: 0, stock: 0 }])
        },
      }}
      actionColumn={{
        onEdit: () => {},
        onSave: (editedRow) => {
          setData((prev) =>
            prev.map((r) => (r.id === editedRow.id ? editedRow : r))
          )
        },
        onDelete: (row) => setData((prev) => prev.filter((r) => r.id !== row.id)),
      }}
    />
  )
}
