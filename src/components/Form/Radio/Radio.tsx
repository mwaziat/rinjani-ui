'use client'

import React from 'react'
import { AlertCircleIcon } from '../../Icons'
import type { RadioProps } from './Radio.types'
import { sizeClasses, colors } from './Radio.styles'

export const Radio = ({
  label,
  options,
  value,
  onChange,
  name,
  size = 'md',
  color = 'primary',
  error,
  required,
  className = '',
  orientation = 'col',
  showOptionLabel = true,
  groupAriaLabel,
  disabled = false,
  readOnly = false,
}: RadioProps) => {
  const autoName = React.useId().replace(/:/g, '')

  const resolvedName = name || `radio-group-${autoName}`
  const resolvedGroupAriaLabel = (typeof label === 'string' ? label.trim() : '') || groupAriaLabel || 'Radio Group'

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="block mb-3 text-[11px] font-normal uppercase tracking-widest text-neutral-500">
          {label} {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}

      <div className={`flex ${orientation === 'row' ? 'flex-row flex-wrap gap-6' : 'flex-col gap-3'}`} role="radiogroup" aria-label={resolvedGroupAriaLabel}>
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <label key={option.value} className={`group flex items-center ${(disabled || option.disabled) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${showOptionLabel ? sizeClasses[size].rowGap : 'gap-0'}`}>
              <div className="relative shrink-0">
                <input
                  type="radio"
                  className="peer sr-only"
                  name={resolvedName}
                  checked={isSelected}
                  disabled={disabled || option.disabled}
                  aria-readonly={readOnly}
                  aria-disabled={disabled || option.disabled}
                  onChange={() => {
                    if (disabled || readOnly || option.disabled) return
                    onChange(option.value as string | number)
                  }}
                  aria-label={option.label || String(option.value)}
                />
                <div className={`
                  flex items-center justify-center rounded-full border bg-white transition-all ${sizeClasses[size].box}
                  before:scale-0 before:rounded-full before:transition-transform before:content-[''] ${sizeClasses[size].dot}
                  ${isSelected ? colors[color].active : 'border-neutral-300 group-hover:border-neutral-300'}
                  ${error ? 'border-danger-500 peer-focus:ring-danger-400 peer-focus:border-danger-500' : colors[color].focus}
                `}>
                </div>
              </div>
              {showOptionLabel && <span className={`${sizeClasses[size].label} font-normal text-neutral-900`}>{option.label}</span>}
            </label>
          )
        })}
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase text-danger-500 tracking-wider pl-1">
          <AlertCircleIcon size={12} />
          {error}
        </div>
      )}
    </div>
  )
}

export default Radio
