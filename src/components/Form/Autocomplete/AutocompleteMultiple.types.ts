import type React from 'react'
import type { BaseFormProps, SelectOption, SelectMultipleValue } from '../types'

export interface AutocompleteMultipleProps extends Omit<BaseFormProps, 'label'> {
  /** The text label displayed above or inside the component (if floating). */
  label?: string
  /** 
   * An array of options available for search and selection. 
   */
  options: SelectOption[]
  /** 
   * An array of the currently selected values.
   */
  value?: SelectMultipleValue
  /** 
   * Callback fired when the user adds or removes an option.
   */
  onChange: (value: SelectMultipleValue) => void
  /** Placeholder text shown when no options are selected. */
  placeholder?: string
  /** 
   * If true, enables the floating label design where the label shrinks to the top edge. 
   * @default false
   */
  floating?: boolean
  /** Optional icon to render on the left side of the input box. */
  leftIcon?: React.ReactNode
  /** Optional icon to render on the right side. */
  rightIcon?: React.ReactNode
  /** 
   * If true, displays a small 'X' icon allowing the user to clear all selections at once.
   * @default false
   */
  isClearable?: boolean
  /** Disables the entire component. */
  disabled?: boolean
  /** Makes the component read-only. */
  readOnly?: boolean
  /** Unique HTML id attribute. */
  id?: string
  /** 
   * Text to display in the dropdown when the search query yields no matches.
   * @default "No results found"
   */
  emptyText?: string
  /** 
   * If true, shows a button allowing users to add their typed search query as a new option.
   * @default false
   */
  enableAddItem?: boolean
  /** 
   * The text label for the button that initiates adding a new item.
   * @default "Add New Item"
   */
  addItemLabel?: string
  /** 
   * The placeholder text for the input field where users type their new item.
   * @default "Type new item"
   */
  addItemPlaceholder?: string
  /** 
   * Determines how adding a new item is handled.
   * - `default`: Shows an inline input to confirm the new string.
   * - `custom`: Directly fires `onAddItemClick` for you to open your own modal.
   * @default "default"
   */
  addItemMode?: 'default' | 'custom'
  /** Callback fired when a new item is successfully added via `default` mode. */
  onAddItem?: (option: SelectOption) => void
  /** Callback fired when the add item button is clicked in `custom` mode. */
  onAddItemClick?: (query: string) => void
  /** Callback fired whenever the user types into the search field. */
  onSearch?: (query: string) => void
}
