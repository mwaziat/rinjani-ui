'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { TooltipProps, ContentPosition } from './Tooltip.types'
import { baseTooltipStyles, radiusBySize, sizes, variants, maxWidths } from './Tooltip.styles'
import { clampPosition, getOverflowScore, getPlacementCandidates, getPositionForPlacement } from './Tooltip.utils'

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({
  children,
  content,
  color = 'neutral',
  size = 'sm',
  variant = 'filled',
  placement = 'auto',
  showArrow = true,
  offset = 8,
  className = '',
  isPill = false,
  delay = 200,
  maxWidth,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contentPosition, setContentPosition] = useState<ContentPosition>({
    top: 0,
    left: 0,
    isPositioned: false,
    currentPlacement: placement === 'auto' ? 'top' : placement,
  })
  const triggerRef = useRef<HTMLDivElement>(null)

  const setRefs = (node: HTMLDivElement | null) => {
    ;(triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    }
  }
  const contentRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsOpen(true), delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !contentRef.current) {
      return
    }

    const updatePosition = () => {
      if (!triggerRef.current || !contentRef.current) {
        return
      }

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()
      const candidates = getPlacementCandidates(placement)

      const bestPlacement = candidates
        .map((candidate) => {
          const rawPosition = getPositionForPlacement(triggerRect, contentRect, candidate, offset)

          return {
            candidate,
            rawPosition,
            overflowScore: getOverflowScore(rawPosition.top, rawPosition.left, contentRect),
          }
        })
        .sort((first, second) => first.overflowScore - second.overflowScore)[0] || {
          candidate: 'top',
          rawPosition: { top: 0, left: 0 },
        }

      const nextPosition = clampPosition(bestPlacement.rawPosition.top, bestPlacement.rawPosition.left, contentRect)

      setContentPosition({
        top: nextPosition.top,
        left: nextPosition.left,
        isPositioned: true,
        currentPlacement: bestPlacement.candidate,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, placement, offset, content])

  const selectedVariant = variants[variant]?.[color] || variants.filled.neutral
  const radiusStyle = isPill ? 'rounded-full' : radiusBySize[size]

  const resolvedMaxWidth = maxWidth 
    ? typeof maxWidth === 'number' 
      ? `${maxWidth}px` 
      : typeof maxWidth === 'string' && maxWidths[maxWidth] 
        ? maxWidths[maxWidth] 
        : maxWidth
    : undefined

  return (
    <>
      <div
        ref={setRefs}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={contentRef}
          className={`${baseTooltipStyles} ${sizes[size]} ${radiusStyle} ${selectedVariant} ${className}`}
          style={{
            top: contentPosition.top,
            left: contentPosition.left,
            visibility: contentPosition.isPositioned ? 'visible' : 'hidden',
            maxWidth: resolvedMaxWidth,
            whiteSpace: maxWidth ? 'normal' : 'nowrap',
            textAlign: maxWidth ? 'center' : 'left',
          }}
          role="tooltip"
        >
          {content}
          {showArrow && variant === 'filled' && (
            <div 
              className={`absolute w-0 h-0 border-solid border-[5px] border-transparent`}
              style={{
                ...(contentPosition.currentPlacement.startsWith('top') && { bottom: '-10px', left: '50%', transform: 'translateX(-50%)', borderTopColor: 'currentColor' }),
                ...(contentPosition.currentPlacement.startsWith('bottom') && { top: '-10px', left: '50%', transform: 'translateX(-50%)', borderBottomColor: 'currentColor' }),
                ...(contentPosition.currentPlacement.startsWith('left') && { right: '-10px', top: '50%', transform: 'translateY(-50%)', borderLeftColor: 'currentColor' }),
                ...(contentPosition.currentPlacement.startsWith('right') && { left: '-10px', top: '50%', transform: 'translateY(-50%)', borderRightColor: 'currentColor' }),
              }}
            />
          )}
          {showArrow && variant !== 'filled' && (
            <div 
              className={`absolute w-2.5 h-2.5 rotate-45 bg-inherit border-inherit`}
              style={{
                borderWidth: '1px',
                borderStyle: 'solid',
                ...(contentPosition.currentPlacement.startsWith('top') && { bottom: '-5px', left: '50%', marginLeft: '-5px', borderTopWidth: 0, borderLeftWidth: 0 }),
                ...(contentPosition.currentPlacement.startsWith('bottom') && { top: '-5px', left: '50%', marginLeft: '-5px', borderBottomWidth: 0, borderRightWidth: 0 }),
                ...(contentPosition.currentPlacement.startsWith('left') && { right: '-5px', top: '50%', marginTop: '-5px', borderBottomWidth: 0, borderLeftWidth: 0 }),
                ...(contentPosition.currentPlacement.startsWith('right') && { left: '-5px', top: '50%', marginTop: '-5px', borderTopWidth: 0, borderRightWidth: 0 }),
              }}
            />
          )}
        </div>,
        document.body,
      )}
    </>
  )
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
