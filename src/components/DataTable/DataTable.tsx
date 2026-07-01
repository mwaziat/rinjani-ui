import React, { useRef, useState, useEffect } from 'react'
import { Toolbar } from './Toolbar'
import { Pagination } from './Pagination'
import { ActionColumn } from './ActionColumn'
import { CheckIcon, MinusIcon, ChevronRightIcon } from '../Icons'
import type { DataTableProps } from './DataTable.types'
import { hoverColorClasses, stripedColorClasses, checkboxColorClasses, alignClasses } from './DataTable.styles'
import { getDepth, getLeafColumns, generateHeaderRows } from './DataTable.utils'

export function DataTable<T>({
  data,
  columns,
  variant = 'default',
  color = 'primary',
  toolbar,
  actionColumn,
  pagination,
  loading = false,
  loadingVariant = 'spinner',
  scrolled = false,
  className = '',
  rowKey,
  emptyDisplay,
  rowSelection,
  expandable,
  contained = true,
}: DataTableProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolledX, setIsScrolledX] = useState(false)
  const [localSelectedKeys, setLocalSelectedKeys] = useState<(string | number)[]>([])
  const [expandedRowKeys, setExpandedRowKeys] = useState<(string | number)[]>([])


  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        setIsScrolledX(tableContainerRef.current.scrollLeft > 0)
      }
    }
    const ref = tableContainerRef.current
    ref?.addEventListener('scroll', handleScroll)
    return () => ref?.removeEventListener('scroll', handleScroll)
  }, [])

  const paddingClasses = {
    compact: 'p-2 text-xs',
    comfortable: 'p-4 text-sm',
    spacious: 'p-6 text-base',
  }

  const isCompact = variant === 'compact'
  const isSpacious = variant === 'spacious'
  const currentPadding = isCompact ? paddingClasses.compact : isSpacious ? paddingClasses.spacious : paddingClasses.comfortable

  const isBordered = variant === 'bordered'
  const isBorderless = variant === 'borderless'
  const isStriped = variant === 'striped'
  const isHover = variant === 'hover' || variant === 'default'

  const borderClass = isBorderless ? 'border-0' : 'border border-neutral-200'
  const cellBorderClass = isBordered ? 'border border-neutral-300' : isBorderless ? 'border-0' : 'border-b border-neutral-200'
  const headerBorderClass = isBordered ? 'border border-neutral-300' : isBorderless ? 'border-0' : 'border-b-2 border-neutral-200'

  const pageOffset = pagination ? (pagination.page - 1) * pagination.limit : 0

  // --- Row Selection Logic ---
  const currentSelectedKeys = rowSelection?.selectedRowKeys !== undefined 
    ? rowSelection.selectedRowKeys 
    : localSelectedKeys

  const updateSelectedKeys = (newKeys: (string | number)[]) => {
    if (rowSelection?.selectedRowKeys === undefined) {
      setLocalSelectedKeys(newKeys)
    }
    rowSelection?.onSelectionChange?.(newKeys)
  }

  const currentPageKeys = data.map((row, idx) => rowKey ? rowKey(row) : idx)
  const isAllCurrentPageSelected = currentPageKeys.length > 0 && currentPageKeys.every(k => currentSelectedKeys.includes(k))
  const isSomeCurrentPageSelected = currentPageKeys.length > 0 && currentPageKeys.some(k => currentSelectedKeys.includes(k))
  const isIndeterminate = isSomeCurrentPageSelected && !isAllCurrentPageSelected

  const handleSelectAll = (checked: boolean) => {
    const newKeys = new Set(currentSelectedKeys)
    if (checked) {
      currentPageKeys.forEach(k => newKeys.add(k))
    } else {
      currentPageKeys.forEach(k => newKeys.delete(k))
    }
    updateSelectedKeys(Array.from(newKeys))
  }

  const handleSelectRow = (key: string | number, checked: boolean) => {
    const newKeys = new Set(currentSelectedKeys)
    if (checked) newKeys.add(key)
    else newKeys.delete(key)
    updateSelectedKeys(Array.from(newKeys))
  }

  const renderCheckbox = (checked: boolean, indeterminate: boolean, onChange: (checked: boolean) => void) => {
    return (
      <label className="relative shrink-0 flex items-center justify-center cursor-pointer group m-0 p-0">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`
          flex items-center justify-center border transition-all h-5 w-5 min-w-[20px] min-h-[20px] shrink-0 rounded-[4px]
          ${checked || indeterminate ? checkboxColorClasses[color] : 'border-neutral-300 bg-white text-transparent group-hover:border-neutral-400'}
        `}>
          {checked && !indeterminate && <CheckIcon size={14} strokeWidth={4} className="text-white" />}
          {indeterminate && <MinusIcon size={14} strokeWidth={4} className="text-white" />}
        </div>
      </label>
    )
  }

  const toggleExpand = (key: string | number) => {
    setExpandedRowKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }



  const maxDepth = getDepth(columns)
  const leafColumns = getLeafColumns(columns)
  const headerRows = generateHeaderRows(columns, maxDepth)

  const totalColumnsCount = leafColumns.length + (actionColumn ? 1 : 0) + (rowSelection ? 1 : 0) + (expandable ? 1 : 0)

  const containerClasses = contained 
    ? `bg-white rounded-xl ${borderClass} shadow-sm w-full ${className}`
    : `w-full ${className}`

  return (
    <div className={containerClasses}>
      
      {toolbar && (
        <Toolbar config={{ color, ...toolbar }} selectedRowKeys={currentSelectedKeys} />
      )}

      <div 
        ref={tableContainerRef} 
        className="w-full overflow-x-auto"
      >
        <table className={`w-full text-left border-collapse`}>
          <thead>
            {headerRows.map((rowCells, rowIndex) => (
              <tr key={rowIndex} className={`${headerBorderClass} text-neutral-500 uppercase text-xs tracking-wider bg-white`}>
                {rowIndex === 0 && expandable && (
                  <th rowSpan={maxDepth} className={`${currentPadding} w-[1%] whitespace-nowrap bg-white ${scrolled ? 'sticky top-0 z-10 shadow-sm' : ''} ${cellBorderClass}`}>
                    {/* Empty header for expander */}
                  </th>
                )}
                {rowIndex === 0 && rowSelection && (
                  <th rowSpan={maxDepth} className={`${currentPadding} font-semibold w-[1%] whitespace-nowrap bg-white ${scrolled ? 'sticky top-0 z-10 shadow-sm' : ''} ${cellBorderClass}`}>
                    {renderCheckbox(isAllCurrentPageSelected, isIndeterminate, handleSelectAll)}
                  </th>
                )}
                {rowCells.map((cell, cellIdx) => (
                  <th 
                    key={cellIdx} 
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    className={`${currentPadding} font-semibold whitespace-nowrap bg-white ${scrolled ? 'sticky top-0 z-10 shadow-sm' : ''} ${cellBorderClass} ${cell.column.align ? alignClasses[cell.column.align] : ''} ${cell.column.className || ''}`}
                    style={{ width: cell.column.width, minWidth: cell.column.width, maxWidth: cell.column.width }}
                  >
                    {cell.column.header}
                  </th>
                ))}
                {rowIndex === 0 && actionColumn && (
                  <th rowSpan={maxDepth} className={`${currentPadding} font-semibold text-center whitespace-nowrap bg-white ${scrolled ? 'sticky top-0 z-10 shadow-sm' : ''} ${cellBorderClass} sticky right-0 z-20 ${isScrolledX ? 'shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.1)]' : ''}`}>
                    {actionColumn.header || 'Actions'}
                  </th>
                )}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              loadingVariant === 'skeleton' ? (
                Array.from({ length: pagination?.limit || 5 }).map((_, rowIndex) => (
                  <tr key={`skeleton-${rowIndex}`} className="bg-white">
                    {expandable && (
                      <td className={`${currentPadding} ${cellBorderClass} w-[1%] whitespace-nowrap`}>
                        <div className="h-5 w-5 bg-neutral-200 animate-pulse rounded-full"></div>
                      </td>
                    )}
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
                ))
              ) : (
                <tr>
                  <td colSpan={totalColumnsCount} className="py-12 text-center text-neutral-500">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-medium text-neutral-600">Loading data...</span>
                    </div>
                  </td>
                </tr>
              )
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={totalColumnsCount} className="p-8 text-center text-neutral-500">
                  {emptyDisplay || 'No data available.'}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const globalRowIndex = pageOffset + rowIndex
                const key = rowKey ? rowKey(row) : rowIndex
                const isSelected = currentSelectedKeys.includes(key)
                const isExpanded = expandedRowKeys.includes(key)
                
                const canExpand = expandable?.rowExpandable ? expandable.rowExpandable(row) : true

                return (
                  <React.Fragment key={key}>
                    <tr 
                      className={`
                        ${isStriped && rowIndex % 2 === 1 ? stripedColorClasses[color] : 'bg-white'} 
                        ${isHover ? `${hoverColorClasses[color]} transition-colors` : ''}
                        ${isSelected ? stripedColorClasses[color] : ''} 
                      `}
                    >
                      {expandable && (
                        <td className={`${currentPadding} ${cellBorderClass} w-[1%] whitespace-nowrap`}>
                          {canExpand && (
                            <button
                              onClick={() => toggleExpand(key)}
                              className="p-1 rounded-md hover:bg-neutral-100 text-neutral-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                            >
                              <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                                <ChevronRightIcon size={18} />
                              </div>
                            </button>
                          )}
                        </td>
                      )}
                      {rowSelection && (
                        <td className={`${currentPadding} ${cellBorderClass} w-[1%] whitespace-nowrap`}>
                          {renderCheckbox(isSelected, false, (checked) => handleSelectRow(key, checked))}
                        </td>
                      )}
                      {leafColumns.map((col, colIndex) => {
                        const cellValue = col.accessorKey ? row[col.accessorKey as keyof T] : undefined
                        
                        return (
                          <td 
                            key={colIndex} 
                            className={`${currentPadding} ${cellBorderClass} text-neutral-700 ${col.align ? alignClasses[col.align] : ''} ${col.className || ''}`}
                            style={{ width: col.width, minWidth: col.width, maxWidth: col.width }}
                          >
                            {col.cell ? col.cell(row, globalRowIndex) : (cellValue as React.ReactNode)}
                          </td>
                        )
                      })}

                      {actionColumn && (
                        <td className={`${currentPadding} ${cellBorderClass} text-center sticky right-0 z-10 bg-inherit ${isScrolledX ? 'shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.1)]' : ''}`}>
                          <ActionColumn config={{ color, ...actionColumn }} row={row} />
                        </td>
                      )}
                    </tr>
                    
                    {expandable && isExpanded && canExpand && (
                      <tr className="bg-neutral-50/50 border-b border-neutral-200">
                        <td colSpan={totalColumnsCount} className="p-0">
                          <div className="overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                            {expandable.expandedRowRender(row, globalRowIndex)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {!loading && pagination && (
        <Pagination config={{...pagination, color}} />
      )}
    </div>
  )
}
