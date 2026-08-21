"use client"

import React, { useState } from "react"
import { DatePicker } from "rinjani-ui"

export function BasicDemo() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <div className="w-72">
      <DatePicker label="Date" value={value} onChange={setValue} />
    </div>
  )
}

export function FloatingDemo() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <div className="w-72">
      <DatePicker label="Date of birth" value={value} onChange={setValue} floating />
    </div>
  )
}

export function ClearableDemo() {
  const [value, setValue] = useState<Date | null>(new Date())
  return (
    <div className="w-72">
      <DatePicker label="Appointment" value={value} onChange={setValue} isClearable />
    </div>
  )
}

export function MinMaxDemo() {
  const [value, setValue] = useState<Date | null>(null)
  const today = new Date()
  const min = new Date(today.getFullYear(), today.getMonth(), 1)
  const max = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  return (
    <div className="w-72">
      <DatePicker
        label="This month only"
        value={value}
        onChange={setValue}
        minDate={min}
        maxDate={max}
      />
    </div>
  )
}

export function ErrorDemo() {
  return (
    <div className="w-72">
      <DatePicker label="Start date" onChange={() => {}} error="Start date is required." />
    </div>
  )
}
