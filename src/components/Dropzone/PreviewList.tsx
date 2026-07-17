'use client'

import React, { useState } from 'react'
import { BookOpenIcon, ImageIcon, InfoIcon, PlayIcon, XIcon } from '../Icons'
import { Lightbox } from '../Lightbox'
import type { FileWithPreview, PreviewListProps } from './Dropzone.types'
import { formatFileSize, getFileKind, getVisiblePreviewValues } from './Dropzone.utils'

const renderPreview = (item: FileWithPreview): React.ReactNode => {
  const kind = getFileKind(item.file)

  if (kind === 'image' && item.preview !== null) {
    return <img src={item.preview} className="h-full w-full object-cover" alt={item.file.name} />
  }

  if (kind === 'video' && item.preview !== null) {
    return <video src={item.preview} className="h-full w-full object-cover" muted />
  }

  if (kind === 'document') {
    return <BookOpenIcon size={26} className="text-primary-600" />
  }

  if (kind === 'image') {
    return <ImageIcon size={26} className="text-success-600" />
  }

  if (kind === 'video') {
    return <PlayIcon size={26} className="text-info-600" />
  }

  return <InfoIcon size={26} className="text-neutral-500" />
}

export const PreviewList: React.FC<PreviewListProps> = ({
  values,
  multiple,
  placement,
  emptyText,
  onRemove,
  uploadNode,
  maxPreview,
}): React.ReactNode => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (values.length === 0 && uploadNode === undefined) {
    return (
      <div className={`rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-6 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-400 ${placement === 'inside' ? 'w-full' : 'mt-4'}`}>
        {emptyText}
      </div>
    )
  }

  const gridClasses = placement === 'grid'
    ? 'grid-cols-[repeat(auto-fill,minmax(110px,1fr))]'
    : multiple
      ? 'grid-cols-[repeat(auto-fill,minmax(64px,1fr))]'
      : 'grid-cols-1'
  const containerClasses = placement === 'inside'
    ? 'mt-5 w-full border-t border-dashed border-neutral-200 pt-5'
    : placement === 'grid'
      ? ''
      : 'mt-4'
  const isTruncated = maxPreview !== undefined && maxPreview > 0 && values.length > maxPreview
  const visibleValues = getVisiblePreviewValues(values, maxPreview)
  const hiddenCount = isTruncated ? values.length - visibleValues.length : 0
  const slides = values
    .filter((value) => getFileKind(value.file) === 'image' && value.preview !== null)
    .map((value) => ({
      src: value.preview ?? '',
      title: value.file.name,
      description: formatFileSize(value.file.size),
    }))

  const handlePreviewClick = (item: FileWithPreview): void => {
    if (getFileKind(item.file) !== 'image') {
      return
    }

    const index = slides.findIndex((slide) => slide.src === item.preview)
    if (index !== -1) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  const handleMoreClick = (): void => {
    if (slides.length > 0) {
      setLightboxIndex(0)
      setLightboxOpen(true)
    }
  }

  const maskedValue = isTruncated && maxPreview !== undefined ? values[maxPreview - 1] : undefined

  return (
    <>
      <div className={`${containerClasses} grid gap-4 ${gridClasses}`}>
        {uploadNode}
        {visibleValues.map((item) => (
          <div
            key={item.id}
            onClick={() => handlePreviewClick(item)}
            className={`group relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 p-2 ${placement === 'grid' || multiple ? 'aspect-square' : 'aspect-4/3'} ${getFileKind(item.file) === 'image' ? 'cursor-pointer' : ''}`}
          >
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white">
              {renderPreview(item)}
            </div>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black/45 p-3 text-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="w-full truncate px-2 text-[10px] font-bold text-white">{item.file.name}</span>
              <span className="text-[9px] uppercase tracking-wider text-white/80">{formatFileSize(item.file.size)}</span>
            </div>

            <button
              type="button"
              onClick={(event) => onRemove(event, item.id)}
              className="absolute right-2 top-2 z-10 rounded-full bg-danger-500 p-1 text-white shadow-sm transition-colors hover:bg-danger-600"
            >
              <XIcon size={12} />
            </button>
          </div>
        ))}

        {isTruncated && (
          <div
            onClick={handleMoreClick}
            className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 p-2 ${placement === 'grid' || multiple ? 'aspect-square' : 'aspect-4/3'}`}
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white">
              {maskedValue !== undefined && maskedValue.preview !== null && getFileKind(maskedValue.file) === 'image' && (
                <img src={maskedValue.preview} className="absolute inset-0 h-full w-full object-cover blur-[2px]" alt="" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 transition-colors group-hover:bg-black/60">
                <span className="text-xl font-bold text-white">+{hiddenCount}</span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/80">More</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {slides.length > 0 && (
        <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} index={lightboxIndex} slides={slides} />
      )}
    </>
  )
}

export default PreviewList