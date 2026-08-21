import type { PropRow } from "@/components/docs/PropsTable"

export const dropdownProps: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Dropdown menu content. Typically Dropdown.List with Dropdown.Item children.",
  },
  {
    name: "label",
    type: "string",
    default: "—",
    description: "Text label on the trigger button.",
  },
  {
    name: "icon",
    type: "ReactNode",
    default: "—",
    description: "Icon placed before the label on the trigger button.",
  },
  {
    name: "variant",
    type: '"filled" | "outlined" | "soft" | "text"',
    default: '"soft"',
    description: "Visual style of the trigger button.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"neutral"',
    description: "Color theme of the trigger button.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Size of the trigger button.",
  },
  {
    name: "placement",
    type: '"auto" | "bottom-start" | "bottom-end" | "top-start" | "top-end" | ...',
    default: '"bottom-start"',
    description: "Preferred position of the dropdown menu.",
  },
  {
    name: "showArrow",
    type: "boolean",
    default: "true",
    description: "Shows a chevron arrow on the trigger button.",
  },
  {
    name: "isPill",
    type: "boolean",
    default: "false",
    description: "Fully rounds the trigger button corners.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the trigger and prevents the dropdown from opening.",
  },
  {
    name: "offset",
    type: "number",
    default: "8",
    description: "Distance in pixels between trigger and dropdown menu.",
  },
]

export const dropdownItemProps: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Item label text or content.",
  },
  {
    name: "leftIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered before the item label.",
  },
  {
    name: "rightIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered after the item label.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: "—",
    description: "Color applied on hover. Useful for destructive actions.",
  },
]
