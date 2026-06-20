import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const ChevronUpIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 15 7-7 7 7" />
  </SvgIcon>
))

ChevronUpIcon.displayName = 'ChevronUpIcon'
