"use client"

import React, { useState } from "react"
import { Radio } from "rinjani-ui"

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
  { label: "Disabled", value: "d", disabled: true },
]

export function BasicDemo() {
  const [value, setValue] = useState<string | number>("a")
  return (
    <Radio label="Select an option" options={options} value={value} onChange={setValue} />
  )
}

export function RowDemo() {
  const [value, setValue] = useState<string | number>("")
  return (
    <Radio label="Horizontal layout" options={options.slice(0, 3)} value={value} onChange={setValue} orientation="row" />
  )
}

export function ColorsDemo() {
  const [value, setValue] = useState<string | number>("a")
  return (
    <div className="space-y-3">
      {(["primary", "success", "danger", "warning"] as const).map((color) => (
        <Radio key={color} options={options.slice(0, 3)} value={value} onChange={setValue} color={color} />
      ))}
    </div>
  )
}

export function CardDemo() {
  const [value, setValue] = useState<string | number>("a")
  return (
    <Radio
      label="Card appearance"
      options={[
        { label: "Starter", value: "starter" },
        { label: "Pro", value: "pro" },
        { label: "Enterprise", value: "enterprise" },
      ]}
      value={value}
      onChange={setValue}
      appearance="card"
      orientation="row"
    />
  )
}
