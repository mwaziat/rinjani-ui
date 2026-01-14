import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    color: 'blue',
    variant: 'solid',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Solid: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const WithIcon: Story = {
  args: {
    startIcon: <span>★</span>,
  },
}
