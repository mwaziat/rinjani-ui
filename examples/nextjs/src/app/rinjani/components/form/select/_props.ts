import type { PropRow } from "@/components/docs/PropsTable"

export const selectProps: PropRow[] = [
  {
    name: "options",
    type: "SelectOption[]",
    required: true,
    default: "—",
    description: "Array of { label, value, disabled? } objects.",
  },
  {
    name: "onChange",
    type: "(value: SelectValue) => void",
    required: true,
    default: "—",
    description: "Callback fired when the user selects an option.",
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
    description: "Label text above the select.",
  },
  {
    name: "placeholder",
    type: "string",
    default: "—",
    description: "Placeholder shown when no option is selected.",
  },
  {
    name: "variant",
    type: '"outlined" | "filled" | "line"',
    default: '"outlined"',
    description: "Visual style of the select.",
  },
  {
    name: "floating",
    type: "boolean",
    default: "false",
    description: "Enables the floating label design.",
  },
  {
    name: "isClearable",
    type: "boolean",
    default: "false",
    description: "Shows an X icon to clear the selection.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the select.",
  },
  {
    name: "error",
    type: "string",
    default: "—",
    description: "Error message shown below the select.",
  },
]
