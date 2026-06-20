import type { DropdownPlacement } from './Dropdown.types'

export const VIEWPORT_PADDING = 12

export const normalizePlacement = (placement: DropdownPlacement) => {
  if (placement === 'bottom' || placement === 'top' || placement === 'left' || placement === 'right') {
    return placement
  }
  return placement
}

export const getPlacementCandidates = (placement: DropdownPlacement): Exclude<DropdownPlacement, 'auto'>[] => {
  if (placement !== 'auto') {
    return [normalizePlacement(placement) as Exclude<DropdownPlacement, 'auto'>]
  }

  return ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start']
}

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

export const clampPosition = (top: number, left: number, contentRect: DOMRect) => {
  const maxLeft = Math.max(VIEWPORT_PADDING, window.innerWidth - contentRect.width - VIEWPORT_PADDING)
  const maxTop = Math.max(VIEWPORT_PADDING, window.innerHeight - contentRect.height - VIEWPORT_PADDING)

  return {
    top: Math.min(Math.max(top, VIEWPORT_PADDING), maxTop),
    left: Math.min(Math.max(left, VIEWPORT_PADDING), maxLeft),
  }
}
