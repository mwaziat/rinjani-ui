'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from '../Icons/general'
import type { DropdownPlacement, DropdownProps, DropdownContentPosition } from './Dropdown.types'

import { baseStyles, sizes, radiusBySize, variants } from './Dropdown.styles'
import { VIEWPORT_PADDING, getPlacementCandidates, getPositionForPlacement, getOverflowScore, clampPosition } from './Dropdown.utils'

export const Dropdown = ({
  label,
  icon,
  children,
  color = 'primary',
  size = 'sm',
  variant = 'filled',
  placement = 'auto',
  showArrow = true,
  offset = 10,
  disabled = false,
  className = '',
  classNameList = '',
  id,
  isPill = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contentPosition, setContentPosition] = useState<DropdownContentPosition>({
    top: 0,
    left: 0,
    isPositioned: false,
  })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const generatedId = useId()
  const dropdownId = id || generatedId

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node

      if (triggerRef.current?.contains(target) || contentRef.current?.contains(target)) {
        return
      }

      setIsOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

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
        .sort((first, second) => first.overflowScore - second.overflowScore)[0]

      if (!bestPlacement) return

      const nextPosition = clampPosition(bestPlacement.rawPosition.top, bestPlacement.rawPosition.left, contentRect)

      setContentPosition({
        top: nextPosition.top,
        left: nextPosition.left,
        isPositioned: true,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, placement, offset, children])



  const selectedVariant = variants[variant][color]
  const radiusStyle = isPill ? 'rounded-full' : radiusBySize[size]

  let ArrowIcon = isOpen ? ChevronUpIcon : ChevronDownIcon
  if (placement.startsWith('top')) {
    ArrowIcon = isOpen ? ChevronDownIcon : ChevronUpIcon
  } else if (placement.startsWith('left')) {
    ArrowIcon = isOpen ? ChevronRightIcon : ChevronLeftIcon
  } else if (placement.startsWith('right')) {
    ArrowIcon = isOpen ? ChevronLeftIcon : ChevronRightIcon
  }

  const isLeftPlacement = placement.startsWith('left') || placement.startsWith('top')

  const triggerContent = (
    <>
      {showArrow && isLeftPlacement && <ArrowIcon size={16} className="shrink-0" />}
      {icon && <span className="shrink-0">{icon}</span>}
      {label && <span className="whitespace-nowrap">{label}</span>}
      {showArrow && !isLeftPlacement && <ArrowIcon size={16} className="shrink-0" />}
    </>
  )

  const handleTriggerClick = () => {
    if (isOpen) {
      setIsOpen(false)
      return
    }

    const triggerRect = triggerRef.current?.getBoundingClientRect()

    setContentPosition({
      top: triggerRect ? triggerRect.bottom + offset : 0,
      left: triggerRect ? triggerRect.left : 0,
      isPositioned: false,
    })

    setIsOpen(true)
  }

  return (
    <>
      <button
        ref={triggerRef}
        id={dropdownId}
        type="button"
        className={`${baseStyles} ${sizes[size]} ${radiusStyle} ${selectedVariant} ${className}`}
        onClick={handleTriggerClick}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {triggerContent}
      </button>

      {isOpen && createPortal(
        <div
          ref={contentRef}
          className={`fixed rounded-xl border border-neutral-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200 ${classNameList}`}
          style={{
            top: contentPosition.top,
            left: contentPosition.left,
            maxWidth: `calc(100vw - ${VIEWPORT_PADDING * 2}px)`,
            visibility: contentPosition.isPositioned ? 'visible' : 'hidden',
            pointerEvents: contentPosition.isPositioned ? 'auto' : 'none',
            zIndex: 160,
          } as CSSProperties}
          role="menu"
          aria-labelledby={dropdownId}
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  )
}
