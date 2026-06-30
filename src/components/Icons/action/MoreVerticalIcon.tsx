import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const MoreVerticalIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </SvgIcon>
))

MoreVerticalIcon.displayName = 'MoreVerticalIcon'
