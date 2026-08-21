import type { PropRow } from "@/components/docs/PropsTable"

export const tooltipProps: PropRow[] = [
  {
    name: "content",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Text or elements displayed inside the tooltip bubble.",
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "The element that triggers the tooltip on hover/focus.",
  },
  {
    name: "placement",
    type: '"auto" | "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | ...',
    default: '"top"',
    description: "Preferred position of the tooltip relative to the trigger.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"neutral"',
    description: "Color theme applied to the tooltip bubble.",
  },
  {
    name: "variant",
    type: '"filled" | "outlined" | "soft"',
    default: '"filled"',
    description: "Visual style of the tooltip bubble.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Controls padding and font size.",
  },
  {
    name: "showArrow",
    type: "boolean",
    default: "true",
    description: "Displays a directional arrow pointing towards the trigger.",
  },
  {
    name: "isPill",
    type: "boolean",
    default: "false",
    description: "Applies fully rounded corners to the bubble.",
  },
  {
    name: "delay",
    type: "number",
    default: "200",
    description: "Milliseconds before the tooltip appears after hovering.",
  },
  {
    name: "offset",
    type: "number",
    default: "8",
    description: "Distance in pixels between trigger and tooltip.",
  },
  {
    name: "maxWidth",
    type: '"sm" | "md" | "lg" | "xl" | "2xl" | string | number',
    default: '"sm"',
    description: "Maximum width before text wraps to a new line.",
  },
]
