import type { PropRow } from "@/components/docs/PropsTable"

export const radioProps: PropRow[] = [
  {
    name: "options",
    type: "SelectOption[]",
    required: true,
    default: "—",
    description: "Array of { label, value, disabled? } radio options.",
  },
  {
    name: "value",
    type: "string | number",
    default: "—",
    description: "Currently selected value.",
  },
  {
    name: "onChange",
    type: "(value: string | number) => void",
    required: true,
    default: "—",
    description: "Callback with the newly selected value.",
  },
  {
    name: "label",
    type: "ReactNode",
    default: "—",
    description: "Group label displayed above the radio buttons.",
  },
  {
    name: "orientation",
    type: '"col" | "row"',
    default: '"col"',
    description: "Stack radios vertically or side-by-side.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color of the selected state.",
  },
  {
    name: "appearance",
    type: '"default" | "card"',
    default: '"default"',
    description: "Card appearance renders each option as a clickable card.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the entire group.",
  },
  {
    name: "error",
    type: "string",
    default: "—",
    description: "Error message below the group.",
  },
]
