'use client'

import React from 'react'
import type { TabsFooterProps } from './Tabs.types'

export const TabsFooter = React.forwardRef<HTMLDivElement, TabsFooterProps>(({ children, className = '' }, ref) => {
  return <div ref={ref} className={className}>{children}</div>
})

TabsFooter.displayName = 'TabsFooter'
