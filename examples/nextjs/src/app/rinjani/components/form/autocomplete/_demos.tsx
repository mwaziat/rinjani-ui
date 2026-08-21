"use client"

import React, { useState } from "react"
import { Autocomplete } from "rinjani-ui"
import type { SelectValue, SelectOption } from "rinjani-ui"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Apricot", value: "apricot" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Coconut", value: "coconut" },
  { label: "Grape", value: "grape" },
  { label: "Guava", value: "guava" },
]

export function BasicDemo() {
  const [value, setValue] = useState<SelectValue>("")
  return (
    <div className="w-72">
      <Autocomplete label="Fruit" options={fruits} value={value} onChange={setValue} placeholder="Type to search..." />
    </div>
  )
}

export function ClearableDemo() {
  const [value, setValue] = useState<SelectValue>("")
  return (
    <div className="w-72">
      <Autocomplete label="Fruit" options={fruits} value={value} onChange={setValue} isClearable placeholder="Type to search..." />
    </div>
  )
}

export function AddItemDemo() {
  const [options, setOptions] = useState<SelectOption[]>(fruits)
  const [value, setValue] = useState<SelectValue>("")
  return (
    <div className="w-72">
      <Autocomplete
        label="Fruit"
        options={options}
        value={value}
        onChange={setValue}
        enableAddItem
        addItemLabel="Add fruit"
        onAddItem={(opt) => setOptions((prev) => [...prev, opt])}
        placeholder="Type or add new..."
      />
    </div>
  )
}

export function ErrorDemo() {
  return (
    <div className="w-72">
      <Autocomplete label="Fruit" options={fruits} onChange={() => {}} error="Please select a valid option." placeholder="Type to search..." />
    </div>
  )
}
