"use client"

import React, { useState } from "react"
import { InputField } from "rinjani-ui"
import { FiSearch, FiMail, FiLock } from "react-icons/fi"

export function BasicDemo() {
  const [value, setValue] = useState("")
  return (
    <div className="w-72">
      <InputField
        label="Full name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  )
}

export function VariantsDemo() {
  return (
    <div className="w-72 space-y-3">
      <InputField label="Outlined" variant="outlined" placeholder="outlined" />
      <InputField label="Filled" variant="filled" placeholder="filled" />
      <InputField label="Line" variant="line" placeholder="line" />
    </div>
  )
}

export function FloatingLabelDemo() {
  const [value, setValue] = useState("")
  return (
    <div className="w-72 space-y-3">
      <InputField label="Email address" floating value={value} onChange={(e) => setValue(e.target.value)} />
      <InputField label="Password" floating isPassword />
    </div>
  )
}

export function WithIconsDemo() {
  return (
    <div className="w-72 space-y-3">
      <InputField label="Search" leftIcon={<FiSearch size={16} />} placeholder="Search..." />
      <InputField label="Email" leftIcon={<FiMail size={16} />} placeholder="you@example.com" />
      <InputField label="Password" leftIcon={<FiLock size={16} />} isPassword />
    </div>
  )
}

export function PasswordDemo() {
  return (
    <div className="w-72">
      <InputField label="Password" isPassword placeholder="Enter password" />
    </div>
  )
}

export function MultilineDemo() {
  const [value, setValue] = useState("")
  return (
    <div className="w-72">
      <InputField
        label="Bio"
        isMultiline
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tell us about yourself..."
      />
    </div>
  )
}

export function ErrorDemo() {
  return (
    <div className="w-72 space-y-3">
      <InputField label="Email" error="Please enter a valid email address." placeholder="you@example.com" />
      <InputField label="Username" error="Username already taken." placeholder="username" />
    </div>
  )
}

export function CurrencyDemo() {
  const [value, setValue] = useState("")
  return (
    <div className="w-72">
      <InputField
        label="Amount"
        format="currency"
        currency="USD"
        locale="en-US"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="0.00"
      />
    </div>
  )
}
