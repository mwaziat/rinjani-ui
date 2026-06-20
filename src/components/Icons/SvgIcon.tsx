import React from 'react'

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

export const SvgIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({
  size = '1em',
  className = '',
  children,
  viewBox = "0 0 24 24",
  ...props
}, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox={viewBox}
    className={className}
    fill="currentColor"
    {...props}
  >
    {children}
  </svg>
))

SvgIcon.displayName = 'SvgIcon'
