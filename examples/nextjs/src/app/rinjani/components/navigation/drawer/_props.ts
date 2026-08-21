import type { PropRow } from "@/components/docs/PropsTable"

export const drawerProps: PropRow[] = [
  {
    name: "isOpen",
    type: "boolean",
    required: true,
    default: "—",
    description: "Controls whether the drawer is visible.",
  },
  {
    name: "onClose",
    type: "() => void",
    required: true,
    default: "—",
    description: "Callback fired when the user clicks the backdrop or presses Escape.",
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Drawer content. Typically Drawer.Header, Drawer.Content, Drawer.Footer.",
  },
  {
    name: "position",
    type: '"left" | "right" | "top" | "bottom"',
    default: '"right"',
    description: "Edge from which the drawer slides in.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "1/4" | "1/3" | "1/2" | "2/3" | "3/4" | "full"',
    default: '"md"',
    description: "Width (or height for top/bottom) of the drawer panel.",
  },
]

export const drawerHeaderProps: PropRow[] = [
  {
    name: "title",
    type: "string",
    required: true,
    default: "—",
    description: "Main heading text for the drawer.",
  },
  {
    name: "onClose",
    type: "() => void",
    required: true,
    default: "—",
    description: "Callback fired when the close (X) button is clicked.",
  },
  {
    name: "subtitle",
    type: "string",
    default: "—",
    description: "Secondary context text below the title.",
  },
]
