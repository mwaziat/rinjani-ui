'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { CheckIcon, ChevronDownIcon, XIcon, AlertCircleIcon } from '../../Icons'
import type { SelectMultipleProps } from './Select.types'
import { getSelectValueKey, isMutableInteraction, useStableInputId } from '../shared'
import type { SelectOption, SelectValue } from '../types'
import {
  multiColorMap,
  multiLineActive,
  multiSizeMap,
  chipSizes,
  radiusMap
} from './Select.styles'

export const SelectMultiple = ({
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
  emptyText = 'No data available',
}: SelectMultipleProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [portalPos, setPortalPos] = useState<{ top?: number; bottom?: number; left: number; width: number; maxHeight: number; isPositioned: boolean }>({ left: 0, width: 0, maxHeight: 240, isPositioned: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputId = useStableInputId(id, 'select-multiple')
  const canMutate = isMutableInteraction(disabled, readOnly)
  const getValueKey = (currentValue?: SelectValue) => getSelectValueKey(currentValue)

  const selectedKeys = useMemo(() => value.map((item) => getValueKey(item)), [value])
  const selectedOptions = useMemo(() => options.filter((option) => selectedKeys.includes(option.value)), [options, selectedKeys])

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

  const clearValue = () => {
    if (!canMutate) return
    onChange([])
  }

  const toggleOption = (option: SelectOption) => {
    if (!canMutate || option.disabled) return
    const isSelected = selectedKeys.includes(option.value)

    if (isSelected) {
      onChange(value.filter((item) => getValueKey(item) !== option.value))
      return
    }

    onChange([...value, buildNextValue(option.value, option.data)])
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        (!listRef.current || !listRef.current.contains(target))
      ) {
        setIsFocused(false)
        setIsOpen(false)
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
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [isOpen])

  const borderStyles = variant === 'line'
    ? (error
      ? `border-0 border-b border-danger-500 ${isOpen ? 'border-b-danger-500 ring-1.5 ring-danger-400' : ''}`
      : `border-0 border-b border-neutral-300 ${isOpen ? multiLineActive[color] : ''}`
    )
    : (error
      ? `border border-danger-500 ${isOpen ? 'border-danger-500 ring-1.5 ring-danger-400' : ''}`
      : `border border-neutral-300 ${isOpen ? multiColorMap[color].active : ''}`
    )

  const radiusClass = variant === 'line' ? 'rounded-none' : radiusMap[size]
  const hasValue = selectedOptions.length > 0
  const isFloating = floating && (isFocused || hasValue || isOpen)

  const triggerStyles = `relative w-full ${radiusClass} transition-all outline-none flex items-center cursor-pointer text-neutral-900 font-medium ${multiSizeMap[size]} ${leftIcon ? 'pl-11' : 'px-4'} ${(rightIcon || isClearable) ? 'pr-11' : ''} ${borderStyles} ${disabled ? 'cursor-not-allowed bg-neutral-100' : (variant === 'filled' ? (isOpen ? 'bg-white' : 'bg-neutral-50') : 'bg-white')}`

  const labelStyles = floating && label
    ? `absolute z-10 transition-all duration-200 pointer-events-none uppercase font-semibold tracking-widest text-neutral-400 ${isFloating ? 'top-0 text-[10px] bg-white px-2 -translate-y-1/2 left-4' : `top-1/2 -translate-y-1/2 text-[11px] ${leftIcon ? 'left-11' : 'left-4'}`} ${isFloating ? multiColorMap[color].label : ''} ${error ? 'text-danger-500' : ''}`
    : `block mb-2 text-[11px] font-semibold uppercase tracking-widest ${error ? 'text-danger-500' : 'text-neutral-500'}`

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
          onClick={() => !disabled && (() => {
            const rect = triggerRef.current?.getBoundingClientRect()
            if (!isOpen && rect) {
              setPortalPos({ top: rect.bottom + 8, left: rect.left, width: rect.width, maxHeight: 240, isPositioned: false })
            }
            setIsFocused(!isOpen)
            setIsOpen((current) => !current)
          })()}
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
                className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide ${chipSizes[size]} ${multiColorMap[color].badge}`}
                onClick={(event) => {
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
                size={16}
                className="transition-colors hover:text-danger-500"
                onClick={(event) => {
                  event.stopPropagation()
                  clearValue()
                }}
              />
            )}
            <ChevronDownIcon size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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
        >
          <div className="overflow-y-auto scrollbar-thin" style={{ maxHeight: `${portalPos.maxHeight}px` }}>
            {options.map((option) => {
              const isSelected = selectedKeys.includes(option.value)

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  className={`flex ${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${isSelected ? multiColorMap[color].itemSelected : 'text-neutral-700 hover:bg-neutral-50'}`}
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

            {options.length === 0 && (
              <div className="px-4 py-6 text-center text-xs uppercase tracking-widest text-neutral-400">
                {emptyText}
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

export default SelectMultiple
