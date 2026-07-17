'use client'

import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '../../Icons'
import type { DateAdapter, DateRangeCalendarProps } from './DatePicker.types'
import { NativeDateAdapter } from './NativeDateAdapter'
import { colorMap } from './DatePicker.styles'
import { DEFAULT_DATE_PICKER_VIEWS, getAdapterDate, getCalendarDays, isDateDisabled, isDateInRange } from './DatePicker.utils'

const nativeDateAdapter = new NativeDateAdapter()

/**
 * An inline, dual-calendar component for selecting date ranges.
 * 
 * Unlike `DateRangePicker`, this component renders directly in the document flow without an input or popover.
 * Built to be adapter-agnostic, meaning it can work with native Date, Moment.js, Day.js, etc.
 * 
 * @example
 * ```tsx
 * <DateRangeCalendar
 *   value={range}
 *   onChange={setRange}
 *   color="primary"
 * />
 * ```
 */
export function DateRangeCalendar<T = Date>({
  value = [null, null],
  onChange,
  adapter = nativeDateAdapter as unknown as DateAdapter<T>,
  color = 'primary',
  minDate,
  maxDate,
  className = '',
  contained = false,
  views = DEFAULT_DATE_PICKER_VIEWS,
}: DateRangeCalendarProps<T>): React.ReactNode {
  const [viewDate, setViewDate] = useState<T | null>(() => getAdapterDate(adapter, value[0]))
  const [activeIndex, setActiveIndex] = useState<0 | 1>(value[0] === null || value[1] !== null ? 0 : 1)
  const [hoverDate, setHoverDate] = useState<T | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const activeColor = colorMap[color]
  const startDate = value[0]
  const endDate = value[1]

  useEffect(() => {
    const checkMobile = (): void => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDateSelect = (nextDate: T): void => {
    setHoverDate(null)
    if (startDate === null || activeIndex === 0) {
      onChange?.([nextDate, null])
      setActiveIndex(1)
      return
    }

    if (adapter.isBefore(nextDate, startDate)) {
      onChange?.([nextDate, null])
      setActiveIndex(1)
      return
    }

    onChange?.([startDate, nextDate])
    setActiveIndex(0)
  }

  const renderMonth = (offset: number): React.ReactNode => {
    if (viewDate === null) {
      return null
    }

    const month = adapter.addMonths(viewDate, offset)
    const days = getCalendarDays(adapter, month)
    const today = getAdapterDate(adapter, null)

    return (
      <>
        <div className="mb-4 flex items-center justify-between px-2">
          {offset === 0 || isMobile ? <button type="button" onClick={() => setViewDate(adapter.addMonths(viewDate, -1))} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Previous month"><ChevronLeftIcon size={18} /></button> : <span className="w-7" />}
          <span className="text-sm font-semibold text-neutral-800">{adapter.format(month, 'MMM YYYY')}</span>
          {offset === 1 || isMobile ? <button type="button" onClick={() => setViewDate(adapter.addMonths(viewDate, 1))} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Next month"><ChevronRightIcon size={18} /></button> : <span className="w-7" />}
        </div>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center">
          {adapter.getWeekdaysShort().map((weekday) => <div key={weekday} className="text-[10px] font-semibold uppercase text-neutral-400">{weekday}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {days.map((day, index) => {
            if (day === null) {
              return <span key={`empty-${index}`} />
            }

            const isStart = startDate !== null && adapter.isSameDay(startDate, day)
            const isEnd = endDate !== null && adapter.isSameDay(endDate, day)
            const isPreviewRange = endDate === null && startDate !== null && hoverDate !== null && activeIndex === 1 && ((adapter.isAfter(hoverDate, startDate) && adapter.isAfter(day, startDate) && adapter.isBefore(day, hoverDate)) || (adapter.isBefore(hoverDate, startDate) && adapter.isAfter(day, hoverDate) && adapter.isBefore(day, startDate)))
            const isInRange = isDateInRange(adapter, day, startDate, endDate) || isPreviewRange
            const isToday = today !== null && adapter.isSameDay(today, day)
            const isDisabled = isDateDisabled(adapter, day, minDate, maxDate)
            const rounded = isStart && isEnd ? 'rounded-full' : isStart ? 'rounded-l-full' : isEnd ? 'rounded-r-full' : isInRange ? 'rounded-none' : 'rounded-full'
            const background = isDisabled
              ? 'cursor-not-allowed opacity-30 text-neutral-700'
              : isStart || isEnd
                ? activeColor.itemSelected
                : isInRange
                  ? activeColor.range
                  : `hover:bg-neutral-100 ${isToday ? `font-bold ${activeColor.today}` : 'text-neutral-700'}`
            return <div key={adapter.format(day, 'YYYY-MM-DD')} className={`${isInRange ? activeColor.range : ''} flex h-8 items-center`}><button type="button" disabled={isDisabled} onMouseEnter={() => !isDisabled && setHoverDate(day)} onClick={() => handleDateSelect(day)} className={`flex h-8 w-full items-center justify-center text-sm transition-all ${rounded} ${background}`}>{adapter.getDate(day)}</button></div>
          })}
        </div>
      </>
    )
  }

  const renderMonthCalendar = (offset: number): React.ReactNode => {
    if (viewDate === null) {
      return null
    }

    const calendarViewDate = adapter.addYears(viewDate, offset)
    const yearStartDate = getAdapterDate(adapter, null) ?? adapter.date()!
    const yearStart = adapter.setMonth(yearStartDate, 0)
    const today = getAdapterDate(adapter, null)

    const months = Array.from({ length: 12 }).map((_, i) => {
      const monthValue = adapter.setMonth(adapter.setYear(yearStart, adapter.getYear(calendarViewDate)), i)
      
      const isStart = startDate !== null && adapter.isSameMonth(startDate, monthValue) && adapter.getYear(startDate) === adapter.getYear(monthValue)
      const isEnd = endDate !== null && adapter.isSameMonth(endDate, monthValue) && adapter.getYear(endDate) === adapter.getYear(monthValue)
      const isToday = today !== null && adapter.isSameMonth(today, monthValue) && adapter.getYear(today) === adapter.getYear(monthValue)
      
      const monthStart = adapter.startOfMonth(monthValue)
      const monthEnd = adapter.endOfMonth(monthValue)
      const isMonthDisabled = (minDate !== undefined && adapter.isBefore(monthEnd, minDate)) || (maxDate !== undefined && adapter.isAfter(monthStart, maxDate))

      let isInRange = false
      if (startDate !== null && endDate !== null) {
        isInRange = (adapter.isAfter(monthValue, startDate) || (adapter.isSameMonth(monthValue, startDate) && adapter.getYear(monthValue) === adapter.getYear(startDate))) && 
                  (adapter.isBefore(monthValue, endDate) || (adapter.isSameMonth(monthValue, endDate) && adapter.getYear(monthValue) === adapter.getYear(endDate))) && !isStart && !isEnd
      } else if (startDate !== null && hoverDate !== null && activeIndex === 1) {
        const hoverMonth = hoverDate
        if (adapter.isAfter(hoverMonth, startDate) || (adapter.isSameMonth(hoverMonth, startDate) && adapter.getYear(hoverMonth) === adapter.getYear(startDate))) {
          isInRange = (adapter.isAfter(monthValue, startDate) || (adapter.isSameMonth(monthValue, startDate) && adapter.getYear(monthValue) === adapter.getYear(startDate))) && 
                      adapter.isBefore(monthValue, hoverMonth) && !isStart && !(adapter.isSameMonth(monthValue, hoverMonth) && adapter.getYear(monthValue) === adapter.getYear(hoverMonth))
        } else {
          isInRange = (adapter.isAfter(monthValue, hoverMonth) || (adapter.isSameMonth(monthValue, hoverMonth) && adapter.getYear(monthValue) === adapter.getYear(hoverMonth))) && 
                      adapter.isBefore(monthValue, startDate) && !isStart && !(adapter.isSameMonth(monthValue, hoverMonth) && adapter.getYear(monthValue) === adapter.getYear(hoverMonth))
        }
      }

      const rounded = isStart && isEnd ? 'rounded-full' : isStart ? 'rounded-l-full' : isEnd ? 'rounded-r-full' : isInRange ? 'rounded-none' : 'rounded-full'
      const background = isMonthDisabled
        ? 'cursor-not-allowed opacity-30 text-neutral-700'
        : isStart || isEnd
          ? activeColor.itemSelected
          : isInRange
            ? activeColor.range
            : `hover:bg-neutral-100 ${isToday ? `font-bold ${activeColor.today}` : 'text-neutral-700'}`

      return (
        <div key={`month-${i}`} className={`flex h-12 flex-1 w-full ${isInRange ? activeColor.range : ''}`}>
          <button
            type="button"
            disabled={isMonthDisabled}
            onMouseEnter={() => !isMonthDisabled && setHoverDate(monthValue)}
            className={`flex h-12 w-full items-center justify-center text-sm font-medium transition-all ${rounded} ${background}`}
            onClick={() => handleDateSelect(monthValue)}
          >
            {adapter.format(monthValue, 'MMM')}
          </button>
        </div>
      )
    })

    return (
      <>
        <div className="mb-4 flex items-center justify-between px-2">
          {offset === 0 || isMobile ? <button type="button" onClick={(e) => { e.stopPropagation(); setViewDate(adapter.addYears(viewDate, -1)) }} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Previous year"><ChevronLeftIcon size={18} /></button> : <span className="w-7" />}
          <span className="text-sm font-semibold text-neutral-800">{adapter.format(calendarViewDate, 'YYYY')}</span>
          {offset === 1 || isMobile ? <button type="button" onClick={(e) => { e.stopPropagation(); setViewDate(adapter.addYears(viewDate, 1)) }} className="rounded-full p-1 transition-colors hover:bg-neutral-100" aria-label="Next year"><ChevronRightIcon size={18} /></button> : <span className="w-7" />}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-x-0 gap-y-2">
          {months}
        </div>
      </>
    )
  }

  const isMonthViewOnly = !views.includes('day') && views.includes('month')

  return (
    <div onMouseLeave={() => setHoverDate(null)} className={`flex flex-wrap overflow-hidden bg-white w-fit ${contained ? 'rounded-xl border border-neutral-200 shadow-sm' : ''} ${className}`}>
      <div className="flex-1 min-w-[280px] p-3">
        {isMonthViewOnly ? renderMonthCalendar(0) : renderMonth(0)}
      </div>
      {!isMobile && (
        <div className="hidden flex-1 min-w-[280px] border-l border-neutral-200 p-3 md:block">
          {isMonthViewOnly ? renderMonthCalendar(1) : renderMonth(1)}
        </div>
      )}
    </div>
  )
}
