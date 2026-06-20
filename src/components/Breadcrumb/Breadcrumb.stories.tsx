import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'
import type { BreadcrumbColor, BreadcrumbVariant, BreadcrumbSize } from './Breadcrumb.types'
import { SettingsIcon, UserIcon, ImageIcon } from '../Icons'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft', 'text', 'line'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    contained: { control: 'boolean' },
    activeLabel: { control: 'text' },
  },
  args: {
    color: 'primary',
    variant: 'line',
    size: 'md',
    activeLabel: 'System Settings',
    contained: true,
  },
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

const colors: BreadcrumbColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const variants: BreadcrumbVariant[] = ['filled', 'outlined', 'soft', 'text', 'line']
const sizes: BreadcrumbSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

const MOCK_PATHS = [
  { label: 'Home', href: '/', icon: <ImageIcon size={16} /> },
  { label: 'Management', href: '/management', icon: <UserIcon size={16} /> },
]

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Breadcrumb Variants & Colors</h2>
        <div className="flex flex-col gap-12">
          {variants.map((variant) => (
            <div key={variant}>
              <h3 className="text-lg font-bold text-neutral-700 mb-4 capitalize border-b border-neutral-200 pb-2">
                Variant: {variant}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                  <thead>
                    <tr>
                      <th className="p-4 border-b border-neutral-200 text-neutral-500 font-medium w-40">Color</th>
                      <th className="p-4 border-b border-neutral-200 text-neutral-500 font-medium">Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colors.map((color) => (
                      <tr key={color} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                        <td className="p-4 font-medium capitalize text-neutral-700">{color}</td>
                        <td className="p-4">
                          <Breadcrumb
                            color={color}
                            variant={variant}
                            size="md"
                            activeLabel={`${color} Settings`}
                            activeIcon={<SettingsIcon size={20} />}
                            paths={MOCK_PATHS}
                            contained={false}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Breadcrumb Sizes (Contained)</h2>
        <div className="flex flex-col gap-6">
          {sizes.map((size) => (
            <Breadcrumb
              key={size}
              color="primary"
              variant="line"
              size={size}
              activeLabel={`${size.toUpperCase()} Details`}
              activeIcon={<SettingsIcon />}
              paths={MOCK_PATHS}
              contained={true}
            />
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl shadow-sm border border-neutral-200 bg-neutral-50 w-full">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Breadcrumb Without Card (contained=false)</h2>
        <div className="flex flex-col gap-4">
          <Breadcrumb
            color="primary"
            activeLabel="System Settings"
            activeIcon={<SettingsIcon size={20} />}
            paths={MOCK_PATHS}
            contained={false}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Custom Separator</h2>
        <div className="flex flex-col gap-4">
          <Breadcrumb
            color="primary"
            activeLabel="Advanced"
            activeIcon={<SettingsIcon size={20} />}
            paths={MOCK_PATHS}
            separator={<span className="font-bold text-neutral-300">/</span>}
          />
        </div>
      </div>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => (
    <Breadcrumb 
      {...args} 
      activeIcon={<SettingsIcon size={20} />} 
      paths={MOCK_PATHS} 
    />
  )
}
