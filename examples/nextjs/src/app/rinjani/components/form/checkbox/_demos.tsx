"use client"

import React, { useState } from "react"
import { Checkbox } from "rinjani-ui"

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Disabled", value: "disabled", disabled: true },
]

export function BasicDemo() {
  const [values, setValues] = useState<(string | number)[]>(["apple"])
  return (
    <Checkbox label="Select fruits" options={options} values={values} onChange={setValues} />
  )
}

export function RowDemo() {
  const [values, setValues] = useState<(string | number)[]>([])
  return (
    <Checkbox label="Horizontal layout" options={options.slice(0, 3)} values={values} onChange={setValues} orientation="row" />
  )
}

export function ColorsDemo() {
  const [values, setValues] = useState<(string | number)[]>(["apple"])
  return (
    <div className="space-y-3">
      {(["primary", "success", "danger", "warning"] as const).map((color) => (
        <Checkbox key={color} options={options.slice(0, 2)} values={values} onChange={setValues} color={color} />
      ))}
    </div>
  )
}

export function ErrorDemo() {
  const [values, setValues] = useState<(string | number)[]>([])
  return (
    <Checkbox label="Required selection" options={options.slice(0, 3)} values={values} onChange={setValues} error="Please select at least one option." required />
  )
}
