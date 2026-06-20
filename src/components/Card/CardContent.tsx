import React from 'react'
import type { CardContentProps } from './Card.types'
import { cardStyles } from './Card.styles'

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ 
  children, 
  className = '',
  ...props
}, ref) => {
  return (
    <div ref={ref} className={`${cardStyles.content} ${className}`} {...props}>
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'
