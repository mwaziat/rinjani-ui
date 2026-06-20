import type { DrawerPosition } from './Drawer.types'

export const positionStyles: Record<DrawerPosition, string> = {
  right: 'right-0 top-0 h-screen border-l',
  left: 'left-0 top-0 h-screen border-r',
  top: 'top-0 left-0 w-screen border-b',
  bottom: 'bottom-0 left-0 w-screen border-t',
}

export const baseBackdropClasses = "absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
export const baseDrawerClasses = "absolute bg-white border-neutral-200 shadow-2xl transition-transform duration-300 ease-out flex flex-col"
