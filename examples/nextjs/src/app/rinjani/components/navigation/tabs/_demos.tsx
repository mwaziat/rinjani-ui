"use client"

import React, { useState } from "react"
import { Tabs } from "rinjani-ui"
import { FiUser, FiSettings, FiBell } from "react-icons/fi"

export function BasicDemo() {
  const [tab, setTab] = useState("tab1")
  return (
    <div className="w-full">
      <Tabs activeTab={tab} onChange={setTab}>
        <Tabs.List>
          <Tabs.Item value="tab1">Profile</Tabs.Item>
          <Tabs.Item value="tab2">Settings</Tabs.Item>
          <Tabs.Item value="tab3">Notifications</Tabs.Item>
        </Tabs.List>
        <Tabs.Content value="tab1"><p className="text-sm text-neutral-600 py-4">Profile content</p></Tabs.Content>
        <Tabs.Content value="tab2"><p className="text-sm text-neutral-600 py-4">Settings content</p></Tabs.Content>
        <Tabs.Content value="tab3"><p className="text-sm text-neutral-600 py-4">Notifications content</p></Tabs.Content>
      </Tabs>
    </div>
  )
}

export function VariantsDemo() {
  const [tab, setTab] = useState("a")
  const items = ["Overview", "Details", "History"]
  return (
    <div className="w-full space-y-4">
      {(["line", "filled", "soft", "outlined"] as const).map((variant) => (
        <Tabs key={variant} activeTab={tab} onChange={setTab} variant={variant}>
          <Tabs.List>
            {items.map((item) => (
              <Tabs.Item key={item} value={item}>{item}</Tabs.Item>
            ))}
          </Tabs.List>
        </Tabs>
      ))}
    </div>
  )
}

export function ColorsDemo() {
  const [tab, setTab] = useState("a")
  return (
    <div className="w-full space-y-4">
      {(["primary", "secondary", "success", "danger"] as const).map((color) => (
        <Tabs key={color} activeTab={tab} onChange={setTab} color={color}>
          <Tabs.List>
            <Tabs.Item value="a">First</Tabs.Item>
            <Tabs.Item value="b">Second</Tabs.Item>
            <Tabs.Item value="c">Third</Tabs.Item>
          </Tabs.List>
        </Tabs>
      ))}
    </div>
  )
}

export function WithIconsDemo() {
  const [tab, setTab] = useState("profile")
  return (
    <div className="w-full">
      <Tabs activeTab={tab} onChange={setTab}>
        <Tabs.List>
          <Tabs.Item value="profile" icon={<FiUser size={14} />}>Profile</Tabs.Item>
          <Tabs.Item value="settings" icon={<FiSettings size={14} />}>Settings</Tabs.Item>
          <Tabs.Item value="notifications" icon={<FiBell size={14} />}>Notifications</Tabs.Item>
        </Tabs.List>
        <Tabs.Content value="profile"><p className="text-sm text-neutral-600 py-4">Profile content</p></Tabs.Content>
        <Tabs.Content value="settings"><p className="text-sm text-neutral-600 py-4">Settings content</p></Tabs.Content>
        <Tabs.Content value="notifications"><p className="text-sm text-neutral-600 py-4">Notifications content</p></Tabs.Content>
      </Tabs>
    </div>
  )
}

export function VerticalDemo() {
  const [tab, setTab] = useState("profile")
  return (
    <div className="w-full">
      <Tabs activeTab={tab} onChange={setTab} placement="vertical-left">
        <Tabs.List>
          <Tabs.Item value="profile" icon={<FiUser size={14} />}>Profile</Tabs.Item>
          <Tabs.Item value="settings" icon={<FiSettings size={14} />}>Settings</Tabs.Item>
          <Tabs.Item value="notifications" icon={<FiBell size={14} />}>Notifications</Tabs.Item>
        </Tabs.List>
        <Tabs.Content value="profile"><p className="text-sm text-neutral-600 p-4">Profile content</p></Tabs.Content>
        <Tabs.Content value="settings"><p className="text-sm text-neutral-600 p-4">Settings content</p></Tabs.Content>
        <Tabs.Content value="notifications"><p className="text-sm text-neutral-600 p-4">Notifications content</p></Tabs.Content>
      </Tabs>
    </div>
  )
}
