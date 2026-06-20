'use client'

import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon, InfoIcon, HelpCircleIcon } from '../Icons/status'
import { Button } from '../Button'
import type { DialogItem } from './Dialog.types'
import { dialogManager } from './dialog-manager'
import { backdropClasses, modalClasses } from './Dialog.styles'

export const DialogModal = ({ dialog }: { dialog: DialogItem }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => setHasEntered(true))
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      dialogManager.remove(dialog.id)
    }, 200) // Duration of CSS exit transition
  }

  const handleCancel = () => {
    if (isProcessing || isLeaving) return
    dialog.onCancel?.()
    handleClose()
  }

  const handleConfirm = async () => {
    if (isProcessing || isLeaving) return
    if (!dialog.onConfirm) {
      handleClose()
      return
    }

    const result = dialog.onConfirm()
    if (result instanceof Promise) {
      setIsProcessing(true)
      try {
        await result
        handleClose()
      } finally {
        setIsProcessing(false)
      }
    } else {
      handleClose()
    }
  }

  const icons = {
    success: <CheckCircleIcon size={56} className="text-success-600 mb-2" />,
    error: <XCircleIcon size={56} className="text-danger-600 mb-2" />,
    warning: <AlertTriangleIcon size={56} className="text-warning-600 mb-2" />,
    info: <InfoIcon size={56} className="text-info-600 mb-2" />,
    confirm: <HelpCircleIcon size={56} className="text-primary-600 mb-2" />,
    default: null
  }

  const type = dialog.type || 'default'

  const backdropState = (hasEntered && !isLeaving) ? "opacity-100" : "opacity-0"
  const modalState = (hasEntered && !isLeaving) ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className={`${backdropClasses} ${backdropState}`}
        onClick={dialog.closeOnBackdrop !== false ? handleCancel : undefined}
      />

      <div className={`${modalClasses} ${modalState}`}>
        {dialog.icon || icons[type]}

        {dialog.title && (
          <h3 className="mb-2 text-lg font-semibold text-neutral-900">
            {dialog.title}
          </h3>
        )}

        <div className="text-sm font-normal leading-relaxed text-neutral-600">
          {dialog.message}
        </div>

        <div className="mt-8 flex w-full items-center justify-center gap-3">
          {dialog.actions && dialog.actions.length > 0 ? (
            dialog.actions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant || 'filled'}
                color={action.color || 'primary'}
                disabled={isProcessing || action.disabled}
                onClick={async () => {
                  if (isProcessing || isLeaving) return
                  const close = () => handleClose()
                  
                  if (!action.onClick) {
                    if (action.closeAfter !== false) close()
                    return
                  }
                  
                  const result = action.onClick(close)
                  if (result instanceof Promise) {
                    setIsProcessing(true)
                    try {
                      await result
                      if (action.closeAfter !== false) close()
                    } catch (e) {
                      console.error(e)
                    } finally {
                      setIsProcessing(false)
                    }
                  } else {
                    if (action.closeAfter !== false) close()
                  }
                }}
                className="flex-1"
              >
                {action.label}
              </Button>
            ))
          ) : (
            <>
              {dialog.showCancel && (
                <Button
                  variant="soft"
                  color="neutral"
                  disabled={isProcessing}
                  onClick={handleCancel}
                  className="flex-1"
                >
                  {dialog.cancelText || 'Cancel'}
                </Button>
              )}
              <Button
                variant="filled"
                color={type === 'error' || type === 'warning' ? 'danger' : 'primary'}
                isLoading={isProcessing}
                onClick={handleConfirm}
                className={dialog.showCancel ? 'flex-1' : 'w-full max-w-[200px]'}
              >
                {dialog.confirmText || 'Confirm'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
