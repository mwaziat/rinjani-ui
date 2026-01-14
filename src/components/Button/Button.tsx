import React from 'react'
import clsx from 'clsx'
import type { ButtonProps } from './Button.types'
import { baseStyles, iconSizeMap, sizeStyles } from './Button.styles'
import { getButtonStyles } from './Button.utils'

export function Button({
  children,
  color = 'blue',
  variant = 'solid',
  size = 'md',
  className,
  startIcon,
  endIcon,
  isLoading = false,
  loadingIndicator,
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      {...rest}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        getButtonStyles(color, variant, isDisabled),
        className
      )}
    >
      {isLoading ? (
        loadingIndicator ?? (
          <>
            <svg
              className={clsx(iconSizeMap[size], 'animate-spin')}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span>{children}</span>
          </>
        )
      ) : (
        <>
          {startIcon && (
            <span className={iconSizeMap[size]}>{startIcon}</span>
          )}
          <span>{children}</span>
          {endIcon && (
            <span className={iconSizeMap[size]}>{endIcon}</span>
          )}
        </>
      )}
    </button>
  )
}
