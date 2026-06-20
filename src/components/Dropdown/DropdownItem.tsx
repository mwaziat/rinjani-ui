import React from 'react'
import type { DropdownItemProps } from './Dropdown.types'
import { itemColorClasses } from './Dropdown.styles'

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(({ 
  children, 
  leftIcon,
  rightIcon,
  color = 'neutral', 
  className = '', 
  ...props 
}, ref) => {
  const colorClass = itemColorClasses[color] || itemColorClasses.neutral

  return (
    <button
      ref={ref}
      type="button"
      className={`flex items-center gap-2 px-3 py-2 text-sm text-left rounded-md w-full transition-colors ${colorClass} ${className}`}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="shrink-0 ml-auto">{rightIcon}</span>}
    </button>
  )
})

DropdownItem.displayName = 'DropdownItem'
