import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const MinusIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </SvgIcon>
))

MinusIcon.displayName = 'MinusIcon'
