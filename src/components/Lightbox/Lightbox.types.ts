export interface LightboxSlide {
  src: string
  alt?: string
  title?: string
  description?: string
}

export interface LightboxProps {
  open: boolean
  close: () => void
  index?: number
  slides: LightboxSlide[]
  showThumbnails?: boolean
  showZoom?: boolean
  autoplay?: boolean
  autoplayDuration?: number
  isDraggable?: boolean
  loop?: boolean
}
