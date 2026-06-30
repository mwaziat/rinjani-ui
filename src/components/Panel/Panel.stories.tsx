import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PanelLayout, type SidebarMenuNode } from './index'
import { SettingsIcon, UserIcon, LayoutGridIcon } from '../Icons'
import { NavbarDropdown } from './NavbarDropdown'

const meta: Meta<typeof PanelLayout> = {
  title: 'Layout/Panel',
  component: PanelLayout,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PanelLayout>

const dummyMenuItems: SidebarMenuNode[] = [
  { id: 1, label: 'Dashboard', icon: <LayoutGridIcon size={18} /> },
  { id: 2, label: 'Users Management', icon: <UserIcon size={18} /> },
  {
    id: 3, label: 'Settings', icon: <SettingsIcon size={18} />,
    children: [
      { id: 31, label: 'Profile Settings' },
      { id: 32, label: 'Security' },
    ]
  }
]

const dummyContent = (
  <>
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
  </>
)

export const Default: Story = {
  render: () => (
    <PanelLayout
      sidebar={{
        menuItems: dummyMenuItems,
        activeMenuIds: new Set([1])
      }}
      navbar={{
        userAccount: {
          userProfile: {
            displayName: 'Admin User',
            roleName: 'Super Admin',
            roleCode: 'super',
            initials: 'AU'
          },
          onLogout: () => alert('Logout clicked'),
          onSettingsClick: () => alert('Settings clicked')
        },
        notification: {
          notifications: [
            { id: 1, title: 'New Booking', desc: 'Room 302 booked by John Doe', time: '2 min ago' },
            { id: 2, title: 'Payment Success', desc: 'Invoice #XP-992 has been paid', time: '1 hour ago' },
            { id: 3, title: 'System Update', desc: 'V.2.0 is now live on production', time: '5 hours ago' }
          ],
          onViewAllNotifications: () => alert('View All Notifications clicked')
        }
      }}
    >
      {dummyContent}
    </PanelLayout>
  )
}

export const CustomNavbar: Story = {
  render: () => (
    <PanelLayout
      sidebar={{
        menuItems: dummyMenuItems,
        activeMenuIds: new Set([1])
      }}
      navbar={{
        userAccount: {
          userProfile: {
            displayName: 'Custom User',
            roleName: 'Manager',
            roleCode: 'manager',
          },
          onLogout: () => alert('Logout clicked'),
          isActive: false,
        },
        notification: {
          isActive: false,
        },
        customElements: [
          {
            key: 'search-bar',
            order: 1,
            placement: 'center',
            element: (
              <div className="hidden md:flex items-center bg-neutral-100 rounded-full px-4 py-2 w-96">
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>
            )
          },
          {
            key: 'create-button',
            order: 0,
            placement: 'left',
            element: (
              <NavbarDropdown>
                <NavbarDropdown.Menu>
                  <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-700 transition-colors">
                    <span className="hidden md:inline">Create</span>
                  </button>
                </NavbarDropdown.Menu>
                <NavbarDropdown.List placement="right">
                  <NavbarDropdown.Content>
                    <NavbarDropdown.Item>Create User</NavbarDropdown.Item>
                    <NavbarDropdown.Item>Create Report</NavbarDropdown.Item>
                  </NavbarDropdown.Content>
                </NavbarDropdown.List>
              </NavbarDropdown>
            )
          }
        ]
      }}
    >
      {dummyContent}
    </PanelLayout>
  )
}
