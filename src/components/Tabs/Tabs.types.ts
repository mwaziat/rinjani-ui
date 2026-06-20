import type { ReactNode } from 'react'

export type TabSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TabVariant = 'filled' | 'outlined' | 'soft' | 'text' | 'line'
export type TabColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type TabAlign = 'left' | 'center' | 'right' | 'fullWidth'
export type TabAlignLabel = 'left' | 'center' | 'right' | 'wrapped-left' | 'wrapped-center' | 'wrapped-right'
export type TabPlacement = 'horizontal-top' | 'horizontal-bottom' | 'vertical-left' | 'vertical-right'

export interface TabsProps {
  activeTab: string
  onChange: (value: string) => void
  color?: TabColor
  variant?: TabVariant
  size?: TabSize
  align?: TabAlign
  alignLabel?: TabAlignLabel
  placement?: TabPlacement
  className?: string
  children: ReactNode
}

export interface TabsListProps {
  className?: string
  scrollable?: boolean
  children: ReactNode
}

export interface TabsItemProps {
  value: string
  children?: ReactNode
  icon?: ReactNode
  iconPosition?: 'start' | 'end' | 'top' | 'bottom'
  disabled?: boolean
  className?: string
}

export interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

export interface TabsFooterProps {
  children: ReactNode
  className?: string
}
