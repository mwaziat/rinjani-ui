import type { EditColumnDef, EditHeaderCell } from './EditDataTable.types'

export const getDepth = <T,>(cols: EditColumnDef<T>[]): number => {
  let max = 0
  for (const col of cols) {
    if (col.columns && col.columns.length > 0) {
      max = Math.max(max, getDepth(col.columns))
    }
  }
  return max + 1
}

export const getLeafColumns = <T,>(cols: EditColumnDef<T>[]): EditColumnDef<T>[] => {
  let leaves: EditColumnDef<T>[] = []
  for (const col of cols) {
    if (col.columns && col.columns.length > 0) {
      leaves = leaves.concat(getLeafColumns(col.columns))
    } else {
      leaves.push(col)
    }
  }
  return leaves
}

export const generateHeaderRows = <T,>(cols: EditColumnDef<T>[], depth: number): EditHeaderCell<T>[][] => {
  const rows: EditHeaderCell<T>[][] = Array.from({ length: depth }, () => [])
  
  const traverse = (currentCols: EditColumnDef<T>[], currentLevel: number) => {
    for (const col of currentCols) {
      const hasChildren = col.columns && col.columns.length > 0
      const leafCount = hasChildren ? getLeafColumns(col.columns!).length : 1
      
      if (rows[currentLevel]) {
        rows[currentLevel].push({
          column: col,
          colSpan: leafCount,
          rowSpan: hasChildren ? 1 : depth - currentLevel,
        })
      }
      
      if (hasChildren) {
        traverse(col.columns!, currentLevel + 1)
      }
    }
  }
  
  traverse(cols, 0)
  return rows
}

export const getPageNumbers = (page: number, totalPages: number) => {
  const pages: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    if (page <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages)
    } else if (page >= totalPages - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      pages.push(page - 1)
      pages.push(page)
      pages.push(page + 1)
      pages.push('...')
      pages.push(totalPages)
    }
  }
  return pages
}
