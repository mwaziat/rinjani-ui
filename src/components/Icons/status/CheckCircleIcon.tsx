import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const CheckCircleIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </SvgIcon>
))

CheckCircleIcon.displayName = 'CheckCircleIcon'
