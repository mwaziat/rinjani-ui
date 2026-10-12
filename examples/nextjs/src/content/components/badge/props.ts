import type { PropRow } from "@/components/docs/PropsTable"

export const badgeProps: PropRow[] = [
  {
    name: "variant",
    type: '"filled" | "outlined" | "soft" | "text"',
    default: '"soft"',
    description: "Visual style of the badge.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color theme applied to the badge.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Controls padding, font size, and overall height.",
  },
  {
    name: "isPill",
    type: "boolean",
    default: "false",
    description: "Applies fully rounded (pill) corners.",
  },
  {
    name: "leftIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered before the badge text.",
  },
  {
    name: "rightIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered after the badge text.",
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "The text or content displayed inside the badge.",
  },
]
