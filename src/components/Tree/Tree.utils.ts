import type { TreeNodeData } from './Tree.types'

export const getNextPathIndexes = (parentPathIndexes: number[], childIndex: number): number[] => {
  return [...parentPathIndexes, childIndex + 1]
}

export const resolveHasChildren = (node: TreeNodeData, children: TreeNodeData[]): boolean => {
  if (node.isEndChild === true) return false
  if (node.hasChildren === true) return true
  if (typeof node.totalChildren === 'number' && node.totalChildren > 0) return true
  return children.length > 0
}

export const findNodeById = (nodes: TreeNodeData[], targetId: string | number): TreeNodeData | null => {
  for (const node of nodes) {
    if (node.id === targetId) return node
    const children = Array.isArray(node.children) ? node.children : []
    const found = findNodeById(children, targetId)
    if (found) return found
  }
  return null
}

export const patchNodeById = (
  nodes: TreeNodeData[],
  targetId: string | number,
  patch: Partial<TreeNodeData>,
): TreeNodeData[] => {
  return nodes.map((node) => {
    if (node.id === targetId) return { ...node, ...patch }
    const children = Array.isArray(node.children) ? node.children : []
    if (children.length === 0) return node
    return { ...node, children: patchNodeById(children, targetId, patch) }
  })
}

export const setChildrenById = (
  nodes: TreeNodeData[],
  targetId: string | number,
  children: TreeNodeData[],
): TreeNodeData[] => {
  return nodes.map((node) => {
    if (node.id === targetId) {
      return {
        ...node,
        children,
        hasChildren: children.length > 0,
        totalChildren: children.length,
        isEndChild: children.length === 0 ? node.isEndChild : false,
        isLoading: false,
        loadState: 'loaded',
      }
    }
    const currentChildren = Array.isArray(node.children) ? node.children : []
    if (currentChildren.length === 0) return node
    return { ...node, children: setChildrenById(currentChildren, targetId, children) }
  })
}

export const isDescendantId = (node: TreeNodeData, targetId: string | number): boolean => {
  const children = Array.isArray(node.children) ? node.children : []
  for (const child of children) {
    if (child.id === targetId) return true
    if (isDescendantId(child, targetId)) return true
  }
  return false
}

export const detachNodeById = (
  nodes: TreeNodeData[],
  targetId: string | number,
): { nextTree: TreeNodeData[]; detached: TreeNodeData | null } => {
  let detachedNode: TreeNodeData | null = null
  const nextTree = nodes.reduce<TreeNodeData[]>((acc, node) => {
    if (node.id === targetId) {
      detachedNode = node
      return acc
    }
    const children = Array.isArray(node.children) ? node.children : []
    const nested = detachNodeById(children, targetId)
    if (nested.detached) {
      detachedNode = nested.detached
      acc.push({ ...node, children: nested.nextTree })
      return acc
    }
    acc.push(node)
    return acc
  }, [])
  return { nextTree, detached: detachedNode }
}

export const appendNodeAsChild = (
  nodes: TreeNodeData[],
  parentId: string | number,
  nodeToAppend: TreeNodeData,
): TreeNodeData[] => {
  return nodes.map((node) => {
    if (node.id === parentId) {
      const currentChildren = Array.isArray(node.children) ? node.children : []
      return {
        ...node,
        isEndChild: false,
        hasChildren: true,
        children: [...currentChildren, nodeToAppend],
        totalChildren: currentChildren.length + 1,
      }
    }
    const children = Array.isArray(node.children) ? node.children : []
    if (children.length === 0) return node
    return { ...node, children: appendNodeAsChild(children, parentId, nodeToAppend) }
  })
}

export interface FlatTreeEntry {
  node: TreeNodeData
  id: string | number
  level: number
  parentId: string | number | null
  hasChildren: boolean
  isOpen: boolean
  pathIndexes: number[]
}

export const getVisibleFlatNodes = (
  nodes: TreeNodeData[],
  expandedKeys: ReadonlySet<string | number>,
  parentId: string | number | null = null,
  level = 0,
  parentPathIndexes: number[] = [],
): FlatTreeEntry[] => {
  const result: FlatTreeEntry[] = []
  nodes.forEach((node, index) => {
    const pathIndexes = getNextPathIndexes(parentPathIndexes, index)
    const children = Array.isArray(node.children) ? node.children : []
    const hasChildren = resolveHasChildren(node, children)
    const isOpen = expandedKeys.has(node.id)
    result.push({ node, id: node.id, level, parentId, hasChildren, isOpen, pathIndexes })
    if (isOpen && hasChildren && children.length > 0) {
      result.push(...getVisibleFlatNodes(children, expandedKeys, node.id, level + 1, pathIndexes))
    }
  })
  return result
}
