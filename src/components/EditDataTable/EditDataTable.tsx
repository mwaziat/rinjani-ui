import React, { useRef, useState, useEffect } from 'react'
import { EditToolbar } from './EditToolbar'
import { EditPagination } from './EditPagination'
import { EditActionColumn } from './EditActionColumn'
import { CheckIcon } from '../Icons'
import { EditEditableCell } from './EditEditableCell'
import { EditTableHeader } from './EditTableHeader'
import { EditTableLoading } from './EditTableLoading'
import type { EditDataTableProps, EditTableRowState, EditRowUpdater, EditRowStateUpdater } from './EditDataTable.types'
import { paddingClasses, hoverColorClasses, stripedColorClasses, checkboxColorClasses, alignClasses } from './EditDataTable.styles'
import { getLeafColumns } from './EditDataTable.utils'

export function EditDataTable<T>({
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
  contained = true,
}: EditDataTableProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolledX, setIsScrolledX] = useState(false)
  const [localSelectedKeys, setLocalSelectedKeys] = useState<(string | number)[]>([])

  const [tableData, setTableData] = useState<EditTableRowState<T>[]>(() => {
    return data.map(row => ({
      original: row,
      edited: { ...row },
      action: {
        key: rowKey(row),
        mode: 'view' as const
      }
    }))
  })

  const pendingAddRef = useRef(false)
  const [prevData, setPrevData] = useState(data)
  const [deletionErrorKeys, setDeletionErrorKeys] = useState<(string | number)[]>([])
  
  if (data !== prevData) {
    setPrevData(data)
    setTableData(prev => {
      const prevMap = new Map(prev.map(p => [p.action.key, p]))
      const newData = data.map(row => {
        const key = rowKey(row)
        const existing = prevMap.get(key)
        return {
          original: row,
          edited: existing ? existing.edited : { ...row },
          action: {
            key,
            mode: existing ? existing.action.mode : (pendingAddRef.current ? 'new' : 'view')
          }
        }
      })
      pendingAddRef.current = false
      return newData
    })
  }


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

  const currentSelectedKeys = rowSelection?.selectedRowKeys !== undefined
    ? rowSelection.selectedRowKeys
    : localSelectedKeys

  const updateSelectedKeys = (newKeys: (string | number)[]) => {
    if (rowSelection?.selectedRowKeys === undefined) {
      setLocalSelectedKeys(newKeys)
    }
    rowSelection?.onSelectionChange?.(newKeys)
  }

  const currentPageKeys = tableData.map(row => row.action.key)
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

  const leafColumns = getLeafColumns(columns)
  const totalColumnsCount = leafColumns.length + (actionColumn ? 1 : 0) + (rowSelection ? 1 : 0)

  const activeEditRows = tableData.filter(r => r.action.mode === 'edit' || r.action.mode === 'new')

  const containerClasses = contained
    ? `bg-white rounded-xl ${borderClass} shadow-sm w-full ${className}`
    : `w-full ${className}`

  return (
    <div className={containerClasses}>

      {toolbar && (
        <EditToolbar
          config={{
            color,
            ...toolbar,
            onAdd: () => {
              pendingAddRef.current = true
              if (toolbar.onAdd) {
                toolbar.onAdd()
              }
            },
            onEditAll: (keys) => {
              const keysToEdit = keys.length > 0 ? keys : tableData.map(r => r.action.key)
              setTableData(prev => prev.map(r =>
                keysToEdit.includes(r.action.key)
                  ? { ...r, action: { ...r.action, mode: 'edit' } }
                  : r
              ))
              if (toolbar.onEditAll) {
                toolbar.onEditAll(keys)
              }
            },
            onSaveAll: async (rows, rowStates) => {
              if (toolbar.onSaveAll) {
                await toolbar.onSaveAll(rows, rowStates)
              }
              setTableData(prev => prev.map(r =>
                (r.action.mode === 'edit' || r.action.mode === 'new')
                  ? { ...r, original: { ...r.edited }, action: { ...r.action, mode: 'view' } }
                  : r
              ))
            },
            onCancelAll: () => {
              if (toolbar.onCancelAll) {
                toolbar.onCancelAll(activeEditRows.map(r => r.original))
              }
              setTableData(prev => prev.map(r =>
                (r.action.mode === 'edit' || r.action.mode === 'new')
                  ? { ...r, edited: { ...r.original }, action: { ...r.action, mode: 'view' } }
                  : r
              ))
            },
            onDeleteAll: async (keys) => {
              const editingKeys: (string | number)[] = tableData
                .filter(r => (r.action.mode === 'edit' || r.action.mode === 'new') && keys.includes(r.action.key))
                .map(r => r.action.key)
              
              if (editingKeys.length > 0) {
                setDeletionErrorKeys(editingKeys)
                setTimeout(() => setDeletionErrorKeys([]), 3000)
                return
              }

              if (keys.length > 0 && toolbar.onDeleteAll) {
                await toolbar.onDeleteAll(keys)
              }
              
              updateSelectedKeys([])
            }
          }}
          selectedRowKeys={currentSelectedKeys}
          activeEditRows={activeEditRows.map(r => r.edited)}
          activeEditStates={activeEditRows}
        />
      )}

      <div
        ref={tableContainerRef}
        className="w-full overflow-x-auto"
      >
        <table className={`w-full text-left border-collapse`}>
          <EditTableHeader
            columns={columns}
            {...(rowSelection ? { rowSelection } : {})}
            {...(actionColumn ? { actionColumn } : {})}
            color={color}
            scrolled={scrolled}
            isScrolledX={isScrolledX}
            currentPadding={currentPadding}
            headerBorderClass={headerBorderClass}
            cellBorderClass={cellBorderClass}
            isAllCurrentPageSelected={isAllCurrentPageSelected}
            isIndeterminate={isIndeterminate}
            handleSelectAll={handleSelectAll}
          />
          <tbody>
            {loading ? (
              <EditTableLoading
                loadingVariant={loadingVariant}
                limit={pagination?.limit || 5}
                totalColumnsCount={totalColumnsCount}
                leafColumns={leafColumns}
                rowSelection={!!rowSelection}
                actionColumn={!!actionColumn}
                currentPadding={currentPadding}
                cellBorderClass={cellBorderClass}
              />
            ) : tableData.length === 0 ? (
              <tr>
                <td colSpan={totalColumnsCount} className="p-8 text-center text-neutral-500">
                  {emptyDisplay || 'No data available.'}
                </td>
              </tr>
            ) : (
              tableData.map((rowState, rowIndex) => {
                const globalRowIndex = pageOffset + rowIndex
                const key = rowState.action.key
                const isSelected = currentSelectedKeys.includes(key)
                const isEditing = rowState.action.mode === 'edit' || rowState.action.mode === 'new'

                return (
                  <React.Fragment key={key}>
                    {deletionErrorKeys.includes(key) && (
                      <tr key="deletion-error" className="bg-red-50">
                        <td colSpan={totalColumnsCount} className="text-red-500 text-xs text-center py-1">
                          This row is currently being edited and cannot be deleted.
                        </td>
                      </tr>
                    )}
                    <tr
                      key="row"
                      className={`
                        ${isStriped && rowIndex % 2 === 1 ? stripedColorClasses[color] : 'bg-white'} 
                        ${isHover ? `${hoverColorClasses[color]} transition-colors` : ''}
                        ${isSelected ? stripedColorClasses[color] : ''} 
                      `}
                    >

                      {rowSelection && (
                        <td className={`${currentPadding} ${cellBorderClass} w-[1%] whitespace-nowrap`}>
                          <label className="relative shrink-0 flex items-center justify-center cursor-pointer group m-0 p-0">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={isSelected}
                              onChange={(e) => handleSelectRow(key, e.target.checked)}
                            />
                            <div className={`
                              flex items-center justify-center border transition-all h-5 w-5 min-w-[20px] min-h-[20px] shrink-0 rounded-[4px]
                              ${isSelected ? checkboxColorClasses[color] : 'border-neutral-300 bg-white text-transparent group-hover:border-neutral-400'}
                            `}>
                              {isSelected && <CheckIcon size={14} className="text-white font-bold" />}
                            </div>
                          </label>
                        </td>
                      )}
                      {leafColumns.map((col, colIndex) => {
                        const cellValue = col.accessorKey ? rowState.edited[col.accessorKey as keyof T] : undefined

                        let renderedCell: React.ReactNode = null
                        if (isEditing && col.editable) {
                          renderedCell = (
                            <EditEditableCell
                              column={col}
                              rowState={rowState}
                              onChange={(key, val) => {
                                const rowKeyValue = rowState.action.key
                                setTableData(prev => prev.map(r =>
                                  r.action.key === rowKeyValue
                                    ? { ...r, edited: { ...r.edited, [key]: val as T[keyof T] } }
                                    : r
                                ))
                              }}
                              onRowChange={(nextRow: EditRowUpdater<T>) => {
                                const rowKeyValue = rowState.action.key
                                setTableData(prev => prev.map(r =>
                                  r.action.key === rowKeyValue
                                    ? { ...r, edited: typeof nextRow === 'function' ? (nextRow as (prev: T) => T)(r.edited) : nextRow }
                                    : r
                                ))
                              }}
                            />
                          )
                        } else {
                          renderedCell = col.cell ? col.cell(rowState.edited, globalRowIndex) : (cellValue as React.ReactNode)
                        }

                        return (
                          <td
                            key={colIndex}
                            className={`${currentPadding} ${cellBorderClass} text-neutral-700 ${col.align ? alignClasses[col.align] : ''} ${col.className || ''}`}
                            style={{ width: col.width, minWidth: col.width, maxWidth: col.width }}
                          >
                            {renderedCell}
                          </td>
                        )
                      })}

                      {actionColumn && (
                        <td className={`${currentPadding} ${cellBorderClass} text-center sticky right-0 z-10 bg-inherit ${isScrolledX ? 'shadow-[-4px_0_6px_-4px_rgba(0,0,0,0.1)]' : ''}`}>
                          <EditActionColumn
                            config={{ 
                              color, 
                              ...actionColumn,
                              onDelete: async (row) => {
                                if (actionColumn.onDelete) {
                                  await actionColumn.onDelete(row)
                                }
                                if (currentSelectedKeys.includes(rowState.action.key)) {
                                  updateSelectedKeys(currentSelectedKeys.filter(k => k !== rowState.action.key))
                                }
                              }
                            }}
                            rowState={rowState}
                            onStateChange={(update: EditRowStateUpdater<T>) => {
                              const rowKeyValue = rowState.action.key
                              setTableData(prev => prev.map(r =>
                                r.action.key === rowKeyValue
                                  ? (typeof update === 'function' ? update(r) : update)
                                  : r
                              ))
                            }}
                          />
                        </td>
                      )}
                    </tr>
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {!loading && pagination && (
        <EditPagination config={{ ...pagination, color }} />
      )}
    </div>
  )
}
