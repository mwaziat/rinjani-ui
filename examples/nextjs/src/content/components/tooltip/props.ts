import type { PropRow } from "@/components/docs/PropsTable"

export const tooltipProps: PropRow[] = [
  { name: "content", type: "ReactNode", required: true, default: "—", description: "Text or elements displayed inside the tooltip bubble." },
  { name: "children", type: "ReactNode", required: true, default: "—", description: "The element that triggers the tooltip on hover or focus." },
  { name: "anchorRef", type: "RefObject<HTMLElement>", default: "—", description: "Optional positioning anchor used instead of the trigger wrapper." },
  { name: "placement", type: '"auto" | "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | ...', default: '"auto"', description: "Preferred position relative to the trigger. Auto chooses the side with the most available space." },
  { name: "color", type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"', default: '"neutral"', description: "Color scale applied to the tooltip background, text, and arrow." },
  { name: "variant", type: '"filled" | "outlined" | "soft"', default: '"filled"', description: "Visual style applied to the tooltip bubble and arrow." },
  { name: "size", type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"', default: '"sm"', description: "Controls padding and font size." },
  { name: "showArrow", type: "boolean", default: "true", description: "Displays a directional arrow aligned with the trigger." },
  { name: "offset", type: "number", default: "8", description: "Distance in pixels between the trigger and the tooltip." },
  { name: "isPill", type: "boolean", default: "false", description: "Applies fully rounded corners to the tooltip bubble." },
  { name: "delay", type: "number", default: "200", description: "Milliseconds before the tooltip appears after hover or focus." },
  { name: "maxWidth", type: '"sm" | "md" | "lg" | "xl" | "2xl" | string | number', default: "—", description: "Maximum width before content wraps. Without it, the tooltip stays on one line." },
  { name: "triggerClassName", type: "string", default: '""', description: "Additional classes applied to the trigger wrapper." },
  { name: "className", type: "string", default: '""', description: "Additional classes applied to the tooltip bubble." },
]
