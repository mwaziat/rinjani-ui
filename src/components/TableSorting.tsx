import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from './Icons'
import { Tooltip } from './Tooltip'

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  /** The public sort key. In server mode this is sent to the consumer/API. */
  key: string
  direction: SortDirection
}

export interface SortingConfig {
  /** Defaults to local when sorting is configured. */
  mode?: 'local' | 'server'
  /** Allow more than one sorted column. Defaults to true. */
  multiple?: boolean
  /** Controlled sorting state. Use this for server-side sorting. */
  state?: SortState[]
  /** Initial state for uncontrolled sorting. */
  defaultState?: SortState[]
  /** Called whenever the user changes the sort order. */
  onSortChange?: (state: SortState[]) => void
}

export interface SortColumnLike {
  accessorKey?: PropertyKey
  sortKey?: string
  type?: string
}

export interface TableHeaderContentProps {
  header: React.ReactNode
  autoWrap?: boolean | undefined
  sortIndicator?: React.ReactNode | undefined
  onSort?: (() => void) | undefined
  title?: string | undefined
}

/**
 * Renders a table header without allowing long labels to overlap the next
 * column. When autoWrap is enabled, the label is limited to two lines and the
 * full label is available through a tooltip.
 */
export function TableHeaderContent({
  header,
  autoWrap = false,
  sortIndicator,
  onSort,
  title,
}: TableHeaderContentProps) {
  const labelRef = React.useRef<HTMLSpanElement>(null)
  const isSingleWord = typeof header === 'string' && header.trim() !== '' && !/\s/.test(header.trim())

  const labelStyle: React.CSSProperties | undefined = autoWrap
    ? isSingleWord
      ? {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }
      : {
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflowWrap: 'normal',
        }
    : undefined

  const label = (
    <span
      ref={labelRef}
      className="min-w-0 flex-1"
      style={labelStyle}
    >
      {header}
    </span>
  )

  const content = onSort ? (
    <button
      type="button"
      className="flex w-full min-w-0 items-center justify-between gap-2 whitespace-normal text-left text-inherit hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-sm"
      title={autoWrap ? undefined : title}
      aria-label={title}
      onClick={onSort}
    >
      {label}
      {sortIndicator}
    </button>
  ) : (
    <span className="flex w-full min-w-0 items-center whitespace-normal text-left text-inherit">
      {label}
      {sortIndicator}
    </span>
  )

  if (autoWrap) {
    return (
      <Tooltip
        content={header}
        placement="top-start"
        color="neutral"
        size="sm"
        maxWidth="lg"
        triggerClassName="block w-full"
        anchorRef={labelRef as React.RefObject<HTMLElement | null>}
      >
        <span className="block w-full min-w-0">{content}</span>
      </Tooltip>
    )
  }

  return content
}

export const getSortKey = <T extends SortColumnLike>(column: T): string | undefined => {
  if (column.sortKey) return column.sortKey
  if (column.accessorKey !== undefined) return String(column.accessorKey)
  return undefined
}

export const toggleSortState = (
  current: SortState[],
  key: string,
  multi = false,
): SortState[] => {
  const index = current.findIndex((item) => item.key === key)
  const existing = index >= 0 ? current[index] : undefined

  if (!existing) {
    return multi ? [...current, { key, direction: 'asc' }] : [{ key, direction: 'asc' }]
  }

  const nextDirection: SortDirection | undefined = existing.direction === 'asc' ? 'desc' : undefined

  if (!nextDirection) {
    return current.filter((item) => item.key !== key)
  }

  const next = { key, direction: nextDirection }
  if (!multi) return [next]

  return current.map((item) => (item.key === key ? next : item))
}

const isEmptyValue = (value: unknown): value is null | undefined | '' =>
  value === null || value === undefined || value === ''

const toComparableDate = (value: unknown): number | undefined => {
  if (value instanceof Date) return value.getTime()
  if (typeof value !== 'string' && typeof value !== 'number') return undefined

  const timestamp = new Date(value).getTime()
  return Number.isNaN(timestamp) ? undefined : timestamp
}

const compareValues = (left: unknown, right: unknown, type?: string): number => {
  const leftEmpty = isEmptyValue(left)
  const rightEmpty = isEmptyValue(right)

  // Keep empty values at the end for both ascending and descending sorts.
  if (leftEmpty || rightEmpty) {
    if (leftEmpty && rightEmpty) return 0
    return leftEmpty ? 1 : -1
  }

  if (type === 'number') {
    const leftNumber = Number(left)
    const rightNumber = Number(right)
    if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
      return leftNumber - rightNumber
    }
  }

  if (type === 'date') {
    const leftDate = toComparableDate(left)
    const rightDate = toComparableDate(right)
    if (leftDate !== undefined && rightDate !== undefined) return leftDate - rightDate
  }

  if (type === 'boolean') {
    return Number(Boolean(left)) - Number(Boolean(right))
  }

  if (typeof left === 'number' && typeof right === 'number') return left - right

  return String(left).localeCompare(String(right), undefined, {
    numeric: true,
    sensitivity: 'base',
  })
}

export const sortRows = <Row, Column extends SortColumnLike>(
  rows: Row[],
  sorting: SortState[],
  columns: readonly Column[],
  getValue: (row: Row, column: Column) => unknown,
): Row[] => {
  if (sorting.length === 0) return rows

  const activeSorts = sorting
    .map((sort) => {
      const column = columns.find((candidate) => getSortKey(candidate) === sort.key)
      return column ? { sort, column } : undefined
    })
    .filter((item): item is { sort: SortState; column: Column } => Boolean(item))

  if (activeSorts.length === 0) return rows

  return rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      for (const { sort, column } of activeSorts) {
        const result = compareValues(getValue(left.row, column), getValue(right.row, column), column.type)
        if (result !== 0) return sort.direction === 'asc' ? result : -result
      }
      return left.index - right.index
    })
    .map(({ row }) => row)
}

export interface SortIndicatorProps {
  direction?: SortDirection | undefined
  priority?: number | undefined
}

export function SortIndicator({ direction, priority }: SortIndicatorProps) {
  return (
    <span className="inline-flex min-w-9 items-center justify-end gap-1 shrink-0" aria-hidden="true">
      {priority !== undefined ? (
        <span className="w-3 text-right text-[10px] font-semibold leading-none normal-case text-primary-600">
          {priority + 1}
        </span>
      ) : (
        <span className="w-3" aria-hidden="true" />
      )}
      {direction === 'asc' ? (
        <ChevronUpIcon size={16} strokeWidth={2.5} className="text-primary-600" />
      ) : direction === 'desc' ? (
        <ChevronDownIcon size={16} strokeWidth={2.5} className="text-primary-600" />
      ) : (
        <span className="inline-flex flex-col items-center justify-center -space-y-1 text-neutral-400" title="Sortable">
          <ChevronUpIcon size={12} strokeWidth={2} />
          <ChevronDownIcon size={12} strokeWidth={2} />
        </span>
      )}
    </span>
  )
}
