import type { PropRow } from "@/components/docs/PropsTable"

export const alertProps: PropRow[] = [
  {
    name: "title",
    type: "string",
    default: "—",
    description: "Main heading text of the alert.",
  },
  {
    name: "message",
    type: "ReactNode",
    default: "—",
    description: "Detailed message rendered below the title.",
  },
  {
    name: "variant",
    type: '"soft" | "filled" | "outlined"',
    default: '"soft"',
    description: "Visual style of the alert.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"info"',
    description: "Color theme representing the status or intent.",
  },
  {
    name: "action",
    type: '"close" | "minimize"',
    default: "—",
    description: "Interactive button rendered on the right edge.",
  },
  {
    name: "duration",
    type: "number",
    default: "—",
    description: "Milliseconds before auto-dismissal. Shows a progress bar.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "—",
    description: "Callback fired when the alert is dismissed.",
  },
  {
    name: "showIcon",
    type: "boolean",
    default: "true",
    description: "Whether to display the status icon.",
  },
  {
    name: "icon",
    type: "ReactNode",
    default: "—",
    description: "Custom icon overriding the default type-based one.",
  },
]
