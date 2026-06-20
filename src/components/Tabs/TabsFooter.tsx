'use client'

import React from 'react'
import type { TabsFooterProps } from './Tabs.types'

export const TabsFooter = ({ children, className = '' }: TabsFooterProps) => {
  return <div className={className}>{children}</div>
}
