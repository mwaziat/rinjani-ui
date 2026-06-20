import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Tabs } from './index'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft', 'text', 'line'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'fullWidth'],
    },
    placement: {
      control: 'select',
      options: ['horizontal-top', 'horizontal-bottom', 'vertical-left', 'vertical-right'],
    },
  },
  args: {
    color: 'primary',
    variant: 'line',
    size: 'sm',
    align: 'left',
    placement: 'horizontal-top',
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

const DemoTabs = ({ title, scrollable = false, ...props }: Partial<import('./Tabs.types').TabsProps> & { title: string, scrollable?: boolean }) => {
  const [active, setActive] = useState('tab1')

  return (
    <div className="p-6 border border-neutral-200 rounded-xl bg-white w-full">
      <h3 className="text-lg font-bold text-neutral-800 mb-6">{title}</h3>
      <Tabs {...props} activeTab={active} onChange={setActive}>
        <Tabs.List scrollable={scrollable}>
          <Tabs.Item value="tab1">Account Settings</Tabs.Item>
          <Tabs.Item value="tab2">Preferences</Tabs.Item>
          <Tabs.Item value="tab3">Notifications</Tabs.Item>
          <Tabs.Item value="tab4" disabled>Disabled Tab</Tabs.Item>
        </Tabs.List>

        <Tabs.Content value="tab1" className="p-4 border border-dashed border-neutral-200 rounded-lg bg-neutral-50 min-h-[100px]">
          <p className="text-sm text-neutral-600">Update your account settings here.</p>
        </Tabs.Content>
        <Tabs.Content value="tab2" className="p-4 border border-dashed border-neutral-200 rounded-lg bg-neutral-50 min-h-[100px]">
          <p className="text-sm text-neutral-600">Manage your theme and display preferences.</p>
        </Tabs.Content>
        <Tabs.Content value="tab3" className="p-4 border border-dashed border-neutral-200 rounded-lg bg-neutral-50 min-h-[100px]">
          <p className="text-sm text-neutral-600">Configure your email and push notifications.</p>
        </Tabs.Content>
      </Tabs>
    </div>
  )
}

const DemoIconTabs = ({ title, variant, children }: any) => {
  const [active, setActive] = useState('tab1')
  return (
    <div className="p-6 border border-neutral-200 rounded-xl bg-white w-full">
      <h3 className="text-lg font-bold text-neutral-800 mb-6">{title}</h3>
      <Tabs activeTab={active} onChange={setActive} variant={variant}>
        <Tabs.List>
          {children}
        </Tabs.List>
      </Tabs>
    </div>
  )
}

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full">
      <DemoTabs title="Line Variant (Default)" variant="line" />
      <DemoTabs title="Soft Variant" variant="soft" />
      <DemoTabs title="Filled Variant" variant="filled" />
      <DemoTabs title="Outlined Variant" variant="outlined" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <DemoTabs title="Vertical Left Placement" placement="vertical-left" />
        <DemoTabs title="Vertical Right Placement" placement="vertical-right" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <DemoTabs title="Size Extra Small (xs)" size="xs" />
        <DemoTabs title="Size Small (sm)" size="sm" />
        <DemoTabs title="Size Medium (md)" size="md" />
        <DemoTabs title="Size Large (lg)" size="lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <DemoTabs title="Vertical (AlignLabel Left)" placement="vertical-left" alignLabel="left" />
        <DemoTabs title="Vertical (AlignLabel Center)" placement="vertical-left" alignLabel="center" />
        <DemoTabs title="Vertical (AlignLabel Right)" placement="vertical-left" alignLabel="right" />
      </div>

      <DemoIconTabs title="Icon Tabs (No Text)">
        <Tabs.Item value="tab1" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>} />
        <Tabs.Item value="tab2" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>} />
        <Tabs.Item value="tab3" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>} />
      </DemoIconTabs>

      <DemoIconTabs title="Icon Position" variant="soft">
        <Tabs.Item value="tab1" iconPosition="top" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}>Top</Tabs.Item>
        <Tabs.Item value="tab2" iconPosition="start" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>}>Start</Tabs.Item>
        <Tabs.Item value="tab3" iconPosition="end" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>}>End</Tabs.Item>
        <Tabs.Item value="tab4" iconPosition="bottom" icon={<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>}>Bottom</Tabs.Item>
      </DemoIconTabs>

      <DemoTabs title="Horizontal Bottom Placement" placement="horizontal-bottom" />

      <DemoTabs title="Full Width Alignment" align="fullWidth" variant="soft" />
      <DemoTabs title="Center Alignment" align="center" variant="line" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <DemoTabs title="Danger Color" color="danger" variant="soft" />
        <DemoTabs title="Success Color" color="success" variant="filled" />
      </div>

      <DemoTabs title="Scrollable Tabs" scrollable />
    </div>
  ),
}

export const Playground: Story = {
  render: (args) => {
    const [active, setActive] = useState('tab1')

    return (
      <div className="w-full">
        <Tabs {...args} activeTab={active} onChange={setActive}>
          <Tabs.List>
            <Tabs.Item value="tab1">Overview</Tabs.Item>
            <Tabs.Item value="tab2">Analytics</Tabs.Item>
            <Tabs.Item value="tab3">Reports</Tabs.Item>
          </Tabs.List>

          <Tabs.Content value="tab1" className="p-6 border border-dashed border-neutral-200 rounded-lg bg-neutral-50 min-h-[200px]">
            <p className="text-neutral-600">Overview content goes here. Try changing controls below.</p>
          </Tabs.Content>
          <Tabs.Content value="tab2" className="p-6 border border-dashed border-neutral-200 rounded-lg bg-neutral-50 min-h-[200px]">
            <p className="text-neutral-600">Analytics data and charts.</p>
          </Tabs.Content>
          <Tabs.Content value="tab3" className="p-6 border border-dashed border-neutral-200 rounded-lg bg-neutral-50 min-h-[200px]">
            <p className="text-neutral-600">Downloadable reports.</p>
          </Tabs.Content>
        </Tabs>
      </div>
    )
  },
}
