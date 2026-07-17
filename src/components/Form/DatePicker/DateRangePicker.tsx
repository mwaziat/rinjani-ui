'use client'

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertCircleIcon, CalendarIcon, XIcon } from '../../Icons'
import { useIsHydrated } from '../../../hooks/useIsHydrated'
import type { DateAdapter, DateRangePickerProps } from './DatePicker.types'
import { NativeDateAdapter } from './NativeDateAdapter'
import { DateRangeCalendar } from './DateRangeCalendar'
import { colorMap, lineActive, textSizeMap, labelSizeMap, floatingActiveSizeMap, sizeMap, radiusMap, datePickerPopoverClasses, datePickerPopoverStyle, iconSizeMap, clearIconSizeMap } from './DatePicker.styles'
import { DEFAULT_DATE_PICKER_VIEWS, getDatePickerFormat, getDatePickerPopoverPosition } from './DatePicker.utils'

const nativeDateAdapter = new NativeDateAdapter()

/**
 * A highly customizable date range picker input component.
 * 
 * Supports selecting a start and end date via a popup dual-calendar interface.
 * Built to be adapter-agnostic, meaning it can work with native Date, Moment.js, Day.js, etc.,
 * by passing the appropriate DateAdapter instance.
 * 
 * @example
 * ```tsx
 * <DateRangePicker
 *   label="Vacation Period"
 *   value={range}
 *   onChange={setRange}
 *   format="DD/MM/YYYY"
 *   color="primary"
 * />
 * ```
 */
export function DateRangePicker<T = Date>({
  label,
  value,
  onChange,
  adapter = nativeDateAdapter as unknown as DateAdapter<T>,
  views = DEFAULT_DATE_PICKER_VIEWS,
  format,
  floating = false,
  leftIcon,
  rightIcon,
  error,
  required = false,
  className = '',
  disabled = false,
  readOnly = false,
  minDate,
  maxDate,
  id,
  placeholder = 'Select date range',
  variant = 'outlined',
  size = 'md',
  color = 'primary',
  isClearable = false,
}: DateRangePickerProps<T>): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState<[T | null, T | null]>([null, null])
  const [draftValue, setDraftValue] = useState<[T | null, T | null]>([null, null])
  const [popoverPosition, setPopoverPosition] = useState<ReturnType<typeof getDatePickerPopoverPosition> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const generatedId = useId().replace(/:/g, '')
  const inputId = id ?? `date-range-picker-${generatedId}`
  const isControlled = value !== undefined
  const currentValue = useMemo(() => isControlled ? value ?? [null, null] : uncontrolledValue, [isControlled, value, uncontrolledValue])
  const canMutate = !disabled && !readOnly
  const hasValue = currentValue[0] !== null || currentValue[1] !== null
  const isFloating = floating && (isFocused || isOpen || hasValue)

  const updatePopoverPosition = (): void => {
    if (triggerRef.current !== null) {
      setPopoverPosition(getDatePickerPopoverPosition(triggerRef.current.getBoundingClientRect(), Math.min(580, window.innerWidth - 16)))
    }
  }

  const closePicker = useCallback((): void => {
    setIsOpen(false)
    setIsFocused(false)
    setPopoverPosition(null)
    setDraftValue(currentValue)
  }, [currentValue])

  const openPicker = (): void => {
    if (!canMutate) {
      return
    }
    setDraftValue(currentValue)
    updatePopoverPosition()
    setIsFocused(true)
    setIsOpen(true)
  }

  const emitChange = (nextValue: [T | null, T | null]): void => {
    if (!isControlled) {
      setUncontrolledValue(nextValue)
    }
    onChange?.(nextValue)
    if (nextValue[0] !== null && nextValue[1] !== null) {
      closePicker()
    }
  }
  const handleCalendarChange = (nextValue: [T | null, T | null]): void => {
    setDraftValue(nextValue)
    if (nextValue[0] !== null && nextValue[1] !== null) {
      emitChange(nextValue)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const onPointerDown = (event: MouseEvent): void => {
      const target = event.target
      if (target instanceof Node && !containerRef.current?.contains(target) && !popoverRef.current?.contains(target)) {
        closePicker()
      }
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closePicker()
      }
    }
    window.addEventListener('resize', updatePopoverPosition)
    window.addEventListener('scroll', updatePopoverPosition, true)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('resize', updatePopoverPosition)
      window.removeEventListener('scroll', updatePopoverPosition, true)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closePicker])

  const selectedFormat = getDatePickerFormat(views, format)
  const renderedValue = currentValue[0] !== null && currentValue[1] !== null && adapter.isValid(currentValue[0]) && adapter.isValid(currentValue[1])
    ? `${adapter.format(currentValue[0], selectedFormat)} – ${adapter.format(currentValue[1], selectedFormat)}`
    : currentValue[0] !== null && adapter.isValid(currentValue[0])
      ? `${adapter.format(currentValue[0], selectedFormat)} –`
      : placeholder
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
  const isHydrated = useIsHydrated()

  return (
    <div ref={containerRef} className={`flex w-full flex-col ${className}`}>
      {!floating && label !== undefined && <span className={labelStyles}>{label} {required && <span className="ml-0.5 text-danger-500">*</span>}</span>}
      <div className="relative">
        <div ref={triggerRef} id={inputId} role="combobox" aria-expanded={isOpen} aria-readonly={readOnly} aria-disabled={disabled} className={triggerStyles} onClick={() => isOpen ? closePicker() : openPicker()} onFocus={() => setIsFocused(true)} onBlur={() => !isOpen && setIsFocused(false)}>
          {leftIcon !== undefined && <span className="absolute left-4 flex items-center text-neutral-400">{leftIcon}</span>}
          <span className={`flex-1 truncate ${!hasValue && floating && !isFloating ? 'text-transparent' : !hasValue ? 'text-neutral-400' : ''}`}>{renderedValue}</span>
          {floating && label !== undefined && <span className={labelStyles}>{label} {required && <span className="ml-0.5 text-danger-500">*</span>}</span>}
          <div className="absolute right-4 flex items-center gap-2 text-neutral-400">
            {rightIcon && rightIcon}
            {isClearable && (currentValue[0] !== null || currentValue[1] !== null) && !disabled && !readOnly && (
              <XIcon
                size={clearIconSizeMap[size]}
                className="transition-colors hover:text-danger-500"
                onClick={(e) => {
                  e.stopPropagation()
                  emitChange([null, null])
                }}
              />
            )}
            <CalendarIcon size={iconSizeMap[size]} aria-hidden="true" />
          </div>
        </div>
      </div>
      {error !== undefined && <div className="mt-1.5 flex items-center gap-1.5 pl-1 text-[10px] font-semibold uppercase tracking-wider text-danger-500" role="alert"><AlertCircleIcon size={12} aria-hidden="true" />{error}</div>}
      {isHydrated && isOpen && popoverPosition !== null && createPortal(
        <div ref={popoverRef} role="dialog" aria-modal="false" className={`${datePickerPopoverClasses} w-fit`} style={{ position: 'fixed', ...datePickerPopoverStyle, ...popoverPosition }}>
          <DateRangeCalendar value={draftValue} onChange={handleCalendarChange} adapter={adapter} color={color} views={views} {...(minDate === undefined ? {} : { minDate })} {...(maxDate === undefined ? {} : { maxDate })} />
        </div>,
        document.body,
      )}
    </div>
  )
}
