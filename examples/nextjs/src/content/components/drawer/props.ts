import type { PropRow } from "@/components/docs/PropsTable"

export const drawerProps: PropRow[] = [
  { name: "isOpen", type: "boolean", required: true, default: "—", description: "Controls whether the drawer is visible." },
  { name: "onClose", type: "() => void", required: true, default: "—", description: "Called when the backdrop is clicked. Pass it to your own controls, including DrawerHeader, to close the controlled drawer." },
  { name: "closeOnBackdrop", type: "boolean", default: "true", description: "When true, clicking the shaded backdrop calls onClose. Set false to require an explicit close control." },
  { name: "children", type: "ReactNode", required: true, default: "—", description: "Drawer content, usually composed from DrawerHeader, DrawerContent, and DrawerFooter." },
  { name: "position", type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: "Edge from which the drawer slides in." },
  { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "1/4" | "1/3" | "1/2" | "2/3" | "3/4" | "full"', default: '"md"', description: "Width, or height for top and bottom drawers." },
  { name: "className", type: "string", default: '""', description: "Additional classes applied to the drawer panel." },
]

export const drawerHeaderProps: PropRow[] = [
  { name: "title", type: "string", required: true, default: "—", description: "Main heading displayed in the drawer header." },
  { name: "onClose", type: "() => void", required: true, default: "—", description: "Called when the header close button is clicked." },
  { name: "subtitle", type: "string", default: "—", description: "Optional supporting text displayed below the title." },
]

export const drawerContentProps: PropRow[] = [
  { name: "children", type: "ReactNode", required: true, default: "—", description: "Scrollable body content." },
  { name: "className", type: "string", default: '""', description: "Additional classes applied to the content area." },
]

export const drawerFooterProps: PropRow[] = [
  { name: "children", type: "ReactNode", required: true, default: "—", description: "Actions or supporting content pinned to the drawer footer." },
  { name: "className", type: "string", default: '""', description: "Additional classes applied to the footer area." },
]
