'use client'

import React from 'react'
import { TabsProvider } from './Tabs.context'
import type { TabsProps } from './Tabs.types'

export const TabsRoot = ({
  activeTab,
  onChange,
  color = 'primary',
  size = 'md',
  variant = 'line',
  align = 'left',
  alignLabel = 'center',
  placement = 'horizontal-top',
  className = '',
  children,
}: TabsProps) => {
  const isVertical = placement === 'vertical-left' || placement === 'vertical-right'
  const providerValue = { activeTab, onChange, color, size, variant, align, alignLabel, placement }

  const wrapperClass = isVertical
    ? `flex ${placement === 'vertical-right' ? 'flex-row-reverse' : 'flex-row'} gap-4 ${className}`
    : `flex ${placement === 'horizontal-bottom' ? 'flex-col-reverse' : 'flex-col'} gap-4 ${className}`

  return (
    <TabsProvider value={providerValue}>
      <div className={wrapperClass}>
        {children}
      </div>
    </TabsProvider>
  )
}
