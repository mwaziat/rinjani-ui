import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const CheckIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </SvgIcon>
))

CheckIcon.displayName = 'CheckIcon'
