"use client"

import React, { useState } from "react"
import { Select, SelectMultiple } from "rinjani-ui"
import type { SelectValue, SelectMultipleValue } from "rinjani-ui"

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Durian", value: "durian", disabled: true },
  { label: "Elderberry", value: "elderberry" },
]

const countryOptions = [
  { label: "Indonesia", value: "id" },
  { label: "Malaysia", value: "my" },
  { label: "Singapore", value: "sg" },
  { label: "Thailand", value: "th" },
  { label: "Vietnam", value: "vn" },
]

export function BasicDemo() {
  const [value, setValue] = useState<SelectValue>("")
  return (
    <div className="w-72">
      <Select label="Fruit" options={options} value={value} onChange={setValue} placeholder="Select a fruit" />
    </div>
  )
}

export function VariantsDemo() {
  return (
    <div className="w-72 space-y-3">
      <Select label="Outlined" variant="outlined" options={options} onChange={() => {}} placeholder="outlined" />
      <Select label="Filled" variant="filled" options={options} onChange={() => {}} placeholder="filled" />
      <Select label="Line" variant="line" options={options} onChange={() => {}} placeholder="line" />
    </div>
  )
}

export function ClearableDemo() {
  const [value, setValue] = useState<SelectValue>("")
  return (
    <div className="w-72">
      <Select label="Country" options={countryOptions} value={value} onChange={setValue} placeholder="Select a country" isClearable />
    </div>
  )
}

export function FloatingDemo() {
  const [value, setValue] = useState<SelectValue>("")
  return (
    <div className="w-72">
      <Select label="Country" options={countryOptions} value={value} onChange={setValue} floating />
    </div>
  )
}

export function MultipleDemo() {
  const [values, setValues] = useState<SelectMultipleValue>([])
  return (
    <div className="w-72">
      <SelectMultiple label="Fruits" options={options} value={values} onChange={setValues} placeholder="Select fruits" isClearable />
    </div>
  )
}

export function ErrorDemo() {
  return (
    <div className="w-72">
      <Select label="Country" options={countryOptions} onChange={() => {}} error="Please select a country." placeholder="Select..." />
    </div>
  )
}
