'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AlertCircleIcon, CloudUploadIcon } from '../Icons'
import { PreviewList } from './PreviewList'
import { dropzoneActiveColorClasses, dropzoneSizeClasses, dropzoneVariantClasses } from './Dropzone.styles'
import type { DropzoneProps, FileWithPreview } from './Dropzone.types'
import { createPreviewFile, revokePreview } from './Dropzone.utils'

/**
 * A comprehensive drag-and-drop file upload component.
 * 
 * Supports single or multiple file uploads, custom constraints (size, formats),
 * and built-in file previews. Provides various layouts including standard blocks and grid displays.
 * 
 * @example
 * ```tsx
 * <Dropzone
 *   label="Profile picture"
 *   values={files}
 *   onChange={setFiles}
 *   accept="image/*"
 *   maxSize={5}
 * />
 * ```
 */
export const Dropzone: React.FC<DropzoneProps> = ({
  label,
  values,
  onChange,
  accept,
  maxSize,
  maxFiles,
  multiple = false,
  title,
  size = 'md',
  variant = 'outlined',
  color = 'primary',
  layout = 'default',
  dashed = false,
  maxPreview,
  error,
  required = false,
  className = '',
  description,
  acceptText,
  disabled = false,
  id,
  previewPlacement = 'outside',
  showPreview = true,
  emptyText = 'No file selected yet',
  onValidationError,
}): React.ReactNode => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const previousValuesRef = useRef<FileWithPreview[]>(values)
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
  const activeError = error || validationError
  const componentSize = dropzoneSizeClasses[size]
  const activeColor = dropzoneActiveColorClasses[color]

  useEffect(() => {
    const removedValues = previousValuesRef.current.filter((item) => !values.some((value) => value.id === item.id))
    removedValues.forEach(revokePreview)
    previousValuesRef.current = values
  }, [values])

  useEffect(() => () => {
    previousValuesRef.current.forEach(revokePreview)
  }, [])

  const reportValidationError = (message: string | null): void => {
    setValidationError(message)
    onValidationError?.(message)
  }

  const handleFiles = (incomingFiles: FileList | File[]): void => {
    let selectedFiles = multiple ? Array.from(incomingFiles) : Array.from(incomingFiles).slice(0, 1)

    if (multiple && maxFiles && values.length + selectedFiles.length > maxFiles) {
      const allowedCount = maxFiles - values.length
      if (allowedCount <= 0) {
        reportValidationError(`Maximum of ${maxFiles} files allowed.`)
        if (inputRef.current !== null) inputRef.current.value = ''
        return
      }
      selectedFiles = selectedFiles.slice(0, allowedCount)
      reportValidationError(`Only ${allowedCount} more file(s) added to reach the limit of ${maxFiles}.`)
    }

    const oversizedFileNames: string[] = []
    const validFiles = selectedFiles.reduce<FileWithPreview[]>((result, file) => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        oversizedFileNames.push(file.name)
        return result
      }

      result.push(createPreviewFile(file))
      return result
    }, [])

    if (oversizedFileNames.length > 0) {
      reportValidationError(`${oversizedFileNames.join(', ')} exceeds ${maxSize}MB`)
    }

    if (validFiles.length === 0) {
      if (inputRef.current !== null) {
        inputRef.current.value = ''
      }
      return
    }

    onChange(multiple ? [...values, ...validFiles] : validFiles)

    if (inputRef.current !== null) {
      inputRef.current.value = ''
    }
  }

  const openFilePicker = (): void => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    if (!disabled) {
      setIsDragActive(true)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setIsDragActive(false)
    if (!disabled) {
      handleFiles(event.dataTransfer.files)
    }
  }

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>, targetId: string): void => {
    event.stopPropagation()
    onChange(values.filter((item) => item.id !== targetId))
  }

  const borderStyle = dashed ? 'border-dashed' : 'border-solid'
  const dropzoneStateClass = activeError
    ? `border-2 ${borderStyle} border-danger-500 bg-danger-50`
    : isDragActive
      ? `border-2 ${borderStyle} ${activeColor.border} ${activeColor.bg} scale-[1.01]`
      : `${borderStyle} ${dropzoneVariantClasses[variant][color]} ${variant === 'soft' ? activeColor.text : 'text-neutral-900'}`
  const isGridActive = layout === 'grid' && values.length > 0
  const constraintsText = [
    acceptText ? `Accepted formats: ${acceptText}` : null,
    maxSize ? `Max size: ${maxSize}MB` : null,
    multiple && maxFiles ? `Max files: ${maxFiles}` : null,
  ].filter(Boolean).join(' • ')

  if (isGridActive) {
    const showGridUploadTile = multiple ? (!maxFiles || values.length < maxFiles) : values.length === 0

    return (
      <div className={`flex w-full flex-col ${className}`}>
        <label htmlFor={inputId} className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-neutral-500">
          {label} {required && <span className="ml-0.5 text-danger-500">*</span>}
          {description && <span className="ml-2 font-medium normal-case tracking-normal text-neutral-400">({description})</span>}
        </label>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={(event) => event.target.files !== null && handleFiles(event.target.files)}
        />

        <PreviewList
          values={values}
          multiple={multiple}
          placement="grid"
          emptyText={emptyText}
          onRemove={handleRemove}
          maxPreview={maxPreview}
          uploadNode={showGridUploadTile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={() => setIsDragActive(false)}
              onDrop={handleDrop}
              onClick={openFilePicker}
              className={`group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl text-center transition-all ${dropzoneStateClass} ${disabled ? 'cursor-not-allowed opacity-60 hover:bg-white' : ''}`}
            >
              <div className={`mb-1 rounded-full bg-neutral-100 p-2 ${isDragActive ? activeColor.text : 'text-neutral-500'}`}>
                <CloudUploadIcon size={componentSize.iconSize * 0.75} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Upload</span>
            </div>
          ) : undefined}
        />

        {activeError && (
          <div className="mt-1.5 flex items-center gap-1.5 pl-1 text-[10px] font-bold uppercase tracking-wider text-danger-500">
            <AlertCircleIcon size={12} />
            {activeError}
          </div>
        )}
        {!activeError && constraintsText && (
          <div className="mt-1.5 pl-1 text-[10px] font-medium tracking-wide text-neutral-400">
            {constraintsText}
          </div>
        )}
      </div>
    )
  }

  const showInsidePreview = showPreview && previewPlacement === 'inside' && layout !== 'grid'
  const showOutsidePreview = showPreview && previewPlacement === 'outside' && layout !== 'grid'

  return (
    <div className={`flex w-full flex-col ${className}`}>
      <label htmlFor={inputId} className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-neutral-500">
        {label} {required && <span className="ml-0.5 text-danger-500">*</span>}
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
        onClick={openFilePicker}
        className={`relative flex ${componentSize.container} w-full cursor-pointer flex-col items-center justify-center rounded-xl text-center transition-all ${dropzoneStateClass} ${disabled || (multiple && maxFiles && values.length >= maxFiles) ? 'cursor-not-allowed opacity-60 hover:bg-white' : ''}`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          disabled={disabled || (multiple && !!maxFiles && values.length >= maxFiles)}
          onChange={(event) => event.target.files !== null && handleFiles(event.target.files)}
        />

        <div className={`mb-3 rounded-full bg-neutral-100 p-2.5 ${isDragActive ? activeColor.text : 'text-neutral-500'}`}>
          <CloudUploadIcon size={componentSize.iconSize} />
        </div>

        <p className={`${componentSize.title} font-bold tracking-tight ${variant === 'soft' ? '' : 'text-neutral-900'}`}>
          {title || (multiple ? 'Click or drag files to upload' : 'Click or drag file to upload')}
        </p>

        {description && (
          <p className={`mt-1 ${componentSize.desc} font-medium tracking-wide ${variant === 'soft' ? 'opacity-80' : 'text-neutral-500'}`}>
            {description}
          </p>
        )}

        {showInsidePreview && <PreviewList values={values} multiple={multiple} placement="inside" emptyText={emptyText} onRemove={handleRemove} maxPreview={maxPreview} />}
      </div>

      {!activeError && constraintsText && (
        <div className="mt-1.5 mb-1 pl-1 text-[10px] font-medium tracking-wide text-neutral-400">
          {constraintsText}
        </div>
      )}

      {showOutsidePreview && <PreviewList values={values} multiple={multiple} placement="outside" emptyText={emptyText} onRemove={handleRemove} maxPreview={maxPreview} />}

      {activeError && (
        <div className="mt-1.5 flex items-center gap-1.5 pl-1 text-[10px] font-bold uppercase tracking-wider text-danger-500">
          <AlertCircleIcon size={12} />
          {activeError}
        </div>
      )}
    </div>
  )
}

export default Dropzone