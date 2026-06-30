import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PanelLayout } from './index'
import { SettingsIcon, UserIcon, LayoutGridIcon } from '../Icons'

const meta: Meta<typeof PanelLayout> = {
  title: 'Layout/Panel',
  component: PanelLayout,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PanelLayout>

export const Default: Story = {
  render: () => (
    <PanelLayout
      menuItems={[
        { id: 1, label: 'Dashboard', icon: <LayoutGridIcon size={18} /> },
        { id: 2, label: 'Users Management', icon: <UserIcon size={18} /> },
        {
          id: 3, label: 'Settings', icon: <SettingsIcon size={18} />,
          children: [
            { id: 31, label: 'Profile Settings' },
            { id: 32, label: 'Security' },
          ]
        }
      ]}
      activeMenuIds={new Set([1])}
      onLogout={() => alert('Logout clicked')}
      userProfile={{
        displayName: 'Admin User',
        roleName: 'Super Admin',
        roleCode: 'super',
        initials: 'AU'
      }}
      onSettingsClick={() => alert('Settings clicked')}
      notifications={[
        { id: 1, title: 'New Booking', desc: 'Room 302 booked by John Doe', time: '2 min ago' },
        { id: 2, title: 'Payment Success', desc: 'Invoice #XP-992 has been paid', time: '1 hour ago' },
        { id: 3, title: 'System Update', desc: 'V.2.0 is now live on production', time: '5 hours ago' }
      ]}
      onViewAllNotifications={() => alert('View All Notifications clicked')}
      businessContextNode={<div className="text-xs font-bold p-2 bg-neutral-100 rounded-lg">PT BUMI</div>}
      switchLocaleNode={<div className="text-xs font-bold p-2">ID</div>}
      activeModuleChildren={[
        { id: 101, label: 'Guide A' },
        { id: 102, label: 'Guide B' }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-2">Metric {i}</h3>
            <p className="text-3xl font-black text-neutral-900">1,234</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 min-h-[400px]">
        <h2 className="text-xl font-bold mb-4">Main Content Area</h2>
        <p className="text-neutral-600 leading-relaxed">
          This is the main content area. Resize the browser to see the responsive behavior.
        </p>
      </div>
    </PanelLayout>
  )
}
