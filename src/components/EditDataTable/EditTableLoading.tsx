import React from 'react'
import type { EditTableLoadingProps } from './EditDataTable.types'

export function EditTableLoading<T>({
  loadingVariant,
  limit,
  totalColumnsCount,
  leafColumns,
  rowSelection,
  actionColumn,
  currentPadding,
  cellBorderClass,
}: EditTableLoadingProps<T>) {
  if (loadingVariant === 'skeleton') {
    return (
      <>
        {Array.from({ length: limit }).map((_, rowIndex) => (
          <tr key={`skeleton-${rowIndex}`} className="bg-white">
            {rowSelection && (
              <td className={`${currentPadding} ${cellBorderClass} w-[1%] whitespace-nowrap`}>
                <div className="h-5 w-5 bg-neutral-200 animate-pulse rounded-[4px]"></div>
              </td>
            )}
            {leafColumns.map((col, colIndex) => (
              <td key={`skeleton-col-${colIndex}`} className={`${currentPadding} ${cellBorderClass}`}>
                <div className="h-4 bg-neutral-200 animate-pulse rounded w-3/4"></div>
              </td>
            ))}
            {actionColumn && (
              <td className={`${currentPadding} ${cellBorderClass}`}>
                <div className="h-4 bg-neutral-200 animate-pulse rounded w-8 mx-auto"></div>
              </td>
            )}
          </tr>
        ))}
      </>
    )
  }

  return (
    <tr>
      <td colSpan={totalColumnsCount} className="py-12 text-center text-neutral-500">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium text-neutral-600">Loading data...</span>
        </div>
      </td>
    </tr>
  )
}
