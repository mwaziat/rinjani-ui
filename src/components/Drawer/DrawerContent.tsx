import React from 'react'
import type { DrawerContentProps } from './Drawer.types'

export const DrawerContent = ({ children, className = '' }: DrawerContentProps) => (
  <div className={`flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neutral-200 ${className}`}>
    {children}
  </div>
)
