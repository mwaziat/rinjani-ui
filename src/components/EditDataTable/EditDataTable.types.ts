import React from 'react'

export type EditTableVariant = 'default' | 'striped' | 'bordered' | 'borderless' | 'hover' | 'compact' | 'comfortable' | 'spacious'
export type EditTableColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export type EditColumnType = 'string' | 'number' | 'date' | 'boolean' | 'object' | 'custom' | 'select'

export type EditRowMode = 'view' | 'edit' | 'new'

export interface EditTableRowState<T> {
  original: T
  edited: T
  action: {
    key: string
    mode: EditRowMode
  }
}

/**
 * Value accepted by onRowChange: either the next row object, or a functional
 * updater receiving the latest edited row. Use the functional form whenever the
 * next row is derived asynchronously (e.g. after a fetch) so concurrent edits
 * from sibling cells are never overwritten by a stale snapshot.
 */
export type EditRowUpdater<T> = T | ((prev: T) => T)

/**
 * Value accepted by the action column's onStateChange: the next row state, or a
 * functional updater receiving the latest row state.
 */
export type EditRowStateUpdater<T> = EditTableRowState<T> | ((prev: EditTableRowState<T>) => EditTableRowState<T>)

export interface EditColumnDef<T> {
  header: React.ReactNode
  accessorKey?: keyof T
  type?: EditColumnType
  width?: string | number
  cell?: (row: T, rowIndex: number) => React.ReactNode
  onClick?: (row: T) => void
  className?: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  columns?: EditColumnDef<T>[]
  editable?: boolean
  options?: { label: string; value: string | number }[]
  editComponent?: (value: unknown, onChange: (val: unknown) => void, rowState: EditTableRowState<T>, onRowChange: (row: EditRowUpdater<T>) => void) => React.ReactNode
}

export type EditComponentVariant = 'filled' | 'outlined' | 'soft' | 'text'
export type EditComponentSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface EditToolbarConfig<T> {
  title?: React.ReactNode
  description?: React.ReactNode
  showSearch?: boolean
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  showAdd?: boolean
  onAdd?: () => void
  showRefresh?: boolean
  onRefresh?: () => void
  showDeleteAll?: boolean
  onDeleteAll?: (selectedKeys: (string | number)[]) => void
  showEditAll?: boolean
  onEditAll?: (selectedKeys: (string | number)[]) => void
  showSaveAll?: boolean
  onSaveAll?: (rows: Partial<T>[], rowStates?: EditTableRowState<T>[]) => void | Promise<void>
  showCancelAll?: boolean
  onCancelAll?: (originalRows: T[]) => void
  variant?: EditComponentVariant
  color?: EditTableColor
  size?: EditComponentSize
  sortOrder?: string[]
  customElements?: React.ReactNode | React.ReactNode[]
}

export interface EditActionColumnConfig<T> {
  header?: string
  type?: 'dropdown' | 'inline' | 'custom'
  variant?: EditComponentVariant
  color?: EditTableColor
  size?: EditComponentSize
  sortOrder?: string[]
  onDetail?: (row: T) => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onSave?: (editedRow: T, originalRow: T) => void | Promise<void>
  onCancel?: (row: T) => void
  customActions?: (rowState: EditTableRowState<T>) => React.ReactNode | React.ReactNode[]
}

export interface EditPaginationState {
  page: number
  limit: number
}

export interface EditPaginationConfig {
  page: number
  limit: number
  totalItems: number
  totalPages: number
  pageSizeOptions?: number[]
  onPaginationChange: (state: EditPaginationState) => void
  color?: EditTableColor
  variant?: EditComponentVariant
  size?: EditComponentSize
}

export interface EditRowSelectionConfig {
  selectedRowKeys?: (string | number)[]
  onSelectionChange?: (selectedKeys: (string | number)[]) => void
}

export interface EditExpandableConfig<T> {
  expandedRowRender: (row: T, rowIndex: number) => React.ReactNode
  rowExpandable?: (row: T) => boolean
}

export interface EditDataTableProps<T> {
  data: T[]
  columns: EditColumnDef<T>[]
  variant?: EditTableVariant
  color?: EditTableColor
  toolbar?: EditToolbarConfig<T>
  actionColumn?: EditActionColumnConfig<T>
  pagination?: EditPaginationConfig
  rowSelection?: EditRowSelectionConfig
  expandable?: EditExpandableConfig<T>
  loading?: boolean
  loadingVariant?: 'spinner' | 'skeleton'
  scrolled?: boolean
  className?: string
  rowKey: (row: T) => string
  emptyDisplay?: React.ReactNode
  contained?: boolean
}

export interface EditHeaderCell<T> {
  column: EditColumnDef<T>
  colSpan: number
  rowSpan: number
}

export interface EditTableHeaderProps<T> {
  columns: EditColumnDef<T>[]
  rowSelection?: EditRowSelectionConfig
  actionColumn?: EditActionColumnConfig<T>
  color: string
  scrolled: boolean
  isScrolledX: boolean
  currentPadding: string
  headerBorderClass: string
  cellBorderClass: string
  isAllCurrentPageSelected: boolean
  isIndeterminate: boolean
  handleSelectAll: (checked: boolean) => void
}

export interface EditTableLoadingProps<T> {
  loadingVariant: 'spinner' | 'skeleton'
  limit: number
  totalColumnsCount: number
  leafColumns: EditColumnDef<T>[]
  rowSelection?: boolean
  actionColumn?: boolean
  currentPadding: string
  cellBorderClass: string
}

export interface EditEditableCellProps<T> {
  column: EditColumnDef<T>
  rowState: EditTableRowState<T>
  onChange: (key: keyof T, value: unknown) => void
  onRowChange: (row: EditRowUpdater<T>) => void
}
