import type { PropRow } from "@/components/docs/PropsTable"

export const inputFieldProps: PropRow[] = [
  {
    name: "label",
    type: "ReactNode",
    default: "—",
    description: "Label text displayed above or inside the input.",
  },
  {
    name: "variant",
    type: '"outlined" | "filled" | "line"',
    default: '"outlined"',
    description: "Visual style of the input.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Controls height, padding, and font size.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color of the focus ring and active border.",
  },
  {
    name: "floating",
    type: "boolean",
    default: "false",
    description: "Label starts inside the input and floats to the top on focus/fill.",
  },
  {
    name: "leftIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered inside the input on the left.",
  },
  {
    name: "rightIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered inside the input on the right.",
  },
  {
    name: "isPassword",
    type: "boolean",
    default: "false",
    description: "Treats the field as a password with a built-in show/hide toggle.",
  },
  {
    name: "isMultiline",
    type: "boolean",
    default: "false",
    description: "Renders a textarea instead of an input.",
  },
  {
    name: "rows",
    type: "number",
    default: "3",
    description: "Number of visible text lines when isMultiline is true.",
  },
  {
    name: "format",
    type: '"text" | "currency"',
    default: '"text"',
    description: "Currency format automatically adds separators (e.g. 1,000.00).",
  },
  {
    name: "error",
    type: "string",
    default: "—",
    description: "Error message displayed below the input. Also applies error styling.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Marks the field as required with an asterisk.",
  },
]
