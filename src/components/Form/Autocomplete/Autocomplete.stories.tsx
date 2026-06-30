import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Autocomplete } from './Autocomplete'
import { AutocompleteMultiple } from './AutocompleteMultiple'
import { MultiTagInput } from './MultiTagInput'
import type { AutocompleteProps } from './Autocomplete.types'
import type { AutocompleteMultipleProps } from './AutocompleteMultiple.types'
import type { MultiTagInputProps } from './MultiTagInput.types'
import type { FormVariant, FormColor, FormSize, SelectOption, SelectValue, SelectMultipleValue, MultiTagValue } from '../types'
import { UserIcon, MessageSquareIcon } from '../../Icons'

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Form/Autocomplete',
  component: Autocomplete,
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
    label: 'Autocomplete Option',
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
type Story = StoryObj<typeof Autocomplete>

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

const StatefulAutocomplete = (props: Omit<AutocompleteProps, 'value' | 'onChange'> & { initialValue?: SelectValue }) => {
  const [value, setValue] = useState<SelectValue>(props.initialValue ?? '')
  return <Autocomplete {...props} value={value} onChange={setValue} />
}

const StatefulAutocompleteMultiple = (props: Omit<AutocompleteMultipleProps, 'value' | 'onChange'> & { initialValue?: SelectMultipleValue }) => {
  const [value, setValue] = useState<SelectMultipleValue>(props.initialValue ?? [])
  return <AutocompleteMultiple {...props} value={value} onChange={setValue} />
}

const StatefulMultiTagInput = (props: Omit<MultiTagInputProps, 'values' | 'onChange'> & { initialValue?: MultiTagValue[] }) => {
  const [values, setValues] = useState<MultiTagValue[]>(props.initialValue ?? [])
  return <MultiTagInput {...props} values={values} onChange={setValues} />
}

const ShowcaseDemo = () => {
  return (
      <div className="flex flex-col gap-12 w-full">
        {/* SINGLE AUTOCOMPLETE */}
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Autocomplete Matrix (Variant x Color)</h2>
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
                          <StatefulAutocomplete
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
                    <StatefulAutocomplete size={size} color="primary" variant="outlined" label={`Size ${size.toUpperCase()}`} placeholder={`Select ${size}`} options={MOCK_OPTIONS} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Floating Label</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatefulAutocomplete floating label="Floating Line" variant="line" color="primary" placeholder="Select item" options={MOCK_OPTIONS} />
              <StatefulAutocomplete floating label="Floating Outlined" variant="outlined" color="secondary" placeholder="Select item" options={MOCK_OPTIONS} />
              <StatefulAutocomplete floating label="Floating Filled" variant="filled" color="success" placeholder="Select item" options={MOCK_OPTIONS} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Features & States (Single)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Features</h3>
                <StatefulAutocomplete label="With Left Icon" leftIcon={<UserIcon size={18} />} placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulAutocomplete label="With Right Icon" rightIcon={<MessageSquareIcon size={18} />} placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulAutocomplete label="Clearable" isClearable placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulAutocomplete label="Enable Add Item" enableAddItem placeholder="Search..." options={MOCK_OPTIONS} />
                <StatefulAutocomplete label="Disabled Option Demo" placeholder="Open dropdown to see" options={MOCK_OPTIONS} />
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">States</h3>
                <StatefulAutocomplete label="Disabled State" disabled placeholder="Select disabled" options={MOCK_OPTIONS} />
                <StatefulAutocomplete label="Read Only" readOnly placeholder="Read only input" options={MOCK_OPTIONS} initialValue="apple" />
                <StatefulAutocomplete label="Error State" error="This field is required and invalid." placeholder="Select item" options={MOCK_OPTIONS} />
              </div>

            </div>
          </div>
        </div>

        {/* MULTIPLE AUTOCOMPLETE */}
        <div className="flex flex-col gap-8 w-full mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Autocomplete Multiple Matrix</h2>
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
                          <StatefulAutocompleteMultiple
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
                    <StatefulAutocompleteMultiple size={size} color="primary" variant="outlined" label={`Size ${size.toUpperCase()}`} placeholder={`Select multiple ${size}`} options={MOCK_OPTIONS} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Floating Label</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatefulAutocompleteMultiple floating label="Floating Line" variant="line" color="primary" placeholder="Select..." options={MOCK_OPTIONS} />
              <StatefulAutocompleteMultiple floating label="Floating Outlined" variant="outlined" color="secondary" placeholder="Select..." options={MOCK_OPTIONS} />
              <StatefulAutocompleteMultiple floating label="Floating Filled" variant="filled" color="success" placeholder="Select..." options={MOCK_OPTIONS} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Features & States (Multiple)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Features</h3>
                <StatefulAutocompleteMultiple label="With Left Icon" leftIcon={<UserIcon size={18} />} placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulAutocompleteMultiple label="With Right Icon" rightIcon={<MessageSquareIcon size={18} />} placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulAutocompleteMultiple label="Clearable" isClearable placeholder="Select item" options={MOCK_OPTIONS} />
                <StatefulAutocompleteMultiple label="Enable Add Item" enableAddItem placeholder="Search..." options={MOCK_OPTIONS} />
                <StatefulAutocompleteMultiple label="Disabled Option Demo" placeholder="Open dropdown to see" options={MOCK_OPTIONS} />
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">States</h3>
                <StatefulAutocompleteMultiple label="Disabled State" disabled placeholder="Select disabled" options={MOCK_OPTIONS} />
                <StatefulAutocompleteMultiple label="Read Only" readOnly placeholder="Read only input" options={MOCK_OPTIONS} initialValue={['apple']} />
                <StatefulAutocompleteMultiple label="Error State" error="Invalid selection." placeholder="Select item" options={MOCK_OPTIONS} />
              </div>

            </div>
          </div>
        </div>

        {/* MULTI TAG INPUT */}
        <div className="flex flex-col gap-8 w-full mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">MultiTagInput Matrix</h2>
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
                          <StatefulMultiTagInput
                            variant={variant}
                            color={color}
                            placeholder={`${variant} ${color}`}
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
                    <StatefulMultiTagInput size={size} color="primary" variant="outlined" label={`Size ${size.toUpperCase()}`} placeholder={`Type ${size}...`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Floating Label</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatefulMultiTagInput floating label="Floating Line" variant="line" color="primary" placeholder="Type..." />
              <StatefulMultiTagInput floating label="Floating Outlined" variant="outlined" color="secondary" placeholder="Type..." />
              <StatefulMultiTagInput floating label="Floating Filled" variant="filled" color="success" placeholder="Type..." />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Features & States (MultiTag)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Features</h3>
                <StatefulMultiTagInput label="With Left Icon" leftIcon={<UserIcon size={18} />} placeholder="Type item" />
                <StatefulMultiTagInput label="With Right Icon" rightIcon={<MessageSquareIcon size={18} />} placeholder="Type item" />
                <StatefulMultiTagInput label="Allow Duplicates" allowDuplicates placeholder="Type item" />
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">States</h3>
                <StatefulMultiTagInput label="Disabled State" disabled placeholder="Disabled input" />
                <StatefulMultiTagInput label="Read Only" readOnly placeholder="Read only input" initialValue={['Apple', 'Banana']} />
                <StatefulMultiTagInput label="Error State" error="Invalid input." placeholder="Type item" />
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
