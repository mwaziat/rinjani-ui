import type { PropRow } from "@/components/docs/PropsTable"

export const dataTableProps: PropRow[] = [
  {
    name: "data",
    type: "T[]",
    required: true,
    default: "—",
    description: "Array of row objects to display.",
  },
  {
    name: "columns",
    type: "ColumnDef<T>[]",
    required: true,
    default: "—",
    description: "Column definitions including header, accessor, and optional cell renderer.",
  },
  {
    name: "rowKey",
    type: "(row: T) => string | number",
    default: "—",
    description: "Function to derive a unique key from each row.",
  },
  {
    name: "variant",
    type: '"default" | "striped" | "bordered" | "borderless" | "hover" | "compact" | "comfortable" | "spacious"',
    default: '"default"',
    description: "Visual style variant of the table.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color theme for interactive elements.",
  },
  {
    name: "toolbar",
    type: "ToolbarConfig",
    default: "—",
    description: "Configuration for the toolbar: title, search, add, refresh, delete all buttons.",
  },
  {
    name: "actionColumn",
    type: "ActionColumnConfig<T>",
    default: "—",
    description: "Configuration for the actions column (dropdown, inline, or custom).",
  },
  {
    name: "pagination",
    type: "PaginationConfig",
    default: "—",
    description: "Pagination state and callback for server-side or client-side paging.",
  },
  {
    name: "rowSelection",
    type: "RowSelectionConfig",
    default: "—",
    description: "Enables row checkboxes with selection state and change callback.",
  },
  {
    name: "expandable",
    type: "ExpandableConfig<T>",
    default: "—",
    description: "Renders expandable rows with a custom content renderer.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a loading spinner or skeleton overlay.",
  },
  {
    name: "scrolled",
    type: "boolean",
    default: "false",
    description: "Enables horizontal scrolling with sticky header.",
  },
  {
    name: "contained",
    type: "boolean",
    default: "false",
    description: "Wraps the table in a bordered container.",
  },
]
