import type { DrawerPosition, DrawerSize } from './Drawer.types'

export const getSizeClasses = (size: DrawerSize, isHorizontal: boolean): string => {
  const sizeClasses: Record<DrawerSize, string> = {
    xs: isHorizontal ? 'w-64' : 'h-64',
    sm: isHorizontal ? 'w-80' : 'h-80',
    md: isHorizontal ? 'w-[450px]' : 'h-[450px]',
    lg: isHorizontal ? 'w-[600px]' : 'h-[600px]',
    xl: isHorizontal ? 'w-[800px]' : 'h-[800px]',
    '1/4': isHorizontal ? 'w-[25vw]' : 'h-[25vh]',
    '1/3': isHorizontal ? 'w-[33.33vw]' : 'h-[33.33vh]',
    '1/2': isHorizontal ? 'w-[50vw]' : 'h-[50vh]',
    '2/3': isHorizontal ? 'w-[66.66vw]' : 'h-[66.66vh]',
    '3/4': isHorizontal ? 'w-[75vw]' : 'h-[75vh]',
    full: isHorizontal ? 'w-screen' : 'h-screen',
  }
  return sizeClasses[size]
}

export const getTransformClass = (isOpen: boolean, position: DrawerPosition): string => {
  if (!isOpen) {
    switch (position) {
      case 'right': return 'translate-x-full'
      case 'left': return '-translate-x-full'
      case 'top': return '-translate-y-full'
      case 'bottom': return 'translate-y-full'
      default: return ''
    }
  }
  return 'translate-x-0 translate-y-0'
}
