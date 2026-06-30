'use client'

import React, { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { PlusIcon, XIcon, AlertCircleIcon } from '../../Icons'
import type { MultiTagInputProps } from './MultiTagInput.types'
import { useStableInputId } from '../shared'
import type { MultiTagValue, MultiTagValueMode } from '../types'
import {
  colorMap,
  inputColorMap,
  lineFocus,
  textSizeMap,
  labelSizeMap,
  floatingActiveSizeMap,
  sizeMap,
  radiusMap,
  iconSizes
} from './MultiTagInput.styles'

/**
 * An input field designed for capturing multiple arbitrary text values as tags.
 * 
 * Unlike Autocomplete, this component does not have a dropdown list. 
 * Users simply type text and press Enter to add a new tag.
 * 
 * @example
 * ```tsx
 * const [emails, setEmails] = useState<MultiTagValue[]>([])
 * 
 * return (
 *   <MultiTagInput 
 *     label="Invite Team Members"
 *     placeholder="Type email address and press Enter"
 *     values={emails}
 *     onChange={setEmails}
 *     maxTags={5}
 *   />
 * )
 * ```
 */
export const MultiTagInput = ({
  label,
  values = [],
  onChange,
  placeholder = 'Type and press Enter...',
  floating = false,
  variant = 'outlined',
  size = 'md',
  color = 'primary',
  leftIcon,
  rightIcon,
  error,
  required,
  className = '',
  maxTags = 10,
  valueMode,
  allowDuplicates = false,
  disabled = false,
  readOnly = false,
  id,
}: MultiTagInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputId = useStableInputId(id, 'multitag')
  const hasValue = values.length > 0 || inputValue.trim().length > 0
  const isFloating = floating && (isFocused || hasValue)

  const getMode = (): MultiTagValueMode => {
    if (valueMode) {
      return valueMode
    }

    return values.some((value) => typeof value === 'object') ? 'object' : 'string'
  }

  const getValueKey = (value: MultiTagValue) => (typeof value === 'string' ? value.trim().toLowerCase() : String(value.value).trim().toLowerCase())
  const getValueLabel = (value: MultiTagValue) => (typeof value === 'string' ? value : value.label)

  const buildValue = (rawValue: string): MultiTagValue => {
    if (getMode() === 'object') {
      return {
        label: rawValue,
        value: rawValue,
      } as MultiTagValue
    }

    return rawValue as MultiTagValue
  }

  const borderStyles = variant === 'line'
    ? (error
      ? `border-0 border-b border-danger-500 focus:border-b-danger-500 focus:ring-0`
      : `border-0 border-b border-neutral-400 ${lineFocus[color]}`
    )
    : (error
      ? 'border-danger-500 focus:border-danger-500 focus:ring-0'
      : `border-neutral-400 ${inputColorMap[color].focus}`
    )

  const radiusClass = variant === 'line' ? 'rounded-none' : radiusMap[size]

  const baseInputStyles = `peer w-full ${radiusClass} transition-all outline-none ${variant === 'line' ? '' : 'border'} disabled:bg-neutral-50 disabled:cursor-not-allowed text-neutral-900 font-normal ${sizeMap[size]} ${leftIcon ? 'pl-11' : 'px-4'} ${(rightIcon ? 'pr-11' : 'pr-10')} ${borderStyles} ${variant === 'filled' ? 'bg-neutral-50 focus:bg-white' : 'bg-white'} ${floating ? (isFloating ? 'placeholder-neutral-400' : 'placeholder-transparent') : 'placeholder-neutral-400'} placeholder:font-normal`

  const handleAddTag = () => {
    if (disabled || readOnly) return

    const trimmedValue = inputValue.trim()

    if (!trimmedValue || values.length >= maxTags) {
      return
    }

    const nextValue = buildValue(trimmedValue)
    const alreadyExists = values.some((value) => getValueKey(value) === getValueKey(nextValue))

    if (!allowDuplicates && alreadyExists) {
      return
    }

    onChange([...values, nextValue])
    setInputValue('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return

    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddTag()
      return
    }

    if (event.key === 'Backspace' && !inputValue && values.length > 0) {
      const nextValues = values.slice(0, -1)
      onChange(nextValues)
    }
  }

  const removeTag = (index: number) => {
    if (disabled) {
      return
    }
    if (readOnly) return

    const nextValues = values.filter((_, valueIndex) => valueIndex !== index)
    onChange(nextValues)
  }

  const labelStyles = floating
    ? `absolute z-10 transition-all duration-200 pointer-events-none ${isFloating ? `top-0 ${floatingActiveSizeMap[size]} bg-white px-2 -translate-y-1/2 left-4 font-normal uppercase tracking-widest` : `top-1/2 -translate-y-1/2 ${textSizeMap[size]} font-normal ${leftIcon ? 'left-11' : 'left-4'}`} ${error ? 'text-danger-500' : `${isFloating ? inputColorMap[color].label : 'text-neutral-400'}`}`
    : `mb-2 block ${labelSizeMap[size]} font-normal uppercase tracking-widest ${error ? 'text-danger-500' : 'text-neutral-500'}`

  return (
    <div className={`flex w-full flex-col ${className}`}>
      {!floating && label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label} {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}

      <div className="group relative">
        {leftIcon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 flex items-center justify-center pointer-events-none">{leftIcon}</div>}

        <input
          id={inputId}
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={baseInputStyles}
        />

        {floating && label && (
          <label htmlFor={inputId} className={labelStyles}>
            {label} {required && <span className="ml-0.5 text-danger-500">*</span>}
          </label>
        )}

        <button
          type="button"
          onClick={handleAddTag}
          disabled={disabled || readOnly}
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300 transition-colors ${disabled || readOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-neutral-500'} ${inputColorMap[color].icon}`}
        >
          {rightIcon || <PlusIcon size={iconSizes[size]} />}
        </button>
      </div>

      {values.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((tag, index) => (
            <div
              key={`${getValueKey(tag)}-${index}`}
              className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 transition-all ${colorMap[color].bg} ${colorMap[color].border} ${colorMap[color].text}`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider">{getValueLabel(tag)}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                disabled={disabled || readOnly}
                className="rounded-full p-0.5 transition-colors hover:bg-black/5 disabled:opacity-40"
              >
                <XIcon size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 pl-1 text-[10px] font-semibold uppercase tracking-wider text-danger-500">
          <AlertCircleIcon size={12} />
          {error}
        </div>
      )}
    </div>
  )
}

export default MultiTagInput
