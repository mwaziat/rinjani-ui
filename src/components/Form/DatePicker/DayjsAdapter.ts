import type { DateAdapter, DayjsDateLike, DayjsLibrary } from './DatePicker.types'

export class DayjsAdapter<T extends DayjsDateLike<T>> implements DateAdapter<T> {
  public constructor(private readonly dayjs: DayjsLibrary<T>) {}

  date(value?: unknown): T | null { return value === null || value === undefined ? this.dayjs() : this.dayjs.isDayjs(value) ? value : null }
  isValid(value: unknown): value is T { return this.dayjs.isDayjs(value) && value.isValid() }
  format(value: T, formatString: string): string { return this.isValid(value) ? value.format(formatString) : '' }
  addDays(value: T, amount: number): T { return value.add(amount, 'day') }
  addMonths(value: T, amount: number): T { return value.add(amount, 'month') }
  addYears(value: T, amount: number): T { return value.add(amount, 'year') }
  setMonth(value: T, month: number): T { return value.month(month) }
  setYear(value: T, year: number): T { return value.year(year) }
  startOfMonth(value: T): T { return value.startOf('month') }
  endOfMonth(value: T): T { return value.endOf('month') }
  isSameDay(first: T, second: T): boolean { return first.isSame(second, 'day') }
  isSameMonth(first: T, second: T): boolean { return first.isSame(second, 'month') }
  getYear(value: T): number { return value.year() }
  getMonth(value: T): number { return value.month() }
  getDate(value: T): number { return value.date() }
  getDay(value: T): number { return value.day() }
  getDaysInMonth(value: T): number { return value.daysInMonth() }
  getWeekdaysShort(): string[] { const start = this.dayjs().startOf('week'); return Array.from({ length: 7 }, (_, index) => this.addDays(start, index).format('ddd')) }
  getMonthsShort(): string[] { const current = this.dayjs(); return Array.from({ length: 12 }, (_, index) => this.setMonth(current, index).format('MMM')) }
  isBefore(first: T, second: T): boolean { return first.isBefore(second) }
  isAfter(first: T, second: T): boolean { return first.isAfter(second) }
}

export const registerDayjsAdapter = <T extends DayjsDateLike<T>>(dayjs: DayjsLibrary<T>): DateAdapter<T> => new DayjsAdapter(dayjs)
