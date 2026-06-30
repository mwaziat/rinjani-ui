import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const MessageSquareIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </SvgIcon>
))

MessageSquareIcon.displayName = 'MessageSquareIcon'
