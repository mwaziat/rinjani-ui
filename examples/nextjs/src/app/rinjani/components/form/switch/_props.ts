import type { PropRow } from "@/components/docs/PropsTable"

export const switchProps: PropRow[] = [
  {
    name: "checked",
    type: "boolean",
    required: true,
    default: "—",
    description: "Current toggle state of the switch.",
  },
  {
    name: "onChange",
    type: "(checked: boolean) => void",
    required: true,
    default: "—",
    description: "Callback fired when the switch is toggled.",
  },
  {
    name: "label",
    type: "ReactNode",
    default: "—",
    description: "Text label displayed alongside the switch.",
  },
  {
    name: "labelPlacement",
    type: '"left" | "right" | "top" | "bottom"',
    default: '"right"',
    description: "Position of the label relative to the toggle.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color applied when the switch is on.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Size of the switch toggle.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the switch.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Shows the state but prevents interaction.",
  },
  {
    name: "error",
    type: "string",
    default: "—",
    description: "Error message displayed below the switch.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Marks the field as required.",
  },
]
