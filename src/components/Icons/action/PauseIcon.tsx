import React, { forwardRef } from 'react'
import { SvgIcon, type SvgIconProps } from '../SvgIcon'

export const PauseIcon = forwardRef<SVGSVGElement, Omit<SvgIconProps, 'ref'>>((props, ref) => (
  <SvgIcon ref={ref} {...props} viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="4" width="4" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
))

PauseIcon.displayName = 'PauseIcon'
