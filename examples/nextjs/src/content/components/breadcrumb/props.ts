import type { PropRow } from "@/components/docs/PropsTable"

export const breadcrumbProps: PropRow[] = [
  {
    name: "activeLabel",
    type: "string",
    required: true,
    default: "—",
    description: "Text label for the current, non-clickable page node.",
  },
  {
    name: "paths",
    type: "BreadcrumbPath[]",
    required: true,
    default: "—",
    description: "Previous path nodes. Each item contains a label and href.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color applied to the active item and link hover states.",
  },
  {
    name: "variant",
    type: '"filled" | "outlined" | "soft" | "text" | "line"',
    default: '"line"',
    description: "Visual style used by the contained breadcrumb.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Font size and spacing of the breadcrumb trail.",
  },
  {
    name: "justify",
    type: '"between" | "start" | "end"',
    default: '"between"',
    description: "Horizontal alignment of the heading and breadcrumb trail.",
  },
  {
    name: "contained",
    type: "boolean",
    default: "true",
    description: "Wraps the breadcrumb in a styled container block.",
  },
  {
    name: "separator",
    type: "ReactNode",
    default: "ChevronRightIcon",
    description: "Custom element displayed between path nodes.",
  },
  {
    name: "activeIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered beside the active label.",
  },
  {
    name: "currentPosition",
    type: "ReactNode | null",
    default: '"Current Position"',
    description: "Subtitle shown below the active label. Pass null to hide it.",
  },
  {
    name: "rightContent",
    type: "ReactNode",
    default: "—",
    description: "Optional content rendered after the breadcrumb trail.",
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Additional classes applied to the root container.",
  },
]
