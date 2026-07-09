'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { DrawerProps } from './Drawer.types'
import { positionStyles, baseBackdropClasses, baseDrawerClasses } from './Drawer.styles'
import { getSizeClasses, getTransformClass } from './Drawer.utils'
import { useIsHydrated } from '../../hooks/useIsHydrated'

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
 *       <Drawer.Header title="Filter Products" onClose={() => setIsOpen(false)} />
 *       <Drawer.Content>
 *         <Checkbox label="In Stock Only" />
 *       </Drawer.Content>
 *       <Drawer.Footer>
 *         <Button fullWidth>Apply Filters</Button>
 *       </Drawer.Footer>
 *     </Drawer>
 *   </>
 * )
 * ```
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = 'md',
  className = '',
}) => {
  const isHydrated = useIsHydrated()

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

  const isHorizontal = position === 'left' || position === 'right'

  if (!isHydrated) return null

  return createPortal(
    <div className={`fixed inset-0 z-9999 ${isOpen ? 'visible' : 'invisible transition-all delay-300'}`}>
      <div
        className={`${baseBackdropClasses} ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`${baseDrawerClasses} ${positionStyles[position]} ${getSizeClasses(size, isHorizontal)} ${getTransformClass(isOpen, position)} ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  )
}
