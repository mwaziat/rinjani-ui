import type { DateAdapter, MomentDateLike, MomentLibrary } from './DatePicker.types'

export class MomentAdapter<T extends MomentDateLike<T>> implements DateAdapter<T> {
  public constructor(private readonly moment: MomentLibrary<T>) {}

  date(value?: unknown): T | null { return value === null || value === undefined ? this.moment() : this.moment.isMoment(value) ? value.clone() : null }
  isValid(value: unknown): value is T { return this.moment.isMoment(value) && value.isValid() }
  format(value: T, formatString: string): string { return this.isValid(value) ? value.format(formatString) : '' }
  addDays(value: T, amount: number): T { return value.clone().add(amount, 'days') }
  addMonths(value: T, amount: number): T { return value.clone().add(amount, 'months') }
  addYears(value: T, amount: number): T { return value.clone().add(amount, 'years') }
  setMonth(value: T, month: number): T { return value.clone().month(month) }
  setYear(value: T, year: number): T { return value.clone().year(year) }
  startOfMonth(value: T): T { return value.clone().startOf('month') }
  endOfMonth(value: T): T { return value.clone().endOf('month') }
  isSameDay(first: T, second: T): boolean { return first.isSame(second, 'day') }
  isSameMonth(first: T, second: T): boolean { return first.isSame(second, 'month') }
  getYear(value: T): number { return value.year() }
  getMonth(value: T): number { return value.month() }
  getDate(value: T): number { return value.date() }
  getDay(value: T): number { return value.day() }
  getDaysInMonth(value: T): number { return value.daysInMonth() }
  getWeekdaysShort(): string[] { const start = this.moment().startOf('week'); return Array.from({ length: 7 }, (_, index) => this.addDays(start, index).format('ddd')) }
  getMonthsShort(): string[] { const current = this.moment(); return Array.from({ length: 12 }, (_, index) => this.setMonth(current, index).format('MMM')) }
  isBefore(first: T, second: T): boolean { return first.isBefore(second) }
  isAfter(first: T, second: T): boolean { return first.isAfter(second) }
}

export const registerMomentAdapter = <T extends MomentDateLike<T>>(moment: MomentLibrary<T>): DateAdapter<T> => new MomentAdapter(moment)
