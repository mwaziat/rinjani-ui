export const getNextIndex = (currentIndex: number, total: number, loop: boolean): number => {
  if (currentIndex + 1 >= total) {
    return loop ? 0 : currentIndex
  }
  return currentIndex + 1
}

export const getPrevIndex = (currentIndex: number, total: number, loop: boolean): number => {
  if (currentIndex - 1 < 0) {
    return loop ? total - 1 : currentIndex
  }
  return currentIndex - 1
}

export const canGoNext = (currentIndex: number, total: number, loop: boolean): boolean => {
  return loop || currentIndex + 1 < total
}

export const canGoPrev = (currentIndex: number, total: number, loop: boolean): boolean => {
  return loop || currentIndex > 0
}
