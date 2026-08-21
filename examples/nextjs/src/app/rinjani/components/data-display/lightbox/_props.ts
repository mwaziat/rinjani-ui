import type { PropRow } from "@/components/docs/PropsTable"

export const lightboxProps: PropRow[] = [
  {
    name: "open",
    type: "boolean",
    required: true,
    default: "—",
    description: "Controls whether the lightbox is visible.",
  },
  {
    name: "close",
    type: "() => void",
    required: true,
    default: "—",
    description: "Callback to close the lightbox.",
  },
  {
    name: "slides",
    type: "LightboxSlide[]",
    required: true,
    default: "—",
    description: "Array of image slide objects (src, alt, title, description).",
  },
  {
    name: "index",
    type: "number",
    default: "0",
    description: "Initial slide index when opened.",
  },
  {
    name: "showThumbnails",
    type: "boolean",
    default: "true",
    description: "Shows clickable thumbnail row at the bottom.",
  },
  {
    name: "showZoom",
    type: "boolean",
    default: "true",
    description: "Enables zoom controls.",
  },
  {
    name: "autoplay",
    type: "boolean",
    default: "false",
    description: "Automatically transitions between slides.",
  },
  {
    name: "autoplayDuration",
    type: "number",
    default: "3000",
    description: "Milliseconds between slide transitions when autoplay is enabled.",
  },
  {
    name: "isDraggable",
    type: "boolean",
    default: "true",
    description: "Allows drag/swipe to navigate slides.",
  },
  {
    name: "loop",
    type: "boolean",
    default: "true",
    description: "Loops from last slide back to first.",
  },
]
