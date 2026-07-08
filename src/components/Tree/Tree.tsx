'use client'

import React from 'react'
import { PencilIcon, PlusIcon, TrashIcon } from '../Icons'
import { Button } from '../Button'
import TreeNodeItem from './TreeNode'
import type { TreeActionConfig, TreeNodeData, TreeProps } from './Tree.types'
import { resolveVariantClass, titleClassBySize } from './Tree.styles'

export const Tree = ({
  data,
  actions,
  onAction,
  onAddRoot,
  renderNodeLabel,
  renderHeader,
  activeNodeId,
  onNodeClick,
  color = 'primary',
  size = 'sm',
  variant = 'minimal',
  actionsOnHover = false,
  title = 'Tree Structure',
  description = 'Manage hierarchical data',
  emptyText = 'No data available',
  showRootAction = true,
  rootActionLabel = 'Add Root',
  defaultExpanded = true,
  className = ''
}: TreeProps) => {

  const nodeActions: TreeActionConfig[] = [
    {
      key: 'add-child',
      label: 'Add Child',
      title: 'Add Child',
      icon: <PlusIcon size={14} />,
      isActive: true,
      onClick: actions?.addChild?.onClick || ((node: TreeNodeData) => onAction?.('add-child', node)),
      className: actions?.addChild?.className,
      order: actions?.addChild?.order,
      ...actions?.addChild,
    },
    {
      key: 'edit',
      label: 'Edit',
      title: 'Edit',
      icon: <PencilIcon size={14} />,
      isActive: true,
      onClick: actions?.edit?.onClick || ((node: TreeNodeData) => onAction?.('edit', node)),
      className: actions?.edit?.className,
      order: actions?.edit?.order,
      ...actions?.edit,
    },
    {
      key: 'delete',
      label: 'Delete',
      title: 'Delete',
      icon: <TrashIcon size={14} />,
      isActive: true,
      onClick: actions?.delete?.onClick || ((node: TreeNodeData) => onAction?.('delete', node)),
      className: actions?.delete?.className || 'text-red-500 hover:bg-red-50',
      order: actions?.delete?.order,
      ...actions?.delete,
    },
    ...(actions?.customActions || []).map((action: TreeActionConfig, index: number) => ({
      key: action.key || `custom-${index}`,
      isActive: true,
      ...action,
    })),
  ]
    .filter((action: TreeActionConfig) => action.isActive !== false)
    .sort((a: TreeActionConfig, b: TreeActionConfig) => (a.order || 0) - (b.order || 0))

  return (
    <div className={`flex flex-col w-full gap-4 ${className}`}>
      {renderHeader ? (
        renderHeader({
          title,
          description,
          color,
          size,
          variant,
          showRootAction,
          rootActionLabel,
          onAddRoot,
        })
      ) : (
        <div className={`flex items-center justify-between rounded-xl p-4 ${resolveVariantClass(variant)}`}>
          <div className="flex flex-col">
            <h2 className={`${titleClassBySize[size]} font-semibold uppercase tracking-tight text-neutral-900`}>{title}</h2>
            <p className="text-[10px] font-normal uppercase tracking-widest text-neutral-500 mt-1">{description}</p>
          </div>

          {showRootAction && onAddRoot && (
            <Button size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : (size as 'sm' | 'md' | 'lg')} color={color} leftIcon={<PlusIcon size={16} />} onClick={onAddRoot}>
              {rootActionLabel}
            </Button>
          )}
        </div>
      )}

      <div className={`rounded-xl p-2 ${resolveVariantClass(variant)}`}>
        {data.length > 0 ? (
          data.map((node) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              level={0}
              numberingPath={[]}
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
          ))
        ) : (
          <div className="p-8 text-center text-[10px] font-normal uppercase tracking-widest text-neutral-400">
            {emptyText}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tree