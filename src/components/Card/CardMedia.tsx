import React from 'react'
import type { CardMediaProps } from './Card.types'
import { cardStyles } from './Card.styles'

const objectFitClassMap: Record<NonNullable<CardMediaProps['objectFit']>, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
}

/**
 * Edge-to-edge media area for a Card.
 *
 * Use it with `Card noPadding` when the media should touch the card borders.
 * Custom media can be passed as children instead of using `image` or `src`.
 */
export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(({ 
  image,
  src,
  alt = '',
  height,
  objectFit = 'cover',
  children,
  className = '',
  style,
  ...props
}, ref) => {
  const mediaSource = image ?? src
  const mediaHeight = height === undefined ? undefined : { height }

  return (
    <div
      ref={ref}
      className={`${cardStyles.media.root} ${className}`}
      style={{ ...style, ...mediaHeight }}
      {...props}
    >
      {mediaSource ? (
        <img
          src={mediaSource}
          alt={alt}
          className={`${cardStyles.media.image} ${objectFitClassMap[objectFit]}`}
        />
      ) : children}
    </div>
  )
})

CardMedia.displayName = 'CardMedia'

export default CardMedia
