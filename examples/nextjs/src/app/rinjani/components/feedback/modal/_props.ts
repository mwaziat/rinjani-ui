import type { PropRow } from "@/components/docs/PropsTable"

export const modalProps: PropRow[] = [
  {
    name: "isOpen",
    type: "boolean",
    required: true,
    default: "—",
    description: "Controls whether the modal is visible.",
  },
  {
    name: "onClose",
    type: "() => void",
    required: true,
    default: "—",
    description: "Callback fired when the backdrop or Escape key is pressed.",
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Modal content. Typically Modal.Header, Modal.Content, Modal.Footer.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"',
    default: '"md"',
    description: "Maximum width of the modal.",
  },
  {
    name: "scrollMode",
    type: '"dialog" | "content"',
    default: '"dialog"',
    description: "Whether the whole dialog scrolls or only the Modal.Content area.",
  },
  {
    name: "closeOnOutsideClick",
    type: "boolean",
    default: "true",
    description: "Clicking the backdrop overlay triggers onClose.",
  },
]

export const modalHeaderProps: PropRow[] = [
  {
    name: "title",
    type: "string",
    required: true,
    default: "—",
    description: "Main heading of the modal.",
  },
  {
    name: "subtitle",
    type: "string",
    default: "—",
    description: "Secondary text below the title.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "—",
    description: "If provided, renders a close (X) button.",
  },
]
