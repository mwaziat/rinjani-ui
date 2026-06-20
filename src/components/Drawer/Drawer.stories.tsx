import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from './index'
import type { DrawerSize, DrawerPosition } from './Drawer.types'
import { Button } from '../Button'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '1/4', '1/3', '1/2', '2/3', '3/4', 'full'],
    },
    isOpen: {
      control: 'boolean',
    },
  },
  args: {
    position: 'right',
    size: 'md',
    isOpen: false,
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

const sizes: DrawerSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '1/4', '1/3', '1/2', '2/3', '3/4', 'full']
const positions: DrawerPosition[] = ['left', 'right', 'top', 'bottom']

const DemoDrawer = ({ size, position }: { size: DrawerSize; position: DrawerPosition }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="soft"
        onClick={() => setIsOpen(true)}
        className="w-full justify-center"
      >
        {size}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        position={position}
      >
        <DrawerHeader
          title={`Drawer ${size} at ${position}`}
          subtitle="Matrix demonstration"
          onClose={() => setIsOpen(false)}
        />
        <DrawerContent>
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">
              This is a drawer demonstrating the <strong>{size}</strong> size positioned at the <strong>{position}</strong>.
            </p>
            <div className="h-64 bg-neutral-100 rounded-lg border border-neutral-200 border-dashed flex items-center justify-center">
              <span className="text-neutral-400 font-medium">Content Placeholder</span>
            </div>
            <p className="text-sm text-neutral-600">
              You can scroll this content area if it overflows. The header and footer will remain fixed in place.
            </p>
          </div>
        </DrawerContent>
        <DrawerFooter>
          <Button variant="soft" color="neutral" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="filled" color="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export const Showcase: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full overflow-x-auto">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Drawer Matrix (Position x Size)</h2>
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-neutral-200 text-neutral-500 font-medium w-32">Position</th>
                {sizes.map((size) => (
                  <th key={size} className="p-4 border-b border-neutral-200 text-neutral-500 font-medium text-center">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                  <td className="p-4 font-medium capitalize text-neutral-700 border-r border-neutral-100">
                    {position}
                  </td>
                  {sizes.map((size) => (
                    <td key={size} className="p-4 text-center">
                      <DemoDrawer size={size} position={position} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen)

    return (
      <>
        <Button variant="filled" color="primary" onClick={() => setIsOpen(true)}>
          Open Drawer
        </Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <DrawerHeader
            title="Playground Drawer"
            subtitle="Test different controls"
            onClose={() => setIsOpen(false)}
          />
          <DrawerContent>
            <div className="p-4 bg-primary-50 text-primary-800 rounded-lg text-sm">
              Use the Controls tab in Storybook to change the position and size of this drawer in real-time.
            </div>
          </DrawerContent>
          <DrawerFooter>
            <Button variant="soft" color="neutral" onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      </>
    )
  }
}
