import type React from 'react'

/**
 * Size constraints for the Tree component and its nodes.
 */
export type TreeSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Theme colors derived from the Rinjani UI color palette.
 * Affects node selection, actions, and tree lines.
 */
export type TreeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/**
 * Visual styles available for the tree hierarchy.
 * - `minimal`: Clean, no lines.
 * - `lined`: Shows connecting vertical/horizontal lines between nodes.
 * - `filled`: Nodes have solid background colors when hovered or active.
 */
export type TreeVariant = 'minimal' | 'lined' | 'filled'

/**
 * Represents the loading state of a tree node's children (for async loading).
 */
export type TreeLoadState = 'idle' | 'loading' | 'loaded' | 'error'

/**
 * Properties injected into the custom header renderer.
 */
export interface TreeHeaderRenderProps {
	/** The title of the tree. */
	title?: string | undefined
	/** The description/subtitle of the tree. */
	description?: string | undefined
	/** The active color theme. */
	color: TreeColor
	/** The active size theme. */
	size: TreeSize
	/** The active visual variant. */
	variant: TreeVariant
	/** If true, the root-level add action is visible. */
	showRootAction: boolean
	/** Label for the root-level add action. */
	rootActionLabel?: string | undefined
	/** Callback fired when the root-level add action is clicked. */
	onAddRoot?: (() => void) | undefined
}

/**
 * Core data structure for a tree node.
 */
export interface TreeNodeData {
	/** Unique identifier for the node. */
	id: string | number
	/** Text displayed for the node. */
	label: string
	/** Icon displayed next to the label. */
	icon?: React.ReactNode | undefined
	/** Array of child nodes. */
	children?: TreeNodeData[] | undefined
	/** Used for async loading: indicates this node has children that haven't been fetched yet. */
	hasChildren?: boolean | undefined
	/** Total count of children (can be used for UI badges). */
	totalChildren?: number | undefined
	/** Internal use: indicates if this node is the last child in its level. */
	isEndChild?: boolean | undefined
	/** Internal use: indicates if the node is currently fetching children. */
	isLoading?: boolean | undefined
	/** Current state of the node's child fetching. */
	loadState?: TreeLoadState | undefined
	/** If true/false, overrides global canCreate permissions for this specific node. */
	canCreate?: boolean | undefined
	/** If true/false, overrides global canEdit permissions for this specific node. */
	canEdit?: boolean | undefined
	/** If true/false, overrides global canDelete permissions for this specific node. */
	canDelete?: boolean | undefined
	/** If true/false, overrides global canDetail permissions for this specific node. */
	canDetail?: boolean | undefined
	/** Holds the raw original object from the server. */
	raw?: unknown
}

/**
 * Default action types supported by the tree.
 */
export type TreeActionType = 'add-child' | 'edit' | 'delete' | 'detail'

/**
 * Configuration for a single action button on a node.
 */
export interface TreeActionConfig {
	/** Unique key/identifier for the action. */
	key?: string | undefined
	/** Text label (often visually hidden but used for aria/tooltips). */
	label?: string | undefined
	/** Tooltip title. */
	title?: string | undefined
	/** React node to render as the action icon. */
	icon?: React.ReactNode | undefined
	/** If true, the action is marked active. */
	isActive?: boolean | undefined
	/** Callback fired when the action is clicked. */
	onClick?: ((node: TreeNodeData) => void) | undefined
	/** Dynamic visibility check. */
	isVisible?: ((node: TreeNodeData) => boolean) | undefined
	/** Dynamic disable check. */
	isDisabled?: ((node: TreeNodeData) => boolean) | undefined
	/** Additional CSS classes. */
	className?: string | undefined
	/** Sort order for the action. */
	order?: number | undefined
}

/**
 * Collection of standard and custom actions available on nodes.
 */
export interface TreeActions {
	/** Configuration for the "add child" action. */
	addChild?: TreeActionConfig | undefined
	/** Configuration for the "edit" action. */
	edit?: TreeActionConfig | undefined
	/** Configuration for the "delete" action. */
	delete?: TreeActionConfig | undefined
	/** Configuration for the "detail/view" action. */
	detail?: TreeActionConfig | undefined
	/** Any additional custom actions. */
	customActions?: TreeActionConfig[] | undefined
}

/**
 * Main properties for the Tree component.
 */
export interface TreeProps {
	/** The hierarchical data to render. */
	data?: TreeNodeData[] | undefined
	/** Title displayed in the header. */
	title?: string | undefined
	/** Description displayed in the header. */
	description?: string | undefined
	/** Text shown when `data` is empty. */
	emptyText?: string | undefined
	/** Custom renderer for the header section. */
	renderHeader?: ((props: TreeHeaderRenderProps) => React.ReactNode) | undefined
	/** Color theme for the tree. @default "primary" */
	color?: TreeColor | undefined
	/** Size theme for the tree. @default "md" */
	size?: TreeSize | undefined
	/** Visual style for the tree. @default "minimal" */
	variant?: TreeVariant | undefined
	/** If true, node actions only appear when hovering over the node. @default false */
	actionsOnHover?: boolean | undefined
	/** If true, displays a button to add a new root-level node. */
	showRootAction?: boolean | undefined
	/** Label for the root action button. */
	rootActionLabel?: string | undefined
	/** Callback fired when the root action is clicked. */
	onAddRoot?: (() => void) | undefined
	/** Global action configurations. */
	actions?: TreeActions | undefined
	/** Global callback for when any action is clicked. */
	onAction?: ((type: TreeActionType, node: TreeNodeData) => void) | undefined
	/** ID of the currently active/selected node. */
	activeNodeId?: string | number | undefined
	/** Callback fired when a node label/row is clicked. */
	onNodeClick?: ((node: TreeNodeData) => void) | undefined
	/** Custom renderer for the node's label content. */
	renderNodeLabel?: ((node: TreeNodeData, context: { level: number; numbering: string | null }) => React.ReactNode) | undefined
	/** Custom renderer for content to the right of the node (before actions). */
	renderNodeRight?: ((node: TreeNodeData) => React.ReactNode) | undefined
	/** Async function to load children when a node with `hasChildren: true` is expanded. */
	loadChildren?: ((node: TreeNodeData) => Promise<TreeNodeData[]>) | undefined
	/** Callback when `loadChildren` fails. */
	onLoadError?: ((node: TreeNodeData, error: unknown) => void) | undefined
	/** Callback fired when a node is expanded or collapsed. */
	onNodeExpand?: ((node: TreeNodeData) => Promise<void> | void) | undefined
	/** Array of node IDs that are currently expanded (controlled state). */
	expandedKeys?: Array<string | number> | undefined
	/** Callback when `expandedKeys` changes. */
	onExpandedKeysChange?: ((keys: Array<string | number>) => void) | undefined
	/** If true, enables drag-and-drop reordering/nesting. */
	draggable?: boolean | undefined
	/** Callback fired when a node is successfully dragged and dropped. */
	onMoveNode?: ((sourceNode: TreeNodeData, targetNode: TreeNodeData, nextData: TreeNodeData[]) => void) | undefined
	/** Callback fired whenever the tree data structure changes (e.g. after drag-and-drop). */
	onDataChange?: ((nextData: TreeNodeData[]) => void) | undefined
	/** Maximum depth level allowed (especially for drag-and-drop limits). */
	maxIndentLevel?: number | undefined
	/** If true, generates structural numbering (e.g. 1.1.2) for nodes. */
	deepLevelNumbering?: boolean | undefined
	/** If true, all nodes expand by default on initial render. */
	defaultExpanded?: boolean | undefined
	/** Additional CSS classes for the container. */
	className?: string | undefined
}

/**
 * Internal properties for the TreeNode component.
 */
export interface TreeNodeProps {
	node: TreeNodeData
	level: number
	pathIndexes: number[]
	color: TreeColor
	size: TreeSize
	variant: TreeVariant
	activeNodeId?: string | number | undefined
	focusedNodeId: string | number | null
	onFocusNode: (id: string | number) => void
	onNodeClick?: ((node: TreeNodeData) => void) | undefined
	expandedKeys: ReadonlySet<string | number>
	onToggleExpand: (node: TreeNodeData, nextExpanded: boolean) => void
	onRetryLoad: (node: TreeNodeData) => void
	actionsOnHover: boolean
	renderNodeLabel?: ((node: TreeNodeData, context: { level: number; numbering: string | null }) => React.ReactNode) | undefined
	renderNodeRight?: ((node: TreeNodeData) => React.ReactNode) | undefined
	draggable: boolean
	onDragStartNode?: ((node: TreeNodeData) => void) | undefined
	onDragEndNode?: (() => void) | undefined
	onDragEnterNode?: ((node: TreeNodeData) => void) | undefined
	onDropOnNode?: ((targetNode: TreeNodeData) => void) | undefined
	dragTargetNodeId?: string | number | null | undefined
	maxIndentLevel: number
	deepLevelNumbering: boolean
	nodeActions: TreeActionConfig[]
	siblingsHaveChildren: boolean
}
