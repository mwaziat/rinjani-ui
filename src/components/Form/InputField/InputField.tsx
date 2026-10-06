'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from '../../Icons'
import type { InputFieldProps } from './InputField.types'
import { colorMap, lineFocus, textSizeMap, labelSizeMap, floatingActiveSizeMap, sizeMap, radiusMap } from './InputField.styles'
import { formatCurrency, parseCurrency, useStableInputId, iconSizeMap } from '../shared'

type CurrencySelection = {
  formattedValue: string
  startDigitIndex: number
  endDigitIndex: number
}

const countDigitsBefore = (value: string, position: number) =>
  (value.slice(0, position).match(/[0-9]/g) ?? []).length

const positionAfterDigitCount = (value: string, digitCount: number) => {
  if (digitCount <= 0) {
    const firstDigitIndex = value.search(/[0-9]/)
    return firstDigitIndex === -1 ? value.length : firstDigitIndex
  }

  let seenDigits = 0

  for (let index = 0; index < value.length; index += 1) {
    if (/[0-9]/.test(value[index] ?? '')) {
      seenDigits += 1
      if (seenDigits >= digitCount) {
        return index + 1
      }
    }
  }

  return value.length
}

// Avoid a server-render warning while still restoring the caret before the
// browser paints when this component runs on the client.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

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
  const inputRef = useRef<HTMLInputElement>(null)
  const pendingCurrencySelectionRef = useRef<CurrencySelection | null>(null)
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
  const iconVerticalStyles = isMultiline ? 'top-4' : 'top-1/2 -translate-y-1/2'

  const baseInputStyles = `peer w-full ${radiusClass} transition-all outline-none focus:outline-none !ring-0 !outline-none shadow-none focus:shadow-none focus:ring-0 focus:ring-offset-0 ${variant === 'line' ? '' : 'border'} disabled:bg-neutral-100 disabled:cursor-not-allowed text-neutral-900 font-normal ${sizeMap[size]} ${leftIcon ? 'pl-11' : 'pl-4'} ${(rightIcon || isPassword) ? 'pr-11' : 'pr-4'} ${borderStyles} ${variant === 'filled' ? 'bg-neutral-50 focus:bg-white' : 'bg-white'} ${floating ? (isFloating ? 'placeholder-neutral-400' : 'placeholder-transparent') : 'placeholder-neutral-400'} placeholder:font-normal`

  const labelStyles = floating
    ? `absolute z-10 transition-all duration-200 pointer-events-none ${isFloating ? `top-0 ${floatingActiveSizeMap[size]} bg-white px-2 -translate-y-1/2 left-4 whitespace-nowrap max-w-[calc(100%_-_2rem)] overflow-hidden text-ellipsis font-normal uppercase tracking-widest leading-none` : `${isMultiline ? 'top-4 translate-y-0' : 'top-1/2 -translate-y-1/2'} ${textSizeMap[size]} font-normal ${leftIcon ? 'left-11' : 'left-4'}`} ${error ? 'text-danger-500' : `${colorMap[color].label} ${isFloating ? 'text-neutral-500' : 'text-neutral-400'}`}`
    : `block mb-2 ${labelSizeMap[size]} font-normal uppercase tracking-widest ${error ? 'text-danger-500' : 'text-neutral-500'}`

  const inputProps = props as Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'inputMode'>

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value)
    }

    if (isCurrencyMode && currency && 'value' in event.target) {
      const target = event.currentTarget
      const selectionStart = target.selectionStart ?? target.value.length
      const selectionEnd = target.selectionEnd ?? selectionStart
      const rawNextValue = parseCurrency(target.value, currency, locale)
      const formattedNextValue = formatCurrency(rawNextValue, currency, locale)

      // Currency formatting inserts prefixes and group separators. Store the
      // selection as a digit index so it can be restored after React writes
      // the newly formatted value back to the controlled input.
      pendingCurrencySelectionRef.current = {
        formattedValue: formattedNextValue,
        startDigitIndex: countDigitsBefore(target.value, selectionStart),
        endDigitIndex: countDigitsBefore(target.value, selectionEnd),
      }

      if (!isControlled) {
        setUncontrolledCurrencyRawValue(rawNextValue)
      }

      // Keep the existing InputField contract: consumers receive the raw
      // numeric value, while the input itself renders the formatted value.
      target.value = rawNextValue
    }

    if (onChange) {
      onChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (!isCurrencyMode || !inputRef.current) {
      pendingCurrencySelectionRef.current = null
      return
    }

    const pendingSelection = pendingCurrencySelectionRef.current
    if (!pendingSelection || inputRef.current.value !== pendingSelection.formattedValue) {
      return
    }

    const start = positionAfterDigitCount(inputRef.current.value, pendingSelection.startDigitIndex)
    const end = positionAfterDigitCount(inputRef.current.value, pendingSelection.endDigitIndex)
    inputRef.current.setSelectionRange(start, end)
    pendingCurrencySelectionRef.current = null
  })

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {!floating && label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label} {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}

      <div className={`relative flex ${isMultiline ? 'items-start' : 'items-center'}`}>
        {leftIcon && <div className={`absolute left-4 ${iconVerticalStyles} text-neutral-400 flex items-center justify-center pointer-events-none`}>{leftIcon}</div>}

        {isMultiline ? (
          <textarea id={inputId} placeholder={placeholder} rows={rows} className={`${baseInputStyles} py-4 min-h-30 resize-none`} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} defaultValue={defaultValue as string | number | readonly string[] | undefined} value={value as string | number | readonly string[] | undefined} onChange={handleChange} onFocus={(event) => { setIsFocused(true); (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>).onFocus?.(event) }} onBlur={(event) => { setIsFocused(false); (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>).onBlur?.(event) }} />
        ) : (
          <input ref={inputRef} id={inputId} type={isCurrencyMode ? 'text' : (isPassword ? (showPassword ? 'text' : 'password') : type)} inputMode={isCurrencyMode ? 'numeric' : inputMode} placeholder={placeholder} className={baseInputStyles} {...inputProps} defaultValue={isCurrencyMode ? undefined : defaultValue} value={isCurrencyMode ? displayCurrencyValue : value} onChange={handleChange} onFocus={(event) => { setIsFocused(true); inputProps.onFocus?.(event) }} onBlur={(event) => { setIsFocused(false); inputProps.onBlur?.(event) }} />
        )}

        {floating && label && <label htmlFor={inputId} className={labelStyles}>{label} {required && <span className="text-danger-500 ml-0.5">*</span>}</label>}

        {(rightIcon || isPassword) && (
          <div className={`absolute right-4 ${iconVerticalStyles} text-neutral-400 flex items-center justify-center`}>
            {isPassword ? (
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-neutral-600 transition-colors cursor-pointer outline-none" tabIndex={-1}>
                {showPassword ? <EyeOffIcon size={iconSizeMap[size]} /> : <EyeIcon size={iconSizeMap[size]} />}
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
