import React from 'react'
import { CheckIcon, MinusIcon } from '../Icons'
import type { TableHeaderProps } from './EditDataTable.types'
import { getDepth, generateHeaderRows } from './EditDataTable.utils'


import { checkboxColorClasses, alignClasses } from './EditDataTable.styles'

export function TableHeader<T>({
  columns,
  rowSelection,
  actionColumn,
  color,
  scrolled,
  isScrolledX,
  currentPadding,
  headerBorderClass,
  cellBorderClass,
  isAllCurrentPageSelected,
  isIndeterminate,
  handleSelectAll,
}: TableHeaderProps<T>) {
  const maxDepth = getDepth(columns)
  const headerRows = generateHeaderRows(columns, maxDepth)
  
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
          {checked && !indeterminate && <CheckIcon size={14} className="text-white font-bold" />}
          {indeterminate && <MinusIcon size={14} className="text-white font-bold" />}
        </div>
      </label>
    )
  }

  return (
    <thead>
      {headerRows.map((rowCells, rowIndex) => (
        <tr key={rowIndex} className={`${headerBorderClass} text-neutral-500 uppercase text-xs tracking-wider bg-white`}>
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
  )
}
