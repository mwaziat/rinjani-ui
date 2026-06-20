import React from 'react'
import type { BadgeProps } from './Badge.types'
import { baseStyles, sizes, radiusBySize, variants } from './Badge.styles'

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({
  children,
  variant = 'soft',
  size = 'sm',
  color = 'primary',
  leftIcon,
  rightIcon,
  isPill = false,
  className = '',
  ...props
}, ref) => {
  const selectedVariant = variants[variant]?.[color] || variants.soft.primary
  const radiusStyle = isPill ? 'rounded-full' : radiusBySize[size]

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${sizes[size]} ${radiusStyle} ${selectedVariant} ${className}`}
      {...props}
    >
      {leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
    </div>
  )
})

Badge.displayName = 'Badge'

export default Badge
