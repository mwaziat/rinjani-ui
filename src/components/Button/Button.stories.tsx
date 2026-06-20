import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { IconButton } from './IconButton'
import type { ButtonVariant, ButtonColor } from './Button.types'
import { PlusIcon, TrashIcon, SettingsIcon, UserIcon } from '../Icons'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    isPill: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'filled',
    size: 'sm',
  },
}

export default meta
type Story = StoryObj<typeof Button>

const variants: ButtonVariant[] = ['filled', 'outlined', 'soft', 'text']
const colors: ButtonColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']

export const Showcase: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Button Matrix (Variant x Color)</h2>
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
                        <Button variant={variant} color={color}>
                          Button
                        </Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Button Sizes</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Button size="xxs" color="primary">Size XXS</Button>
            <Button size="xs" color="primary">Size XS</Button>
            <Button size="sm" color="primary">Size SM</Button>
            <Button size="md" color="primary">Size MD</Button>
            <Button size="lg" color="primary">Size LG</Button>
            <Button size="xl" color="primary">Size XL</Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Buttons with Icons & Loading</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <Button leftIcon={<PlusIcon />} color="primary">Add New</Button>
            <Button rightIcon={<TrashIcon />} color="danger" variant="soft">Delete</Button>
            <Button isLoading color="secondary">Saving...</Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Icon Buttons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Sizes</h3>
              <div className="flex items-end gap-4 flex-wrap">
                <IconButton size="xxs" color="primary" icon={<PlusIcon />} />
                <IconButton size="xs" color="primary" icon={<PlusIcon />} />
                <IconButton size="sm" color="primary" icon={<PlusIcon />} />
                <IconButton size="md" color="primary" icon={<PlusIcon />} />
                <IconButton size="lg" color="primary" icon={<PlusIcon />} />
                <IconButton size="xl" color="primary" icon={<PlusIcon />} />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Variants & States</h3>
              <div className="flex items-end gap-4 flex-wrap">
                <IconButton variant="filled" color="success" icon={<SettingsIcon />} />
                <IconButton variant="outlined" color="primary" icon={<UserIcon />} />
                <IconButton variant="soft" color="warning" icon={<SettingsIcon />} />
                <IconButton variant="text" color="danger" icon={<TrashIcon />} />
                <IconButton isLoading color="info" icon={<PlusIcon />} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Pill Buttons (isPill)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Button Sizes</h3>
              <div className="flex items-end gap-4 flex-wrap">
                <Button size="xxs" color="info" isPill>Extra Small</Button>
                <Button size="xs" color="neutral" isPill>Very Small</Button>
                <Button size="sm" color="primary" isPill>Small</Button>
                <Button size="md" color="secondary" isPill>Medium</Button>
                <Button size="lg" color="success" isPill>Large</Button>
                <Button size="xl" color="warning" isPill>Extra Large</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Icon Buttons</h3>
              <div className="flex items-end gap-4 flex-wrap">
                <IconButton size="xxs" color="info" isPill icon={<PlusIcon />} />
                <IconButton size="xs" color="neutral" isPill icon={<PlusIcon />} />
                <IconButton size="sm" color="primary" isPill icon={<PlusIcon />} />
                <IconButton size="md" color="secondary" isPill icon={<PlusIcon />} />
                <IconButton size="lg" color="success" isPill icon={<PlusIcon />} />
                <IconButton size="xl" color="warning" isPill icon={<PlusIcon />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const Playground: Story = {}
