import React, { forwardRef } from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const PlayIcon = forwardRef<SVGSVGElement, Omit<SvgIconProps, 'ref'>>((props, ref) => (
  <SvgIcon ref={ref} {...props} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
))

PlayIcon.displayName = 'PlayIcon'
