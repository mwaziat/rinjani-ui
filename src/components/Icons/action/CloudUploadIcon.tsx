import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const CloudUploadIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props}>
    <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4a7.5 7.5 0 0 0-7.45 6.63A5.5 5.5 0 0 0 5.5 21H19a5 5 0 0 0 .35-9.96ZM13 13v4h-2v-4H8l4-4 4 4h-3Z" />
  </SvgIcon>
))

CloudUploadIcon.displayName = 'CloudUploadIcon'