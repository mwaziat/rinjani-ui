import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons'
import type { PaginationConfig } from './EditDataTable.types'
import { sizeClasses, selectSizeClasses, radiusBySize, activeVariants, selectColorMap, iconSizeClasses } from './EditDataTable.styles'
import { getPageNumbers } from './EditDataTable.utils'

interface PaginationProps {
  config: PaginationConfig
}

export const Pagination = ({ config }: PaginationProps) => {
  const {
    page,
    limit,
    totalItems,
    totalPages,
    pageSizeOptions = [10, 20, 50, 100],
    onPaginationChange,
    color = 'primary',
    variant = 'filled',
    size = 'sm'
  } = config

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value)
    onPaginationChange({ page: 1, limit: newLimit })
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return
    onPaginationChange({ page: newPage, limit })
  }

  const startItem = (page - 1) * limit + 1
  const endItem = Math.min(page * limit, totalItems)



  const currentSizeClass = sizeClasses[size || 'sm'] || sizeClasses.sm
  const currentRadiusClass = radiusBySize[size || 'sm'] || radiusBySize.sm
  const activeClass = activeVariants[variant || 'filled']?.[color || 'primary'] || activeVariants.filled?.primary || ''
  const inactiveClass = (variant === 'soft' || variant === 'text')
    ? `bg-transparent text-neutral-600 hover:bg-neutral-50 ${currentRadiusClass}`
    : `border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 ${currentRadiusClass}`

  const currentIconSize: number = iconSizeClasses[size || 'sm'] || iconSizeClasses.sm || 16
  const inputVariant = (variant === 'soft' || variant === 'text') ? 'outlined' : variant

  const selectVariantClasses = 
    inputVariant === 'outlined' 
      ? 'border border-neutral-200 bg-white' 
      : 'border border-transparent bg-neutral-100'

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-5 text-sm text-neutral-500 border-t border-neutral-100 gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div>
          Showing <span className="font-medium text-neutral-900">{totalItems === 0 ? 0 : startItem}</span> to <span className="font-medium text-neutral-900">{endItem}</span> of <span className="font-medium text-neutral-900">{totalItems}</span> results
        </div>
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Rows per page:</span>
          <select
            value={limit}
            onChange={handleLimitChange}
            className={`outline-none focus:ring-2 transition-all text-neutral-700 cursor-pointer ${selectVariantClasses} ${currentRadiusClass} ${selectColorMap[color]} ${selectSizeClasses[size]}`}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${inactiveClass} ${currentSizeClass}`}
        >
          <ChevronLeftIcon size={currentIconSize} />
        </button>

        {getPageNumbers(page, totalPages).map((p, idx) => (
          p === '...' ? (
            <span key={`dots-${idx}`} className={`flex items-center justify-center text-neutral-400 ${currentSizeClass}`}>...</span>
          ) : (
            <button
              key={p}
              onClick={() => handlePageChange(p as number)}
              className={`flex items-center justify-center font-medium transition-colors ${p === page ? `${activeClass} ${currentRadiusClass}` : inactiveClass
                } ${currentSizeClass}`}
            >
              {p}
            </button>
          )
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className={`flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${inactiveClass} ${currentSizeClass}`}
        >
          <ChevronRightIcon size={currentIconSize} />
        </button>
      </div>
    </div>
  )
}
