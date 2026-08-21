import type { PropRow } from "@/components/docs/PropsTable"

export const treeProps: PropRow[] = [
  {
    name: "data",
    type: "TreeNodeData[]",
    default: "—",
    description: "Hierarchical array of node objects to render.",
  },
  {
    name: "title",
    type: "string",
    default: "—",
    description: "Title displayed in the tree header.",
  },
  {
    name: "variant",
    type: '"minimal" | "lined" | "filled"',
    default: '"minimal"',
    description: "Visual style controlling connecting lines and node backgrounds.",
  },
  {
    name: "color",
    type: '"primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral"',
    default: '"primary"',
    description: "Color theme for selection, actions, and tree lines.",
  },
  {
    name: "size",
    type: '"xxs" | "xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Size of tree nodes and typography.",
  },
  {
    name: "activeNodeId",
    type: "string | number",
    default: "—",
    description: "ID of the currently selected/active node.",
  },
  {
    name: "onNodeClick",
    type: "(node: TreeNodeData) => void",
    default: "—",
    description: "Callback fired when a node label is clicked.",
  },
  {
    name: "defaultExpanded",
    type: "boolean",
    default: "false",
    description: "Expands all nodes on initial render.",
  },
  {
    name: "deepLevelNumbering",
    type: "boolean",
    default: "false",
    description: "Generates structural numbering (e.g. 1.1.2) for nodes.",
  },
  {
    name: "draggable",
    type: "boolean",
    default: "false",
    description: "Enables drag-and-drop reordering and nesting.",
  },
  {
    name: "loadChildren",
    type: "(node: TreeNodeData) => Promise<TreeNodeData[]>",
    default: "—",
    description: "Async function to fetch children when a node with hasChildren is expanded.",
  },
  {
    name: "actionsOnHover",
    type: "boolean",
    default: "false",
    description: "Shows node action buttons only on hover.",
  },
  {
    name: "emptyText",
    type: "string",
    default: "—",
    description: "Text displayed when data is empty.",
  },
]
