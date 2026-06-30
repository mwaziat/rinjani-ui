import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { InputField } from './InputField'
import type { FormVariant, FormColor, FormSize } from '../types'
import { UserIcon, MessageSquareIcon } from '../../Icons'

const meta: Meta<typeof InputField> = {
  title: 'Components/Form/InputField',
  component: InputField,
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
    floating: { control: 'boolean' },
    isPassword: { control: 'boolean' },
    isMultiline: { control: 'boolean' },
  },
  args: {
    label: 'Input Label',
    placeholder: 'Enter text...',
    color: 'primary',
    variant: 'outlined',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof InputField>

const variants: FormVariant[] = ['line', 'outlined', 'filled']
const colors: FormColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const sizes: FormSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

const ShowcaseDemo = () => {
    const [matrixValue, setMatrixValue] = useState('')

    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Input Field Matrix (Variant x Color)</h2>
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
                        <InputField
                          variant={variant}
                          color={color}
                          placeholder={`${variant} ${color}`}
                          value={matrixValue}
                          onChange={(e) => setMatrixValue(e.target.value)}
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
                  <InputField size={size} color="primary" variant="outlined" label={`Size ${size.toUpperCase()}`} placeholder={`Placeholder ${size}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Floating Label</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <InputField floating label="Floating Line" variant="line" color="primary" placeholder="Hello World" />
            <InputField floating label="Floating Outlined" variant="outlined" color="secondary" placeholder="Hello World" />
            <InputField floating label="Floating Filled" variant="filled" color="success" placeholder="Hello World" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-end">
            {sizes.map(size => (
              <InputField key={size} size={size} floating color="primary" variant="outlined" label={`Floating ${size.toUpperCase()}`} placeholder="Value" />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Features & States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Icons & Types</h3>
              <InputField label="Left Icon" leftIcon={<UserIcon size={18} />} placeholder="Enter username" />
              <InputField label="Right Icon" rightIcon={<MessageSquareIcon size={18} />} placeholder="Enter message" />
              <InputField label="Password" isPassword placeholder="Enter password" />
              <InputField label="Currency Format" format="currency" currency="IDR" locale="id-ID" placeholder="0" defaultValue="1500000" />
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">States & Multiline</h3>
              <InputField label="Disabled State" disabled placeholder="You cannot type here" value="Disabled value" />
              <InputField label="Read Only" readOnly placeholder="Read only input" value="Read only value" />
              <InputField label="Error State" error="This field is required and invalid." placeholder="Enter value" />
              <InputField label="Multiline (Textarea)" isMultiline rows={3} placeholder="Write your long message here..." />
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
