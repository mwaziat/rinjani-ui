import type React from 'react'

/**
 * Size constraints for the dropzone container and icons.
 */
export type DropzoneSize = 'sm' | 'md' | 'lg'

/**
 * Theme colors derived from the Rinjani UI color palette.
 * Affects the active/drag state and hover states of the dropzone.
 */
export type DropzoneColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

/**
 * Visual styles available for the dropzone.
 * - `filled`: Solid gray/colored background.
 * - `outlined`: Transparent background with a distinct border.
 * - `soft`: Soft colored background based on the active color.
 */
export type DropzoneVariant = 'filled' | 'outlined' | 'soft'

/**
 * Determines where the preview of selected files will be displayed.
 */
export type DropzonePreviewPlacement = 'inside' | 'outside' | 'grid'

/**
 * Determines the layout of the dropzone area.
 * - `default`: Standard vertical dropzone.
 * - `grid`: Compact dropzone used inline with grid previews.
 */
export type DropzoneLayout = 'default' | 'grid'

/**
 * Represents a file that has been processed for previewing (e.g., generating object URLs).
 */
export interface FileWithPreview {
  /** The native File object. */
  file: File
  /** The object URL for the preview (if applicable, e.g., for images), or null. */
  preview: string | null
  /** A unique identifier for this file entry. */
  id: string
}

/**
 * Properties for the Dropzone component.
 */
export interface DropzoneProps {
  /** The label text displayed above the dropzone. */
  label: string
  /** The current array of selected files. */
  values: FileWithPreview[]
  /** Callback fired when files are added or removed. */
  onChange: (files: FileWithPreview[]) => void
  /** Standard HTML accept attribute for file types (e.g., "image/*, .pdf"). */
  accept?: string
  /** The maximum allowed file size in Megabytes (MB). */
  maxSize?: number
  /** The maximum number of files allowed (only applicable when multiple is true). */
  maxFiles?: number
  /** If true, allows multiple files to be uploaded. */
  multiple?: boolean
  /** The main title text inside the dropzone container. */
  title?: React.ReactNode
  /** The size of the component. @default "md" */
  size?: DropzoneSize
  /** The visual variant style. @default "outlined" */
  variant?: DropzoneVariant
  /** The color theme. @default "primary" */
  color?: DropzoneColor
  /** The layout structure of the dropzone. @default "default" */
  layout?: DropzoneLayout
  /** If true, the border will be dashed. If false, it will be solid. @default false */
  dashed?: boolean
  /** Maximum number of preview items to display before truncating. */
  maxPreview?: number
  /** An error message to display below the input. */
  error?: string
  /** If true, marks the field as required. */
  required?: boolean
  /** Additional CSS classes for the container. */
  className?: string
  /** Helper text describing the upload requirements. */
  description?: string
  /** Readable text indicating accepted formats (e.g., "JPG, PNG") to display below the dropzone. */
  acceptText?: string
  /** If true, disables the dropzone completely. */
  disabled?: boolean
  /** Custom ID for the input element. */
  id?: string
  /** Where to render the file previews relative to the dropzone. @default "outside" */
  previewPlacement?: DropzonePreviewPlacement
  /** If true, renders the file previews. @default true */
  showPreview?: boolean
  /** Text to display in the preview list when no files are selected. */
  emptyText?: string
  /** Callback fired when a validation error (like oversized file) occurs. */
  onValidationError?: (message: string | null) => void
}

/**
 * Properties for the PreviewList sub-component.
 */
export interface PreviewListProps {
  /** The array of files to preview. */
  values: FileWithPreview[]
  /** Whether multiple files are allowed (affects grid layout rendering). */
  multiple: boolean
  /** The placement style for the previews. */
  placement: DropzonePreviewPlacement
  /** Text to display when there are no values. */
  emptyText: string
  /** Callback to remove a specific file. */
  onRemove: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void
  /** A custom upload node to render alongside grid previews. */
  uploadNode?: React.ReactNode
  /** Maximum number of preview items to display. */
  maxPreview?: number | undefined
}