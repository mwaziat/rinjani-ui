import type React from 'react'
import type { BaseFormProps, MultiTagValue, MultiTagValueMode } from '../types'

export interface MultiTagInputProps extends Omit<BaseFormProps, 'label'> {
  /** The text label displayed above or inside the component (if floating). */
  label?: string
  /** 
   * An array of the currently entered tag values.
   */
  values?: MultiTagValue[]
  /** 
   * Callback fired when the user adds or removes a tag.
   */
  onChange: (values: MultiTagValue[]) => void
  /** Placeholder text shown when no tags are entered. */
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
  /** Maximum number of tags allowed. */
  maxTags?: number
  /** 
   * Determines whether the output values are plain strings or rich objects. 
   * @default "string"
   */
  valueMode?: MultiTagValueMode
  /** 
   * If true, allows users to enter the exact same tag multiple times.
   * @default false
   */
  allowDuplicates?: boolean
  /** Disables the entire component. */
  disabled?: boolean
  /** Makes the component read-only. */
  readOnly?: boolean
  /** Unique HTML id attribute. */
  id?: string
}
