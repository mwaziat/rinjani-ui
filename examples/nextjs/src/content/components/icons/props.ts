import type { PropRow } from "@/components/docs/PropsTable"

export const iconProps: PropRow[] = [
  { name: "size", type: "number | string", default: '"1em"', description: "Sets the rendered width and height of the icon." },
  { name: "color", type: "string", default: '"currentColor"', description: "Sets the SVG color. Tailwind text classes are usually more convenient for theme colors." },
  { name: "className", type: "string", default: '""', description: "Adds classes for color, spacing, sizing, and hover states." },
  { name: "title", type: "string", default: "—", description: "Adds an accessible SVG title when the icon conveys meaning by itself." },
  { name: "style", type: "CSSProperties", default: "—", description: "Adds inline styles to the SVG element." },
  { name: "aria-hidden", type: '"true" | "false"', default: "—", description: "Hide decorative icons from assistive technology when a nearby label already explains them." },
]
