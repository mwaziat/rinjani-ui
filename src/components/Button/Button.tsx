import React from 'react'
import type { ButtonProps } from './Button.types'
import { baseButtonStyles, buttonSizes, radiusBySize, variants } from './Button.styles'
import { LoaderIcon } from '../Icons'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'filled',
  size = 'sm',
  color = 'primary',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  isPill = false,
  className = '',
  ...props
}, ref) => {
  const selectedVariant = variants[variant]?.[color] || variants.filled.primary
  const widthStyle = fullWidth ? 'w-full' : ''
  const radiusStyle = isPill ? 'rounded-full' : radiusBySize[size]
  
  const loaderSize = size === 'xxs' ? 10 : size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20

  return (
    <button
      ref={ref}
      className={`${baseButtonStyles} ${buttonSizes[size]} ${radiusStyle} ${selectedVariant} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoaderIcon className="animate-spin" size={loaderSize} />
      ) : (
        <>
          {leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
