'use client'

import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from '../../Icons'
import type { InputFieldProps } from './InputField.types'
import { colorMap, lineFocus, textSizeMap, labelSizeMap, floatingActiveSizeMap, sizeMap, radiusMap } from './InputField.styles'
import { formatCurrency, parseCurrency, useStableInputId } from '../shared'

/**
 * A highly versatile text input component for forms.
 * 
 * Supports single-line text, multi-line textareas, password toggles, floating labels, 
 * and automatic currency formatting.
 * 
 * @example
 * ```tsx
 * // Simple input with floating label
 * <InputField label="Email Address" floating type="email" />
 * 
 * // Currency formatting
 * <InputField label="Price" format="currency" currency="USD" />
 * 
 * // Password with built-in toggle
 * <InputField label="Password" isPassword />
 * ```
 */
export const InputField = ({
  label,
  format = 'text',
  currency,
  locale,
  floating = false,
  variant = 'outlined',
  size = 'md',
  color = 'primary',
  leftIcon,
  rightIcon,
  isPassword = false,
  isMultiline = false,
  rows = 4,
  error,
  required,
  className = '',
  id,
  placeholder,
  value,
  defaultValue,
  onChange,
  type,
  inputMode,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')
  const [uncontrolledCurrencyRawValue, setUncontrolledCurrencyRawValue] = useState(() => parseCurrency(String(defaultValue ?? ''), currency ?? '', locale))
  const inputId = useStableInputId(id, 'input-field')
  const isCurrencyMode = format === 'currency' && !isMultiline && !isPassword && Boolean(currency?.trim())
  const isControlled = value !== undefined

  const rawCurrencyValue = isControlled ? parseCurrency(String(value ?? ''), currency ?? '', locale) : uncontrolledCurrencyRawValue
  const displayCurrencyValue = isCurrencyMode && currency ? formatCurrency(rawCurrencyValue, currency, locale) : ''

  const currentValue = isControlled ? value : uncontrolledValue
  const hasValue = Boolean((isCurrencyMode ? rawCurrencyValue : currentValue)?.toString().length)
  const isFloating = floating && (isFocused || hasValue)

  const borderStyles = variant === 'line'
    ? (error
      ? `border-0 border-b border-danger-500 focus:border-b-danger-500 focus:ring-0`
      : `border-0 border-b border-neutral-400 ${lineFocus[color]}`
    )
    : (error
      ? 'border-danger-500 focus:border-danger-500 focus:ring-0'
      : `border-neutral-400 ${colorMap[color].focus}`
    )

  const radiusClass = variant === 'line' ? 'rounded-none' : radiusMap[size]

  const baseInputStyles = `peer w-full ${radiusClass} transition-all outline-none focus:outline-none !ring-0 !outline-none shadow-none focus:shadow-none focus:ring-0 focus:ring-offset-0 ${variant === 'line' ? '' : 'border'} disabled:bg-neutral-100 disabled:cursor-not-allowed text-neutral-900 font-normal ${sizeMap[size]} ${leftIcon ? 'pl-11' : 'px-4'} ${(rightIcon || isPassword) ? 'pr-11' : 'px-4'} ${borderStyles} ${variant === 'filled' ? 'bg-neutral-50 focus:bg-white' : 'bg-white'} ${floating ? (isFloating ? 'placeholder-neutral-400' : 'placeholder-transparent') : 'placeholder-neutral-400'} placeholder:font-normal`

  const labelStyles = floating
    ? `absolute z-10 transition-all duration-200 pointer-events-none ${isFloating ? `top-0 ${floatingActiveSizeMap[size]} bg-white px-2 -translate-y-1/2 left-4 font-normal uppercase tracking-widest` : `${isMultiline ? 'top-4 translate-y-0' : 'top-1/2 -translate-y-1/2'} ${textSizeMap[size]} font-normal ${leftIcon ? 'left-11' : 'left-4'}`} ${error ? 'text-danger-500' : `${colorMap[color].label} ${isFloating ? 'text-neutral-500' : 'text-neutral-400'}`}`
    : `block mb-2 ${labelSizeMap[size]} font-normal uppercase tracking-widest ${error ? 'text-danger-500' : 'text-neutral-500'}`

  const inputProps = props as Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'inputMode'>

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value)
    }

    if (isCurrencyMode && currency && 'value' in event.target) {
      const rawNextValue = parseCurrency(event.target.value, currency, locale)
      if (!isControlled) {
        setUncontrolledCurrencyRawValue(rawNextValue)
      }
      event.target.value = rawNextValue
      event.currentTarget.value = rawNextValue
    }

    if (onChange) {
      onChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {!floating && label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label} {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && <div className="absolute left-4 text-neutral-400 flex items-center justify-center pointer-events-none">{leftIcon}</div>}

        {isMultiline ? (
          <textarea id={inputId} placeholder={placeholder} rows={rows} className={`${baseInputStyles} py-4 min-h-30 resize-none`} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} defaultValue={defaultValue as string | number | readonly string[] | undefined} value={value as string | number | readonly string[] | undefined} onChange={handleChange} onFocus={(event) => { setIsFocused(true); (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>).onFocus?.(event) }} onBlur={(event) => { setIsFocused(false); (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>).onBlur?.(event) }} />
        ) : (
          <input id={inputId} type={isCurrencyMode ? 'text' : (isPassword ? (showPassword ? 'text' : 'password') : type)} inputMode={isCurrencyMode ? 'numeric' : inputMode} placeholder={placeholder} className={baseInputStyles} {...inputProps} defaultValue={isCurrencyMode ? undefined : defaultValue} value={isCurrencyMode ? displayCurrencyValue : value} onChange={handleChange} onFocus={(event) => { setIsFocused(true); inputProps.onFocus?.(event) }} onBlur={(event) => { setIsFocused(false); inputProps.onBlur?.(event) }} />
        )}

        {floating && label && <label htmlFor={inputId} className={labelStyles}>{label} {required && <span className="text-danger-500 ml-0.5">*</span>}</label>}

        {(rightIcon || isPassword) && (
          <div className="absolute right-4 text-neutral-400 flex items-center justify-center">
            {isPassword ? (
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-neutral-600 transition-colors cursor-pointer outline-none" tabIndex={-1}>
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-normal uppercase text-danger-500 tracking-wider pl-1">
          <AlertCircleIcon size={12} />
          {error}
        </div>
      )}
    </div>
  )
}

export default InputField
