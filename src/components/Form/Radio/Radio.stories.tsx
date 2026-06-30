import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'
import type { RadioProps } from './Radio.types'
import type { FormColor, FormSize } from '../types'

const meta: Meta<typeof Radio> = {
  title: 'Components/Form/Radio',
  component: Radio,
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
type Story = StoryObj<typeof Radio>

const mockOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
]

const StatefulRadio = (props: Omit<RadioProps, 'onChange'> & { onChange?: (value: string | number) => void }) => {
  const [value, setValue] = useState<string | number>(props.value || 'opt1')

  return (
    <Radio
      {...props}
      value={value}
      onChange={setValue}
    />
  )
}

export const Default: Story = {
  render: (args) => <StatefulRadio {...args} />,
  args: {
    label: 'Select Option',
    options: mockOptions,
    value: 'opt1',
    color: 'primary',
    size: 'md',
    orientation: 'col',
  },
}

const colors: FormColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const sizes: FormSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

const ShowcaseWrapper = () => {
  const [radioValue, setRadioValue] = useState<string | number>('opt1')

  return (
    <div className="flex w-full flex-col gap-8 bg-neutral-50 p-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Radio Matrix (Color)</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {colors.map((color) => (
            <Radio
              key={color}
              label={`${color} radio`}
              color={color}
              options={mockOptions.slice(0, 3)}
              value={radioValue}
              onChange={setRadioValue}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Radio Size Comparison</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sizes.map((size) => (
            <Radio
              key={size}
              size={size}
              label={`Size ${size.toUpperCase()}`}
              color="primary"
              options={mockOptions.slice(0, 3)}
              value={radioValue}
              onChange={setRadioValue}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">States</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <Radio
            label="Disabled"
            options={mockOptions.slice(0, 3)}
            value={'opt1'}
            onChange={() => {}}
            disabled
          />
          <Radio
            label="Read Only"
            options={mockOptions.slice(0, 3)}
            value={'opt2'}
            onChange={() => {}}
            readOnly
          />
          <Radio
            label="With Error"
            options={mockOptions.slice(0, 3)}
            value={''}
            onChange={() => {}}
            error="Please select an option"
          />
        </div>
      </div>
    </div>
  )
}

export const Showcase: Story = {
  render: () => <ShowcaseWrapper />,
}
