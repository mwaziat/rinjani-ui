'use client'

import React, { useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from '../Icons'
import { useTabsContext } from './Tabs.context'
import type { TabsListProps } from './Tabs.types'

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className = '', scrollable = false, children }, ref) => {
  const { variant, placement, align } = useTabsContext()
  const isVerticalMode = placement === 'vertical-left' || placement === 'vertical-right'
  const isHorizontalMode = placement === 'horizontal-top' || placement === 'horizontal-bottom'
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    const amount = 120
    if (!scrollable) return

    if (isVerticalMode) {
      el.scrollBy({ top: dir === 'next' ? amount : -amount, behavior: 'smooth' })
    }

    if (isHorizontalMode) {
      el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' })
    }
  }

  let containerBorderClass = ''
  if (variant === 'line') {
    if (placement === 'vertical-left') containerBorderClass = 'border-r border-neutral-200'
    else if (placement === 'vertical-right') containerBorderClass = 'border-l border-neutral-200'
    else if (placement === 'horizontal-top') containerBorderClass = 'border-b border-neutral-200'
    else if (placement === 'horizontal-bottom') containerBorderClass = 'border-t border-neutral-200'
  } else {
    containerBorderClass = 'p-1.5 rounded-xl border border-neutral-200 bg-neutral-50/50'
  }

  const mainAxisAlignMap: Record<string, string> = { left: 'justify-start', center: 'justify-center', right: 'justify-end', fullWidth: 'justify-start' }
  const mainAxisAlign = mainAxisAlignMap[align] || 'justify-start'

  const listClass = isVerticalMode
    ? `flex flex-col items-stretch ${mainAxisAlign} ${scrollable ? 'overflow-y-auto overflow-x-hidden no-scrollbar' : 'overflow-visible'}`
    : `flex flex-row items-center ${mainAxisAlign} ${scrollable ? 'overflow-x-auto overflow-y-hidden no-scrollbar' : 'overflow-visible'}`

  return (
    <div ref={ref} className={`relative flex ${isVerticalMode ? 'flex-col' : 'flex-row'} items-center gap-1 ${containerBorderClass} ${className}`}>
      {scrollable && (
        <button
          type="button"
          onClick={() => scroll('prev')}
          className="shrink-0 rounded p-0.5 text-neutral-500 hover:text-neutral-700 transition-colors"
          aria-label="previous"
        >
          {isVerticalMode ? <ChevronUpIcon size={14} /> : <ChevronLeftIcon size={14} />}
        </button>
      )}

      <div ref={scrollRef} className={`flex-1 min-w-0 ${isVerticalMode ? 'w-full' : ''} ${listClass}`}>
        {children}
      </div>

      {scrollable && (
        <button
          type="button"
          onClick={() => scroll('next')}
          className="shrink-0 rounded p-0.5 text-neutral-500 hover:text-neutral-700 transition-colors"
          aria-label="next"
        >
          {isVerticalMode ? <ChevronDownIcon size={14} /> : <ChevronRightIcon size={14} />}
        </button>
      )}
    </div>
  )
})

TabsList.displayName = 'TabsList'
