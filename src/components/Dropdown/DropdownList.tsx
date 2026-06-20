import React from 'react'
import type { DropdownListProps } from './Dropdown.types'

export const DropdownList = ({ children, className = '' }: DropdownListProps) => {
  return (
    <div className={`flex flex-col gap-1 min-w-40 p-2 ${className}`}>
      {children}
    </div>
  )
}
