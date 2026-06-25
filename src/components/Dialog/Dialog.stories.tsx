import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DialogContainer } from './DialogContainer'
import { Dialog } from './Dialog'
import { Button } from '../Button'
import type { DialogOptions } from './Dialog.types'

const meta: Meta = {
  title: 'Components/Feedback/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <DialogContainer />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Showcase: Story = {
  render: () => {
    const dialogTypes: Array<'success' | 'error' | 'warning' | 'info' | 'confirm' | 'default'> = [
      'default', 'info', 'success', 'warning', 'error', 'confirm'
    ]

    return (
      <div className="flex flex-col gap-6 w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">All Dialog Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {dialogTypes.map((type) => (
              <Button
                key={type}
                variant="soft"
                color={
                  type === 'error' ? 'danger' : 
                  type === 'confirm' ? 'primary' : 
                  type === 'default' ? 'neutral' : type
                }
                onClick={() => {
                  if (type === 'confirm') {
                    Dialog.confirm({
                      title: 'Confirm Action',
                      message: 'Are you sure you want to proceed? This is a confirm dialog.',
                      onConfirm: () => new Promise(resolve => setTimeout(resolve, 1000))
                    })
                  } else {
                    Dialog[type === 'default' ? 'show' : type]({ 
                      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Dialog`, 
                      message: `This is an example of the ${type} dialog state.`,
                    })
                  }
                }}
                className="capitalize"
              >
                {type} Dialog
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Async & Custom Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="filled"
              color="primary"
              onClick={() => Dialog.confirm({ 
                title: 'Async Operation', 
                message: 'Click confirm to see the button enter a loading state for 2 seconds before closing.',
                onConfirm: () => new Promise(resolve => setTimeout(resolve, 2000))
              })}
            >
              Simulate Async Confirm (2s)
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => Dialog.show({ 
                title: 'Custom Action Array', 
                message: 'You can define an array of custom actions with different variants, colors, and behaviors.',
                actions: [
                  { label: 'Cancel', variant: 'text', color: 'neutral' },
                  { label: 'Save as Draft', variant: 'soft', color: 'secondary' },
                  { label: 'Publish', variant: 'filled', color: 'success' }
                ]
              })}
            >
              Multiple Custom Buttons
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Advanced Configurations</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="soft"
              color="danger"
              onClick={() => Dialog.error({ 
                title: 'Irreversible Action', 
                message: 'This dialog cannot be closed by clicking the backdrop. You must click a button.',
                closeOnBackdrop: false,
                showCancel: true,
                confirmText: 'Delete Forever'
              })}
            >
              No Backdrop Close
            </Button>
            <Button
              variant="soft"
              color="warning"
              onClick={() => Dialog.show({ 
                title: 'Prevent Auto-Close', 
                message: 'Clicking the action button will execute a console.log but will NOT close the dialog automatically.',
                actions: [
                  { label: 'Close Manually', variant: 'text', color: 'neutral' },
                  { 
                    label: 'Log & Stay Open', 
                    variant: 'filled', 
                    color: 'warning',
                    closeAfter: false,
                    onClick: () => console.warn('Action triggered but dialog remains open!')
                  }
                ]
              })}
            >
              closeAfter: false
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export const Playground: Story = {
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'confirm', 'default']
    },
    showCancel: { control: 'boolean' },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
    closeOnBackdrop: { control: 'boolean' }
  },
  args: {
    title: 'Playground Dialog',
    message: 'Change the controls below to test different configurations!',
    type: 'default',
    showCancel: false,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    closeOnBackdrop: true
  },
  render: (args) => {
    return (
      <Button 
        variant="filled" 
        color="primary" 
        onClick={() => Dialog.show(args as DialogOptions)}
      >
        Trigger Playground Dialog
      </Button>
    )
  }
}
