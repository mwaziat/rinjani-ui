import type React from 'react'

export type TreeSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TreeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type TreeVariant = 'minimal' | 'lined' | 'filled'

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
	[key: string]: unknown
}

export type TreeActionType = 'add-child' | 'edit' | 'delete' | 'detail'

export interface TreeActionConfig {
	key?: string | undefined
	label?: string | undefined
	title?: string | undefined
	icon?: React.ReactNode | undefined
	isActive?: boolean | undefined
	onClick?: ((node: TreeNodeData) => void) | undefined
	className?: string | undefined
	order?: number | undefined
}

export interface TreeActions {
	addChild?: TreeActionConfig | undefined
	edit?: TreeActionConfig | undefined
	delete?: TreeActionConfig | undefined
	customActions?: TreeActionConfig[] | undefined
}

export interface TreeProps {
	data: TreeNodeData[]
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
	defaultExpanded?: boolean | undefined
	className?: string | undefined
}

export interface TreeNodeProps {
	node: TreeNodeData
	level: number
	numberingPath: number[]
	color: TreeColor
	size: TreeSize
	variant: TreeVariant
	activeNodeId?: string | number | undefined
	onNodeClick?: ((node: TreeNodeData) => void) | undefined
	defaultExpanded: boolean
	actionsOnHover: boolean
	renderNodeLabel?: ((node: TreeNodeData, context: { level: number; numbering: string | null }) => React.ReactNode) | undefined
	nodeActions: TreeActionConfig[]
}
