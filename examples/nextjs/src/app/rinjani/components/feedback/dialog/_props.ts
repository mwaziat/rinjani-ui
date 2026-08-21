import type { PropRow } from "@/components/docs/PropsTable"

export const dialogProps: PropRow[] = [
  {
    name: "message",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Detailed content or question shown to the user.",
  },
  {
    name: "title",
    type: "string",
    default: "—",
    description: "Main heading text of the dialog.",
  },
  {
    name: "type",
    type: '"success" | "error" | "warning" | "info" | "confirm" | "default"',
    default: '"default"',
    description: "Contextual type controlling the default icon and colors.",
  },
  {
    name: "showCancel",
    type: "boolean",
    default: "false",
    description: "Renders a cancel button alongside the confirm button.",
  },
  {
    name: "confirmText",
    type: "string",
    default: '"Confirm"',
    description: "Label for the primary confirm button.",
  },
  {
    name: "cancelText",
    type: "string",
    default: '"Cancel"',
    description: "Label for the cancel button.",
  },
  {
    name: "onConfirm",
    type: "() => void | Promise<void>",
    default: "—",
    description: "Callback fired when the confirm button is clicked.",
  },
  {
    name: "onCancel",
    type: "() => void",
    default: "—",
    description: "Callback fired when the cancel button or backdrop is clicked.",
  },
  {
    name: "actions",
    type: "DialogAction[]",
    default: "—",
    description: "Fully custom action buttons replacing the default confirm/cancel.",
  },
  {
    name: "closeOnBackdrop",
    type: "boolean",
    default: "true",
    description: "Clicking outside the dialog closes it.",
  },
  {
    name: "icon",
    type: "ReactNode",
    default: "—",
    description: "Custom icon overriding the default type-based icon.",
  },
]
