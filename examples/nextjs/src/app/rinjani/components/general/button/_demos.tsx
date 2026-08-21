"use client"

import React, { useState } from "react"
import { Button, IconButton } from "rinjani-ui"
import { FiSave, FiTrash2, FiPlus, FiDownload, FiSettings } from "react-icons/fi"

export function BasicDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="text">Text</Button>
    </div>
  )
}

export function ColorsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="info">Info</Button>
      <Button color="neutral">Neutral</Button>
    </div>
  )
}

export function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xxs">XXSmall</Button>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  )
}

export function WithIconsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button leftIcon={<FiPlus size={16} />}>Add Item</Button>
      <Button leftIcon={<FiSave size={16} />} variant="outlined">Save</Button>
      <Button rightIcon={<FiDownload size={16} />} variant="soft">Download</Button>
      <Button leftIcon={<FiTrash2 size={16} />} variant="soft" color="danger">Delete</Button>
    </div>
  )
}

export function PillDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button isPill>Filled Pill</Button>
      <Button isPill variant="outlined">Outlined Pill</Button>
      <Button isPill variant="soft" color="success">Success Pill</Button>
      <Button isPill leftIcon={<FiPlus size={16} />}>Add</Button>
    </div>
  )
}

export function LoadingDemo() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button isLoading>Loading</Button>
      <Button isLoading variant="outlined">Loading</Button>
      <Button isLoading={loading} onClick={handleClick}>
        {loading ? "Saving..." : "Click to load"}
      </Button>
    </div>
  )
}

export function DisabledDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outlined">Disabled</Button>
      <Button disabled variant="soft">Disabled</Button>
      <Button disabled variant="text">Disabled</Button>
    </div>
  )
}

export function FullWidthDemo() {
  return (
    <div className="w-full flex flex-col gap-3">
      <Button fullWidth>Full Width Filled</Button>
      <Button fullWidth variant="outlined">Full Width Outlined</Button>
    </div>
  )
}

export function IconButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <IconButton icon={<FiSettings size={16} />} />
      <IconButton icon={<FiSave size={16} />} variant="outlined" />
      <IconButton icon={<FiTrash2 size={16} />} variant="soft" color="danger" />
      <IconButton icon={<FiPlus size={16} />} isPill />
      <IconButton icon={<FiDownload size={16} />} variant="soft" color="info" isPill />
    </div>
  )
}
