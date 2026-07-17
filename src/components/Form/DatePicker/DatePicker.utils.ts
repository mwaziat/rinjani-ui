import type { DateAdapter, DatePickerView } from './DatePicker.types'

/**
 * Positioning information for the DatePicker popover.
 */
export interface DatePickerPopoverPosition {
  top?: number
  bottom?: number
  left: number
  maxWidth: number
}

/**
 * The default sequence of views shown in the DatePicker.
 */
export const DEFAULT_DATE_PICKER_VIEWS: readonly DatePickerView[] = ['year', 'month', 'day']

/**
 * The standard width of the DatePicker popover calendar.
 */
export const DATE_PICKER_POPOVER_WIDTH = 300

/**
 * The gap between the input trigger and the popover viewport.
 */
export const DATE_PICKER_VIEWPORT_GAP = 8

/**
 * Determines the initial view to show based on the provided views array.
 * Usually defaults to the most granular view provided (e.g., 'day').
 */
export const getInitialDatePickerView = (views: readonly DatePickerView[]): DatePickerView => views.at(-1) ?? 'day'

/**
 * Generates an appropriate date format string based on the active views,
 * unless a specific format was provided by the user.
 */
export const getDatePickerFormat = (views: readonly DatePickerView[], providedFormat: string | undefined): string => {
  if (providedFormat !== undefined) {
    return providedFormat
  }

  if (!views.includes('day') && views.includes('month')) {
    return 'MMM YYYY'
  }

  if (views.length === 1 && views.includes('year')) {
    return 'YYYY'
  }

  return 'DD MMM YYYY'
}

/**
 * Calculates whether the popover should open upwards or downwards
 * based on available screen space, and returns the computed CSS coordinates.
 */
export const getDatePickerPopoverPosition = (triggerRect: DOMRect, popoverWidth: number = DATE_PICKER_POPOVER_WIDTH): DatePickerPopoverPosition => {
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth
  const popoverHeight = 340
  const spaceBelow = viewportHeight - triggerRect.bottom - DATE_PICKER_VIEWPORT_GAP
  const spaceAbove = triggerRect.top - DATE_PICKER_VIEWPORT_GAP
  const shouldOpenUpward = spaceBelow < popoverHeight && spaceAbove > spaceBelow
  const left = Math.max(
    DATE_PICKER_VIEWPORT_GAP,
    Math.min(triggerRect.left, viewportWidth - popoverWidth - DATE_PICKER_VIEWPORT_GAP),
  )

  return shouldOpenUpward
    ? { bottom: viewportHeight - triggerRect.top + DATE_PICKER_VIEWPORT_GAP, left, maxWidth: popoverWidth }
    : { top: triggerRect.bottom + DATE_PICKER_VIEWPORT_GAP, left, maxWidth: popoverWidth }
}

/**
 * Checks if a given date is strictly before the minimum date or strictly after the maximum date.
 */
export const isDateDisabled = <T,>(adapter: DateAdapter<T>, value: T, minDate: T | undefined, maxDate: T | undefined): boolean => {
  if (minDate !== undefined && adapter.isBefore(value, minDate) && !adapter.isSameDay(value, minDate)) {
    return true
  }

  if (maxDate !== undefined && adapter.isAfter(value, maxDate) && !adapter.isSameDay(value, maxDate)) {
    return true
  }

  return false
}

/**
 * Returns an array representing all days in the given month,
 * padded with leading nulls to align the first day with the correct weekday column.
 */
export const getCalendarDays = <T,>(adapter: DateAdapter<T>, month: T): Array<T | null> => {
  const firstDay = adapter.startOfMonth(month)
  const leadingDays = Array.from({ length: adapter.getDay(firstDay) }, () => null)
  const days = Array.from({ length: adapter.getDaysInMonth(month) }, (_, index) => adapter.addDays(firstDay, index))

  return [...leadingDays, ...days]
}

/**
 * Checks if a specific date falls strictly between a start date and an end date.
 */
export const isDateInRange = <T,>(adapter: DateAdapter<T>, value: T, startDate: T | null, endDate: T | null): boolean => {
  if (startDate === null || endDate === null) {
    return false
  }

  return adapter.isAfter(value, startDate) && adapter.isBefore(value, endDate)
}

/**
 * Parses and returns a valid date using the adapter.
 * If the provided value is null or invalid, falls back to the current date.
 */
export const getAdapterDate = <T,>(adapter: DateAdapter<T>, value: T | null | undefined): T | null => {
  if (value !== null && value !== undefined) {
    const parsedValue = adapter.date(value)
    if (parsedValue !== null && adapter.isValid(parsedValue)) {
      return parsedValue
    }
  }

  const currentDate = adapter.date()
  return currentDate !== null && adapter.isValid(currentDate) ? currentDate : null
}
