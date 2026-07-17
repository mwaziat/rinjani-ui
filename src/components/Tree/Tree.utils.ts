import type { TreeNodeData } from './Tree.types'

/**
 * Calculates the hierarchical index path for a child node based on its parent's path.
 * E.g., if parent is at path [0, 1] and child is the 2nd child (index 1), returns [0, 1, 2].
 */
export const getNextPathIndexes = (parentPathIndexes: number[], childIndex: number): number[] => {
  return [...parentPathIndexes, childIndex + 1]
}

/**
 * Determines whether a node should be considered to have children.
 * Evaluates `isEndChild`, `hasChildren`, `totalChildren`, and the actual array length.
 */
export const resolveHasChildren = (node: TreeNodeData, children: TreeNodeData[]): boolean => {
  if (node.isEndChild === true) return false
  if (node.hasChildren === true) return true
  if (typeof node.totalChildren === 'number' && node.totalChildren > 0) return true
  return children.length > 0
}

/**
 * Recursively searches a tree structure to find a node by its ID.
 */
export const findNodeById = (nodes: TreeNodeData[], targetId: string | number): TreeNodeData | null => {
  for (const node of nodes) {
    if (node.id === targetId) return node
    const children = Array.isArray(node.children) ? node.children : []
    const found = findNodeById(children, targetId)
    if (found) return found
  }
  return null
}

/**
 * Recursively searches for a node by ID and merges the given patch object into it.
 * Returns a new array structure to maintain immutability.
 */
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

/**
 * Recursively searches for a node by ID and completely replaces its children array.
 * Automatically updates loading states and child counts.
 */
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

/**
 * Checks if a specific target ID exists anywhere deep within the descendants of the given node.
 */
export const isDescendantId = (node: TreeNodeData, targetId: string | number): boolean => {
  const children = Array.isArray(node.children) ? node.children : []
  for (const child of children) {
    if (child.id === targetId) return true
    if (isDescendantId(child, targetId)) return true
  }
  return false
}

/**
 * Removes a node with the specified ID from the tree entirely.
 * Returns both the new tree structure and the detached node object (if found).
 */
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

/**
 * Adds a new child node to the end of the children array of a specified parent node.
 * Automatically increments child counts and flags.
 */
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

/**
 * Internal representation of a tree node when flattened into a linear array for rendering.
 */
export interface FlatTreeEntry {
  node: TreeNodeData
  id: string | number
  level: number
  parentId: string | number | null
  hasChildren: boolean
  isOpen: boolean
  pathIndexes: number[]
}

/**
 * Converts a deeply nested tree structure into a flat array of nodes that are currently visible
 * (i.e. all of their ancestors are currently expanded).
 */
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
