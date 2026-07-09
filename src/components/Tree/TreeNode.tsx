'use client'

import React from 'react'
import { ChevronDownIcon, ChevronRightIcon, LoaderIcon, RefreshIcon } from '../Icons'
import type { TreeActionConfig, TreeNodeData, TreeNodeProps } from './Tree.types'
import {
  getRowStyle,
  actionColorClass,
  nodeSizeClass,
  getBasePadding,
  iconButtonSizeClass,
  getIconWidth,
  labelTextClass,
  lineColorClass,
} from './Tree.styles'
import { getNextPathIndexes, resolveHasChildren } from './Tree.utils'

const TreeNodeItemComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  pathIndexes,
  color,
  size,
  variant,
  activeNodeId,
  focusedNodeId,
  onFocusNode,
  onNodeClick,
  expandedKeys,
  onToggleExpand,
  onRetryLoad,
  actionsOnHover,
  renderNodeLabel,
  renderNodeRight,
  draggable,
  onDragStartNode,
  onDragEndNode,
  onDragEnterNode,
  onDropOnNode,
  dragTargetNodeId,
  maxIndentLevel,
  deepLevelNumbering,
  nodeActions,
  siblingsHaveChildren,
}) => {
  const children = Array.isArray(node.children) ? node.children : []
  const hasChildren = resolveHasChildren(node, children)
  const reserveToggle = hasChildren || siblingsHaveChildren
  const childrenHaveToggles = children.some((child) =>
    resolveHasChildren(child, Array.isArray(child.children) ? child.children : []),
  )
  const isExpanded = expandedKeys.has(node.id)
  const isLoading = node.isLoading === true
  const isError = node.loadState === 'error'
  const hasLoadedChildren = children.length > 0
  const needsLoad = hasChildren && !hasLoadedChildren && !isLoading && !isError
  const isOpen = isExpanded && (hasLoadedChildren || isLoading || isError)
  const isActive = activeNodeId !== undefined && activeNodeId === node.id
  const isFocused = focusedNodeId === node.id

  const visualLevel = Math.min(level, maxIndentLevel)
  const isOverIndentThreshold = level > maxIndentLevel
  const numbering = deepLevelNumbering && isOverIndentThreshold ? pathIndexes.join('.') : null
  const isDragTarget = dragTargetNodeId === node.id

  const basePadding = getBasePadding(size)
  const iconWidth = getIconWidth(size)
  const lineOffset = basePadding + iconWidth / 2 - 1

  let rowStyle: React.CSSProperties = {}
  let childrenWrapperStyle: React.CSSProperties = {}
  let rowClass = `group/row relative flex items-center justify-between transition-all cursor-pointer ${nodeSizeClass(size)} ${getRowStyle(variant, isActive, color)}`
  let childrenWrapperClass = 'flex flex-col'

  if (variant === 'minimal') {
    rowClass += ' rounded-lg'
    rowStyle = { paddingLeft: `${visualLevel * 24 + basePadding}px` }
  } else if (variant === 'filled') {
    rowClass += ' rounded-lg mb-1.5'
    rowStyle = { marginLeft: `${visualLevel * 24}px` }
  } else if (variant === 'lined') {
    rowClass += ' rounded-md'
    childrenWrapperClass += ` border-l border-dashed ${lineColorClass(color)}`
    childrenWrapperStyle = { marginLeft: `${lineOffset}px`, paddingLeft: '16px' }
  }

  const toggleNode = () => {
    if (!hasChildren) return
    if (needsLoad) {
      onToggleExpand(node, true)
      return
    }
    onToggleExpand(node, !isOpen)
  }

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation()
    toggleNode()
  }

  const handleNodeClick = () => {
    if (onNodeClick) onNodeClick(node)
    else toggleNode()
  }

  return (
    <div
      role="treeitem"
      aria-level={level + 1}
      aria-expanded={hasChildren ? isOpen : undefined}
      aria-selected={isActive}
      tabIndex={isFocused ? 0 : -1}
      data-tree-id={node.id}
      onFocus={(event) => {
        event.stopPropagation()
        onFocusNode(node.id)
      }}
      className="group/treeitem flex flex-col outline-none"
    >
      <div
        onClick={handleNodeClick}
        draggable={draggable}
        onDragStart={() => onDragStartNode?.(node)}
        onDragEnd={() => onDragEndNode?.()}
        onDragEnter={(event) => {
          event.preventDefault()
          onDragEnterNode?.(node)
        }}
        onDragOver={(event) => {
          if (!draggable) return
          event.preventDefault()
        }}
        onDrop={(event) => {
          if (!draggable) return
          event.preventDefault()
          onDropOnNode?.(node)
        }}
        className={`${rowClass} group-focus-visible/treeitem:ring-2 group-focus-visible/treeitem:ring-primary-400 ${isDragTarget ? 'ring-1 ring-primary-300 bg-primary-50/40' : ''}`}
        style={rowStyle}
      >
        {variant === 'lined' && level > 0 && (
          <div className={`absolute top-1/2 -translate-y-1/2 -left-4 w-4 border-t border-dashed ${lineColorClass(color)}`} />
        )}

        <div className="flex min-w-0 items-center gap-2">
          {reserveToggle && (
            <button
              type="button"
              aria-hidden={!hasChildren}
              tabIndex={-1}
              onClick={handleToggle}
              className={`${iconButtonSizeClass(size)} flex items-center justify-center rounded-md transition-colors ${
                hasChildren
                  ? isActive && variant === 'filled'
                    ? 'text-white hover:bg-white/20'
                    : 'text-neutral-400 hover:bg-neutral-200/50 hover:text-neutral-900'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              {isLoading ? (
                <LoaderIcon size={14} />
              ) : isOpen ? (
                <ChevronDownIcon size={14} />
              ) : (
                <ChevronRightIcon size={14} />
              )}
            </button>
          )}

          <div className="flex min-w-0 items-center gap-2.5">
            {node.icon && (
              <div className={`transition-colors ${isActive && variant === 'filled' ? 'text-white/80' : 'text-neutral-400 group-hover/row:text-neutral-600'}`}>
                {node.icon}
              </div>
            )}
            {numbering && (
              <span className={`shrink-0 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold ${isActive && variant === 'filled' ? 'bg-white/20 text-white/80' : 'text-neutral-500'}`}>
                {numbering}
              </span>
            )}
            {renderNodeLabel ? (
              renderNodeLabel(node, { level, numbering })
            ) : (
              <span className={`truncate font-normal transition-colors ${labelTextClass(size)} ${isActive && variant === 'filled' ? 'text-white' : 'text-neutral-700 group-hover/row:text-neutral-900'}`}>
                {node.label}
              </span>
            )}
          </div>
        </div>

        <div className={`ml-2 flex shrink-0 items-center gap-1 transition-opacity ${actionsOnHover ? 'opacity-0 group-hover/row:opacity-100 focus-within:opacity-100' : 'opacity-100'}`}>
          {renderNodeRight && <div className="mr-1">{renderNodeRight(node)}</div>}
          {nodeActions
            .filter((action: TreeActionConfig) => (action.isVisible ? action.isVisible(node) : true))
            .map((action: TreeActionConfig) => (
              <button
                key={action.key || action.label || action.title}
                type="button"
                tabIndex={-1}
                title={action.title || action.label}
                disabled={action.isDisabled?.(node) === true}
                onClick={(event) => {
                  event.stopPropagation()
                  action.onClick?.(node)
                }}
                className={`tree-action-btn ${iconButtonSizeClass(size)} rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  isActive && variant === 'filled' ? 'text-white hover:bg-white/20' : action.className || actionColorClass(color)
                }`}
              >
                <span className="flex items-center justify-center">{action.icon}</span>
              </button>
            ))}
        </div>
      </div>

      {isOpen && hasChildren && (children.length > 0 || isLoading || isError) && (
        <div role="group" className={childrenWrapperClass} style={childrenWrapperStyle}>
          {children.length > 0 ? (
            children.map((child: TreeNodeData, childIndex: number) => (
              <TreeNodeItem
                key={child.id}
                node={child}
                level={level + 1}
                pathIndexes={getNextPathIndexes(pathIndexes, childIndex)}
                color={color}
                size={size}
                variant={variant}
                activeNodeId={activeNodeId}
                focusedNodeId={focusedNodeId}
                onFocusNode={onFocusNode}
                onNodeClick={onNodeClick}
                expandedKeys={expandedKeys}
                onToggleExpand={onToggleExpand}
                onRetryLoad={onRetryLoad}
                actionsOnHover={actionsOnHover}
                renderNodeLabel={renderNodeLabel}
                renderNodeRight={renderNodeRight}
                draggable={draggable}
                onDragStartNode={onDragStartNode}
                onDragEndNode={onDragEndNode}
                onDragEnterNode={onDragEnterNode}
                onDropOnNode={onDropOnNode}
                dragTargetNodeId={dragTargetNodeId}
                maxIndentLevel={maxIndentLevel}
                deepLevelNumbering={deepLevelNumbering}
                nodeActions={nodeActions}
                siblingsHaveChildren={childrenHaveToggles}
              />
            ))
          ) : isError ? (
            <div className={`flex items-center gap-2 px-3 py-2 ${labelTextClass(size)} text-danger-600`}>
              <span>Failed to load children.</span>
              <button
                type="button"
                onClick={() => onRetryLoad(node)}
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold text-danger-600 transition-colors hover:bg-danger-50"
              >
                <RefreshIcon size={12} />
                Retry
              </button>
            </div>
          ) : (
            <div className={`flex items-center gap-2 px-3 py-2 ${labelTextClass(size)} text-neutral-400`}>
              <LoaderIcon size={14} />
              <span>Loading</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const TreeNodeItem = React.memo(TreeNodeItemComponent)

export default TreeNodeItem
