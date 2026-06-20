import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToastContainer } from './ToastContainer'
import { Toast } from './Toast'
import { Button } from '../Button'

const meta: Meta = {
  title: 'Components/Feedback/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastContainer />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Showcase: Story = {
  render: () => {
    const placements: Array<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' | 'top-full' | 'bottom-full'> = [
      'top-right', 'top-left', 'top-center', 'top-full', 
      'bottom-right', 'bottom-left', 'bottom-center', 'bottom-full'
    ]
    
    return (
      <div className="flex flex-col gap-6 w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Toast Types</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => Toast.show({ title: 'Default Toast', message: 'This is a standard default toast notification.' })}
            >
              Default
            </Button>
            <Button
              variant="filled"
              color="success"
              onClick={() => Toast.success({ title: 'Success!', message: 'Your changes have been saved successfully.' })}
            >
              Success
            </Button>
            <Button
              variant="filled"
              color="danger"
              onClick={() => Toast.error({ title: 'Error', message: 'There was a problem processing your request.' })}
            >
              Error
            </Button>
            <Button
              variant="filled"
              color="warning"
              onClick={() => Toast.warning({ title: 'Warning', message: 'Your session is about to expire.' })}
            >
              Warning
            </Button>
            <Button
              variant="filled"
              color="info"
              onClick={() => Toast.info({ title: 'Information', message: 'A new software update is available.' })}
            >
              Info
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">All Toast Placements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {placements.map(placement => (
              <Button
                key={placement}
                variant="soft"
                color={placement.includes('bottom') ? 'secondary' : 'primary'}
                onClick={() => Toast.info({ 
                  title: `Placement: ${placement}`, 
                  message: `This toast is configured to appear at the ${placement} position of the screen.`, 
                  placement 
                })}
              >
                {placement}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Advanced Features</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="soft"
              color="danger"
              onClick={() => Toast.error({ 
                title: 'Persistent Toast', 
                message: 'This toast has duration: 0 and will not close until you click the X button.',
                duration: 0
              })}
            >
              No Auto-Dismiss (0ms)
            </Button>
            <Button
              variant="soft"
              color="neutral"
              onClick={() => Toast.show('This is just a simple string message without any title or specific type.')}
            >
              String Only Message
            </Button>
            <Button
              variant="soft"
              color="success"
              onClick={() => Toast.success({ 
                title: 'Fast Toast', 
                message: 'This toast disappears after just 2 seconds.',
                duration: 2000
              })}
            >
              Short Duration (2s)
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={() => {
                const id = Toast.info({ title: 'Manual Dismiss', message: 'This toast will be closed programmatically in 3 seconds.', duration: 0 })
                setTimeout(() => Toast.dismiss(id), 3000)
              }}
            >
              Programmatic Dismiss
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
      options: ['success', 'error', 'warning', 'info', 'default']
    },
    placement: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', 'top-full', 'bottom-full']
    },
    duration: { control: 'number' }
  },
  args: {
    title: 'Playground Toast',
    message: 'Change the controls below to test different configurations!',
    type: 'default',
    placement: 'top-right',
    duration: 5000
  },
  render: (args) => {
    return (
      <Button 
        variant="filled" 
        color="primary" 
        onClick={() => Toast.show(args as any)}
      >
        Trigger Playground Toast
      </Button>
    )
  }
}
