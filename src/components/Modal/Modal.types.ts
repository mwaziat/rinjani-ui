import type { ReactNode } from 'react'

/**
 * Size constraints for the modal dialog.
 * Determines the maximum width the modal can expand to.
 */
export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

/**
 * Determines how scrolling is handled when the modal content exceeds the viewport height.
 * - `dialog`: The entire modal box scrolls within the viewport.
 * - `content`: The modal box stays fixed, and only the `Modal.Content` area scrolls internally.
 */
export type ModalScrollMode = 'dialog' | 'content'

export interface ModalProps {
  /** 
   * Controls whether the modal is currently visible on screen. 
   */
  isOpen: boolean
  /** 
   * Callback fired when the user attempts to close the modal 
   * (e.g., clicking the backdrop or pressing the Escape key).
   */
  onClose: () => void
  /** 
   * The content to be rendered inside the modal.
   * Typically composed of Modal.Header, Modal.Content, and Modal.Footer.
   */
  children: ReactNode
  /** 
   * The maximum width size of the modal.
   * @default "md"
   */
  size?: ModalSize
  /** 
   * The scroll behavior when content is too long.
   * @default "dialog"
   */
  scrollMode?: ModalScrollMode
  /** 
   * If true, clicking on the dark backdrop overlay will trigger `onClose`.
   * @default true
   */
  closeOnOutsideClick?: boolean
  /** 
   * Additional CSS classes applied to the main modal container.
   */
  className?: string
}

export interface ModalHeaderProps {
  /** Main heading text for the modal. */
  title: string
  /** Secondary context text displayed below the title. */
  subtitle?: string
  /** 
   * Callback fired when the default close icon button (X) is clicked.
   * If omitted, the close button will not be rendered.
   */
  onClose?: () => void
}

export interface ModalContentProps {
  /** The primary body content of the modal. */
  children: ReactNode
  /** Additional CSS classes for the content area. */
  className?: string
}

export interface ModalFooterProps {
  /** Content pinned to the bottom of the modal, typically action buttons. */
  children: ReactNode
  /** Additional CSS classes for the footer area. */
  className?: string
}
