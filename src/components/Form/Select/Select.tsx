'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDownIcon, XIcon, AlertCircleIcon } from '../../Icons'
import type { SelectProps } from './Select.types'
import { buildSelectValue, getSelectValueKey, isMutableInteraction, useStableInputId } from '../shared'
import {
  singleColorMap,
  singleLineActive,
  textSizeMap,
  labelSizeMap,
  floatingActiveSizeMap,
  singleSizeMap,
  radiusMap
} from './Select.styles'

/**
 * A custom dropdown select component designed as an elegant alternative to the native `<select>`.
 * 
 * Features smart positioning via portals to avoid being cut off by overflow containers,
 * floating labels, and support for object-based values.
 * 
 * @example
 * ```tsx
 * const [role, setRole] = useState<string | number>('user')
 * 
 * return (
 *   <Select 
 *     label="User Role"
 *     value={role}
 *     onChange={setRole}
 *     options={[
 *       { label: 'Administrator', value: 'admin' },
 *       { label: 'Standard User', value: 'user' },
 *       { label: 'Guest', value: 'guest', disabled: true }
 *     ]}
 *     floating
 *   />
 * )
 * ```
 */
export const Select = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option...',
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
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [portalPos, setPortalPos] = useState<{ top?: number; bottom?: number; left: number; width: number; maxHeight: number; isPositioned: boolean }>({ left: 0, width: 0, maxHeight: 240, isPositioned: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputId = useStableInputId(id, 'select')
  const selectedValue = getSelectValueKey(value)
  const selectedOption = options.find((opt) => opt.value === selectedValue)
  const hasValue = Boolean(selectedOption)
  const isFloating = floating && (isFocused || hasValue || isOpen)
  const canMutate = isMutableInteraction(disabled, readOnly)

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
    if (!canMutate) return
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      setPortalPos({ top: rect.bottom + 8, left: rect.left, width: rect.width, maxHeight: 240, isPositioned: false })
    }
    setIsFocused(true)
    setIsOpen(true)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
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
    if (!isOpen) return
    const update = () => setPortalPos(computePortalPos())
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [isOpen, options.length])

  const borderStyles = variant === 'line'
    ? (error
      ? `border-0 border-b border-danger-500`
      : `border-0 border-b border-neutral-400 ${isOpen ? singleLineActive[color] : ''}`
    )
    : (error
      ? `border border-danger-500`
      : `border border-neutral-400 ${isOpen ? singleColorMap[color].active : ''}`
    )

  const radiusClass = variant === 'line' ? 'rounded-none' : radiusMap[size]

  const baseStyles = `
    relative w-full ${radiusClass} transition-all outline-none flex items-center cursor-pointer
    text-neutral-900 font-normal
    ${singleSizeMap[size]}
    ${leftIcon ? 'pl-11' : 'px-4'}
    ${(rightIcon || isClearable) ? 'pr-11' : ''}
    ${borderStyles}
    ${disabled ? 'cursor-not-allowed bg-neutral-100' : (variant === 'filled' ? (isOpen ? 'bg-white' : 'bg-neutral-50') : 'bg-white')}
  `

  const labelStyles = floating
    ? `absolute z-10 transition-all duration-200 pointer-events-none ${isFloating ? `top-0 ${floatingActiveSizeMap[size]} bg-white px-2 -translate-y-1/2 left-4 font-normal uppercase tracking-widest` : `top-1/2 -translate-y-1/2 ${textSizeMap[size]} font-normal ${leftIcon ? 'left-11' : 'left-4'}`} ${error ? 'text-danger-500' : `${isFloating ? (isOpen ? singleColorMap[color].label : 'text-neutral-500') : 'text-neutral-400'}`}`
    : `block mb-2 ${labelSizeMap[size]} font-normal uppercase tracking-widest ${error ? 'text-danger-500' : 'text-neutral-500'}`

  return (
    <div className={`flex flex-col w-full ${className}`} ref={containerRef}>
      {!floating && label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label} {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div ref={triggerRef} id={inputId} role="combobox" aria-expanded={isOpen} aria-readonly={readOnly} aria-disabled={disabled} className={baseStyles} onClick={() => isOpen ? (setIsOpen(false), setIsFocused(false)) : openDropdown()} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
          {leftIcon && (
            <div className="absolute left-4 flex items-center justify-center text-neutral-400">
              {leftIcon}
            </div>
          )}

          <span className={`flex-1 ${!selectedOption ? 'font-normal text-neutral-400' : ''}`}>
            {selectedOption ? selectedOption.label : (floating ? (isFloating ? placeholder : '\u00a0') : placeholder)}
          </span>

          {floating && label && (
            <label htmlFor={inputId} className={labelStyles}>
              {label} {required && <span className="ml-0.5 text-danger-500">*</span>}
            </label>
          )}

          <div className="absolute right-4 flex items-center gap-2 text-neutral-400">
            {rightIcon && rightIcon}
            {isClearable && value !== undefined && value !== null && value !== '' && (
              <XIcon
                size={16}
                className="transition-colors hover:text-danger-500"
                onClick={(e) => {
                  e.stopPropagation()
                  if (!canMutate) return
                  onChange(buildSelectValue(value, ''))
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
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={option.value === selectedValue}
                aria-disabled={option.disabled}
                className={`${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} px-4 py-3 text-sm font-medium transition-colors
                  ${option.value === selectedValue
                    ? singleColorMap[color].itemSelected
                    : 'text-neutral-700 hover:bg-neutral-50'}`}
                onClick={() => {
                  if (!canMutate || option.disabled) return
                  onChange(buildSelectValue(value, option.value, option.data))
                  setIsOpen(false)
                }}
              >
                {option.label}
              </div>
            ))}
            {options.length === 0 && (
              <div className="px-4 py-6 text-center text-xs uppercase tracking-widest text-neutral-400">
                No data available
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

export default Select
