import type { DropdownPlacement } from './Dropdown.types'

/**
 * The minimum distance (in pixels) the dropdown must maintain from the edge of the screen.
 * Prevents the menu from hugging the exact edge of the viewport.
 */
export const VIEWPORT_PADDING = 12

export const normalizePlacement = (placement: DropdownPlacement) => {
  if (placement === 'bottom' || placement === 'top' || placement === 'left' || placement === 'right') {
    return placement
  }
  return placement
}

/**
 * Given a placement preference (like 'auto' or 'bottom'), this function returns an array
 * of fallback positions to try in order of priority.
 * Used to intelligently move the dropdown if the preferred spot goes off-screen.
 */
export const getPlacementCandidates = (placement: DropdownPlacement): Exclude<DropdownPlacement, 'auto'>[] => {
  if (placement !== 'auto') {
    return [normalizePlacement(placement) as Exclude<DropdownPlacement, 'auto'>]
  }

  return ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start']
}

/**
 * Calculates the exact pixel coordinates (top/left) for placing the dropdown menu.
 * It uses the bounding rectangles of the trigger button and the menu itself.
 * 
 * @param triggerRect The bounding rect of the button that opened the dropdown.
 * @param contentRect The bounding rect of the dropdown menu content.
 * @param placement The specific alignment strategy to calculate for.
 * @param offset The gap distance between the trigger and the menu.
 */
export const getPositionForPlacement = (
  triggerRect: DOMRect,
  contentRect: DOMRect,
  placement: Exclude<DropdownPlacement, 'auto'>,
  offset: number,
) => {
  const verticalCenter = triggerRect.top + (triggerRect.height - contentRect.height) / 2
  const horizontalCenter = triggerRect.left + (triggerRect.width - contentRect.width) / 2

  switch (placement) {
    case 'bottom':
      return { top: triggerRect.bottom + offset, left: horizontalCenter }
    case 'bottom-end':
      return { top: triggerRect.bottom + offset, left: triggerRect.right - contentRect.width }
    case 'bottom-start':
      return { top: triggerRect.bottom + offset, left: triggerRect.left }
    case 'top':
      return { top: triggerRect.top - contentRect.height - offset, left: horizontalCenter }
    case 'top-end':
      return { top: triggerRect.top - contentRect.height - offset, left: triggerRect.right - contentRect.width }
    case 'top-start':
      return { top: triggerRect.top - contentRect.height - offset, left: triggerRect.left }
    case 'left':
      return { top: verticalCenter, left: triggerRect.left - contentRect.width - offset }
    case 'left-end':
      return { top: triggerRect.bottom - contentRect.height, left: triggerRect.left - contentRect.width - offset }
    case 'left-start':
      return { top: triggerRect.top, left: triggerRect.left - contentRect.width - offset }
    case 'right':
      return { top: verticalCenter, left: triggerRect.right + offset }
    case 'right-end':
      return { top: triggerRect.bottom - contentRect.height, left: triggerRect.right + offset }
    case 'right-start':
      return { top: triggerRect.top, left: triggerRect.right + offset }
    default:
      return { top: triggerRect.bottom + offset, left: triggerRect.left }
  }
}

/**
 * Calculates a "penalty score" for how much a specific position would overflow the screen.
 * A score of 0 means it fits perfectly. Higher scores mean more clipping.
 * This is used to rank which placement candidate is the best.
 */
export const getOverflowScore = (top: number, left: number, contentRect: DOMRect) => {
  const right = left + contentRect.width
  const bottom = top + contentRect.height

  return [
    VIEWPORT_PADDING - left,
    VIEWPORT_PADDING - top,
    right - (window.innerWidth - VIEWPORT_PADDING),
    bottom - (window.innerHeight - VIEWPORT_PADDING),
  ].reduce((score, value) => score + Math.max(0, value), 0)
}

/**
 * Forces the final coordinates to stay strictly within the visible boundaries of the screen.
 * Acts as a final safety net even if the best placement still slightly overflows.
 */
export const clampPosition = (top: number, left: number, contentRect: DOMRect) => {
  const maxLeft = Math.max(VIEWPORT_PADDING, window.innerWidth - contentRect.width - VIEWPORT_PADDING)
  const maxTop = Math.max(VIEWPORT_PADDING, window.innerHeight - contentRect.height - VIEWPORT_PADDING)

  return {
    top: Math.min(Math.max(top, VIEWPORT_PADDING), maxTop),
    left: Math.min(Math.max(left, VIEWPORT_PADDING), maxLeft),
  }
}
