import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal, ModalHeader, ModalContent, ModalFooter } from './index'
import type { ModalSize } from './Modal.types'
import { Button } from '../Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
    isOpen: {
      control: 'boolean',
    },
    scrollMode: {
      control: 'select',
      options: ['content', 'dialog'],
    },
  },
  args: {
    size: 'md',
    isOpen: false,
    scrollMode: 'content',
  },
}

export default meta
type Story = StoryObj<typeof Modal>

const sizes: ModalSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']

const DemoModal: React.FC<{ size: ModalSize }> = ({ size }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="soft"
        onClick={() => setIsOpen(true)}
      >
        Size {size}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
      >
        <ModalHeader
          title={`Modal ${size}`}
          subtitle="Declarative modal demonstration"
          onClose={() => setIsOpen(false)}
        />
        <ModalContent>
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">
              This is a modal demonstrating the <strong>{size}</strong> size limit.
            </p>
            <div className="h-48 bg-neutral-100 rounded-lg border border-neutral-200 border-dashed flex items-center justify-center">
              <span className="text-neutral-400 font-medium">Content Placeholder</span>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="soft" color="neutral" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="filled" color="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const Showcase: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full overflow-x-auto">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Modal Sizes</h2>
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-neutral-200 text-neutral-500 font-medium w-32">Property</th>
                {sizes.map((size) => (
                  <th key={size} className="p-4 border-b border-neutral-200 text-neutral-500 font-medium text-center">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50/50">
                <td className="p-4 font-medium capitalize text-neutral-700 border-r border-neutral-100">
                  Size Variations
                </td>
                {sizes.map((size) => (
                  <td key={size} className="p-4 text-center">
                    <DemoModal size={size} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const PlaygroundModal: React.FC<React.ComponentProps<typeof Modal>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen)

  return (
    <>
      <Button variant="filled" color="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalHeader
          title="Playground Modal"
          subtitle="Test different controls"
          onClose={() => setIsOpen(false)}
        />
        <ModalContent>
          <div className="p-4 bg-primary-50 text-primary-800 rounded-lg text-sm mb-4">
            Use the Controls tab in Storybook to change the size and scroll behavior of this modal.
          </div>
          {args.scrollMode === 'dialog' && (
            <div className="h-[1200px] bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center flex-col text-neutral-400 p-8 text-center border-dashed">
              <span>Tall Content to test scrollMode=&quot;dialog&quot;</span>
              <span className="text-xs mt-2">The whole modal dialog scrolls in the viewport</span>
            </div>
          )}
          {args.scrollMode === 'content' && (
            <div className="h-[1200px] bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center flex-col text-neutral-400 p-8 text-center border-dashed">
              <span>Tall Content to test scrollMode=&quot;content&quot;</span>
              <span className="text-xs mt-2">Only this content area scrolls, header and footer are fixed</span>
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <Button variant="outlined" color="neutral" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="filled" color="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundModal {...args} />
}

const StackedModalDemo: React.FC = () => {
  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center p-12 border border-neutral-200 border-dashed rounded-xl bg-neutral-50 w-full">
      <p className="text-sm text-neutral-500 mb-6">
        Demonstrates multiple modals stacked on top of each other.
      </p>
      <Button variant="filled" color="primary" onClick={() => setIsOpen1(true)}>
        Open First Modal (2xl)
      </Button>

      {/* Modal 1 */}
      <Modal isOpen={isOpen1} onClose={() => setIsOpen1(false)} size="2xl">
        <ModalHeader title="First Modal" subtitle="This is the base modal" onClose={() => setIsOpen1(false)} />
        <ModalContent>
          <div className="space-y-4">
            <p>This is the first modal. It is quite large to accommodate more modals inside.</p>
            <Button variant="soft" color="primary" onClick={() => setIsOpen2(true)}>
              Open Second Modal (md)
            </Button>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="soft" color="neutral" onClick={() => setIsOpen1(false)}>Close First</Button>
        </ModalFooter>
      </Modal>

      {/* Modal 2 */}
      <Modal isOpen={isOpen2} onClose={() => setIsOpen2(false)} size="md">
        <ModalHeader title="Second Modal" subtitle="Stacked on top of the first" onClose={() => setIsOpen2(false)} />
        <ModalContent>
          <div className="space-y-4">
            <p>This modal is stacked on top of the first one. Notice how the z-index is managed perfectly without bugs.</p>
            <Button variant="soft" color="primary" onClick={() => setIsOpen3(true)}>
              Open Third Modal (xs)
            </Button>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="soft" color="neutral" onClick={() => setIsOpen2(false)}>Close Second</Button>
        </ModalFooter>
      </Modal>

      {/* Modal 3 */}
      <Modal isOpen={isOpen3} onClose={() => setIsOpen3(false)} size="xs">
        <ModalHeader title="Third Modal" subtitle="The topmost modal" onClose={() => setIsOpen3(false)} />
        <ModalContent>
          <div className="space-y-4">
            <p>This is the third and smallest modal, stacked at the very top.</p>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="filled" color="primary" onClick={() => setIsOpen3(false)}>Done</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export const Stacked: Story = {
  render: () => <StackedModalDemo />
}
