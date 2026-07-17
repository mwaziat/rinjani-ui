import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const CalendarIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="2" ry="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </SvgIcon>
))

CalendarIcon.displayName = 'CalendarIcon'
