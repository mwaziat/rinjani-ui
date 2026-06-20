'use client'

import React from 'react'
import { useTabsContext } from './Tabs.context'
import type { TabsItemProps } from './Tabs.types'
import { getTriggerClass } from './Tabs.utils'
import { justifyMap } from './Tabs.styles'

export const TabsItem = ({ value, children, icon, iconPosition = 'start', disabled = false, className = '' }: TabsItemProps) => {
  const { activeTab, onChange, color, size, variant, placement, align, alignLabel } = useTabsContext()
  const isActive = activeTab === value

  const baseLabel = alignLabel.startsWith('wrapped-') ? alignLabel.slice(8) : alignLabel
  const isWrapped = alignLabel.startsWith('wrapped-')
  const labelAlignClass = `${justifyMap[baseLabel as string] ?? 'justify-center'} ${isWrapped ? 'whitespace-normal' : ''}`
  const tabClass = `${getTriggerClass(isActive, placement, variant, size, color)} ${align === 'fullWidth' && !(placement === 'vertical-left' || placement === 'vertical-right') ? 'flex-1' : ''}`

  let flexDirection = 'flex-row'
  if (iconPosition === 'end') flexDirection = 'flex-row-reverse'
  if (iconPosition === 'top') flexDirection = 'flex-col justify-center'
  if (iconPosition === 'bottom') flexDirection = 'flex-col-reverse justify-center'

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={`${tabClass} ${flexDirection} ${className}`.trim()}
      onClick={() => !disabled && onChange(value)}
    >
      {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      {children && <span className={labelAlignClass}>{children}</span>}
    </button>
  )
}
