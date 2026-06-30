import React from 'react'
import type { CardProps } from './Card.types'
import { cardStyles } from './Card.styles'

/**
 * A container component used to group related content and actions in a clean, elevated surface.
 * 
 * Works best when combined with `Card.Header`, `Card.Content`, and `Card.Footer` for a structured layout.
 * 
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header title="Analytics" subtitle="Monthly overview" />
 *   <Card.Content>
 *     <p>Your views are up by 20% this month!</p>
 *   </Card.Content>
 *   <Card.Footer>
 *     <Button>View Full Report</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
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
