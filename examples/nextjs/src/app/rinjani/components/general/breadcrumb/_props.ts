import type { PropRow } from "@/components/docs/PropsTable"

export const breadcrumbProps: PropRow[] = [
  {
    name: "activeLabel",
    type: "string",
    required: true,
    default: "—",
    description: "Text label for the current (non-clickable) page node.",
  },
  {
    name: "paths",
    type: "BreadcrumbPath[]",
    required: true,
    default: "—",
    description: "Array of previous path nodes. Each requires label and href.",
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
    default: '"text"',
    description: "Visual style of the container. Only visible when contained is true.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Font size and spacing of the breadcrumb trail.",
  },
  {
    name: "justify",
    type: '"between" | "start" | "end"',
    default: '"between"',
    description: "Controls whether the header and trail are distributed between both sides, aligned left, or aligned right.",
  },
  {
    name: "contained",
    type: "boolean",
    default: "false",
    description: "Wraps the breadcrumb in a styled container block using the chosen variant.",
  },
  {
    name: "separator",
    type: "ReactNode",
    default: "—",
    description: "Custom element to use as the separator between nodes.",
  },
  {
    name: "activeIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered beside the active label.",
  },
  {
    name: "currentPosition",
    type: "ReactNode",
    default: '"Current Position"',
    description: "Custom subtitle/content shown below the active label. Pass null to hide it.",
  },
  {
    name: "rightContent",
    type: "ReactNode",
    default: "—",
    description: "Optional content rendered after the breadcrumb trail, useful for actions or filters.",
  },
]
