import type { PropRow } from "@/components/docs/PropsTable"

export const cardProps: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    default: "—",
    description: "Content inside the card, typically CardHeader, CardContent, CardMedia, and CardFooter.",
  },
  {
    name: "noPadding",
    type: "boolean",
    default: "false",
    description: "Removes the default body padding so content such as media can touch the card edges.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Additional classes applied to the card container.",
  },
]

export const cardHeaderProps: PropRow[] = [
  { name: "title", type: "string", default: "—", description: "Main headline displayed in the header." },
  { name: "subtitle", type: "string", default: "—", description: "Supporting text displayed below the title." },
  { name: "icon", type: "ReactNode", default: "—", description: "Optional icon displayed before the title." },
  { name: "children", type: "ReactNode", default: "—", description: "Custom content displayed alongside the title, such as a Badge or action." },
  { name: "className", type: "string", default: "—", description: "Additional classes applied to the header." },
]

export const cardContentProps: PropRow[] = [
  { name: "children", type: "ReactNode", required: true, default: "—", description: "Primary content displayed in the card body." },
  { name: "className", type: "string", default: "—", description: "Additional classes applied to the content area." },
]

export const cardMediaProps: PropRow[] = [
  { name: "image", type: "string", default: "—", description: "Image URL rendered inside the media area." },
  { name: "src", type: "string", default: "—", description: "Alias for image." },
  { name: "alt", type: "string", default: '""', description: "Alternative text for the rendered image." },
  { name: "height", type: "number | string", default: "—", description: "Fixed media height, including CSS values such as 12rem." },
  { name: "objectFit", type: '"cover" | "contain" | "fill" | "none" | "scale-down"', default: '"cover"', description: "Controls how an image fits inside the media area." },
  { name: "children", type: "ReactNode", default: "—", description: "Custom media content when image and src are not provided." },
  { name: "className", type: "string", default: "—", description: "Additional classes applied to the media container." },
]

export const cardFooterProps: PropRow[] = [
  { name: "children", type: "ReactNode", required: true, default: "—", description: "Content rendered at the bottom of the card, typically actions." },
  { name: "className", type: "string", default: "—", description: "Additional classes applied to the footer." },
]
