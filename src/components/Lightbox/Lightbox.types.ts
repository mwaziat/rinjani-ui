/**
 * Represents a single image slide in the Lightbox gallery.
 */
export interface LightboxSlide {
  /** The source URL of the image. */
  src: string
  /** Accessible alt text for the image. */
  alt?: string
  /** A bold title rendered below the image. */
  title?: string
  /** A subtle description rendered below the title. */
  description?: string
}

export interface LightboxProps {
  /** 
   * Controls whether the lightbox is currently visible on screen. 
   */
  open: boolean
  /** 
   * Callback fired when the user attempts to close the lightbox 
   * (e.g., clicking the backdrop, close button, or pressing Escape).
   */
  close: () => void
  /** 
   * The initial slide index to display when opened. 
   * @default 0
   */
  index?: number
  /** 
   * An array of image slide objects to be displayed in the gallery.
   */
  slides: LightboxSlide[]
  /** 
   * If true, displays a row of clickable thumbnail previews at the bottom of the screen.
   * @default true
   */
  showThumbnails?: boolean
  /** 
   * If true, enables zoom controls allowing users to zoom in/out of the current image.
   * @default true
   */
  showZoom?: boolean
  /** 
   * If true, the gallery will automatically transition between slides based on a timer.
   * @default false
   */
  autoplay?: boolean
  /** 
   * The duration in milliseconds between slide transitions if `autoplay` is enabled.
   * @default 3000
   */
  autoplayDuration?: number
  /** 
   * If true, allows users to drag/swipe images to navigate between slides.
   * @default true
   */
  isDraggable?: boolean
  /** 
   * If true, navigating past the last slide will loop back to the first slide, and vice versa.
   * @default true
   */
  loop?: boolean
}
