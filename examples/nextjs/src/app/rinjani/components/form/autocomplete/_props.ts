import type { PropRow } from "@/components/docs/PropsTable"

export const autocompleteProps: PropRow[] = [
  {
    name: "options",
    type: "SelectOption[]",
    required: true,
    default: "—",
    description: "Array of searchable options.",
  },
  {
    name: "onChange",
    type: "(value: SelectValue) => void",
    required: true,
    default: "—",
    description: "Callback when an option is selected.",
  },
  {
    name: "value",
    type: "SelectValue",
    default: "—",
    description: "Currently selected value.",
  },
  {
    name: "label",
    type: "string",
    default: "—",
    description: "Label text.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "—",
    description: "Placeholder shown when nothing is typed.",
  },
  {
    name: "isClearable",
    type: "boolean",
    default: "false",
    description: "Shows an X icon to clear the selection.",
  },
  {
    name: "enableAddItem",
    type: "boolean",
    default: "false",
    description: "Shows a button to add new items not in the options list.",
  },
  {
    name: "onAddItem",
    type: "(option: SelectOption) => void",
    default: "—",
    description: "Callback when a new item is confirmed in default addItemMode.",
  },
  {
    name: "addItemMode",
    type: '"default" | "custom"',
    default: '"default"',
    description: "default shows an inline input. custom fires onAddItemClick for your own modal.",
  },
  {
    name: "onSearch",
    type: "(query: string) => void",
    default: "—",
    description: "Fired on every keystroke — useful for server-side filtering.",
  },
  {
    name: "emptyText",
    type: "string",
    default: '"No results found"',
    description: "Text shown when search yields no matches.",
  },
  {
    name: "error",
    type: "string",
    default: "—",
    description: "Error message displayed below the component.",
  },
]
