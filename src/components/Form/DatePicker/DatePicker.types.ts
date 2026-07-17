import type React from 'react'
import type { BaseFormProps, FormColor } from '../types'

/**
 * The available views in the DatePicker popup.
 * Controls which selection level is currently active.
 */
export type DatePickerView = 'year' | 'month' | 'day'

/**
 * Interface that all date adapters must implement.
 * This allows the DatePicker components to work seamlessly with different date libraries
 * like native Date, Moment.js, Day.js, date-fns, etc.
 */
export interface DateAdapter<T> {
  date(value?: unknown): T | null
  isValid(value: unknown): value is T
  format(value: T, formatString: string): string
  addDays(value: T, amount: number): T
  addMonths(value: T, amount: number): T
  addYears(value: T, amount: number): T
  setMonth(value: T, month: number): T
  setYear(value: T, year: number): T
  startOfMonth(value: T): T
  endOfMonth(value: T): T
  isSameDay(first: T, second: T): boolean
  isSameMonth(first: T, second: T): boolean
  getYear(value: T): number
  getMonth(value: T): number
  getDate(value: T): number
  getDay(value: T): number
  getDaysInMonth(value: T): number
  getWeekdaysShort(): string[]
  getMonthsShort(): string[]
  isBefore(first: T, second: T): boolean
  isAfter(first: T, second: T): boolean
}

/**
 * Properties for the standard single DatePicker component.
 */
export interface DatePickerProps<T = Date> extends BaseFormProps {
  /** The currently selected date. */
  value?: T | null
  /** Callback fired when the date changes. */
  onChange?: (value: T | null) => void
  /** The date adapter instance to use (defaults to NativeDateAdapter). */
  adapter?: DateAdapter<T>
  /** The views available for selection, and their order. @default ['year', 'month', 'day'] */
  views?: readonly DatePickerView[]
  /** The format string used to display the selected date in the input field. */
  format?: string
  /** If true, the label floats inside the input. If false, it sits above. @default false */
  floating?: boolean
  /** Icon to render on the left side of the input. */
  leftIcon?: React.ReactNode
  /** Icon to render on the right side of the input. Defaults to a calendar icon. */
  rightIcon?: React.ReactNode
  /** If true, allows clearing the selected date via an 'X' icon. @default false */
  isClearable?: boolean
  /** If true, disables the input completely. @default false */
  disabled?: boolean
  /** If true, makes the input read-only (but still focusable). @default false */
  readOnly?: boolean
  /** The earliest selectable date. Dates before this will be disabled. */
  minDate?: T
  /** The latest selectable date. Dates after this will be disabled. */
  maxDate?: T
  /** Custom ID for the input element. */
  id?: string
  /** Placeholder text when no date is selected. */
  placeholder?: string
}

/**
 * Properties for the DateRangePicker component.
 */
export interface DateRangePickerProps<T = Date> extends BaseFormProps {
  /** The currently selected date range tuple: [startDate, endDate]. */
  value?: [T | null, T | null]
  /** Callback fired when either date in the range changes. */
  onChange?: (value: [T | null, T | null]) => void
  /** The date adapter instance to use (defaults to NativeDateAdapter). */
  adapter?: DateAdapter<T>
  /** The views available for selection. @default ['year', 'month', 'day'] */
  views?: readonly DatePickerView[]
  /** The format string used to display the selected dates in the inputs. */
  format?: string
  /** If true, the labels float inside the inputs. @default false */
  floating?: boolean
  /** Icon to render on the left side of the inputs. */
  leftIcon?: React.ReactNode
  /** Icon to render on the right side of the inputs. */
  rightIcon?: React.ReactNode
  /** If true, allows clearing the selected dates. @default false */
  isClearable?: boolean
  /** If true, disables the inputs completely. @default false */
  disabled?: boolean
  /** If true, makes the inputs read-only. @default false */
  readOnly?: boolean
  /** The earliest selectable date. */
  minDate?: T
  /** The latest selectable date. */
  maxDate?: T
  /** Custom ID for the container element. */
  id?: string
  /** Placeholder text for both inputs when no dates are selected. */
  placeholder?: string
}

/**
 * Properties for the inline DateRangeCalendar component.
 */
export interface DateRangeCalendarProps<T = Date> {
  /** The currently selected date range tuple: [startDate, endDate]. */
  value?: [T | null, T | null]
  /** Callback fired when either date in the range changes. */
  onChange?: (value: [T | null, T | null]) => void
  /** The date adapter instance to use. */
  adapter?: DateAdapter<T>
  /** The views available for selection. */
  views?: readonly DatePickerView[]
  /** The active color theme used for selections and today highlights. */
  color?: FormColor
  /** The earliest selectable date. */
  minDate?: T
  /** The latest selectable date. */
  maxDate?: T
  /** Additional CSS classes for the container. */
  className?: string
  /** If true, renders the calendar inside a contained box with borders. @default false */
  contained?: boolean
}

/**
 * Internal interface representing a Moment-like date object for the adapter.
 */
export interface MomentDateLike<T extends MomentDateLike<T>> {
  clone(): T
  add(amount: number, unit: string): T
  month(): number
  month(value: number): T
  year(): number
  year(value: number): T
  date(): number
  startOf(unit: string): T
  endOf(unit: string): T
  daysInMonth(): number
  day(): number
  day(value: number): T
  isValid(): boolean
  isSame(value: T, unit: string): boolean
  isBefore(value: T): boolean
  isAfter(value: T): boolean
  format(formatString: string): string
}

/**
 * Internal interface representing the Moment library itself.
 */
export interface MomentLibrary<T extends MomentDateLike<T>> {
  (): T
  isMoment(value: unknown): value is T
}

/**
 * Internal interface representing a Dayjs-like date object for the adapter.
 */
export interface DayjsDateLike<T extends DayjsDateLike<T>> {
  add(amount: number, unit: string): T
  month(): number
  month(value: number): T
  year(): number
  year(value: number): T
  date(): number
  startOf(unit: string): T
  endOf(unit: string): T
  daysInMonth(): number
  day(): number
  day(value: number): T
  isValid(): boolean
  isSame(value: T, unit: string): boolean
  isBefore(value: T): boolean
  isAfter(value: T): boolean
  format(formatString: string): string
}

/**
 * Internal interface representing the Dayjs library itself.
 */
export interface DayjsLibrary<T extends DayjsDateLike<T>> {
  (): T
  isDayjs(value: unknown): value is T
}
