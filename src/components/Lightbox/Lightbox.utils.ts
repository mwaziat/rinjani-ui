/**
 * Calculates the index of the next slide to be displayed.
 * If the user is on the last slide and `loop` is true, it wraps around to the first slide (index 0).
 * Otherwise, it simply returns the current index, preventing out-of-bounds errors.
 */
export const getNextIndex = (currentIndex: number, total: number, loop: boolean): number => {
  if (currentIndex + 1 >= total) {
    return loop ? 0 : currentIndex
  }
  return currentIndex + 1
}

/**
 * Calculates the index of the previous slide to be displayed.
 * If the user is on the first slide and `loop` is true, it wraps around to the last slide.
 * Otherwise, it restricts the index from dropping below zero.
 */
export const getPrevIndex = (currentIndex: number, total: number, loop: boolean): number => {
  if (currentIndex - 1 < 0) {
    return loop ? total - 1 : currentIndex
  }
  return currentIndex - 1
}

/**
 * Evaluates whether the UI should allow the user to navigate forward.
 * Returns true if looping is enabled or if there are still subsequent slides remaining.
 * Used to hide/show the "Next" arrow button.
 */
export const canGoNext = (currentIndex: number, total: number, loop: boolean): boolean => {
  return loop || currentIndex + 1 < total
}

/**
 * Evaluates whether the UI should allow the user to navigate backward.
 * Returns true if looping is enabled or if the user is not currently on the first slide.
 * Used to hide/show the "Previous" arrow button.
 */
export const canGoPrev = (currentIndex: number, total: number, loop: boolean): boolean => {
  return loop || currentIndex > 0
}
