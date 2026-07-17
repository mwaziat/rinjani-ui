'use client'

import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertCircleIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from '../../Icons'
import { useIsHydrated } from '../../../hooks/useIsHydrated'
import type { DateAdapter, DatePickerProps, DatePickerView } from './DatePicker.types'
import { NativeDateAdapter } from './NativeDateAdapter'
import { colorMap, lineActive, textSizeMap, labelSizeMap, floatingActiveSizeMap, sizeMap, radiusMap, datePickerPopoverClasses, datePickerPopoverStyle, iconSizeMap, clearIconSizeMap } from './DatePicker.styles'
import { DEFAULT_DATE_PICKER_VIEWS, getAdapterDate, getCalendarDays, getDatePickerFormat, getDatePickerPopoverPosition, getInitialDatePickerView, isDateDisabled } from './DatePicker.utils'

const nativeDateAdapter = new NativeDateAdapter()

/**
 * A highly customizable date picker input component.
 * 
 * Supports selecting a specific date via a popup calendar interface.
 * Built to be adapter-agnostic, meaning it can work with native Date, Moment.js, Day.js, etc.,
 * by passing the appropriate DateAdapter instance.
 * 
 * @example
 * ```tsx
 * <DatePicker
 *   label="Date of Birth"
 *   value={dob}
 *   onChange={setDob}
 *   format="DD/MM/YYYY"
 *   color="primary"
 * />
 * ```
 */
export function DatePicker<T = Date>({
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
  placeholder = 'Select date',
  variant = 'outlined',
  size = 'md',
  color = 'primary',
  isClearable = false,
}: DatePickerProps<T>): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState<T | null>(null)
  const [viewDate, setViewDate] = useState<T | null>(() => getAdapterDate(adapter, value))
  const [currentView, setCurrentView] = useState<DatePickerView>(() => getInitialDatePickerView(views))
  const [popoverPosition, setPopoverPosition] = useState<ReturnType<typeof getDatePickerPopoverPosition> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const generatedId = useId().replace(/:/g, '')
  const inputId = id ?? `date-picker-${generatedId}`
  const isControlled = value !== undefined
  const currentValue = isControlled ? value ?? null : uncontrolledValue
  const activeColor = colorMap[color]
  const canMutate = !disabled && !readOnly
  const hasValue = currentValue !== null
  const isFloating = floating && (isFocused || hasValue || isOpen)
  const selectedFormat = getDatePickerFormat(views, format)

  const updatePopoverPosition = (): void => {
    if (triggerRef.current !== null) {
      setPopoverPosition(getDatePickerPopoverPosition(triggerRef.current.getBoundingClientRect()))
    }
  }

  const openPicker = (): void => {
    if (!canMutate) {
      return
    }

    const nextViewDate = getAdapterDate(adapter, currentValue)
    if (nextViewDate !== null) {
      setViewDate(nextViewDate)
    }
    setCurrentView(getInitialDatePickerView(views))
    updatePopoverPosition()
    setIsFocused(true)
    setIsOpen(true)
  }

  const closePicker = useCallback((): void => {
    setIsOpen(false)
    setIsFocused(false)
    setPopoverPosition(null)
  }, [])

  const emitChange = (nextValue: T | null): void => {
    if (!isControlled) {
      setUncontrolledValue(nextValue)
    }
    onChange?.(nextValue)
  }

  const selectDate = (nextValue: T): void => {
    emitChange(nextValue)
    closePicker()
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

  const renderDays = (): React.ReactNode => {
    if (viewDate === null) {
      return null
    }

    const days = getCalendarDays(adapter, viewDate)
    const today = getAdapterDate(adapter, null)

    return (
      <div className="p-3 min-w-[280px]">
        <div className="mb-4 flex items-center justify-between px-2">
          <button type="button" onClick={() => setViewDate(adapter.addMonths(viewDate, -1))} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Previous month"><ChevronLeftIcon size={18} /></button>
          <button type="button" className={`flex gap-1 text-sm font-semibold text-neutral-800 transition-colors hover:${activeColor.label}`} onClick={() => setCurrentView(views.includes('month') ? 'month' : 'year')}>
            {adapter.format(viewDate, 'MMM YYYY')}
          </button>
          <button type="button" onClick={() => setViewDate(adapter.addMonths(viewDate, 1))} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Next month"><ChevronRightIcon size={18} /></button>
        </div>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center">
          {adapter.getWeekdaysShort().map((weekday) => <div key={weekday} className="text-[10px] font-semibold uppercase text-neutral-400">{weekday}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <span key={`empty-${index}`} />
            }

            const isSelected = currentValue !== null && adapter.isSameDay(currentValue, day)
            const isToday = today !== null && adapter.isSameDay(today, day)
            const isDisabled = isDateDisabled(adapter, day, minDate, maxDate)
            const stateClass = isDisabled
              ? 'cursor-not-allowed opacity-30 text-neutral-700'
              : isSelected
                ? activeColor.itemSelected
                : `hover:bg-neutral-100 ${isToday ? `font-bold ${activeColor.today}` : 'text-neutral-700'}`

            return <button key={adapter.format(day, 'YYYY-MM-DD')} type="button" disabled={isDisabled} onClick={() => selectDate(day)} className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all ${stateClass}`}>{adapter.getDate(day)}</button>
          })}
        </div>
      </div>
    )
  }

  const renderMonths = (): React.ReactNode => {
    if (viewDate === null) {
      return null
    }

    return (
      <div className="p-3 min-w-[280px]">
        <div className="mb-4 flex items-center justify-between px-2">
          <button type="button" onClick={() => setViewDate(adapter.addYears(viewDate, -1))} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Previous year"><ChevronLeftIcon size={18} /></button>
          <button type="button" className={`text-sm font-semibold text-neutral-800 transition-colors ${views.includes('year') ? `hover:${activeColor.label}` : ''}`} onClick={() => views.includes('year') && setCurrentView('year')}>{adapter.getYear(viewDate)}</button>
          <button type="button" onClick={() => setViewDate(adapter.addYears(viewDate, 1))} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Next year"><ChevronRightIcon size={18} /></button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {adapter.getMonthsShort().map((month, monthIndex) => {
            const monthValue = adapter.setMonth(adapter.startOfMonth(viewDate), monthIndex)
            const isSelected = currentValue !== null && adapter.isSameMonth(currentValue, monthValue) && adapter.getYear(currentValue) === adapter.getYear(viewDate)
            const isDisabled = isDateDisabled(adapter, adapter.endOfMonth(monthValue), minDate, maxDate)
            return <button key={month} type="button" disabled={isDisabled} onClick={() => { setViewDate(monthValue); if (views.includes('day')) { setCurrentView('day') } else { selectDate(monthValue) } }} className={`rounded-lg py-2 text-sm font-medium transition-colors ${isDisabled ? 'cursor-not-allowed opacity-30 text-neutral-700' : isSelected ? activeColor.itemSelected : 'text-neutral-700 hover:bg-neutral-100'}`}>{month}</button>
          })}
        </div>
      </div>
    )
  }

  const renderYears = (): React.ReactNode => {
    if (viewDate === null) {
      return null
    }

    const currentYear = adapter.getYear(viewDate)
    const decadeStart = Math.floor(currentYear / 10) * 10
    const years = Array.from({ length: 12 }, (_, index) => decadeStart + index - 1)

    return (
      <div className="p-3 min-w-[280px]">
        <div className="mb-4 flex items-center justify-between px-2">
          <button type="button" onClick={() => setViewDate(adapter.addYears(viewDate, -10))} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Previous decade"><ChevronLeftIcon size={18} /></button>
          <span className="text-sm font-semibold text-neutral-800">{decadeStart} – {decadeStart + 9}</span>
          <button type="button" onClick={() => setViewDate(adapter.addYears(viewDate, 10))} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Next decade"><ChevronRightIcon size={18} /></button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => {
            const yearValue = adapter.setYear(viewDate, year)
            const yearStart = adapter.setMonth(adapter.startOfMonth(yearValue), 0)
            const yearEnd = adapter.endOfMonth(adapter.setMonth(yearValue, 11))
            const isSelected = currentValue !== null && adapter.getYear(currentValue) === year
            const isDisabled = (minDate !== undefined && adapter.isBefore(yearEnd, minDate)) || (maxDate !== undefined && adapter.isAfter(yearStart, maxDate))
            return <button key={year} type="button" disabled={isDisabled} onClick={() => { setViewDate(yearValue); if (views.includes('month')) { setCurrentView('month') } else if (views.includes('day')) { setCurrentView('day') } else { selectDate(yearValue) } }} className={`rounded-lg py-2 text-sm font-medium transition-colors ${isDisabled ? 'cursor-not-allowed opacity-30 text-neutral-700' : isSelected ? activeColor.itemSelected : 'text-neutral-700 hover:bg-neutral-100'} ${year < decadeStart || year > decadeStart + 9 ? 'opacity-40' : ''}`}>{year}</button>
          })}
        </div>
      </div>
    )
  }

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
  const renderedValue = currentValue !== null && adapter.isValid(currentValue) ? adapter.format(currentValue, selectedFormat) : placeholder
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
            {isClearable && currentValue !== null && !disabled && !readOnly && (
              <XIcon
                size={clearIconSizeMap[size]}
                className="transition-colors hover:text-danger-500"
                onClick={(e) => {
                  e.stopPropagation()
                  emitChange(null)
                }}
              />
            )}
            <CalendarIcon size={iconSizeMap[size]} aria-hidden="true" />
          </div>
        </div>
      </div>
      {error !== undefined && <div className="mt-1.5 flex items-center gap-1.5 pl-1 text-[10px] font-semibold uppercase tracking-wider text-danger-500" role="alert"><AlertCircleIcon size={12} aria-hidden="true" />{error}</div>}
      {isHydrated && isOpen && popoverPosition !== null && createPortal(
        <div ref={popoverRef} role="dialog" aria-modal="false" className={datePickerPopoverClasses} style={{ position: 'fixed', ...datePickerPopoverStyle, ...popoverPosition }}>
          {currentView === 'day' && renderDays()}
          {currentView === 'month' && renderMonths()}
          {currentView === 'year' && renderYears()}
        </div>,
        document.body,
      )}
    </div>
  )
}
