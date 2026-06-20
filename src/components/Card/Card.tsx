import React from 'react'
import type { CardProps } from './Card.types'
import { cardStyles } from './Card.styles'

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  className = '', 
  noPadding = false,
  ...props
}, ref) => {
  return (
    <div 
      ref={ref} 
      className={`${cardStyles.root} ${className}`}
      {...props}
    >
      <div className={noPadding ? '' : cardStyles.contentPadding}>
        {children}
      </div>
    </div>
  )
})

Card.displayName = 'Card'
