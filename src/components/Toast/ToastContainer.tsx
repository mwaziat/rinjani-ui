'use client'

import React, { useEffect, useState } from 'react'
import { toastManager } from './toast-manager'
import type { ToastItem, ToastPlacement } from './Toast.types'
import { ToastMessage } from './ToastMessage'
import { placementClasses } from './Toast.styles'

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    return toastManager.subscribe((newToasts) => {
      setToasts([...newToasts])
    })
  }, [])

  const placements: ToastPlacement[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center', 'top-full', 'bottom-full']



  const getToastsByPlacement = (placement: ToastPlacement) => {
    return toasts.filter((t) => (t.placement || 'top-right') === placement)
  }

  return (
    <>
      {placements.map((placement) => {
        const placementToasts = getToastsByPlacement(placement)
        if (placementToasts.length === 0) return null

        const isBottom = placement.includes('bottom')

        return (
          <div 
            key={placement} 
            className={`fixed z-9999 p-4 flex gap-3 w-full pointer-events-none ${placementClasses[placement]} ${isBottom ? 'flex-col-reverse' : 'flex-col'}`}
          >
            {placementToasts.map((toast) => (
              <ToastMessage key={toast.id} toast={toast} />
            ))}
          </div>
        )
      })}
    </>
  )
}
