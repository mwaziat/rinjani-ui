"use client"

import React, { useState } from "react"
import { Switch } from "rinjani-ui"

export function BasicDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <Switch label="Enable notifications" checked={checked} onChange={setChecked} />
  )
}

export function ColorsDemo() {
  const [checked, setChecked] = useState(true)
  return (
    <div className="space-y-3">
      {(["primary", "success", "danger", "warning", "info"] as const).map((color) => (
        <Switch key={color} label={color} checked={checked} onChange={setChecked} color={color} />
      ))}
    </div>
  )
}

export function SizesDemo() {
  const [checked, setChecked] = useState(true)
  return (
    <div className="space-y-3">
      {(["xxs", "xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Switch key={size} label={`Size: ${size}`} checked={checked} onChange={setChecked} size={size} />
      ))}
    </div>
  )
}

export function LabelPlacementDemo() {
  const [checked, setChecked] = useState(true)
  return (
    <div className="flex flex-wrap gap-6">
      {(["left", "right", "top", "bottom"] as const).map((placement) => (
        <Switch key={placement} label={placement} checked={checked} onChange={setChecked} labelPlacement={placement} />
      ))}
    </div>
  )
}

export function DisabledDemo() {
  return (
    <div className="space-y-3">
      <Switch label="Disabled off" checked={false} onChange={() => {}} disabled />
      <Switch label="Disabled on" checked={true} onChange={() => {}} disabled />
    </div>
  )
}
