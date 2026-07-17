import type { FileWithPreview } from './Dropzone.types'

/**
 * Basic categories for common file types.
 */
export type DropzoneFileKind = 'document' | 'file' | 'image' | 'video'

/**
 * Wraps a native File object with an auto-generated ID and an optional
 * blob URL preview for images and videos.
 */
export const createPreviewFile = (file: File): FileWithPreview => ({
  file,
  preview: file.type.startsWith('image/') || file.type.startsWith('video/') ? URL.createObjectURL(file) : null,
  id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
})

/**
 * Safely revokes the generated blob URL to prevent memory leaks when a file preview is removed or destroyed.
 */
export const revokePreview = (item: FileWithPreview): void => {
  if (item.preview !== null) {
    URL.revokeObjectURL(item.preview)
  }
}

/**
 * Formats a file size (in bytes) into a readable string (e.g., "1.5MB").
 */
export const formatFileSize = (size: number): string => `${(size / 1024 / 1024).toFixed(1)}MB`

/**
 * Determines the general category (`DropzoneFileKind`) of a file based on its MIME type or extension.
 * Used for displaying fallback icons when a preview is unavailable.
 */
export const getFileKind = (file: File): DropzoneFileKind => {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''

  if (file.type.startsWith('image/')) {
    return 'image'
  }

  if (file.type.startsWith('video/')) {
    return 'video'
  }

  if (file.type.includes('pdf') || ['doc', 'docx', 'md', 'rtf', 'txt'].includes(extension)) {
    return 'document'
  }

  return 'file'
}

/**
 * Slices the array of files to ensure it doesn't exceed the `maxPreview` limit.
 * Used when rendering the list of active uploads/previews.
 */
export const getVisiblePreviewValues = (values: FileWithPreview[], maxPreview: number | undefined): FileWithPreview[] => {
  if (maxPreview === undefined || maxPreview < 1 || values.length <= maxPreview) {
    return values
  }

  return values.slice(0, Math.max(0, maxPreview - 1))
}