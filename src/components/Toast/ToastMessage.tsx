'use client'

import React, { useEffect, useState } from 'react'
import { XIcon } from '../Icons/action'
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon } from '../Icons/status'
import type { ToastItem } from './Toast.types'
import { toastManager } from './toast-manager'
import { bgColors, barColors, baseToastClasses } from './Toast.styles'

export const ToastMessage = ({ toast }: { toast: ToastItem }) => {
  const [progress, setProgress] = useState(100)
  const [isLeaving, setIsLeaving] = useState(false)

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      toastManager.remove(toast.id)
      toast.onClose?.()
    }, 300)
  }

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const start = Date.now()
      let animationFrame: number

      const animate = () => {
        if (isLeaving) return
        
        const now = Date.now()
        const elapsed = now - start
        const remaining = Math.max(0, 100 - (elapsed / toast.duration!) * 100)
        setProgress(remaining)

        if (remaining > 0) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          handleClose()
        }
      }
      animationFrame = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [toast.duration, toast.id, toast, isLeaving])

  const icons = {
    success: <CheckCircleIcon size={22} className="text-success-600" />,
    error: <XCircleIcon size={22} className="text-danger-600" />,
    warning: <AlertTriangleIcon size={22} className="text-warning-600" />,
    info: <InfoIcon size={22} className="text-info-600" />,
    default: null
  }



  const type = toast.type || 'default'
  const placement = toast.placement || 'top-right'
  const isBottom = placement.includes('bottom')
  
  const enterClass = isBottom 
    ? 'translate-y-4 opacity-0' 
    : '-translate-y-4 opacity-0'

  const [hasEntered, setHasEntered] = useState(false)
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHasEntered(true)
      })
    })
    return () => cancelAnimationFrame(timer)
  }, [])


  const stateClasses = isLeaving 
    ? `opacity-0 scale-95` 
    : hasEntered 
      ? `translate-y-0 opacity-100 scale-100` 
      : `${enterClass} scale-95`

  return (
    <div className={`${baseToastClasses} ${stateClasses} ${bgColors[type]}`}>
      <div className="flex items-start gap-3 w-full pr-6">
        {toast.icon || icons[type]}
        <div className="flex-1 pt-0.5">
          {toast.title && <h3 className="text-sm font-semibold text-neutral-900 mb-1">{toast.title}</h3>}
          <div className="text-sm font-normal text-neutral-600 leading-relaxed">{toast.message}</div>
        </div>
      </div>
      
      <button 
        type="button"
        onClick={() => {
          if (!isLeaving) handleClose()
        }}
        className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 transition-colors"
        aria-label="Close toast"
      >
        <XIcon size={16} />
      </button>

      {typeof toast.duration === 'number' && toast.duration > 0 ? (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-black/5">
          <div 
            className={`h-full transition-none ${barColors[type]} opacity-30`}
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
    </div>
  )
}
