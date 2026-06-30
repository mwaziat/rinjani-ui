import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { SelectMultiple } from './SelectMultiple'
import type { SelectProps, SelectMultipleProps } from './Select.types'
import type { FormVariant, FormColor, FormSize, SelectOption, SelectValue, SelectMultipleValue } from '../types'
import { UserIcon, MessageSquareIcon } from '../../Icons'

const meta: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'line'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    floating: { control: 'boolean' },
    isClearable: { control: 'boolean' },
  },
  args: {
    label: 'Select Option',
    placeholder: 'Select...',
    color: 'primary',
    variant: 'outlined',
    size: 'md',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ]
  },
}

export default meta
type Story = StoryObj<typeof Select>

const variants: FormVariant[] = ['line', 'outlined', 'filled']
const colors: FormColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const sizes: FormSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

const MOCK_OPTIONS: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana (Disabled)', value: 'banana', disabled: true },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry (Disabled)', value: 'elderberry', disabled: true },
]

const StatefulSelect = (props: Omit<SelectProps, 'value' | 'onChange'> & { initialValue?: SelectValue }) => {
  const [value, setValue] = useState<SelectValue>(props.initialValue ?? '')
  return <Select {...props} value={value} onChange={setValue} />
}

const StatefulSelectMultiple = (props: Omit<SelectMultipleProps, 'value' | 'onChange'> & { initialValue?: SelectMultipleValue }) => {
  const [value, setValue] = useState<SelectMultipleValue>(props.initialValue ?? [])
  return <SelectMultiple {...props} value={value} onChange={setValue} />
}

const ShowcaseDemo = () => {
  return (
      <div className="flex flex-col gap-12 w-full">
        {/* SINGLE SELECT */}
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Select Matrix (Variant x Color)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-neutral-200 text-neutral-500 font-medium">Color</th>
                    {variants.map((variant) => (
                      <th key={variant} className="p-4 border-b border-neutral-200 text-neutral-500 font-medium capitalize">{variant}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {colors.map((color) => (
                    <tr key={color} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                      <td className="p-4 font-medium capitalize text-neutral-700">{color}</td>
                      {variants.map((variant) => (
                        <td key={variant} className="p-4">
                          <StatefulSelect
                            variant={variant}
                            color={color}
                            placeholder={`${variant} ${color}`}
                            options={MOCK_OPTIONS}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Height Comparison (Sizes)</h2>
            <div className="flex flex-col gap-6">
              {sizes.map(size => (
                <div key={size} className="flex items-end">
                  <div className="flex-1">
                    <StatefulSelect size={size} color="primary" variant="outlined" label={`Size ${size.toUpperCase()}`} placeholder={`Select ${size}`} options={MOCK_OPTIONS} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Floating Label</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatefulSelect floating label="Floating Line" variant="line" color="primary" placeholder="Select item" options={MOCK_OPTIONS} />
              <StatefulSelect floating label="Floating Outlined" variant="outlined" color="secondary" placeholder="Select item" options={MOCK_OPTIONS} />
              <StatefulSelect floating label="Floating Filled" variant="filled" color="success" placeholder="Select item" options={MOCK_OPTIONS} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Features & States (Single)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Features</h3>
                <StatefulSelect label="With Left Icon" leftIcon={<UserIcon size={18} />} placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulSelect label="With Right Icon" rightIcon={<MessageSquareIcon size={18} />} placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulSelect label="Clearable" isClearable placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulSelect label="Disabled Option Demo" placeholder="Open dropdown to see" options={MOCK_OPTIONS} />
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">States</h3>
                <StatefulSelect label="Disabled State" disabled placeholder="Select disabled" options={MOCK_OPTIONS} />
                <StatefulSelect label="Read Only" readOnly placeholder="Read only input" options={MOCK_OPTIONS} initialValue="apple" />
                <StatefulSelect label="Error State" error="This field is required and invalid." placeholder="Select item" options={MOCK_OPTIONS} />
              </div>

            </div>
          </div>
        </div>

        {/* MULTIPLE SELECT */}
        <div className="flex flex-col gap-8 w-full mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Select Multiple Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-neutral-200 text-neutral-500 font-medium">Color</th>
                    {variants.map((variant) => (
                      <th key={variant} className="p-4 border-b border-neutral-200 text-neutral-500 font-medium capitalize">{variant}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {colors.map((color) => (
                    <tr key={color} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                      <td className="p-4 font-medium capitalize text-neutral-700">{color}</td>
                      {variants.map((variant) => (
                        <td key={variant} className="p-4">
                          <StatefulSelectMultiple
                            variant={variant}
                            color={color}
                            placeholder={`${variant} ${color}`}
                            options={MOCK_OPTIONS}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Height Comparison (Sizes)</h2>
            <div className="flex flex-col gap-6">
              {sizes.map(size => (
                <div key={size} className="flex items-end">
                  <div className="flex-1">
                    <StatefulSelectMultiple size={size} color="primary" variant="outlined" label={`Size ${size.toUpperCase()}`} placeholder={`Select multiple ${size}`} options={MOCK_OPTIONS} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Floating Label</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatefulSelectMultiple floating label="Floating Line" variant="line" color="primary" placeholder="Select..." options={MOCK_OPTIONS} />
              <StatefulSelectMultiple floating label="Floating Outlined" variant="outlined" color="secondary" placeholder="Select..." options={MOCK_OPTIONS} />
              <StatefulSelectMultiple floating label="Floating Filled" variant="filled" color="success" placeholder="Select..." options={MOCK_OPTIONS} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Features & States (Multiple)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Features</h3>
                <StatefulSelectMultiple label="With Left Icon" leftIcon={<UserIcon size={18} />} placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulSelectMultiple label="With Right Icon" rightIcon={<MessageSquareIcon size={18} />} placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulSelectMultiple label="Clearable" isClearable placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulSelectMultiple label="Disabled Option Demo" placeholder="Open dropdown to see" options={MOCK_OPTIONS} />
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">States</h3>
                <StatefulSelectMultiple label="Disabled State" disabled placeholder="Select disabled" options={MOCK_OPTIONS} />
                <StatefulSelectMultiple label="Read Only" readOnly placeholder="Read only input" options={MOCK_OPTIONS} initialValue={['apple']} />
                <StatefulSelectMultiple label="Error State" error="Invalid selection." placeholder="Select item" options={MOCK_OPTIONS} />
              </div>

            </div>
          </div>
        </div>

      </div>
    )
}

export const Showcase: Story = {
  render: () => <ShowcaseDemo />
}

export const Playground: Story = {}
