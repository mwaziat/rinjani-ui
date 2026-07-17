'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { CheckIcon, ChevronDownIcon, PlusIcon, SearchIcon, XIcon, AlertCircleIcon } from '../../Icons'
import type { AutocompleteMultipleProps } from './AutocompleteMultiple.types'
import { filterOptionsByLabel, getSelectValueKey, isMutableInteraction, toOptionKey, useOptionResolver, useStableInputId, iconSizeMap, clearIconSizeMap } from '../shared'
import type { SelectOption, SelectValue } from '../types'
import {
  colorMap,
  lineActive,
  textSizeMap,
  labelSizeMap,
  floatingActiveSizeMap,
  sizeMap,
  radiusMap,
  chipSizes
} from './AutocompleteMultiple.styles'

/**
 * A highly interactive searchable dropdown that allows selecting multiple options.
 * 
 * Selected options are displayed as "chips" or tags inside the input area.
 * Functions similarly to a SelectMultiple, but includes a search input to filter options.
 * 
 * @example
 * ```tsx
 * const [tags, setTags] = useState<SelectMultipleValue>([])
 * 
 * return (
 *   <AutocompleteMultiple 
 *     label="Tags"
 *     value={tags}
 *     onChange={setTags}
 *     options={[
 *       { label: 'React', value: 'react' },
 *       { label: 'Vue', value: 'vue' },
 *       { label: 'Angular', value: 'angular' }
 *     ]}
 *     enableAddItem={true}
 *     isClearable
 *   />
 * )
 * ```
 */
export const AutocompleteMultiple = ({
  label,
  options,
  value = [],
  onChange,
  placeholder = 'Select options...',
  floating = false,
  variant = 'outlined',
  size = 'md',
  color = 'primary',
  leftIcon,
  rightIcon,
  error,
  required,
  isClearable = false,
  className = '',
  disabled = false,
  readOnly = false,
  id,
  emptyText = 'No results found',
  enableAddItem = false,
  addItemLabel = 'Add New Item',
  addItemPlaceholder = 'Type new item',
  addItemMode = 'default',
  onAddItem,
  onAddItemClick,
  onSearch,
}: AutocompleteMultipleProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [portalPos, setPortalPos] = useState<{ top?: number; bottom?: number; left: number; width: number; maxHeight: number; isPositioned: boolean }>({ left: 0, width: 0, maxHeight: 240, isPositioned: false })
  const [query, setQuery] = useState('')
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [addItemValue, setAddItemValue] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const inputId = useStableInputId(id, 'select-multiple-autocomplete')
  const canMutate = isMutableInteraction(disabled, readOnly)
  const getValueKey = (currentValue?: SelectValue) => toOptionKey(getSelectValueKey(currentValue))

  const selectedKeys = useMemo(() => value.map((item) => toOptionKey(getSelectValueKey(item))), [value])
  const resolveOption = useOptionResolver(options)
  const selectedOptions = value
    .map((item) => resolveOption(item))
    .filter((option): option is SelectOption => option !== undefined)
  const hasValue = selectedOptions.length > 0
  const isFloating = floating && (isFocused || hasValue || isOpen)

  const buildNextValue = (optionValue: string | number, optionData?: unknown): SelectValue => {
    const sampleValue = value[0]

    if (typeof sampleValue === 'object' && sampleValue !== null && 'value' in sampleValue) {
      return { value: optionValue, data: optionData }
    }

    return optionValue
  }

  const computePortalPos = () => {
    if (!triggerRef.current) return { left: 0, width: 0, maxHeight: 240, isPositioned: false }
    const rect = triggerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const gap = 8
    const spaceBelow = viewportHeight - rect.bottom - gap
    const spaceAbove = rect.top - gap
    const goUp = spaceBelow < 240 && spaceAbove > spaceBelow
    const maxHeight = Math.max(Math.min(goUp ? spaceAbove : spaceBelow, 240), 120)
    return goUp
      ? { bottom: viewportHeight - rect.top + gap, left: rect.left, width: rect.width, maxHeight, isPositioned: true }
      : { top: rect.bottom + gap, left: rect.left, width: rect.width, maxHeight, isPositioned: true }
  }

  const openDropdown = () => {
    if (!canMutate) {
      return
    }

    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      setPortalPos({ top: rect.bottom + 8, left: rect.left, width: rect.width, maxHeight: 240, isPositioned: false })
    }
    setQuery('')
    setIsFocused(true)
    setIsOpen(true)
  }

  const closeDropdown = () => {
    setIsOpen(false)
    setIsFocused(false)
    setQuery('')
    setIsAddItemOpen(false)
    setAddItemValue('')
  }

  const clearValue = () => {
    if (!canMutate) return
    onChange([])
    setQuery('')
  }

  const toggleOption = (option: SelectOption) => {
    if (!canMutate || option.disabled) return
    const optionKey = toOptionKey(option.value)
    const isSelected = selectedKeys.includes(optionKey)

    if (isSelected) {
      onChange(value.filter((item) => getValueKey(item) !== optionKey))
      return
    }

    onChange([...value, buildNextValue(option.value, option.data)])
  }

  const handleAddItemButton = () => {
    if (addItemMode === 'custom') {
      onAddItemClick?.(query.trim())
      return
    }

    setIsAddItemOpen(true)
    setAddItemValue(query.trim())
  }

  const handleSaveAddItem = () => {
    const trimmedValue = addItemValue.trim()
    if (!trimmedValue) {
      return
    }

    const exists = options.some((option) => option.label.toLowerCase() === trimmedValue.toLowerCase())
    if (exists) {
      setIsAddItemOpen(false)
      setAddItemValue('')
      return
    }

    const nextOption: SelectOption = {
      label: trimmedValue,
      value: trimmedValue,
    }

    onAddItem?.(nextOption)
    onChange([...value, buildNextValue(nextOption.value, nextOption.data)])
    setIsAddItemOpen(false)
    setAddItemValue('')
    setQuery('')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        (!listRef.current || !listRef.current.contains(target))
      ) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const update = () => setPortalPos(computePortalPos())

    const frameId = window.requestAnimationFrame(() => {
      update()
      searchInputRef.current?.focus()
    })

    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [isOpen])

  useEffect(() => {
    onSearch?.(query)
  }, [query, onSearch])

  const filteredOptions = useMemo(() => filterOptionsByLabel(options, query), [options, query])

  const borderStyles = variant === 'line'
    ? (error
        ? `border-0 border-b border-danger-500`
        : `border-0 border-b ${isOpen ? lineActive[color] : 'border-neutral-400'}`
      )
    : (error
        ? `border border-danger-500`
        : `border ${isOpen ? colorMap[color].active : 'border-neutral-400'}`
      )

  const radiusClass = variant === 'line' ? 'rounded-none' : radiusMap[size]

  const triggerStyles = `relative w-full ${radiusClass} transition-all outline-none flex items-center cursor-pointer text-neutral-900 font-normal ${sizeMap[size]} ${leftIcon ? 'pl-11' : 'px-4'} ${(rightIcon || isClearable) ? 'pr-11' : ''} ${borderStyles} ${variant === 'filled' ? (isOpen ? 'bg-white' : 'bg-neutral-50') : 'bg-white'} ${disabled ? 'cursor-not-allowed bg-neutral-50' : ''}`

  const labelStyles = floating
    ? `absolute z-10 transition-all duration-200 pointer-events-none ${isFloating ? `top-0 ${floatingActiveSizeMap[size]} bg-white px-2 -translate-y-1/2 left-4 font-normal uppercase tracking-widest` : `top-1/2 -translate-y-1/2 ${textSizeMap[size]} font-normal ${leftIcon ? 'left-11' : 'left-4'}`} ${error ? 'text-danger-500' : `${isFloating ? (isOpen ? colorMap[color].label : 'text-neutral-500') : 'text-neutral-400'}`}`
    : `block mb-2 ${labelSizeMap[size]} font-normal uppercase tracking-widest ${error ? 'text-danger-500' : 'text-neutral-500'}`

  return (
    <div className={`flex w-full flex-col ${className}`} ref={containerRef}>
      {!floating && label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label} {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          ref={triggerRef}
          id={inputId}
          className={triggerStyles}
          onClick={() => {
            if (isOpen) {
              closeDropdown()
              return
            }

            openDropdown()
          }}
        >
          {leftIcon && (
            <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-neutral-400">
              {leftIcon}
            </div>
          )}

          <div className="flex flex-1 flex-wrap gap-1.5">
            {selectedOptions.length === 0 && (
              <span className="font-normal text-neutral-400">
                {floating ? (isFloating ? placeholder : '\u00a0') : placeholder}
              </span>
            )}

            {selectedOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide ${chipSizes[size]} ${colorMap[color].badge}`}
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation()
                  toggleOption(option)
                }}
              >
                <span>{option.label}</span>
                <XIcon size={12} />
              </button>
            ))}
          </div>

          {floating && label && (
            <label htmlFor={inputId} className={labelStyles}>
              {label} {required && <span className="ml-0.5 text-danger-500">*</span>}
            </label>
          )}

          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 text-neutral-400">
            {rightIcon && rightIcon}
            {isClearable && selectedOptions.length > 0 && (
              <XIcon
                size={clearIconSizeMap[size]}
                className="transition-colors hover:text-danger-500"
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation()
                  clearValue()
                }}
              />
            )}
            <ChevronDownIcon size={iconSizeMap[size]} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {isOpen && createPortal(
        <div
          ref={listRef}
          style={{
            position: 'fixed',
            top: portalPos.top,
            bottom: portalPos.bottom,
            left: portalPos.left,
            width: portalPos.width,
            zIndex: 100000,
            visibility: portalPos.isPositioned ? 'visible' : 'hidden',
            pointerEvents: portalPos.isPositioned ? 'auto' : 'none',
          } as CSSProperties}
          className="overflow-hidden rounded-lg border-1.5 border-neutral-100 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="border-b border-neutral-100 p-3">
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-neutral-400">
                <SearchIcon size={16} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                placeholder="Search..."
                className={`w-full rounded-md border border-neutral-300 bg-white py-2.5 pl-9 pr-3 text-sm font-normal text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-400 ${error ? 'focus:border-danger-500 focus:ring-0' : colorMap[color].input}`}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault()
                    closeDropdown()
                  }

                  if (event.key === 'Enter') {
                    event.preventDefault()

                    const firstOption = filteredOptions[0]
                    if (firstOption) {
                      toggleOption(firstOption)
                      return
                    }

                    if (enableAddItem && addItemMode === 'default') {
                      setIsAddItemOpen(true)
                      setAddItemValue(query.trim())
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="overflow-y-auto scrollbar-thin" style={{ maxHeight: `${Math.max(portalPos.maxHeight - 72, 80)}px` }}>
            {filteredOptions.map((option) => {
              const isSelected = selectedKeys.includes(toOptionKey(option.value))

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  className={`flex ${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} items-center justify-between px-4 py-3 text-sm font-normal transition-colors ${isSelected ? colorMap[color].itemSelected : 'text-neutral-700 hover:bg-neutral-50'}`}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    toggleOption(option)
                  }}
                >
                  <span>{option.label}</span>
                  {isSelected && <CheckIcon size={16} />}
                </div>
              )
            })}

            {filteredOptions.length === 0 && (
              <div className="space-y-3 px-4 py-4">
                <div className="text-center text-xs font-medium uppercase tracking-widest text-neutral-400">
                  {emptyText}
                </div>

                {enableAddItem && !isAddItemOpen && (
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-primary-300 bg-primary-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-primary-600 transition-colors hover:bg-primary-100"
                    onMouseDown={(event) => {
                      event.preventDefault()
                      handleAddItemButton()
                    }}
                  >
                    <PlusIcon size={14} />
                    {addItemLabel}
                  </button>
                )}

                {enableAddItem && isAddItemOpen && addItemMode === 'default' && (
                  <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={addItemValue}
                        placeholder={addItemPlaceholder}
                        className={`flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-300 ${colorMap[color].input}`}
                        onChange={(event) => setAddItemValue(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault()
                            handleSaveAddItem()
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="text-neutral-400 transition-colors hover:text-danger-500"
                        onMouseDown={(event) => {
                          event.preventDefault()
                          setIsAddItemOpen(false)
                          setAddItemValue('')
                        }}
                        aria-label="Cancel add item"
                      >
                        <XIcon size={16} />
                      </button>
                      <button
                        type="button"
                        className="text-primary-600 transition-colors hover:text-primary-700"
                        onMouseDown={(event) => {
                          event.preventDefault()
                          handleSaveAddItem()
                        }}
                        aria-label="Save new item"
                      >
                        <CheckIcon size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 pl-1 text-[10px] font-semibold uppercase tracking-wider text-danger-500">
          <AlertCircleIcon size={12} />
          {error}
        </div>
      )}
    </div>
  )
}

export default AutocompleteMultiple
