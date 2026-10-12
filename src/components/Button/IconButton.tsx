import React from 'react'
import type { IconButtonProps } from './Button.types'
import { baseButtonStyles, iconButtonSizes, radiusBySize, variants } from './Button.styles'
import { LoaderIcon } from '../Icons'

/**
 * A specialized Button component optimized for rendering a single icon without text.
 * 
 * Automatically handles perfect square proportions (or circular if `isPill` is true) 
 * to ensure icons remain centered and visually balanced.
 * 
 * @example
 * ```tsx
 * <IconButton 
 *   variant="soft" 
 *   color="danger" 
 *   isPill
 *   icon={<TrashIcon size={18} />} 
 *   onClick={handleDelete}
 *   aria-label="Delete Item"
 * />
 * ```
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
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
  
  const loaderSize = size === 'xxs' ? 10 : size === 'xs' ? 12 : size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28

  return (
    <button
      ref={ref}
      className={`${baseButtonStyles} ${iconButtonSizes[size]} ${radiusStyle} ${selectedVariant} justify-center p-0 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoaderIcon className="animate-spin" size={loaderSize} />
      ) : icon}
    </button>
  )
})

IconButton.displayName = 'IconButton'

export default IconButton
