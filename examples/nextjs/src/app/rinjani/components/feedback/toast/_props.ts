import type { PropRow } from "@/components/docs/PropsTable"

export const toastProps: PropRow[] = [
  {
    name: "message",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Content or description displayed in the toast.",
  },
  {
    name: "title",
    type: "string",
    default: "—",
    description: "Optional heading text.",
  },
  {
    name: "type",
    type: '"success" | "error" | "warning" | "info" | "default"',
    default: '"default"',
    description: "Contextual type controlling the icon and colors.",
  },
  {
    name: "duration",
    type: "number",
    default: "3000",
    description: "Milliseconds before auto-dismissal. Set to 0 for persistent toasts.",
  },
  {
    name: "placement",
    type: '"top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center" | "top-full" | "bottom-full"',
    default: '"bottom-right"',
    description: "Screen position where the toast appears.",
  },
  {
    name: "icon",
    type: "ReactNode",
    default: "—",
    description: "Custom icon overriding the default type-based icon.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "—",
    description: "Callback fired when the toast is dismissed.",
  },
]
