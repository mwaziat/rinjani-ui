import type { ReactNode } from 'react'

export interface CardProps {
  /**
   * The content to be rendered inside the card.
   * Typically a composition of Card.Header, Card.Content, and Card.Footer.
   */
  children: ReactNode
  /**
   * Additional CSS classes to apply to the main card container.
   */
  className?: string
  /**
   * If true, removes the default padding around the card body, allowing content 
   * (like images or edge-to-edge tables) to touch the card's borders.
   * @default false
   */
  noPadding?: boolean
}

export interface CardHeaderProps {
  /**
   * The main headline text of the card.
   */
  title?: string
  /**
   * Secondary text displayed just below the title for extra context.
   */
  subtitle?: string
  /**
   * Custom content to inject into the header (e.g., action buttons or badges).
   * Renders alongside the title/subtitle.
   */
  children?: ReactNode
  /**
   * Additional CSS classes to override or extend the header styles.
   */
  className?: string
  /**
   * An optional icon rendered to the left of the title.
   */
  icon?: ReactNode
}

export interface CardContentProps {
  /**
   * The primary body content of the card.
   */
  children: ReactNode
  /**
   * Additional CSS classes to override or extend the content area styles.
   */
  className?: string
}

export interface CardFooterProps {
  /**
   * Content to render at the bottom of the card, typically action buttons.
   */
  children: ReactNode
  /**
   * Additional CSS classes to override or extend the footer styles.
   */
  className?: string
}
