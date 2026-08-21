import type { PropRow } from "@/components/docs/PropsTable"

export const dropzoneProps: PropRow[] = [
  {
    name: "label",
    type: "string",
    required: true,
    default: "—",
    description: "Label text displayed above the dropzone.",
  },
  {
    name: "values",
    type: "FileWithPreview[]",
    required: true,
    default: "—",
    description: "Current array of selected files.",
  },
  {
    name: "onChange",
    type: "(files: FileWithPreview[]) => void",
    required: true,
    default: "—",
    description: "Callback fired when files are added or removed.",
  },
  {
    name: "accept",
    type: "string",
    default: "—",
    description: 'HTML accept attribute (e.g. "image/*, .pdf").',
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    description: "Allows multiple file selection.",
  },
  {
    name: "maxSize",
    type: "number",
    default: "—",
    description: "Maximum file size in MB.",
  },
  {
    name: "maxFiles",
    type: "number",
    default: "—",
    description: "Maximum number of files (when multiple is true).",
  },
  {
    name: "variant",
    type: '"outlined" | "filled" | "soft"',
    default: '"outlined"',
    description: "Visual style of the dropzone.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color theme for active/drag states.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size of the dropzone container.",
  },
  {
    name: "layout",
    type: '"default" | "grid"',
    default: '"default"',
    description: "Layout structure of the dropzone.",
  },
  {
    name: "dashed",
    type: "boolean",
    default: "false",
    description: "Renders a dashed border instead of solid.",
  },
  {
    name: "previewPlacement",
    type: '"inside" | "outside" | "grid"',
    default: '"outside"',
    description: "Where file previews are displayed.",
  },
  {
    name: "showPreview",
    type: "boolean",
    default: "true",
    description: "Whether to render file previews.",
  },
  {
    name: "error",
    type: "string",
    default: "—",
    description: "Error message below the dropzone.",
  },
]
