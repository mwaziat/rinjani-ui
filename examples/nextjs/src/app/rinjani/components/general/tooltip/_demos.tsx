"use client"

import React from "react"
import { Tooltip, Button } from "rinjani-ui"

export function BasicDemo() {
  return (
    <Tooltip content="This is a tooltip">
      <Button variant="outlined">Hover me</Button>
    </Tooltip>
  )
}

export function PlacementsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["top", "bottom", "left", "right"] as const).map((p) => (
        <Tooltip key={p} content={`Placement: ${p}`} placement={p}>
          <Button variant="soft" size="sm">{p}</Button>
        </Tooltip>
      ))}
    </div>
  )
}

export function ColorsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["primary", "secondary", "success", "warning", "danger", "info", "neutral"] as const).map((c) => (
        <Tooltip key={c} content={c} color={c}>
          <Button variant="soft" color={c} size="sm">{c}</Button>
        </Tooltip>
      ))}
    </div>
  )
}

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tooltip content="Filled variant" variant="filled">
        <Button variant="soft" size="sm">Filled</Button>
      </Tooltip>
      <Tooltip content="Soft variant" variant="soft" color="primary">
        <Button variant="soft" size="sm">Soft</Button>
      </Tooltip>
      <Tooltip content="Outlined variant" variant="outlined" color="primary">
        <Button variant="soft" size="sm">Outlined</Button>
      </Tooltip>
    </div>
  )
}

export function NoArrowDemo() {
  return (
    <Tooltip content="No arrow on this one" showArrow={false}>
      <Button variant="outlined" size="sm">No arrow</Button>
    </Tooltip>
  )
}

export function PillDemo() {
  return (
    <Tooltip content="Pill tooltip" isPill>
      <Button variant="outlined" size="sm">Pill</Button>
    </Tooltip>
  )
}

export function RichContentDemo() {
  return (
    <Tooltip
      content={
        <div className="space-y-1">
          <p className="font-semibold text-white">Rich tooltip</p>
          <p className="text-neutral-300 text-xs">Tooltips can contain any ReactNode content.</p>
        </div>
      }
      maxWidth="md"
    >
      <Button variant="outlined" size="sm">Rich content</Button>
    </Tooltip>
  )
}
