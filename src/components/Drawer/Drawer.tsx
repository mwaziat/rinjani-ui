'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DrawerPosition, DrawerProps } from './Drawer.types'
import { positionStyles, baseBackdropClasses, baseDrawerClasses } from './Drawer.styles'
import { getSizeClasses, getTransformClass } from './Drawer.utils'
import { useIsHydrated } from '../../hooks/useIsHydrated'
import { DRAWER_Z_INDEX } from '../../utils/layers'

/**
 * A slide-out panel component used for navigation, filtering, or detailed views.
 * 
 * Drawers render into a portal at the root body level and trap scrolling underneath when open.
 * Can be positioned on any edge of the screen.
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * 
 * return (
 *   <>
 *     <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
 *     <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right" size="sm">
 *       <DrawerHeader title="Filter Products" onClose={() => setIsOpen(false)} />
 *       <DrawerContent>
 *         <Checkbox label="In Stock Only" />
 *       </DrawerContent>
 *       <DrawerFooter>
 *         <Button fullWidth>Apply Filters</Button>
 *       </DrawerFooter>
 *     </Drawer>
 *   </>
 * )
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  closeOnBackdrop = true,
  children,
  position = 'right',
  size = 'md',
  className = '',
}) => {
  const isHydrated = useIsHydrated()
  const animationPositionRef = useRef<DrawerPosition>(position)
  const [animationState, setAnimationState] = useState<{
    position: DrawerPosition
    entered: boolean
    transition: boolean
  }>({
    position,
    entered: false,
    transition: false,
  })

  useLayoutEffect(() => {
    let enterFrame: number | null = null
    const resetFrame = window.requestAnimationFrame(() => {
      // Keep the current edge while closing. Consumers often reset their
      // position prop at the same time they close the drawer.
      const nextPosition = isOpen ? position : animationPositionRef.current
      animationPositionRef.current = nextPosition

      setAnimationState({
        position: nextPosition,
        entered: false,
        // A close should slide away. An open or edge change must first place
        // the panel off-screen without animating from the previous edge.
        transition: !isOpen,
      })

      if (isOpen) {
        enterFrame = window.requestAnimationFrame(() => {
          setAnimationState({
            position: nextPosition,
            entered: true,
            transition: true,
          })
        })
      }
    })

    return () => {
      window.cancelAnimationFrame(resetFrame)
      if (enterFrame !== null) {
        window.cancelAnimationFrame(enterFrame)
      }
    }
  }, [isOpen, position])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // When opening with a new edge, render the new off-screen starting state
  // immediately. This prevents one frame of the previous edge (usually right)
  // from being interpolated before the animation state catches up.
  const isPendingPositionChange = isOpen && position !== animationState.position
  const renderedPosition = isPendingPositionChange ? position : animationState.position
  const renderedEntered = isPendingPositionChange ? false : animationState.entered
  const transitionClass = isPendingPositionChange || !animationState.transition
    ? 'transition-none'
    : 'transition-transform'
  const isHorizontal = renderedPosition === 'left' || renderedPosition === 'right'

  if (!isHydrated) return null

  return createPortal(
    <div className={`fixed inset-0 ${isOpen ? 'visible' : 'invisible transition-all delay-300'}`} style={{ zIndex: DRAWER_Z_INDEX }}>
      <div
        className={`${baseBackdropClasses} ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      <div className={`${baseDrawerClasses} ${transitionClass} ${positionStyles[renderedPosition]} ${getSizeClasses(size, isHorizontal)} ${getTransformClass(renderedEntered, renderedPosition)} ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  )
}
