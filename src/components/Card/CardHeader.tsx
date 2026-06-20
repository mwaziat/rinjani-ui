import React from 'react'
import type { CardHeaderProps } from './Card.types'
import { cardStyles } from './Card.styles'

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ 
  title, 
  subtitle, 
  children, 
  className = '', 
  icon,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={`${cardStyles.header.root} ${className}`} {...props}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className={cardStyles.header.iconWrapper}>
            {icon}
          </div>
        )}
        <div className="flex flex-col">
          {title && (
            <h3 className={cardStyles.header.title}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={cardStyles.header.subtitle}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  )
})

CardHeader.displayName = 'CardHeader'
