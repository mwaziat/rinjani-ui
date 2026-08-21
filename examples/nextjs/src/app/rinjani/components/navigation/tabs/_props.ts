import type { PropRow } from "@/components/docs/PropsTable"

export const tabsProps: PropRow[] = [
  {
    name: "activeTab",
    type: "string",
    required: true,
    default: "—",
    description: "Value of the currently active tab. Must match a Tabs.Item value.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    required: true,
    default: "—",
    description: "Callback fired when a tab is clicked.",
  },
  {
    name: "variant",
    type: '"line" | "filled" | "soft" | "outlined" | "text"',
    default: '"line"',
    description: "Visual style of the active tab indicator.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color theme for the active tab.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Font size and padding of tab triggers.",
  },
  {
    name: "align",
    type: '"left" | "center" | "right" | "fullWidth"',
    default: '"left"',
    description: "Alignment of the tab list items.",
  },
  {
    name: "placement",
    type: '"horizontal-top" | "horizontal-bottom" | "vertical-left" | "vertical-right"',
    default: '"horizontal-top"',
    description: "Layout orientation and position of the tab list.",
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Tabs.List, Tabs.Content, and optionally Tabs.Footer.",
  },
]

export const tabsItemProps: PropRow[] = [
  {
    name: "value",
    type: "string",
    required: true,
    default: "—",
    description: "Unique identifier. Must match a Tabs.Content value.",
  },
  {
    name: "icon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered alongside the tab label.",
  },
  {
    name: "iconPosition",
    type: '"start" | "end" | "top" | "bottom"',
    default: '"start"',
    description: "Position of the icon relative to the label text.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents this tab from being clicked.",
  },
]
