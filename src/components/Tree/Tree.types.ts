import type React from 'react'

export type TreeSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TreeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type TreeVariant = 'minimal' | 'lined' | 'filled'
export type TreeLoadState = 'idle' | 'loading' | 'loaded' | 'error'

export interface TreeHeaderRenderProps {
	title?: string | undefined
	description?: string | undefined
	color: TreeColor
	size: TreeSize
	variant: TreeVariant
	showRootAction: boolean
	rootActionLabel?: string | undefined
	onAddRoot?: (() => void) | undefined
}

export interface TreeNodeData {
	id: string | number
	label: string
	icon?: React.ReactNode | undefined
	children?: TreeNodeData[] | undefined
	hasChildren?: boolean | undefined
	totalChildren?: number | undefined
	isEndChild?: boolean | undefined
	isLoading?: boolean | undefined
	loadState?: TreeLoadState | undefined
	canCreate?: boolean | undefined
	canEdit?: boolean | undefined
	canDelete?: boolean | undefined
	canDetail?: boolean | undefined
	raw?: unknown
}

export type TreeActionType = 'add-child' | 'edit' | 'delete' | 'detail'

export interface TreeActionConfig {
	key?: string | undefined
	label?: string | undefined
	title?: string | undefined
	icon?: React.ReactNode | undefined
	isActive?: boolean | undefined
	onClick?: ((node: TreeNodeData) => void) | undefined
	isVisible?: ((node: TreeNodeData) => boolean) | undefined
	isDisabled?: ((node: TreeNodeData) => boolean) | undefined
	className?: string | undefined
	order?: number | undefined
}

export interface TreeActions {
	addChild?: TreeActionConfig | undefined
	edit?: TreeActionConfig | undefined
	delete?: TreeActionConfig | undefined
	detail?: TreeActionConfig | undefined
	customActions?: TreeActionConfig[] | undefined
}

export interface TreeProps {
	data?: TreeNodeData[] | undefined
	title?: string | undefined
	description?: string | undefined
	emptyText?: string | undefined
	renderHeader?: ((props: TreeHeaderRenderProps) => React.ReactNode) | undefined
	color?: TreeColor | undefined
	size?: TreeSize | undefined
	variant?: TreeVariant | undefined
	actionsOnHover?: boolean | undefined
	showRootAction?: boolean | undefined
	rootActionLabel?: string | undefined
	onAddRoot?: (() => void) | undefined
	actions?: TreeActions | undefined
	onAction?: ((type: TreeActionType, node: TreeNodeData) => void) | undefined
	activeNodeId?: string | number | undefined
	onNodeClick?: ((node: TreeNodeData) => void) | undefined
	renderNodeLabel?: ((node: TreeNodeData, context: { level: number; numbering: string | null }) => React.ReactNode) | undefined
	renderNodeRight?: ((node: TreeNodeData) => React.ReactNode) | undefined
	loadChildren?: ((node: TreeNodeData) => Promise<TreeNodeData[]>) | undefined
	onLoadError?: ((node: TreeNodeData, error: unknown) => void) | undefined
	onNodeExpand?: ((node: TreeNodeData) => Promise<void> | void) | undefined
	expandedKeys?: Array<string | number> | undefined
	onExpandedKeysChange?: ((keys: Array<string | number>) => void) | undefined
	draggable?: boolean | undefined
	onMoveNode?: ((sourceNode: TreeNodeData, targetNode: TreeNodeData, nextData: TreeNodeData[]) => void) | undefined
	onDataChange?: ((nextData: TreeNodeData[]) => void) | undefined
	maxIndentLevel?: number | undefined
	deepLevelNumbering?: boolean | undefined
	defaultExpanded?: boolean | undefined
	className?: string | undefined
}

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
}
