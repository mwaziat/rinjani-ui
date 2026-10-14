import type { ReactNode } from 'react'

export type RinjaniLocale = 'en' | 'id'

export interface RinjaniMessages {
  common: {
    cancel: string
    close: string
    save: string
    loading: string
    previous: string
    next: string
  }
  select: {
    placeholder: string
    multiplePlaceholder: string
    noData: string
  }
  autocomplete: {
    placeholder: string
    multiplePlaceholder: string
    search: string
    noResults: string
    addItem: string
    addNewItem: string
    addItemPlaceholder: string
    cancelAddItem: string
    saveNewItem: string
  }
  multiTagInput: {
    placeholder: string
  }
  dataTable: {
    searchPlaceholder: string
    refresh: string
    addNew: string
    editAll: string
    deleteAll: string
    showing: string
    to: string
    of: string
    results: string
    rowsPerPage: string
    previousPage: string
    nextPage: string
    loading: string
    noData: string
    detail: string
    edit: string
    delete: string
  }
  editDataTable: {
    searchPlaceholder: string
    refresh: string
    addNew: string
    editAll: string
    editSelected: string
    deleteAll: string
    saveAll: string
    cancelAll: string
    saving: string
    save: string
    cancel: string
    detail: string
    edit: string
    delete: string
    loading: string
    noData: string
    showing: string
    to: string
    of: string
    results: string
    rowsPerPage: string
    previousPage: string
    nextPage: string
  }
  tree: {
    title: string
    description: string
    addRoot: string
    addChild: string
    loading: string
    noData: string
    edit: string
    delete: string
    detail: string
  }
  dropzone: {
    noFileSelected: string
  }
  alert: {
    close: string
    expand: string
    minimize: string
  }
  toast: {
    close: string
  }
}

export type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends object ? DeepPartial<T[Key]> : T[Key]
}

export interface RinjaniLocaleProviderProps {
  /** Locale code such as `en`, `en-US`, `id`, or `id-ID`. */
  locale?: string
  /** Optional overrides for the active locale. Component props still take priority. */
  translations?: DeepPartial<RinjaniMessages>
  children: ReactNode
}

export interface RinjaniLocaleContextValue {
  locale: RinjaniLocale
  messages: RinjaniMessages
}
