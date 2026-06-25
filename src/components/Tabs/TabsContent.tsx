'use client'

import React from 'react'
import { useTabsContext } from './Tabs.context'
import type { TabsContentProps } from './Tabs.types'

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ value, children, className = '' }, ref) => {
  const { activeTab, placement } = useTabsContext()

  if (activeTab !== value) return null

  const isVertical = placement.startsWith('vertical')
  const baseClass = isVertical ? 'flex-1' : ''

  return <div ref={ref} className={`${baseClass} ${className}`.trim()}>{children}</div>
})

TabsContent.displayName = 'TabsContent'
