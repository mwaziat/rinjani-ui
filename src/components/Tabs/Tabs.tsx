'use client'

import React from 'react'
import { TabsProvider } from './Tabs.context'
import type { TabsProps } from './Tabs.types'

/**
 * A navigational component used to switch between different views or data sets within the same context.
 * 
 * Uses a compound component pattern (`Tabs.List`, `Tabs.Item`, `Tabs.Content`) coupled with 
 * a Context API to manage the active state cleanly without prop drilling.
 * 
 * @example
 * ```tsx
 * const [active, setActive] = useState('account')
 * 
 * return (
 *   <Tabs activeTab={active} onChange={setActive} variant="line">
 *     <Tabs.List>
 *       <Tabs.Item value="account">Account</Tabs.Item>
 *       <Tabs.Item value="password">Password</Tabs.Item>
 *     </Tabs.List>
 *     <Tabs.Content value="account">Account settings here.</Tabs.Content>
 *     <Tabs.Content value="password">Change password here.</Tabs.Content>
 *   </Tabs>
 * )
 * ```
 */
export const TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(({
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
}, ref) => {
  const isVertical = placement === 'vertical-left' || placement === 'vertical-right'
  const providerValue = { activeTab, onChange, color, size, variant, align, alignLabel, placement }

  const wrapperClass = isVertical
    ? `flex ${placement === 'vertical-right' ? 'flex-row-reverse' : 'flex-row'} gap-4 ${className}`
    : `flex ${placement === 'horizontal-bottom' ? 'flex-col-reverse' : 'flex-col'} gap-4 ${className}`

  return (
    <TabsProvider value={providerValue}>
      <div ref={ref} className={wrapperClass}>
        {children}
      </div>
    </TabsProvider>
  )
})

TabsRoot.displayName = 'TabsRoot'
