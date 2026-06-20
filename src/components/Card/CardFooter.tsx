import React from 'react'
import type { CardFooterProps } from './Card.types'
import { cardStyles } from './Card.styles'

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ 
  children, 
  className = '',
  ...props
}, ref) => {
  return (
    <div ref={ref} className={`${cardStyles.footer} ${className}`} {...props}>
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'
