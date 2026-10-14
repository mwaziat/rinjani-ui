import React from "react"

export interface PropRow {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  props: PropRow[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 mt-2">
      <table className="w-full text-sm text-left">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th className="px-4 py-3 font-semibold text-neutral-700 whitespace-nowrap">Prop</th>
            <th className="px-4 py-3 font-semibold text-neutral-700 whitespace-nowrap">Type</th>
            <th className="px-4 py-3 font-semibold text-neutral-700 whitespace-nowrap">Default</th>
            <th className="px-4 py-3 font-semibold text-neutral-700">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {props.map((row) => (
            <tr key={row.name} className="hover:bg-neutral-50/60 transition-colors">
              <td className="px-4 py-3 font-mono text-sm text-primary-600 whitespace-nowrap">
                {row.name}
                {row.required && <span className="text-danger-500 ml-0.5">*</span>}
              </td>
              <td className="px-4 py-3 font-mono text-sm text-neutral-500 whitespace-nowrap">
                {row.type}
              </td>
              <td className="px-4 py-3 font-mono text-sm text-neutral-400 whitespace-nowrap">
                {row.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-neutral-600 text-sm">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
