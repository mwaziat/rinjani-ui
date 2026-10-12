'use client'

import { createContext, useContext, useMemo } from 'react'
import type { RinjaniLocaleContextValue, RinjaniLocaleProviderProps } from './types'
import { englishMessages, indonesianMessages, mergeMessages, normalizeLocale } from './messages'

const defaultContextValue: RinjaniLocaleContextValue = {
  locale: 'en',
  messages: englishMessages,
}

const RinjaniLocaleContext = createContext<RinjaniLocaleContextValue>(defaultContextValue)

export function RinjaniLocaleProvider({
  locale = 'en',
  translations,
  children,
}: RinjaniLocaleProviderProps) {
  const normalizedLocale = normalizeLocale(locale)
  const baseMessages = normalizedLocale === 'id' ? indonesianMessages : englishMessages
  const messages = useMemo(
    () => mergeMessages(baseMessages, translations),
    [baseMessages, translations],
  )
  const contextValue = useMemo(
    () => ({ locale: normalizedLocale, messages }),
    [normalizedLocale, messages],
  )

  return (
    <RinjaniLocaleContext.Provider value={contextValue}>
      {children}
    </RinjaniLocaleContext.Provider>
  )
}

export function useRinjaniLocale(): RinjaniLocaleContextValue {
  return useContext(RinjaniLocaleContext)
}
