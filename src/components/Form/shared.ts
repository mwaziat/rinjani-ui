import React from 'react'
import type { SelectOption, SelectPrimitiveValue, SelectValue } from './types'

export const useStableInputId = (providedId: string | undefined, prefix: string): string => {
  const generatedId = React.useId().replace(/:/g, '')
  return providedId ?? `${prefix}-${generatedId}`
}

export const isSelectValueObject = (value: SelectValue | undefined): value is { value: SelectPrimitiveValue; data?: unknown } => {
  return typeof value === 'object' && value !== null && 'value' in value
}

export const getSelectValueKey = (value: SelectValue | undefined): SelectPrimitiveValue | undefined => {
  if (isSelectValueObject(value)) {
    return value.value
  }

  return value
}

export const buildSelectValue = (
  sourceValue: SelectValue | undefined,
  nextValue: SelectPrimitiveValue,
  nextData?: unknown
): SelectValue => {
  if (isSelectValueObject(sourceValue)) {
    return { value: nextValue, data: nextData }
  }

  return nextValue
}

export const filterOptionsByLabel = (options: SelectOption[], query: string): SelectOption[] => {
  const keyword = query.trim().toLowerCase()

  if (!keyword) {
    return options
  }

  return options.filter((option) => option.label.toLowerCase().includes(keyword))
}

export const isMutableInteraction = (disabled?: boolean, readOnly?: boolean): boolean => {
  return !disabled && !readOnly
}

type CurrencyIntlMeta = {
  groupSymbol: string
}

export const parseCurrency = (input: string, currency: string, locale?: string): string => {
  if (!currency.trim()) {
    return ''
  }

  let meta: CurrencyIntlMeta | null = null
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 20,
    })
    const parts = formatter.formatToParts(1234567)
    meta = {
      groupSymbol: parts.find((part) => part.type === 'group')?.value ?? ',',
    }
  } catch {
    return input.replace(/[^\d-]/g, '')
  }

  let cleaned = input.trim()

  cleaned = cleaned
    .replace(/\s/g, '')
    .split(meta.groupSymbol).join('')
    .replace(/[^\d-]/g, '')

  const sign = cleaned.startsWith('-') ? '-' : ''
  const unsigned = cleaned.replace(/-/g, '')
  const intPartRaw = unsigned
  const intPart = intPartRaw.replace(/[^\d]/g, '')
  if (!intPart) {
    return ''
  }
  return `${sign}${intPart}`
}

export const formatCurrency = (raw: string, currency: string, locale?: string): string => {
  if (!currency.trim()) {
    return raw
  }

  if (!raw) {
    return ''
  }

  let formatter: Intl.NumberFormat
  try {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  } catch {
    return raw
  }

  const normalizedRaw = parseCurrency(raw, currency, locale)

  if (!normalizedRaw) {
    return raw
  }

  const numericValue = Number(normalizedRaw)
  if (!Number.isFinite(numericValue)) {
    return raw
  }

  return formatter.format(numericValue)
}
