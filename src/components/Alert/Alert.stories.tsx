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
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Alert Matrix (Variant x Color)</h2>
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
                      <Alert
                        color={color}
                        variant={variant}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                        message={`This is a ${variant} alert.`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Interactive Alerts (Minimize, Close & Auto-hide)</h2>
        <div className="flex flex-col gap-4 max-w-2xl">
          <Alert
            color="primary"
            variant="soft"
            title="Minimizable Alert"
            message="Click the minus icon on the right to collapse this alert. It will only show the title when minimized."
            action="minimize"
          />
          <Alert
            color="danger"
            variant="filled"
            title="Closable Alert"
            message="Click the X icon on the right to dismiss this alert permanently."
            action="close"
          />
          <Alert
            color="warning"
            variant="outlined"
            title="Auto-hiding Alert"
            message="This alert has a duration of 10 seconds. Watch the progress bar at the bottom!"
            duration={10000}
            action="close"
          />
        </div>
      </div>
    </div>
  )
}

export const Playground: Story = {
  args: {
    color: 'info',
    variant: 'soft',
    title: 'Playground Alert',
    message: 'Use the Controls tab below to change my color, variant, and actions interactively.',
    action: 'close',
  },
  render: (args) => (
    <div className="w-full max-w-2xl mx-auto p-8 border border-neutral-200 border-dashed rounded-xl bg-neutral-50">
      <Alert {...args} />
    </div>
  )
}
