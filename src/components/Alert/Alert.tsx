'use client'

import React, { useState, useEffect } from 'react'
import type { AlertProps, AlertColor } from './Alert.types'
import { baseAlertClasses, colorStyles } from './Alert.styles'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  AlertTriangleIcon, 
  InfoIcon 
} from '../Icons/status'
import { XIcon, MinusIcon, PlusIcon as ExpandIcon } from '../Icons/action'

export const Alert: React.FC<AlertProps> = ({
  variant = 'soft',
  color = 'info',
  title,
  message,
  children,
  icon,
  showIcon = true,
  onClose,
  className = '',
  action,
  duration,
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (duration && duration > 0) {
      const start = Date.now()
      let animationFrame: number

      const animate = () => {
        const now = Date.now()
        const elapsed = now - start
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
        setProgress(remaining)

        if (remaining > 0) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setIsVisible(false)
          onClose?.()
        }
      }
      animationFrame = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const showCloseButton = action === 'close' || (!action && !!onClose)
  const showMinimizeButton = action === 'minimize'

  const defaultIcons: Record<AlertColor, React.ReactNode> = {
    success: <CheckCircleIcon size={20} />,
    danger: <XCircleIcon size={20} />,
    warning: <AlertTriangleIcon size={20} />,
    info: <InfoIcon size={20} />,
    primary: <InfoIcon size={20} />,
    neutral: <InfoIcon size={20} />,
    secondary: <InfoIcon size={20} />,
  }

  const renderedIcon = icon || defaultIcons[color] || defaultIcons['info']
  const currentStyles = colorStyles[variant]?.[color] || colorStyles.soft.info

  const titleColor = variant === 'filled' ? 'text-white' : 'text-neutral-900'
  const messageColor = variant === 'filled' ? 'text-white/90' : 'text-neutral-600'
  const iconColor = variant === 'filled' ? 'text-white' : ''

  return (
    <div className={`${baseAlertClasses} ${isMinimized ? 'p-3 items-center' : 'p-4'} ${currentStyles} ${className}`}>
      {showIcon && (
        <div className={`shrink-0 mt-0.5 ${iconColor}`}>
          {renderedIcon}
        </div>
      )}

      <div className="flex-1 pr-6">
        {title && (
          <h3 className={`${!isMinimized && (message || children) ? 'mb-1' : ''} text-sm font-semibold ${titleColor}`}>
            {title}
          </h3>
        )}
        {!isMinimized && (message || children) && (
          <div className={`text-sm font-normal leading-relaxed ${messageColor}`}>
            {message}
            {children}
          </div>
        )}
      </div>

      {(showCloseButton || showMinimizeButton) && (
        <button
          type="button"
          onClick={showCloseButton ? handleClose : handleToggleMinimize}
          className={`absolute right-3 ${isMinimized ? 'top-1/2 -translate-y-1/2' : 'top-3'} transition-colors ${variant === 'filled' ? 'text-white/70 hover:text-white' : 'text-neutral-400 hover:text-neutral-600'}`}
          aria-label={showCloseButton ? "Close alert" : (isMinimized ? "Expand alert" : "Minimize alert")}
        >
          {showCloseButton ? <XIcon size={18} /> : (isMinimized ? <ExpandIcon size={18} /> : <MinusIcon size={18} />)}
        </button>
      )}

      {duration && duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-black/5">
          <div 
            className="h-full transition-none bg-current opacity-30"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default Alert
