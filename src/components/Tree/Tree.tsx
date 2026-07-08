'use client'

import React from 'react'
import { PencilIcon, PlusIcon, TrashIcon, EyeIcon } from '../Icons'
import { Button } from '../Button'
import TreeNodeItem from './TreeNode'
import type { TreeActionConfig, TreeNodeData, TreeProps } from './Tree.types'
import { resolveVariantClass, titleClassBySize } from './Tree.styles'
import {
  appendNodeAsChild,
  detachNodeById,
  findNodeById,
  getNextPathIndexes,
  getVisibleFlatNodes,
  isDescendantId,
  patchNodeById,
  setChildrenById,
  type FlatTreeEntry,
} from './Tree.utils'

const EMPTY_NODES: TreeNodeData[] = []

const escapeAttrId = (value: string): string => {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(value)
  return value.replace(/["\\]/g, '\\$&')
}

const resolveVisibility = (
  node: TreeNodeData,
  defaultVisibility: (currentNode: TreeNodeData) => boolean,
  customVisibility?: ((currentNode: TreeNodeData) => boolean) | undefined,
): boolean => {
  if (typeof customVisibility === 'function') return customVisibility(node)
  return defaultVisibility(node)
}

export const Tree = ({
  data,
  actions,
  onAction,
  onAddRoot,
  renderNodeLabel,
  renderNodeRight,
  renderHeader,
  activeNodeId,
  onNodeClick,
  loadChildren,
  onLoadError,
  onNodeExpand,
  expandedKeys,
  onExpandedKeysChange,
  draggable = false,
  onMoveNode,
  onDataChange,
  maxIndentLevel = 6,
  deepLevelNumbering = false,
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
  className = '',
}: TreeProps) => {
  const isSelfManaged = typeof loadChildren === 'function'
  const [, startTransition] = React.useTransition()
  const effectiveData = data ?? EMPTY_NODES

  const isExpandedControlled = Array.isArray(expandedKeys)
  const [internalExpanded, setInternalExpanded] = React.useState<Array<string | number>>(() => {
    if (!defaultExpanded) return []
    return (data ?? EMPTY_NODES).map((node) => node.id)
  })
  const currentExpanded = isExpandedControlled ? (expandedKeys as Array<string | number>) : internalExpanded
  const expandedSet = React.useMemo(() => new Set(currentExpanded), [currentExpanded])

  const visibleFlat = React.useMemo<FlatTreeEntry[]>(
    () => getVisibleFlatNodes(effectiveData, expandedSet),
    [effectiveData, expandedSet],
  )

  const [focusedNodeId, setFocusedNodeId] = React.useState<string | number | null>(null)
  const focusableId = React.useMemo(() => {
    if (focusedNodeId !== null && visibleFlat.some((entry) => entry.id === focusedNodeId)) return focusedNodeId
    return visibleFlat[0]?.id ?? null
  }, [focusedNodeId, visibleFlat])

  const effectiveDataRef = React.useRef(effectiveData)
  const loadChildrenRef = React.useRef(loadChildren)
  const onDataChangeRef = React.useRef(onDataChange)
  const onLoadErrorRef = React.useRef(onLoadError)
  const onNodeExpandRef = React.useRef(onNodeExpand)
  const currentExpandedRef = React.useRef(currentExpanded)
  const visibleFlatRef = React.useRef(visibleFlat)
  const focusableIdRef = React.useRef(focusableId)

  React.useEffect(() => {
    effectiveDataRef.current = effectiveData
    loadChildrenRef.current = loadChildren
    onDataChangeRef.current = onDataChange
    onLoadErrorRef.current = onLoadError
    onNodeExpandRef.current = onNodeExpand
    currentExpandedRef.current = currentExpanded
    visibleFlatRef.current = visibleFlat
    focusableIdRef.current = focusableId
  })

  const handleExpandedKeysChange = React.useCallback(
    (nextKeys: Array<string | number>) => {
      if (!isExpandedControlled) setInternalExpanded(nextKeys)
      onExpandedKeysChange?.(nextKeys)
    },
    [isExpandedControlled, onExpandedKeysChange],
  )

  const loadNodeChildren = React.useCallback(
    (node: TreeNodeData) => {
      const loader = loadChildrenRef.current
      const commit = onDataChangeRef.current
      if (!loader || !commit) return
      const current = findNodeById(effectiveDataRef.current, node.id)
      if (!current) return
      if (current.loadState === 'loading' || current.loadState === 'loaded') return
      const existing = Array.isArray(current.children) ? current.children : []
      if (existing.length > 0) return

      commit(patchNodeById(effectiveDataRef.current, node.id, { isLoading: true, loadState: 'loading' }))
      void (async () => {
        try {
          const loaded = await loader(node)
          startTransition(() => {
            onDataChangeRef.current?.(setChildrenById(effectiveDataRef.current, node.id, Array.isArray(loaded) ? loaded : []))
          })
        } catch (error) {
          onDataChangeRef.current?.(patchNodeById(effectiveDataRef.current, node.id, { isLoading: false, loadState: 'error' }))
          onLoadErrorRef.current?.(node, error)
        }
      })()
    },
    [startTransition],
  )

  const handleToggleExpand = React.useCallback(
    (node: TreeNodeData, nextExpanded: boolean) => {
      const nextSet = new Set(currentExpandedRef.current)
      if (nextExpanded) nextSet.add(node.id)
      else nextSet.delete(node.id)
      handleExpandedKeysChange(Array.from(nextSet))

      if (!nextExpanded) return
      if (isSelfManaged) loadNodeChildren(node)
      else void onNodeExpandRef.current?.(node)
    },
    [handleExpandedKeysChange, isSelfManaged, loadNodeChildren],
  )

  const handleRetryLoad = React.useCallback(
    (node: TreeNodeData) => {
      if (isSelfManaged) loadNodeChildren(node)
      else void onNodeExpandRef.current?.(node)
    },
    [isSelfManaged, loadNodeChildren],
  )

  const nodeActions: TreeActionConfig[] = React.useMemo(
    () =>
      [
        {
          key: 'add-child',
          label: 'Add Child',
          title: 'Add Child',
          icon: <PlusIcon size={14} />,
          isActive: true,
          onClick: actions?.addChild?.onClick || ((node: TreeNodeData) => onAction?.('add-child', node)),
          isVisible: (node: TreeNodeData) =>
            resolveVisibility(
              node,
              (currentNode) => (typeof currentNode.canCreate === 'boolean' ? currentNode.canCreate : currentNode.isEndChild !== true),
              actions?.addChild?.isVisible,
            ),
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
          isVisible: (node: TreeNodeData) =>
            resolveVisibility(node, (currentNode) => currentNode.canEdit !== false, actions?.edit?.isVisible),
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
          isVisible: (node: TreeNodeData) =>
            resolveVisibility(node, (currentNode) => currentNode.canDelete !== false, actions?.delete?.isVisible),
          className: actions?.delete?.className || 'text-danger-500 hover:bg-danger-50',
          order: actions?.delete?.order,
          ...actions?.delete,
        },
        ...(actions?.detail
          ? [
              {
                key: 'detail',
                label: 'Detail',
                title: 'Detail',
                icon: <EyeIcon size={14} />,
                isActive: true,
                onClick: actions.detail.onClick || ((node: TreeNodeData) => onAction?.('detail', node)),
                isVisible: (node: TreeNodeData) =>
                  resolveVisibility(node, (currentNode) => currentNode.canDetail !== false, actions.detail?.isVisible),
                className: actions.detail.className,
                order: actions.detail.order,
                ...actions.detail,
              },
            ]
          : []),
        ...(actions?.customActions || []).map((action: TreeActionConfig, index: number) => ({
          key: action.key || `custom-${index}`,
          isActive: true,
          ...action,
        })),
      ]
        .filter((action: TreeActionConfig) => action.isActive !== false)
        .sort((a: TreeActionConfig, b: TreeActionConfig) => (a.order || 0) - (b.order || 0)),
    [actions, onAction],
  )

  const [draggingNodeId, setDraggingNodeId] = React.useState<string | number | null>(null)
  const [dragTargetNodeId, setDragTargetNodeId] = React.useState<string | number | null>(null)

  const handleDragStartNode = React.useCallback((node: TreeNodeData) => {
    setDraggingNodeId(node.id)
    setDragTargetNodeId(null)
  }, [])

  const handleDragEndNode = React.useCallback(() => {
    setDraggingNodeId(null)
    setDragTargetNodeId(null)
  }, [])

  const handleDragEnterNode = React.useCallback(
    (node: TreeNodeData) => {
      if (!draggable || draggingNodeId === null || draggingNodeId === node.id) {
        setDragTargetNodeId(null)
        return
      }
      setDragTargetNodeId(node.id)
    },
    [draggable, draggingNodeId],
  )

  const handleDropOnNode = React.useCallback(
    (targetNode: TreeNodeData) => {
      const reset = () => {
        setDraggingNodeId(null)
        setDragTargetNodeId(null)
      }
      if (!draggable || draggingNodeId === null || draggingNodeId === targetNode.id) return reset()

      const tree = effectiveDataRef.current
      const sourceNode = findNodeById(tree, draggingNodeId)
      if (!sourceNode || isDescendantId(sourceNode, targetNode.id)) return reset()

      const detached = detachNodeById(tree, draggingNodeId)
      if (!detached.detached) return reset()

      const movedTree = appendNodeAsChild(detached.nextTree, targetNode.id, detached.detached)
      onDataChange?.(movedTree)
      onMoveNode?.(sourceNode, targetNode, movedTree)
      reset()
    },
    [draggable, draggingNodeId, onDataChange, onMoveNode],
  )

  const treeRef = React.useRef<HTMLDivElement>(null)
  const focusById = React.useCallback((id: string | number) => {
    setFocusedNodeId(id)
    requestAnimationFrame(() => {
      const el = treeRef.current?.querySelector<HTMLElement>(`[data-tree-id="${escapeAttrId(String(id))}"]`)
      el?.focus()
    })
  }, [])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const flat = visibleFlatRef.current
      if (flat.length === 0) return

      const activeId = (document.activeElement as HTMLElement | null)?.getAttribute?.('data-tree-id')
      const currentId = activeId ?? (focusableIdRef.current !== null ? String(focusableIdRef.current) : null)
      if (currentId === null) return
      const idx = flat.findIndex((item) => String(item.id) === currentId)
      const entry = flat[idx]
      if (!entry) return

      const focusEntry = (candidate: FlatTreeEntry | undefined) => {
        if (candidate) focusById(candidate.id)
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          focusEntry(flat[idx + 1])
          break
        case 'ArrowUp':
          event.preventDefault()
          focusEntry(flat[idx - 1])
          break
        case 'Home':
          event.preventDefault()
          focusEntry(flat[0])
          break
        case 'End':
          event.preventDefault()
          focusEntry(flat[flat.length - 1])
          break
        case 'ArrowRight':
          event.preventDefault()
          if (entry.hasChildren && !entry.isOpen) handleToggleExpand(entry.node, true)
          else if (entry.hasChildren && entry.isOpen) focusEntry(flat[idx + 1])
          break
        case 'ArrowLeft':
          event.preventDefault()
          if (entry.hasChildren && entry.isOpen) handleToggleExpand(entry.node, false)
          else if (entry.parentId !== null) {
            const parentIdx = flat.findIndex((candidate) => candidate.id === entry.parentId)
            focusEntry(parentIdx >= 0 ? flat[parentIdx] : undefined)
          }
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (onNodeClick) onNodeClick(entry.node)
          else if (entry.hasChildren) handleToggleExpand(entry.node, !entry.isOpen)
          break
        default:
          break
      }
    },
    [focusById, handleToggleExpand, onNodeClick],
  )

  return (
    <div className={`flex flex-col w-full gap-4 ${className}`}>
      {renderHeader ? (
        renderHeader({ title, description, color, size, variant, showRootAction, rootActionLabel, onAddRoot })
      ) : (
        <div className={`flex items-center justify-between rounded-xl p-4 ${resolveVariantClass(variant)}`}>
          <div className="flex flex-col">
            <h2 className={`${titleClassBySize[size]} font-semibold uppercase tracking-tight text-neutral-900`}>{title}</h2>
            <p className="text-[10px] font-normal uppercase tracking-widest text-neutral-500 mt-1">{description}</p>
          </div>

          {showRootAction && onAddRoot && (
            <Button
              size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : (size as 'sm' | 'md' | 'lg')}
              color={color}
              leftIcon={<PlusIcon size={16} />}
              onClick={onAddRoot}
            >
              {rootActionLabel}
            </Button>
          )}
        </div>
      )}

      <div
        ref={treeRef}
        role="tree"
        aria-label={title}
        onKeyDown={handleKeyDown}
        className={`rounded-xl p-2 outline-none ${resolveVariantClass(variant)}`}
      >
        {effectiveData.length > 0 ? (
          effectiveData.map((node, index) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              level={0}
              pathIndexes={getNextPathIndexes([], index)}
              color={color}
              size={size}
              variant={variant}
              activeNodeId={activeNodeId}
              focusedNodeId={focusableId}
              onFocusNode={setFocusedNodeId}
              onNodeClick={onNodeClick}
              expandedKeys={expandedSet}
              onToggleExpand={handleToggleExpand}
              onRetryLoad={handleRetryLoad}
              actionsOnHover={actionsOnHover}
              renderNodeLabel={renderNodeLabel}
              renderNodeRight={renderNodeRight}
              draggable={draggable}
              onDragStartNode={handleDragStartNode}
              onDragEndNode={handleDragEndNode}
              onDragEnterNode={handleDragEnterNode}
              onDropOnNode={handleDropOnNode}
              dragTargetNodeId={dragTargetNodeId}
              maxIndentLevel={maxIndentLevel}
              deepLevelNumbering={deepLevelNumbering}
              nodeActions={nodeActions}
            />
          ))
        ) : (
          <div className="p-8 text-center text-[10px] font-normal uppercase tracking-widest text-neutral-400">{emptyText}</div>
        )}
      </div>
    </div>
  )
}

export default Tree
