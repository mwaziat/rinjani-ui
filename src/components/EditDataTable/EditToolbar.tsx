import React, { useRef, useState } from 'react'
import { SearchIcon, PlusIcon, RefreshIcon, TrashIcon, PencilIcon, SaveIcon } from '../Icons'
import { Button } from '../Button'
import { InputField } from '../Form'
import type { EditToolbarConfig } from './EditDataTable.types'
import { iconSizeClasses } from './EditDataTable.styles'

interface EditToolbarProps<T> {
  config: EditToolbarConfig<T>
  selectedRowKeys?: (string | number)[]
  activeEditRows?: T[]
}

export function EditToolbar<T>({ config, selectedRowKeys = [], activeEditRows = [] }: EditToolbarProps<T>) {
  const {
    title,
    description,
    showSearch = true,
    searchPlaceholder = 'Search...',
    onSearchChange,
    showAdd = false,
    onAdd,
    showRefresh = false,
    onRefresh,
    showDeleteAll = false,
    onDeleteAll,
    showEditAll = false,
    onEditAll,
    showSaveAll = false,
    onSaveAll,
    variant = 'filled',
    color = 'primary',
    size = 'sm',
    sortOrder = ['search', 'add', 'refresh', 'editAll', 'deleteAll'],
    customElements,
  } = config

  const [isSavingAll, setIsSavingAll] = useState(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(value)
      }
    }, 500)
  }

  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])


  const currentIconSize: number = iconSizeClasses[size || 'sm'] || iconSizeClasses.sm || 16
  const inputVariant = (variant === 'soft' || variant === 'text') ? 'outlined' : variant

  const customElementsMap: Record<string, React.ReactNode> = {}
  if (customElements) {
    if (Array.isArray(customElements)) {
      customElements.forEach((el, index) => {
        if (React.isValidElement(el) && el.key != null) {
          const keyStr = String(el.key).replace(/^\.\$/, '')
          customElementsMap[keyStr] = el
        } else {
          customElementsMap[`custom-${index}`] = el
        }
      })
    } else if (React.isValidElement(customElements) && customElements.key != null) {
      const keyStr = String(customElements.key).replace(/^\.\$/, '')
      customElementsMap[keyStr] = customElements
    } else {
      customElementsMap['customElements'] = customElements
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 gap-4">
      <div className="flex-1 w-full sm:w-auto">
        {title && <h3 className="text-lg font-bold text-neutral-800">{title}</h3>}
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>

      <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto justify-start sm:justify-end">
        {sortOrder.map(key => {
          if (key === 'search') {
            return showSearch && (
              <div key="search" className="w-full sm:w-64 shrink-0">
                <InputField
                  placeholder={searchPlaceholder}
                  onChange={handleSearch}
                  leftIcon={<SearchIcon />}
                  size={size}
                  variant={inputVariant}
                  color={color}
                />
              </div>
            )
          }

          if (key === 'refresh') {
            return showRefresh && (
              <Button
                key="refresh"
                leftIcon={<RefreshIcon size={currentIconSize} />}
                variant={variant}
                color={color}
                size={size}
                onClick={onRefresh}
              >
                Refresh
              </Button>
            )
          }

          if (key === 'add') {
            return showAdd && (
              <Button
                key="add"
                leftIcon={<PlusIcon size={currentIconSize} />}
                variant={variant}
                color={color}
                size={size}
                onClick={onAdd}
              >
                Add New
              </Button>
            )
          }

          if (key === 'editAll') {
            if (activeEditRows.length > 0 && showSaveAll) {
              return (
                <Button
                  key="saveAll"
                  leftIcon={<SaveIcon size={currentIconSize} />}
                  variant="filled"
                  color="success"
                  size={size}
                  disabled={isSavingAll}
                  onClick={async () => {
                    if (onSaveAll) {
                      setIsSavingAll(true)
                      try {
                        await onSaveAll(activeEditRows)
                      } finally {
                        setIsSavingAll(false)
                      }
                    }
                  }}
                >
                  {isSavingAll ? 'Saving...' : 'Save All'}
                </Button>
              )
            }

            const hasSelection = selectedRowKeys.length > 0
            const editLabel = hasSelection ? 'Edit Selected' : 'Edit All'

            return showEditAll && (
              <Button
                key="editAll"
                leftIcon={<PencilIcon size={currentIconSize} />}
                variant={variant}
                color={color}
                size={size}
                onClick={() => onEditAll?.(selectedRowKeys)}
              >
                {editLabel}
              </Button>
            )
          }

          if (key === 'deleteAll') {
            return showDeleteAll && (
              <Button
                key="deleteAll"
                leftIcon={<TrashIcon size={currentIconSize} />}
                variant={variant}
                color={color}
                size={size}
                disabled={selectedRowKeys.length === 0}
                onClick={() => onDeleteAll?.(selectedRowKeys)}
              >
                Delete All
              </Button>
            )
          }

          if (customElementsMap[key]) {
            return <React.Fragment key={key}>{customElementsMap[key]}</React.Fragment>
          }

          return null
        })}

        {Object.keys(customElementsMap).map(key => {
          if (!sortOrder.includes(key)) {
            return <React.Fragment key={key}>{customElementsMap[key]}</React.Fragment>
          }
          return null
        })}
      </div>
    </div>
  )
}
