import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'
import type { AlertColor, AlertVariant } from './Alert.types'

const meta: Meta<typeof Alert> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'soft', 'outlined'],
    },
    action: {
      control: 'select',
      options: ['close', 'minimize'],
    },
    duration: { control: 'number' },
  },
  args: {
    color: 'info',
    variant: 'soft',
    title: 'System Update',
    message: 'A new software update is available for your device.',
  },
}

export default meta
type Story = StoryObj<typeof Alert>

const colors: AlertColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const variants: AlertVariant[] = ['filled', 'soft', 'outlined']

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Alert Variants & Colors</h2>
        <div className="flex flex-col gap-12">
          {variants.map((variant) => (
            <div key={variant}>
              <h3 className="text-lg font-bold text-neutral-700 mb-4 capitalize border-b border-neutral-200 pb-2">
                Variant: {variant}
              </h3>
              <div className="flex flex-col gap-4">
                {colors.map((color) => (
                  <Alert
                    key={`${variant}-${color}`}
                    color={color}
                    variant={variant}
                    title={`${color.charAt(0).toUpperCase() + color.slice(1)} Alert`}
                    message={`This is a ${variant} alert demonstrating the ${color} semantic color state with elegant typography.`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Alert Actions & Features</h2>
        <div className="flex flex-col gap-4">
          <Alert
            color="success"
            variant="soft"
            title="Dismissable Alert"
            message="This alert has an explicit close action button."
            action="close"
          />
          <Alert
            color="info"
            variant="filled"
            title="Minimizable Alert"
            message="This alert can be collapsed to show only the title and icon."
            action="minimize"
          />
          <Alert
            color="warning"
            variant="outlined"
            title="Auto-dismiss Alert"
            message="This alert will automatically disappear after 10 seconds."
            duration={10000}
            action="close"
          />
        </div>
      </div>
    </div>
  )
}
