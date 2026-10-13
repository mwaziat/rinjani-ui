"use client"

import React from "react"
import { Breadcrumb, ImageIcon, SettingsIcon, UserIcon } from "rinjani-ui"
import { FiChevronRight } from "react-icons/fi"

const paths = [
  { label: "Home", href: "/", icon: <ImageIcon size={16} /> },
  { label: "Management", href: "/management", icon: <UserIcon size={16} /> },
]

const colors = ["primary", "secondary", "success", "warning", "danger", "info", "neutral"] as const
const variants = ["filled", "outlined", "soft", "text", "line"] as const
const sizes = ["xxs", "xs", "sm", "md", "lg", "xl"] as const
const previewIcon = <SettingsIcon size={20} />

export function BasicDemo() {
  return (
    <div className="w-full">
      <Breadcrumb paths={paths} activeLabel="System Settings" activeIcon={previewIcon} contained={false} className="w-full md:flex-row" />
    </div>
  )
}

export function ColorsDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[760px] text-left">
        <div className="grid grid-cols-[7rem_minmax(0,1fr)] border-b border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-500">
          <span>Color</span>
          <span>Preview</span>
        </div>

        {colors.map((color) => (
          <div key={color} className="grid grid-cols-[7rem_minmax(0,1fr)] items-center border-b border-neutral-100 px-4 py-3 last:border-0">
            <span className="font-medium capitalize text-neutral-700">{color}</span>
            <Breadcrumb
              color={color}
              variant="filled"
              size="md"
              activeLabel={`${color} Settings`}
              activeIcon={previewIcon}
              paths={paths}
              contained={false}
              className="w-full md:flex-row"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ContainedDemo() {
  return (
    <div className="w-full divide-y divide-neutral-100">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-2 px-4 py-4 md:flex-row md:items-center">
          <p className="w-28 shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">{variant}</p>
          <Breadcrumb
            paths={paths}
            activeLabel={`${variant} Settings`}
            activeIcon={previewIcon}
            contained={false}
            variant={variant}
            className="min-w-0 flex-1 md:flex-row"
          />
        </div>
      ))}
    </div>
  )
}

export function WithIconsDemo() {
  return (
    <div className="w-full">
      <Breadcrumb paths={paths} activeLabel="System Settings" activeIcon={previewIcon} contained={false} className="w-full md:flex-row" />
    </div>
  )
}

export function CustomSeparatorDemo() {
  const examples = [
    { label: "Slash", separator: "/" },
    { label: "Arrow", separator: <FiChevronRight size={14} /> },
    { label: "Dot", separator: "·" },
  ]

  return (
    <div className="w-full space-y-4">
      {examples.map(({ label, separator }) => (
        <div key={label} className="grid gap-2 md:grid-cols-[7rem_minmax(0,1fr)] md:items-center">
          <span className="text-sm font-medium text-neutral-600">{label}</span>
          <Breadcrumb paths={paths} activeLabel="Advanced" activeIcon={previewIcon} separator={separator} contained={false} className="w-full md:flex-row" />
        </div>
      ))}
    </div>
  )
}

export function AlignmentDemo() {
  return (
    <div className="w-full space-y-4">
      <Breadcrumb
        paths={paths}
        activeLabel="Room List"
        activeIcon={previewIcon}
        currentPosition="Left aligned"
        justify="start"
        contained={false}
        className="w-full md:flex-row"
      />
      <Breadcrumb
        paths={paths}
        activeLabel="Room List"
        activeIcon={previewIcon}
        currentPosition="Custom current position"
        justify="end"
        rightContent={<button type="button" className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700">Actions</button>}
        contained={false}
        className="w-full md:flex-row"
      />
    </div>
  )
}

export function SizesDemo() {
  return (
    <div className="w-full space-y-3">
      {sizes.map((size) => (
        <Breadcrumb
          key={size}
          paths={paths}
          activeLabel={`${size.toUpperCase()} Details`}
          activeIcon={previewIcon}
          color="primary"
          variant="line"
          size={size}
          contained={false}
          className="w-full md:flex-row"
        />
      ))}
    </div>
  )
}
