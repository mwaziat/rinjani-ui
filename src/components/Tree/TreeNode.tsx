'use client'

import React from 'react'
import { ChevronDownIcon, ChevronRightIcon } from '../Icons'
import type { TreeActionConfig, TreeNodeData, TreeNodeProps } from './Tree.types'
import { 
  getRowStyle, 
  actionColorClass, 
  nodeSizeClass, 
  getBasePadding, 
  iconButtonSizeClass, 
  getIconWidth, 
  labelTextClass 
} from './Tree.styles'
import { getNextNumberingPath, NUMBERING_START_LEVEL } from './Tree.utils'

const TreeNodeItem: React.FC<TreeNodeProps> = ({
  node,
  level,
  numberingPath,
  color,
  size,
  variant,
  activeNodeId,
  onNodeClick,
  defaultExpanded,
  actionsOnHover,
  renderNodeLabel,
  nodeActions,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultExpanded)
  const children = Array.isArray(node.children) ? node.children : []
  const hasChildren = children.length > 0
  const numbering = level >= NUMBERING_START_LEVEL && numberingPath.length > 0 ? numberingPath.join('.') : null
  const isActive = activeNodeId !== undefined && activeNodeId === node.id

  const handleNodeClick = (e: React.MouseEvent) => {
    // If it's the expand toggle button, don't trigger node click
    if ((e.target as HTMLElement).closest('.tree-expand-btn')) return
    if ((e.target as HTMLElement).closest('.tree-action-btn')) return
    
    if (onNodeClick) onNodeClick(node)
    else if (hasChildren) setIsOpen((prev) => !prev) // fallback click to expand if no active state
  }

  const basePadding = getBasePadding(size)
  const iconWidth = getIconWidth(size)
  const lineOffset = basePadding + (iconWidth / 2) - 1

  let rowStyle: React.CSSProperties = {}
  let childrenWrapperStyle: React.CSSProperties = {}
  
  let rowClass = `group relative flex items-center justify-between transition-all cursor-pointer ${nodeSizeClass(size)} ${getRowStyle(variant, isActive, color)}`
  let childrenWrapperClass = "flex flex-col"

  if (variant === 'minimal') {
    rowClass += ' rounded-lg'
    rowStyle = { paddingLeft: `${level * 24 + basePadding}px` }
  } else if (variant === 'filled') {
    rowClass += ' rounded-lg mb-1.5'
    rowStyle = { marginLeft: `${level * 24}px` }
  } else if (variant === 'lined') {
    rowClass += ' rounded-md'
    childrenWrapperClass += ' border-l border-dashed border-neutral-300'
    childrenWrapperStyle = { 
      marginLeft: `${lineOffset}px`, 
      paddingLeft: `16px` 
    }
  }

  return (
    <div className="flex flex-col">
      <div
        onClick={handleNodeClick}
        className={rowClass}
        style={rowStyle}
      >
        {variant === 'lined' && level > 0 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-[-16px] w-[16px] border-t border-dashed border-neutral-300" />
        )}

        <div className="flex items-center gap-2">
          {hasChildren && (
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className={`tree-expand-btn ${iconButtonSizeClass(size)} flex items-center justify-center rounded-md transition-colors hover:bg-neutral-200/50 ${isActive && variant === 'filled' ? 'text-white hover:bg-white/20' : 'text-neutral-400 hover:text-neutral-900'}`}
            >
              {isOpen ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />}
            </button>
          )}

          <div className="flex items-center gap-2.5">
            {node.icon && <div className={`transition-colors ${isActive && variant === 'filled' ? 'text-white/80' : 'text-neutral-400 group-hover:text-neutral-600'}`}>{node.icon}</div>}
            {numbering && (
              <span className={`font-semibold transition-colors ${labelTextClass(size)} ${isActive && variant === 'filled' ? 'text-white/80' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
                {numbering}
              </span>
            )}
            {renderNodeLabel ? (
              renderNodeLabel(node, { level, numbering })
            ) : (
              <span className={`font-normal transition-colors ${labelTextClass(size)} ${isActive && variant === 'filled' ? 'text-white' : 'text-neutral-700 group-hover:text-neutral-900'}`}>{node.label}</span>
            )}
          </div>
        </div>

        <div className={`flex items-center gap-1 transition-opacity ${actionsOnHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          {nodeActions.map((action: TreeActionConfig) => (
            <button
              key={action.key || action.label || action.title}
              type="button"
              title={action.title || action.label}
              onClick={() => action.onClick?.(node)}
              className={`tree-action-btn ${iconButtonSizeClass(size)} rounded-lg transition-colors ${isActive && variant === 'filled' ? 'text-white hover:bg-white/20' : action.className || actionColorClass(color)}`}
            >
              <span className="flex items-center justify-center">{action.icon}</span>
            </button>
          ))}
        </div>
      </div>

      {isOpen && hasChildren && (
        <div className={childrenWrapperClass} style={childrenWrapperStyle}>
          {children.map((child: TreeNodeData, index: number) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              numberingPath={getNextNumberingPath(level, numberingPath, index)}
              color={color}
              size={size}
              variant={variant}
              activeNodeId={activeNodeId}
              onNodeClick={onNodeClick}
              defaultExpanded={defaultExpanded}
              actionsOnHover={actionsOnHover}
              renderNodeLabel={renderNodeLabel}
              nodeActions={nodeActions}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNodeItem
