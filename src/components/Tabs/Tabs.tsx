'use client'

import React from 'react'
import { TabsProvider } from './Tabs.context'
import { TabsContent } from './TabsContent'
import type { TabsContentProps, TabsProps } from './Tabs.types'

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
  behavior = 'panel',
  scrollOffset = 0,
  scrollBehavior = 'smooth',
  scrollSpy = false,
  scrollContainer = false,
  scrollMaxHeight,
  className = '',
  children,
}, ref) => {
  const isVertical = placement === 'vertical-left' || placement === 'vertical-right'
  const rootRef = React.useRef<HTMLDivElement>(null)
  const contentViewportRef = React.useRef<HTMLDivElement>(null)
  const normalizedScrollOffset = Math.max(0, scrollOffset)
  const isIsolatedScroll = behavior === 'scroll' && scrollContainer

  const setRootRef = (node: HTMLDivElement | null) => {
    rootRef.current = node

    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  const findContent = (value: string) => {
    const contentElements = rootRef.current?.querySelectorAll<HTMLElement>('[data-tabs-content]')
    if (!contentElements) return null

    return Array.from(contentElements).find((element) => element.dataset.tabsContent === value) ?? null
  }

  const scrollToContent = (target: HTMLElement) => {
    if (isIsolatedScroll && contentViewportRef.current) {
      const viewport = contentViewportRef.current
      const targetTop = target.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop
      viewport.scrollTo({ top: targetTop, behavior: scrollBehavior })
      return
    }

    target.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
  }

  const handleChange = (value: string) => {
    const target = behavior === 'scroll' ? findContent(value) : null
    onChange(value)

    if (target) {
      scrollToContent(target)
    }
  }

  const providerValue = {
    activeTab,
    onChange: handleChange,
    color,
    size,
    variant,
    align,
    alignLabel,
    placement,
    behavior,
    scrollOffset: normalizedScrollOffset,
    scrollBehavior,
    scrollSpy,
    scrollContainer: isIsolatedScroll,
  }

  React.useEffect(() => {
    if (behavior !== 'scroll' || !scrollSpy || typeof IntersectionObserver === 'undefined') return

    const contentElements = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[data-tabs-content]') ?? [])
    if (contentElements.length === 0) return

    const visibleSections = new Map<Element, IntersectionObserverEntry>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target, entry)
        } else {
          visibleSections.delete(entry.target)
        }
      })

      const currentSection = [...visibleSections.values()]
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      const nextActiveTab = currentSection?.target.getAttribute('data-tabs-content')

      if (nextActiveTab && nextActiveTab !== activeTab) {
        onChange(nextActiveTab)
      }
    }, {
      root: isIsolatedScroll ? contentViewportRef.current : null,
      rootMargin: isIsolatedScroll ? '0px 0px -50% 0px' : `-${normalizedScrollOffset}px 0px -50% 0px`,
      threshold: [0, 0.25, 0.5, 1],
    })

    contentElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [activeTab, behavior, isIsolatedScroll, normalizedScrollOffset, onChange, scrollSpy])

  const renderChildren = () => {
    if (!isIsolatedScroll) return children

    const childArray = React.Children.toArray(children)
    const contentChildren = childArray.filter((child): child is React.ReactElement<TabsContentProps> => (
      React.isValidElement(child) && child.type === TabsContent
    ))

    if (contentChildren.length === 0) return children

    const firstContentIndex = childArray.findIndex((child) => (
      React.isValidElement(child) && child.type === TabsContent
    ))

    return childArray.reduce<React.ReactNode[]>((rendered, child, index) => {
      if (index === firstContentIndex) {
        rendered.push(
          <div
            key="tabs-scroll-viewport"
            ref={contentViewportRef}
            className="min-h-0 overflow-y-auto overscroll-contain"
            style={{ maxHeight: scrollMaxHeight ?? '70vh' }}
          >
            {contentChildren}
          </div>,
        )
        return rendered
      }

      if (React.isValidElement(child) && child.type === TabsContent) return rendered

      rendered.push(child)
      return rendered
    }, [])
  }

  const wrapperClass = isVertical
    ? `flex ${placement === 'vertical-right' ? 'flex-row-reverse' : 'flex-row'} gap-4 ${className}`
    : `flex ${placement === 'horizontal-bottom' ? 'flex-col-reverse' : 'flex-col'} gap-4 ${className}`

  return (
    <TabsProvider value={providerValue}>
      <div ref={setRootRef} className={wrapperClass}>
        {renderChildren()}
      </div>
    </TabsProvider>
  )
})

TabsRoot.displayName = 'TabsRoot'
