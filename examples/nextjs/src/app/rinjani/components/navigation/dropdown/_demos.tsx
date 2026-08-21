"use client"

import React, { useState } from "react"
import { Dropdown, DropdownList, DropdownItem } from "rinjani-ui"
import { FiSettings, FiEdit, FiTrash2, FiUser, FiLogOut, FiPlus, FiDownload } from "react-icons/fi"

export function BasicDemo() {
  return (
    <Dropdown label="Options">
      <DropdownList>
        <DropdownItem leftIcon={<FiEdit size={14} />}>Edit</DropdownItem>
        <DropdownItem leftIcon={<FiDownload size={14} />}>Download</DropdownItem>
        <DropdownItem leftIcon={<FiTrash2 size={14} />} color="danger">Delete</DropdownItem>
      </DropdownList>
    </Dropdown>
  )
}

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Dropdown label="Filled" variant="filled">
        <DropdownList><DropdownItem>Item</DropdownItem></DropdownList>
      </Dropdown>
      <Dropdown label="Outlined" variant="outlined">
        <DropdownList><DropdownItem>Item</DropdownItem></DropdownList>
      </Dropdown>
      <Dropdown label="Soft" variant="soft">
        <DropdownList><DropdownItem>Item</DropdownItem></DropdownList>
      </Dropdown>
      <Dropdown label="Text" variant="text">
        <DropdownList><DropdownItem>Item</DropdownItem></DropdownList>
      </Dropdown>
    </div>
  )
}

export function ColorsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["primary", "secondary", "success", "warning", "danger"] as const).map((color) => (
        <Dropdown key={color} label={color} color={color} variant="soft">
          <DropdownList><DropdownItem>Item</DropdownItem></DropdownList>
        </Dropdown>
      ))}
    </div>
  )
}

export function WithIconDemo() {
  return (
    <Dropdown label="Account" icon={<FiUser size={14} />}>
      <DropdownList>
        <DropdownItem leftIcon={<FiSettings size={14} />}>Settings</DropdownItem>
        <DropdownItem leftIcon={<FiUser size={14} />}>Profile</DropdownItem>
        <DropdownItem leftIcon={<FiLogOut size={14} />} color="danger">Sign out</DropdownItem>
      </DropdownList>
    </Dropdown>
  )
}

export function PlacementsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["bottom-start", "bottom-end", "top-start"] as const).map((p) => (
        <Dropdown key={p} label={p} placement={p}>
          <DropdownList>
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
          </DropdownList>
        </Dropdown>
      ))}
    </div>
  )
}

export function NoArrowDemo() {
  return (
    <Dropdown label="No arrow" showArrow={false}>
      <DropdownList>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
      </DropdownList>
    </Dropdown>
  )
}

export function IconOnlyDemo() {
  return (
    <Dropdown icon={<FiSettings size={16} />} showArrow={false} variant="outlined">
      <DropdownList>
        <DropdownItem leftIcon={<FiEdit size={14} />}>Edit</DropdownItem>
        <DropdownItem leftIcon={<FiTrash2 size={14} />} color="danger">Delete</DropdownItem>
      </DropdownList>
    </Dropdown>
  )
}
