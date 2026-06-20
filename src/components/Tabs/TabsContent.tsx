'use client'

import React from 'react'
import { useTabsContext } from './Tabs.context'
import type { TabsContentProps } from './Tabs.types'

export const TabsContent = ({ value, children, className = '' }: TabsContentProps) => {
  const { activeTab, placement } = useTabsContext()

  if (activeTab !== value) return null

  const isVertical = placement.startsWith('vertical')
  const baseClass = isVertical ? 'flex-1' : ''

  return <div className={`${baseClass} ${className}`.trim()}>{children}</div>
}
