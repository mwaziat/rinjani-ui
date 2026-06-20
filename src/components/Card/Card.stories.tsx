import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardContent, CardFooter } from './index'
import { Button } from '../Button'
import { SettingsIcon, ImageIcon } from '../Icons'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    noPadding: { control: 'boolean' },
    className: { control: 'text' }
  },
  args: {
    noPadding: false,
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Showcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 xl:col-span-2">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Card Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader title="Simple Card" subtitle="No extra icons or footer" />
            <CardContent>
              <p className="text-neutral-600 text-sm">
                This is a basic card component. It contains a header with a title and subtitle, and some content text.
                It uses the default padding and styling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader 
              icon={<SettingsIcon size={20} className="text-primary-600" />} 
              title="Project Dashboard" 
              subtitle="Overview of your tasks" 
            />
            <CardContent>
              <p className="text-neutral-600 text-sm">
                You can easily pass an icon to the CardHeader. This card also includes a CardFooter with actionable buttons.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="soft" color="neutral">Cancel</Button>
              <Button color="primary">View Project</Button>
            </CardFooter>
          </Card>

          <Card noPadding>
            <div className="h-40 bg-neutral-100 flex items-center justify-center text-neutral-400">
              <ImageIcon size={40} />
            </div>
            <div className="p-6">
              <CardHeader title="Media Card" subtitle="Card with noPadding prop" className="mb-4!" />
              <CardContent>
                <p className="text-neutral-600 text-sm">
                  By passing the <code className="bg-neutral-100 px-1 py-0.5 rounded text-primary-600">noPadding</code> prop, 
                  you can remove the default padding to allow images or other elements to stretch to the edges.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Playground Card" subtitle="Interactive example" />
      <CardContent>
        <p className="text-neutral-600 text-sm">
          Toggle the <strong>noPadding</strong> control in the panel below to see how this card behaves.
        </p>
      </CardContent>
    </Card>
  )
}
