import type { Meta, StoryObj } from '@storybook/react'
import { Tree } from './Tree'
import type { TreeNodeData } from './Tree.types'

const sampleData: TreeNodeData[] = [
  {
    id: '1',
    label: 'Root Node 1',
    children: [
      {
        id: '1-1',
        label: 'Child Node 1.1',
      },
      {
        id: '1-2',
        label: 'Child Node 1.2',
        children: [
          {
            id: '1-2-1',
            label: 'Grandchild Node 1.2.1',
          }
        ]
      },
    ],
  },
  {
    id: '2',
    label: 'Root Node 2',
    children: [
      {
        id: '2-1',
        label: 'Child Node 2.1',
      },
    ],
  },
]

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['minimal', 'lined', 'filled'],
    },
    actionsOnHover: { control: 'boolean' },
    defaultExpanded: { control: 'boolean' },
    showRootAction: { control: 'boolean' },
  },
  args: {
    data: sampleData,
    title: 'Directory Structure',
    description: 'Manage files and folders',
    color: 'primary',
    size: 'sm',
    variant: 'lined',
    defaultExpanded: true,
    actionsOnHover: true,
  },
}

export default meta
type Story = StoryObj<typeof Tree>

export const Showcase: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
          <h2 className="text-xl font-bold text-neutral-800 mb-6">Tree Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 mb-4">Minimal</h3>
              <div className="border border-neutral-200 rounded-xl">
                <Tree data={sampleData} variant="minimal" color="primary" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 mb-4">Lined</h3>
              <div className="border border-neutral-200 rounded-xl">
                <Tree data={sampleData} variant="lined" color="secondary" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 mb-4">Filled</h3>
              <div className="border border-neutral-200 rounded-xl">
                <Tree data={sampleData} variant="filled" color="success" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const Playground: Story = {}
