import { createContext, useContext } from 'react'
import type { TabColor, TabSize, TabVariant, TabAlign, TabAlignLabel, TabPlacement } from './Tabs.types'

export interface TabsContextValue {
  activeTab: string
  onChange: (value: string) => void
  color: TabColor
  size: TabSize
  variant: TabVariant
  align: TabAlign
  alignLabel: TabAlignLabel
  placement: TabPlacement
}

export const TabsContext = createContext<TabsContextValue | null>(null)
export const TabsProvider = TabsContext.Provider

export function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs sub-components must be used inside <Tabs>')
  return ctx
}
