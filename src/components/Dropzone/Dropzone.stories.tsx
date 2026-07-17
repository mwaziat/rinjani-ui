import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dropzone } from './Dropzone'
import type { DropzoneColor, DropzoneProps, DropzoneVariant, FileWithPreview } from './Dropzone.types'

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] },
    variant: { control: 'select', options: ['filled', 'outlined', 'soft'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    layout: { control: 'select', options: ['default', 'grid'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showPreview: { control: 'boolean' },
    dashed: { control: 'boolean' },
    title: { control: 'text' },
    acceptText: { control: 'text' },
    description: { control: 'text' },
    maxSize: { control: 'number' },
    maxFiles: { control: 'number' },
    previewPlacement: { control: 'select', options: ['inside', 'outside'] },
  },
  args: {
    label: 'Upload files',
    values: [],
    onChange: () => undefined,
    color: 'primary',
    variant: 'outlined',
    size: 'md',
    multiple: true,
    maxSize: 10,
    acceptText: 'JPG, PNG, PDF',
  },
}

export default meta
type Story = StoryObj<typeof Dropzone>

const colors: DropzoneColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const variants: DropzoneVariant[] = ['outlined', 'filled', 'soft']

const DropzoneDemo: React.FC<Omit<DropzoneProps, 'onChange' | 'values'>> = (props): React.ReactNode => {
  const [values, setValues] = useState<FileWithPreview[]>([])

  return <Dropzone {...props} values={values} onChange={setValues} />
}

export const Showcase: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-8">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Dropzone Variants</h2>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {variants.map((variant) => (
            <DropzoneDemo key={variant} label={`${variant} upload`} variant={variant} color="primary" multiple />
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Color States</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {colors.map((color) => (
            <DropzoneDemo key={color} label={`${color} upload`} color={color} size="sm" multiple />
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Grid Layout</h2>
        <DropzoneDemo label="Media library" layout="grid" multiple maxPreview={6} description="Upload images, video, or documents" />
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Inside Preview Placement</h2>
        <DropzoneDemo label="Upload attachments" previewPlacement="inside" multiple maxPreview={4} />
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Constraints & Validation</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DropzoneDemo label="Profile picture" maxSize={5} acceptText="JPG, PNG" accept="image/jpeg, image/png" description="Optimal dimensions 500x500px" dashed={true} />
          <DropzoneDemo label="Financial report" maxSize={15} acceptText="PDF, XLSX" accept=".pdf, .xlsx" description="Upload the latest annual report" />
        </div>
      </div>
    </div>
  ),
}

export const Playground: Story = {
  render: (args) => <DropzoneDemo {...args} />,
}
