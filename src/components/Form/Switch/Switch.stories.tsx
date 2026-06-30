import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'
import type { SwitchProps } from './Switch.types'
import type { FormColor, FormSize } from '../types'

const meta: Meta<typeof Switch> = {
  title: 'Components/Form/Switch',
  component: Switch,
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
    labelPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

const StatefulSwitch = (props: Omit<SwitchProps, 'onChange'> & { onChange?: (checked: boolean) => void }) => {
  const [checked, setChecked] = useState<boolean>(props.checked || false)

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={setChecked}
    />
  )
}

export const Default: Story = {
  render: (args) => <StatefulSwitch {...args} />,
  args: {
    label: 'Enable Feature',
    checked: true,
    color: 'primary',
    size: 'md',
    labelPlacement: 'right',
  },
}

const colors: FormColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']
const sizes: FormSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

const ShowcaseWrapper = () => {
  const [switchValue, setSwitchValue] = useState<boolean>(true)

  return (
    <div className="flex w-full flex-col gap-8 bg-neutral-50 p-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Switch Matrix (Color)</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {colors.map((color) => (
            <Switch
              key={color}
              label={`${color} switch`}
              color={color}
              checked={switchValue}
              onChange={setSwitchValue}
            />
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Switch Size Comparison</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sizes.map((size) => (
            <Switch
              key={size}
              size={size}
              label={`Size ${size.toUpperCase()}`}
              color="primary"
              checked={switchValue}
              onChange={setSwitchValue}
            />
          ))}
        </div>
      </div>
      
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">Placement Comparison</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Switch label="Top" labelPlacement="top" checked={switchValue} onChange={setSwitchValue} />
          <Switch label="Bottom" labelPlacement="bottom" checked={switchValue} onChange={setSwitchValue} />
          <Switch label="Left" labelPlacement="left" checked={switchValue} onChange={setSwitchValue} />
          <Switch label="Right" labelPlacement="right" checked={switchValue} onChange={setSwitchValue} />
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-neutral-800">States</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <Switch
            label="Disabled"
            checked={true}
            onChange={() => {}}
            disabled
          />
          <Switch
            label="Read Only"
            checked={false}
            onChange={() => {}}
            readOnly
          />
          <Switch
            label="With Error"
            checked={false}
            onChange={() => {}}
            error="Please confirm this action"
          />
        </div>
      </div>
    </div>
  )
}

export const Showcase: Story = {
  render: () => <ShowcaseWrapper />,
}
