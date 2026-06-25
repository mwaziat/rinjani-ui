import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, DropdownList, DropdownItem } from './index'
import type { DropdownColor, DropdownVariant, DropdownPlacement } from './Dropdown.types'
import { UserIcon } from '../Icons/general'
import { SettingsIcon, TrashIcon } from '../Icons/action'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft', 'text'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    placement: {
      control: 'select',
      options: [
        'auto', 'bottom', 'bottom-start', 'bottom-end',
        'top', 'top-start', 'top-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'
      ],
    },
    showArrow: { control: 'boolean' },
    isPill: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

const colors: DropdownColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const variants: DropdownVariant[] = ['filled', 'soft', 'outlined', 'text']
const placements: DropdownPlacement[] = ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'left-start', 'left', 'left-end']

const DropdownMenuDemo: React.FC = () => (
  <DropdownList>
    <DropdownItem leftIcon={<UserIcon size={16} />}>Profile</DropdownItem>
    <DropdownItem leftIcon={<SettingsIcon size={16} />}>Settings</DropdownItem>
    <DropdownItem color="danger" leftIcon={<TrashIcon size={16} />}>Delete</DropdownItem>
  </DropdownList>
)

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Dropdown Matrix (Variant x Color)</h2>
        <div className="overflow-x-auto bg-white rounded-xl border border-neutral-200">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-4 border-b border-neutral-200 text-neutral-500 font-medium w-32 bg-neutral-50/50">Color</th>
                {variants.map((variant) => (
                  <th key={variant} className="p-4 border-b border-neutral-200 text-neutral-500 font-medium capitalize bg-neutral-50/50">
                    {variant}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map((color) => (
                <tr key={color} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                  <td className="p-4 font-medium capitalize text-neutral-700">{color}</td>
                  {variants.map((variant) => (
                    <td key={variant} className="p-4 align-top">
                      <Dropdown
                        label="Options"
                        color={color}
                        variant={variant}
                      >
                        <DropdownMenuDemo />
                      </Dropdown>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Placements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center p-8 bg-neutral-50 rounded-xl border border-neutral-200 border-dashed">
          {placements.map((placement) => (
            <Dropdown
              key={placement}
              label={placement}
              placement={placement}
              color="primary"
              variant="soft"
            >
              <DropdownMenuDemo />
            </Dropdown>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Playground: Story = {
  args: {
    label: 'Dropdown Menu',
    color: 'primary',
    variant: 'filled',
    size: 'md',
    placement: 'bottom-start',
    showArrow: true,
  },
  render: (args) => (
    <div className="flex justify-center items-center min-h-[400px] w-full p-8 border border-neutral-200 border-dashed rounded-xl bg-neutral-50">
      <Dropdown {...args}>
        <DropdownMenuDemo />
      </Dropdown>
    </div>
  )
}
