import React from 'react'

export type TableVariant = 'default' | 'striped' | 'bordered' | 'borderless' | 'hover' | 'compact' | 'comfortable' | 'spacious'
export type TableColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

export type ColumnType = 'string' | 'number' | 'date' | 'boolean' | 'object' | 'custom'

export interface ColumnDef<T> {
  header: React.ReactNode
  accessorKey?: keyof T
  type?: ColumnType
  width?: string | number
  cell?: (row: T, rowIndex: number) => React.ReactNode
  onChange?: (row: T, value: unknown) => void
  onClick?: (row: T) => void
  className?: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  columns?: ColumnDef<T>[]
}

export type ComponentVariant = 'filled' | 'outlined' | 'soft' | 'text'
export type ComponentSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ToolbarConfig {
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
  variant?: ComponentVariant
  color?: TableColor
  size?: ComponentSize
  sortOrder?: string[]
  customElements?: React.ReactNode | React.ReactNode[]
}

export interface ActionColumnConfig<T> {
  header?: string
  type?: 'dropdown' | 'inline' | 'custom'
  variant?: ComponentVariant
  color?: TableColor
  size?: ComponentSize
  sortOrder?: string[]
  onDetail?: (row: T) => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  customActions?: (row: T) => React.ReactNode | React.ReactNode[]
}

export interface PaginationState {
  page: number
  limit: number
}

export interface PaginationConfig {
  page: number
  limit: number
  totalItems: number
  totalPages: number
  pageSizeOptions?: number[]
  onPaginationChange: (state: PaginationState) => void
  color?: TableColor
  variant?: ComponentVariant
  size?: ComponentSize
}

export interface RowSelectionConfig {
  selectedRowKeys?: (string | number)[]
  onSelectionChange?: (selectedKeys: (string | number)[]) => void
}

export interface ExpandableConfig<T> {
  expandedRowRender: (row: T, rowIndex: number) => React.ReactNode
  rowExpandable?: (row: T) => boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  variant?: TableVariant
  color?: TableColor
  toolbar?: ToolbarConfig
  actionColumn?: ActionColumnConfig<T>
  pagination?: PaginationConfig
  rowSelection?: RowSelectionConfig
  expandable?: ExpandableConfig<T>
  loading?: boolean
  loadingVariant?: 'spinner' | 'skeleton'
  scrolled?: boolean
  className?: string
  rowKey?: (row: T) => string | number
  emptyDisplay?: React.ReactNode
  contained?: boolean
}
