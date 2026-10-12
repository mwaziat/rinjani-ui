import type { PropRow } from "@/components/docs/PropsTable"

export const buttonProps: PropRow[] = [
  {
    name: "variant",
    type: '"filled" | "outlined" | "soft" | "text"',
    default: '"filled"',
    description: "Visual style of the button.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color theme applied to the button variant.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Controls padding, font size, and icon scaling.",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Shows a spinner and disables the button.",
  },
  {
    name: "leftIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered before the button label.",
  },
  {
    name: "rightIcon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered after the button label.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Expands the button to fill its parent width.",
  },
  {
    name: "isPill",
    type: "boolean",
    default: "false",
    description: "Applies fully rounded (pill) corners.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button and prevents interaction.",
  },
]

export const iconButtonProps: PropRow[] = [
  {
    name: "icon",
    type: "ReactNode",
    default: "—",
    description: "The icon element rendered inside the button.",
  },
  {
    name: "variant",
    type: '"filled" | "outlined" | "soft" | "text"',
    default: '"filled"',
    description: "Visual style of the button.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color theme applied to the button.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: "Controls the button dimensions and icon size.",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Shows a spinner and disables the button.",
  },
  {
    name: "isPill",
    type: "boolean",
    default: "false",
    description: "Makes the button circular instead of rounded square.",
  },
]
