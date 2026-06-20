import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const ChevronLeftIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </SvgIcon>
))

ChevronLeftIcon.displayName = 'ChevronLeftIcon'
