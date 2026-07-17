import type { DateAdapter } from './DatePicker.types'

export class NativeDateAdapter implements DateAdapter<Date> {
  date(value?: unknown): Date | null {
    if (value === null || value === undefined) {
      return new Date()
    }

    if (value instanceof Date) {
      return new Date(value.getTime())
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const parsedDate = new Date(value)
      return this.isValid(parsedDate) ? parsedDate : null
    }

    return null
  }

  isValid(value: unknown): value is Date {
    return value instanceof Date && !Number.isNaN(value.getTime())
  }

  format(value: Date, formatString: string): string {
    if (!this.isValid(value)) {
      return ''
    }

    const date = value.getDate()
    const month = value.getMonth() + 1
    const year = value.getFullYear()
    const pad = (number: number): string => number.toString().padStart(2, '0')
    const months = this.getMonthsShort()

    return formatString.replace(/YYYY|YY|MMM|MM|M|DD|D/g, (token) => {
      switch (token) {
        case 'YYYY': return year.toString()
        case 'YY': return year.toString().slice(-2)
        case 'MMM': return months[value.getMonth()] ?? ''
        case 'MM': return pad(month)
        case 'M': return month.toString()
        case 'DD': return pad(date)
        case 'D': return date.toString()
        default: return token
      }
    })
  }

  addDays(value: Date, amount: number): Date {
    const nextValue = new Date(value.getTime())
    nextValue.setDate(nextValue.getDate() + amount)
    return nextValue
  }

  addMonths(value: Date, amount: number): Date {
    const nextValue = new Date(value.getTime())
    nextValue.setMonth(nextValue.getMonth() + amount)
    return nextValue
  }

  addYears(value: Date, amount: number): Date {
    const nextValue = new Date(value.getTime())
    nextValue.setFullYear(nextValue.getFullYear() + amount)
    return nextValue
  }

  setMonth(value: Date, month: number): Date {
    const nextValue = new Date(value.getTime())
    nextValue.setMonth(month)
    return nextValue
  }

  setYear(value: Date, year: number): Date {
    const nextValue = new Date(value.getTime())
    nextValue.setFullYear(year)
    return nextValue
  }

  startOfMonth(value: Date): Date {
    return new Date(value.getFullYear(), value.getMonth(), 1)
  }

  endOfMonth(value: Date): Date {
    return new Date(value.getFullYear(), value.getMonth() + 1, 0)
  }

  isSameDay(first: Date, second: Date): boolean {
    return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate()
  }

  isSameMonth(first: Date, second: Date): boolean {
    return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth()
  }

  getYear(value: Date): number { return value.getFullYear() }
  getMonth(value: Date): number { return value.getMonth() }
  getDate(value: Date): number { return value.getDate() }
  getDay(value: Date): number { return value.getDay() }
  getDaysInMonth(value: Date): number { return new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate() }
  getWeekdaysShort(): string[] { return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] }
  getMonthsShort(): string[] { return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }
  isBefore(first: Date, second: Date): boolean { return first.getTime() < second.getTime() }
  isAfter(first: Date, second: Date): boolean { return first.getTime() > second.getTime() }
}
