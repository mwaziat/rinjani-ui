import type { TabColor, TabSize, TabVariant, TabPlacement } from './Tabs.types'
import { sizeMap, radiusMap, variantColorMap } from './Tabs.styles'

export function getTriggerClass(isActive: boolean, placement: TabPlacement, variant: TabVariant, size: TabSize, color: TabColor): string {
  const radiusClass = variant === 'line' ? 'rounded-none' : radiusMap[size]
  const base = `inline-flex items-center transition-all active:scale-95 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${sizeMap[size]} ${radiusClass}`

  if (variant === 'line') {
    let lineDir = ''
    if (placement === 'horizontal-top') lineDir = 'border-b-2 -mb-[1px]'
    else if (placement === 'horizontal-bottom') lineDir = 'border-t-2 -mt-[1px]'
    else if (placement === 'vertical-left') lineDir = 'border-r-2 -mr-[1px]'
    else if (placement === 'vertical-right') lineDir = 'border-l-2 -ml-[1px]'

    if (isActive) {
      return `${base} ${lineDir} ${variantColorMap.line[color]}`
    }
    return `${base} ${lineDir} border-transparent text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 bg-transparent`
  }

  if (isActive) {
    return `${base} ${variantColorMap[variant][color]}`
  }

  return `${base} text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/50 bg-transparent`
}
