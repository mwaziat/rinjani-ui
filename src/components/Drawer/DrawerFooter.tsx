import React from 'react'
import type { DrawerFooterProps } from './Drawer.types'

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children, className = '' }) => (
  <div className={`shrink-0 border-t border-neutral-100 p-6 bg-neutral-50/50 flex items-center justify-end gap-3 ${className}`}>
    {children}
  </div>
)
