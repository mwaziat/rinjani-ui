import React from 'react'
import type { ButtonProps } from './Button.types'
import { baseButtonStyles, buttonSizes, radiusBySize, variants } from './Button.styles'
import { LoaderIcon } from '../Icons'

/**
 * A highly customizable Button component for triggering actions or submitting forms.
 * 
 * Supports various aesthetic variants, sizes, colors, and includes a built-in loading state
 * that automatically disables user interaction when active.
 * 
 * @example
 * ```tsx
 * <Button 
 *   variant="filled" 
 *   color="primary" 
 *   isLoading={isSubmitting} 
 *   leftIcon={<SaveIcon size={16} />}
 *   onClick={handleSave}
 * >
 *   Save Changes
 * </Button>
 * ```
 */
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
      {isLoading && <LoaderIcon className="animate-spin" size={loaderSize} />}
      {!isLoading && leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
