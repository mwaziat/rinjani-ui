'use client'

import React from 'react'
import { useTabsContext } from './Tabs.context'
import type { TabsContentProps } from './Tabs.types'

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ value, children, className = '', style }, ref) => {
  const { activeTab, placement, behavior, scrollOffset, scrollContainer } = useTabsContext()

  if (behavior === 'panel' && activeTab !== value) return null

  const isVertical = placement.startsWith('vertical')
  const baseClass = isVertical ? 'flex-1' : ''
  const scrollStyle = behavior === 'scroll' && !scrollContainer && scrollOffset > 0
    ? { scrollMarginTop: `${scrollOffset}px` }
    : undefined

  return <div ref={ref} id={`tabpanel-${value}`} data-tabs-content={value} style={{ ...style, ...scrollStyle }} className={`${baseClass} ${className}`.trim()}>{children}</div>
})

TabsContent.displayName = 'TabsContent'
