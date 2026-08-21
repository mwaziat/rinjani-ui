"use client"

import React from "react"
import { Badge } from "rinjani-ui"
import { FiCheck, FiX, FiStar, FiAlertCircle } from "react-icons/fi"

export function BasicDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="filled">Filled</Badge>
      <Badge variant="outlined">Outlined</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="text">Text</Badge>
    </div>
  )
}

export function ColorsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="neutral">Neutral</Badge>
    </div>
  )
}

export function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="xxs">XXSmall</Badge>
      <Badge size="xs">XSmall</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">XLarge</Badge>
    </div>
  )
}

export function PillDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge isPill>Default</Badge>
      <Badge isPill color="success">Success</Badge>
      <Badge isPill color="danger" variant="outlined">Danger</Badge>
      <Badge isPill color="warning" variant="soft">Warning</Badge>
    </div>
  )
}

export function WithIconsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge leftIcon={<FiCheck size={12} />} color="success">Approved</Badge>
      <Badge leftIcon={<FiX size={12} />} color="danger">Rejected</Badge>
      <Badge leftIcon={<FiStar size={12} />} color="warning">Featured</Badge>
      <Badge rightIcon={<FiAlertCircle size={12} />} color="info" variant="outlined">Notice</Badge>
    </div>
  )
}

export function StatusDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge color="success" variant="soft" isPill leftIcon={<span className="w-1.5 h-1.5 rounded-full bg-success-500 inline-block" />}>Active</Badge>
      <Badge color="warning" variant="soft" isPill leftIcon={<span className="w-1.5 h-1.5 rounded-full bg-warning-500 inline-block" />}>Pending</Badge>
      <Badge color="danger" variant="soft" isPill leftIcon={<span className="w-1.5 h-1.5 rounded-full bg-danger-500 inline-block" />}>Inactive</Badge>
      <Badge color="neutral" variant="soft" isPill leftIcon={<span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />}>Draft</Badge>
    </div>
  )
}
