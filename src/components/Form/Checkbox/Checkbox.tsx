'use client'

import React from 'react'
import { CheckIcon, AlertCircleIcon } from '../../Icons'
import type { CheckboxProps } from './Checkbox.types'
import { sizeClasses, colors } from './Checkbox.styles'

/**
 * A group of checkbox inputs that allows users to select multiple options from a list.
 * 
 * Includes built-in support for labels, error states, and responsive layouts (vertical/horizontal).
 * 
 * @example
 * ```tsx
 * const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
 * 
 * return (
 *   <Checkbox 
 *     label="What are your hobbies?"
 *     name="hobbies"
 *     options={[
 *       { label: 'Reading', value: 'reading' },
 *       { label: 'Gaming', value: 'gaming' },
 *       { label: 'Sleeping', value: 'sleeping' }
 *     ]}
 *     values={selectedHobbies}
 *     onChange={setSelectedHobbies}
 *     orientation="row"
 *   />
 * )
 * ```
 */
export const Checkbox = ({
  label,
  options,
  values,
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
}: CheckboxProps) => {
  const toggleValue = (val: string | number, optionDisabled?: boolean) => {
    if (disabled || readOnly || optionDisabled) return
    const newValues = values.includes(val) 
      ? values.filter(v => v !== val) 
      : [...values, val]
    onChange(newValues)
  }

  const resolvedGroupAriaLabel = (typeof label === 'string' ? label.trim() : '') || groupAriaLabel || 'Checkbox Group'

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="block mb-3 text-[11px] font-normal uppercase tracking-widest text-neutral-500">
          {label} {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}

      <div className={`flex ${orientation === 'row' ? 'flex-row flex-wrap gap-6' : 'flex-col gap-3'}`} role="group" aria-label={resolvedGroupAriaLabel}>
        {options.map((option) => {
          const isChecked = values.includes(option.value as string | number)
          return (
            <label key={option.value} className={`group flex items-center ${(disabled || option.disabled) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${showOptionLabel ? sizeClasses[size].rowGap : 'gap-0'}`}>
              <div className="relative shrink-0">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  name={name}
                  checked={isChecked}
                  disabled={disabled || option.disabled}
                  aria-readonly={readOnly}
                  aria-disabled={disabled || option.disabled}
                  onChange={() => toggleValue(option.value as string | number, option.disabled)}
                  aria-label={option.label || String(option.value)}
                />
                <div className={`
                  flex items-center justify-center border transition-all ${sizeClasses[size].box} ${sizeClasses[size].radius}
                  ${isChecked ? colors[color].checked : 'border-neutral-300 bg-white text-transparent group-hover:border-neutral-300'}
                  ${error ? 'border-danger-500 peer-focus:ring-danger-400 peer-focus:border-danger-500' : colors[color].focus}
                `}>
                  {isChecked && <CheckIcon className="text-white" size={sizeClasses[size].icon} strokeWidth={4} />}
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

export default Checkbox
