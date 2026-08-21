import type { PropRow } from "@/components/docs/PropsTable"

export const cardProps: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Content inside the card. Typically Card.Header, Card.Content, Card.Footer.",
  },
  {
    name: "noPadding",
    type: "boolean",
    default: "false",
    description: "Removes default padding, allowing edge-to-edge content like images or tables.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Additional CSS classes for the card container.",
  },
]

export const cardHeaderProps: PropRow[] = [
  {
    name: "title",
    type: "string",
    default: "—",
    description: "Main headline text.",
  },
  {
    name: "subtitle",
    type: "string",
    default: "—",
    description: "Secondary text displayed below the title.",
  },
  {
    name: "icon",
    type: "ReactNode",
    default: "—",
    description: "Icon rendered to the left of the title.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "—",
    description: "Custom content rendered alongside the title (e.g. action buttons).",
  },
]

export const cardContentProps: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Primary body content of the card.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Additional CSS classes for the content area.",
  },
]

export const cardFooterProps: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Footer content, typically action buttons.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Additional CSS classes for the footer area.",
  },
]
