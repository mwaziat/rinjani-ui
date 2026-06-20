import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const LoaderIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon 
    ref={ref} 
    {...props} 
    className={`animate-spin ${props.className || ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </SvgIcon>
))

LoaderIcon.displayName = 'LoaderIcon'
