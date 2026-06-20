import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const XIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </SvgIcon>
))

XIcon.displayName = 'XIcon'
