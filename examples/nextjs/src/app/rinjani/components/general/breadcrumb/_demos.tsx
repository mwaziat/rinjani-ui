"use client"

import React from "react"
import { Breadcrumb } from "rinjani-ui"
import { FiHome, FiChevronRight } from "react-icons/fi"

const basePaths = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
]

export function BasicDemo() {
  return (
    <Breadcrumb
      paths={basePaths}
      activeLabel="Breadcrumb"
    />
  )
}

export function ColorsDemo() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {(["primary", "secondary", "success", "danger", "warning"] as const).map((color) => (
        <Breadcrumb key={color} paths={[{ label: "Home", href: "/" }]} activeLabel={color} color={color} />
      ))}
    </div>
  )
}

export function ContainedDemo() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Breadcrumb paths={basePaths} activeLabel="Filled" contained variant="filled" />
      <Breadcrumb paths={basePaths} activeLabel="Outlined" contained variant="outlined" />
      <Breadcrumb paths={basePaths} activeLabel="Soft" contained variant="soft" />
      <Breadcrumb paths={basePaths} activeLabel="Line" contained variant="line" />
    </div>
  )
}

export function WithIconsDemo() {
  return (
    <Breadcrumb
      paths={[
        { label: "Home", href: "/", icon: <FiHome size={14} /> },
        { label: "Components", href: "/components" },
      ]}
      activeLabel="Breadcrumb"
    />
  )
}

export function CustomSeparatorDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb paths={basePaths} activeLabel="Slash" separator="/" />
      <Breadcrumb paths={basePaths} activeLabel="Arrow" separator={<FiChevronRight size={14} />} />
      <Breadcrumb paths={basePaths} activeLabel="Dot" separator="·" />
    </div>
  )
}

export function SizesDemo() {
  return (
    <div className="flex flex-col gap-3">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Breadcrumb key={size} paths={basePaths} activeLabel={`Size ${size}`} size={size} />
      ))}
    </div>
  )
}
