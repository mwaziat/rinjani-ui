import type { PropRow } from "@/components/docs/PropsTable"

export const editDataTableProps: PropRow[] = [
  {
    name: "data",
    type: "T[]",
    required: true,
    default: "—",
    description: "Array of row objects.",
  },
  {
    name: "columns",
    type: "EditColumnDef<T>[]",
    required: true,
    default: "—",
    description: "Column definitions. Set editable: true on columns that should be inline-editable.",
  },
  {
    name: "rowKey",
    type: "(row: T) => string",
    required: true,
    default: "—",
    description: "Function returning a unique string key from each row.",
  },
  {
    name: "variant",
    type: '"default" | "striped" | "bordered" | "borderless" | "hover" | "compact" | "comfortable" | "spacious"',
    default: '"default"',
    description: "Visual style of the table.",
  },
  {
    name: "toolbar",
    type: "EditToolbarConfig<T>",
    default: "—",
    description: "Toolbar with search, add, save-all, cancel-all, and delete-all actions.",
  },
  {
    name: "actionColumn",
    type: "EditActionColumnConfig<T>",
    default: "—",
    description: "Per-row edit/save/cancel/delete action buttons.",
  },
  {
    name: "pagination",
    type: "PaginationConfig",
    default: "—",
    description: "Pagination state and change handler.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a loading state.",
  },
]
