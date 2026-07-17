import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker, DateRangeCalendar, DateRangePicker } from './index'
import type { DatePickerProps } from './DatePicker.types'
import type { FormColor, FormSize, FormVariant } from '../types'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Form/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] },
    variant: { control: 'select', options: ['filled', 'outlined', 'line'] },
    size: { control: 'select', options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] },
    floating: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
  args: { label: 'Date', color: 'primary', variant: 'outlined', size: 'md' },
}

export default meta
type Story = StoryObj<typeof DatePicker>

const colors: FormColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const variants: FormVariant[] = ['outlined', 'filled', 'line']
const sizes: FormSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

const DatePickerDemo: React.FC<DatePickerProps<Date>> = (props): React.ReactNode => {
  const [value, setValue] = useState<Date | null>(props.value ?? null)

  return <DatePicker {...props} value={value} onChange={setValue} />
}

const DateRangePickerDemo: React.FC = (): React.ReactNode => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])

  return <DateRangePicker label="Travel dates" value={value} onChange={setValue} isClearable />
}

const DateRangeCalendarDemo: React.FC = (): React.ReactNode => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])

  return <DateRangeCalendar value={value} onChange={setValue} color="primary" contained />
}

export const Showcase: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-8">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Date Picker Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead><tr><th className="border-b border-neutral-200 bg-neutral-50/50 p-4 font-medium text-neutral-500">Color</th>{variants.map((variant) => <th key={variant} className="border-b border-neutral-200 bg-neutral-50/50 p-4 font-medium capitalize text-neutral-500">{variant}</th>)}</tr></thead>
            <tbody>{colors.map((color) => <tr key={color} className="border-b border-neutral-100 last:border-0"><td className="p-4 font-medium capitalize text-neutral-700">{color}</td>{variants.map((variant) => <td key={variant} className="p-4"><DatePickerDemo label={`${color} ${variant}`} color={color} variant={variant} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Sizes and States</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-5">{sizes.map((size) => <DatePickerDemo key={size} label={`Size ${size.toUpperCase()}`} size={size} isClearable />)}</div>
          <div className="flex flex-col gap-5">
            <DatePickerDemo label="Floating label" floating placeholder="Select date" />
            <DatePickerDemo label="Disabled" disabled value={new Date(2026, 6, 16)} />
            <DatePickerDemo label="Read only" readOnly value={new Date(2026, 6, 16)} />
            <DatePickerDemo label="Error state" error="A valid date is required" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-neutral-800">Picker Modes and Boundaries</h2>
        <p className="mb-6 text-sm text-neutral-500">Open each picker to verify year, month, and day selection with the configured limits.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DatePickerDemo label="Month picker" views={['year', 'month']} placeholder="Select month" />
          <DatePickerDemo label="Year picker" views={['year']} placeholder="Select year" />
          <DatePickerDemo label="Limited dates" minDate={new Date(2026, 6, 10)} maxDate={new Date(2026, 6, 20)} placeholder="10–20 Jul 2026" />
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-neutral-800">Date Range Selection</h2>
        <p className="mb-6 text-sm text-neutral-500">Choose a start date, hover to preview the range, then choose an end date. Desktop shows two months; mobile shows one.</p>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <DateRangePickerDemo />
          <DateRangeCalendarDemo />
        </div>
      </div>
    </div>
  ),
}

export const Playground: Story = {
  render: () => <DatePickerDemo label="Playground date" color="primary" variant="outlined" size="md" isClearable />,
}
