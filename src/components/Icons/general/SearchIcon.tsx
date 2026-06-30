import React from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const SearchIcon = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </SvgIcon>
))

SearchIcon.displayName = 'SearchIcon'
