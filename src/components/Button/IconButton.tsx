import React from 'react'
import type { IconButtonProps } from './Button.types'
import { baseIconButtonStyles, iconButtonSizes, radiusBySize, variants } from './Button.styles'
import { LoaderIcon } from '../Icons'

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  children,
  variant = 'filled',
  size = 'sm',
  color = 'primary',
  isLoading = false,
  disabled = false,
  isPill = false,
  className = '',
  ...props
}, ref) => {
  const selectedVariant = variants[variant]?.[color] || variants.filled.primary
  const radiusStyle = isPill ? 'rounded-full' : radiusBySize[size]

  return (
    <button
      ref={ref}
      className={`${baseIconButtonStyles} ${iconButtonSizes[size]} ${radiusStyle} ${selectedVariant} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <LoaderIcon className="animate-spin" /> : icon || children}
    </button>
  )
})

IconButton.displayName = 'IconButton'
