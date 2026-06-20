import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const ChevronDownIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 9-7 7-7-7" />
  </SvgIcon>
))

ChevronDownIcon.displayName = 'ChevronDownIcon'
