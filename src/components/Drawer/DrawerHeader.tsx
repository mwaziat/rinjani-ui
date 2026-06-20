import React from 'react'
import { XIcon } from '../Icons'
import { IconButton } from '../Button'
import type { DrawerHeaderProps } from './Drawer.types'

export const DrawerHeader = ({ title, subtitle, onClose }: DrawerHeaderProps) => (
  <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5 shrink-0">
    <div className="flex flex-col">
      <h3 className="text-sm font-semibold text-neutral-900 leading-none">{title}</h3>
      {subtitle && <p className="mt-1.5 text-xs font-normal text-neutral-500">{subtitle}</p>}
    </div>
    <IconButton 
      variant="text" 
      size="sm" 
      color="danger"
      icon={<XIcon />} 
      onClick={onClose} 
    />
  </div>
)
