import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const PencilIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </SvgIcon>
))

PencilIcon.displayName = 'PencilIcon'
