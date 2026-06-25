import React from 'react'
import type { BreadcrumbProps } from './Breadcrumb.types'
import { 
  baseBreadcrumbWrapperStyles, 
  containedBreadcrumbStyles, 
  colorVariants, 
  pathVariants,
  activeIconSizes,
  activeLabelSizes,
  activeSubtitleSizes,
  pathSizes 
} from './Breadcrumb.styles'
import { ChevronRightIcon } from '../Icons'

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  activeLabel,
  activeIcon,
  paths,
  color = 'primary',
  variant = 'line',
  size = 'md',
  className = '',
  contained = true,
  separator = <ChevronRightIcon size={14} />
}: BreadcrumbProps) => {
  const wrapperStyles = contained ? containedBreadcrumbStyles : ''
  const selectedVariant = colorVariants[color]
  const pathVariantClass = pathVariants[variant][color]

  return (
    <div className={`${baseBreadcrumbWrapperStyles} ${wrapperStyles} ${className}`}>
      <div className="flex items-center gap-3">
        {activeIcon && (
          <div className={`rounded-lg ${activeIconSizes[size]} ${selectedVariant}`}>
            {activeIcon}
          </div>
        )}
        <div>
          <h1 className={`font-black uppercase leading-none tracking-tight text-neutral-800 ${activeLabelSizes[size]}`}>
            {activeLabel}
          </h1>
          <p className={`mt-1 font-bold uppercase tracking-[0.2em] text-neutral-500 ${activeSubtitleSizes[size]}`}>
            Current Position
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {paths.map((path, index) => (
          <React.Fragment key={path.href}>
            {index > 0 && <span className="shrink-0 text-neutral-400 flex items-center justify-center">{separator}</span>}
            <a href={path.href} className="group flex items-center transition-all">
              <div className={`flex items-center rounded-lg border transition-all ${pathSizes[size]} ${pathVariantClass}`}>
                {path.icon && (
                  <span className={`shrink-0 flex items-center transition-colors`}>
                    {path.icon}
                  </span>
                )}
                <span className={`whitespace-nowrap font-medium transition-colors`}>
                  {path.label}
                </span>
              </div>
            </a>
          </React.Fragment>
        ))}

        {paths.length > 0 && <span className="shrink-0 text-neutral-400 flex items-center justify-center">{separator}</span>}

        <div className={`flex items-center ${pathSizes[size].split(' ').filter(c => c.startsWith('px-') || c.startsWith('py-') || c.startsWith('text-')).join(' ')}`}>
          <span className={`whitespace-nowrap font-semibold text-neutral-800`}>
            {activeLabel}
          </span>
        </div>
      </nav>
    </div>
  )
}

export default Breadcrumb
