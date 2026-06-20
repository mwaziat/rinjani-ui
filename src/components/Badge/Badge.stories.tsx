import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'
import type { BadgeVariant, BadgeColor } from './Badge.types'
import { CheckIcon, InfoIcon, BellIcon } from '../Icons'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft', 'text'],
      description: 'The visual style of the badge',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'The color theme of the badge',
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the badge',
    },
    isPill: {
      control: 'boolean',
      description: 'Whether the badge has fully rounded corners',
    },
  },
  args: {
    children: 'Badge',
    color: 'primary',
    variant: 'soft',
    size: 'sm',
    isPill: false,
  },
}

export default meta
type Story = StoryObj<typeof Badge>

const variants: BadgeVariant[] = ['filled', 'outlined', 'soft', 'text']
const colors: BadgeColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']

export const Showcase: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 xl:col-span-2">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Badge Matrix (Variant x Color)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b border-neutral-200 text-neutral-500 font-medium">Color</th>
                  {variants.map((variant) => (
                    <th key={variant} className="p-4 border-b border-neutral-200 text-neutral-500 font-medium capitalize">
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
                      <td key={variant} className="p-4">
                        <Badge variant={variant} color={color}>
                          Badge
                        </Badge>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Badge Sizes</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Badge size="xxs" color="primary">XXS</Badge>
            <Badge size="xs" color="primary">XS</Badge>
            <Badge size="sm" color="primary">SM</Badge>
            <Badge size="md" color="primary">MD</Badge>
            <Badge size="lg" color="primary">LG</Badge>
            <Badge size="xl" color="primary">XL</Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Badges with Icons</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Badge leftIcon={<CheckIcon />} color="success">Active</Badge>
            <Badge rightIcon={<InfoIcon />} color="danger" variant="soft">Error</Badge>
            <Badge leftIcon={<BellIcon />} color="info" variant="outlined">Notification</Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 xl:col-span-2">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Pill Badges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Sizes</h3>
              <div className="flex items-end gap-4 flex-wrap">
                <Badge size="xxs" color="secondary" isPill>XXS Pill</Badge>
                <Badge size="xs" color="secondary" isPill>XS Pill</Badge>
                <Badge size="sm" color="secondary" isPill>SM Pill</Badge>
                <Badge size="md" color="secondary" isPill>MD Pill</Badge>
                <Badge size="lg" color="secondary" isPill>LG Pill</Badge>
                <Badge size="xl" color="secondary" isPill>XL Pill</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Variants</h3>
              <div className="flex items-end gap-4 flex-wrap">
                <Badge variant="filled" color="warning" isPill>Warning</Badge>
                <Badge variant="outlined" color="success" isPill leftIcon={<CheckIcon />}>Success</Badge>
                <Badge variant="soft" color="info" isPill>Info</Badge>
                <Badge variant="text" color="neutral" isPill>Neutral</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const Playground: Story = {}
