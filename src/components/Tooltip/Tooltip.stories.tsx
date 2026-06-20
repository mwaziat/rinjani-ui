import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import type { TooltipVariant, TooltipColor, TooltipSize } from './Tooltip.types'
import { Button } from '../Button'
import { InfoIcon } from '../Icons'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    placement: {
      control: 'select',
      options: ['auto', 'top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'],
    },
    isPill: { control: 'boolean' },
    showArrow: { control: 'boolean' },
  },
  args: {
    content: 'Tooltip content',
    color: 'neutral',
    variant: 'filled',
    size: 'sm',
    placement: 'auto',
    showArrow: true,
  },
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

const variants: TooltipVariant[] = ['filled', 'outlined', 'soft']
const colors: TooltipColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const sizes: TooltipSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

export const Showcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Tooltip Matrix (Variant x Color)</h2>
        <div className="overflow-x-auto pb-12">
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
                      <Tooltip content={`This is a ${variant} ${color} tooltip`} variant={variant} color={color}>
                        <span className="cursor-pointer text-neutral-600 hover:text-neutral-900 font-medium underline underline-offset-4 decoration-dashed decoration-neutral-300">
                          Hover me
                        </span>
                      </Tooltip>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Tooltip Sizes</h2>
        <div className="flex items-center gap-6 flex-wrap py-4">
          {sizes.map((size) => (
            <Tooltip key={size} content={`This is a ${size.toUpperCase()} tooltip`} size={size} color="primary">
              <div className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                {size.toUpperCase()}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Placements & Auto (Collision)</h2>
        <div className="flex items-center justify-center gap-8 flex-wrap py-12">
          <Tooltip content="Tooltip on Top" placement="top" color="secondary" variant="filled">
            <Button size="sm" variant="soft" color="secondary">Top</Button>
          </Tooltip>

          <Tooltip content="Tooltip on Bottom" placement="bottom" color="success" variant="filled">
            <Button size="sm" variant="soft" color="success">Bottom</Button>
          </Tooltip>

          <Tooltip content="Tooltip on Left" placement="left" color="warning" variant="filled">
            <Button size="sm" variant="soft" color="warning">Left</Button>
          </Tooltip>

          <Tooltip content="Tooltip on Right" placement="right" color="danger" variant="filled">
            <Button size="sm" variant="soft" color="danger">Right</Button>
          </Tooltip>
          
          <Tooltip content="Auto flips when hitting edges" placement="auto" color="info" variant="filled">
            <div className="flex items-center gap-2 cursor-help text-info-600 font-semibold bg-info-50 px-3 py-1.5 rounded-full border border-info-200">
              <InfoIcon size={16} /> Auto Placement
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Pill Tooltips (isPill)</h2>
        <div className="flex items-center gap-6 flex-wrap py-4">
          {sizes.map((size) => (
            <Tooltip key={size} content={`Pill Tooltip ${size.toUpperCase()}`} size={size} color="neutral" isPill variant="outlined">
              <div className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-full text-sm font-medium transition-colors">
                Pill {size.toUpperCase()}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 w-full xl:col-span-2">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">MaxWidth & Text Wrapping</h2>
        <div className="flex items-center gap-8 flex-wrap py-4">
          <Tooltip 
            content="This is a very long tooltip text that would normally overflow or stretch the screen, but now it wraps neatly because of the maxWidth prop!" 
            maxWidth="sm" 
            color="primary"
          >
            <div className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              sm (200px)
            </div>
          </Tooltip>

          <Tooltip 
            content="This is an even longer tooltip text that takes more space. With maxWidth set to md, it gives it a comfortable reading width without being too squished." 
            maxWidth="md" 
            color="secondary"
          >
            <div className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              md (300px)
            </div>
          </Tooltip>

          <Tooltip 
            content="You can also use custom numbers. This tooltip is exactly 250px wide. Text wrapping and alignment is automatically handled by the component for a great developer experience." 
            maxWidth={250} 
            color="info"
          >
            <div className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Custom (250)
            </div>
          </Tooltip>

          <Tooltip 
            content="Need something specific? Pass raw strings! This uses maxWidth='15rem'. The component smartly injects the raw string directly into the CSS." 
            maxWidth="15rem" 
            color="warning"
          >
            <div className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Raw ('15rem')
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me for Tooltip</Button>
    </Tooltip>
  )
}
