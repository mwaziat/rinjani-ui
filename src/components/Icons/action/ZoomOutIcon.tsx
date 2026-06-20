import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const ZoomOutIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" x2="16.65" y1="21" y2="16.65"/>
    <line x1="8" x2="14" y1="11" y2="11"/>
  </SvgIcon>
))

ZoomOutIcon.displayName = 'ZoomOutIcon'
