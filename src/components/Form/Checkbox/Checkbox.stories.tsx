import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import type { CheckboxProps } from './Checkbox.types'
import type { FormColor, FormSize } from '../types'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    orientation: {
      control: 'radio',
      options: ['col', 'row'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

const mockOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
]

const StatefulCheckbox = (props: Omit<CheckboxProps, 'onChange'> & { onChange?: (values: (string | number)[]) => void }) => {
  const [values, setValues] = useState<(string | number)[]>(props.values || [])

  return (
    <Checkbox
      {...props}
      values={values}
      onChange={setValues}
    />
  )
}

export const Default: Story = {
  render: (args) => <StatefulCheckbox {...args} />,
  args: {
    label: 'Select Fruits',
    options: mockOptions,
    values: ['apple'],
    color: 'primary',
    size: 'md',
    orientation: 'col',
  },
}

const colors: FormColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const sizes: FormSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

const ShowcaseWrapper = () => {
  const [checkboxValues, setCheckboxValues] = useState<(string | number)[]>(['apple'])

  return (
    <div className="flex w-full flex-col gap-8 bg-neutral-50 p-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Checkbox Matrix (Color)</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {colors.map((color) => (
            <Checkbox
              key={color}
              label={`${color} checkbox`}
              color={color}
              options={mockOptions.slice(0, 3)}
              values={checkboxValues}
              onChange={setCheckboxValues}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Checkbox Size Comparison</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sizes.map((size) => (
            <Checkbox
              key={size}
              size={size}
              label={`Size ${size.toUpperCase()}`}
              color="primary"
              options={mockOptions.slice(0, 3)}
              values={checkboxValues}
              onChange={setCheckboxValues}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">States</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <Checkbox
            label="Disabled"
            options={mockOptions.slice(0, 3)}
            values={['apple']}
            onChange={() => {}}
            disabled
          />
          <Checkbox
            label="Read Only"
            options={mockOptions.slice(0, 3)}
            values={['banana']}
            onChange={() => {}}
            readOnly
          />
          <Checkbox
            label="With Error"
            options={mockOptions.slice(0, 3)}
            values={[]}
            onChange={() => {}}
            error="Please select at least one option"
          />
        </div>
      </div>
    </div>
  )
}

export const Showcase: Story = {
  render: () => <ShowcaseWrapper />,
}

