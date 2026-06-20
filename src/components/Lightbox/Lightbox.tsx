'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { XIcon, ChevronLeftIcon, ChevronRightIcon, ZoomInIcon, ZoomOutIcon } from '../Icons'
import type { LightboxProps } from './Lightbox.types'

export const Lightbox = ({
  open,
  close,
  index = 0,
  slides,
  showThumbnails = true,
  showZoom = true,
}: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(index)
  const [scale, setScale] = useState(1)
  const [mounted, setMounted] = useState(false)

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      setCurrentIndex(index)
      setScale(1)
      setDragOffset({ x: 0, y: 0 })
    }
  }, [open, index])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNext = useCallback(() => {
    setScale(1)
    setDragOffset({ x: 0, y: 0 })
    setCurrentIndex((prev) => (prev + 1 === slides.length ? 0 : prev + 1))
  }, [slides.length])

  const handlePrev = useCallback(() => {
    setScale(1)
    setDragOffset({ x: 0, y: 0 })
    setCurrentIndex((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    },
    [open, close, handleNext, handlePrev]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!mounted) return null

  const slide = slides[currentIndex] || slides[0]

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.5, 4))
  const handleZoomOut = () => {
    setScale((s) => {
      const newScale = Math.max(s - 0.5, 1)
      if (newScale === 1) setDragOffset({ x: 0, y: 0 })
      return newScale
    })
  }

  const handleThumbnailClick = (idx: number) => {
    setScale(1)
    setDragOffset({ x: 0, y: 0 })
    setCurrentIndex(idx)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    setIsDragging(true)
    setDragStartPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y })
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const newX = e.clientX - dragStartPos.x
    const newY = scale > 1 ? e.clientY - dragStartPos.y : 0
    setDragOffset({ x: newX, y: newY })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)

    if (scale === 1) {
      if (dragOffset.x < -100) {
        handleNext()
      } else if (dragOffset.x > 100) {
        handlePrev()
      } else {
        setDragOffset({ x: 0, y: 0 })
      }
    }
  }

  const portalContent = (
    <div className={`fixed inset-0 z-9999 flex flex-col ${open ? 'visible' : 'invisible delay-300'}`}>
      <div 
        className={`absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} 
        onClick={close}
      />
      
      <div 
        className={`relative z-50 flex h-16 shrink-0 items-center justify-between px-4 text-white bg-linear-to-b from-black/50 to-transparent transition-opacity duration-300 delay-100 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium tracking-widest text-neutral-300">
            {currentIndex + 1} / {slides.length}
          </span>
          {(slide?.title || slide?.description) && (
            <div className="hidden md:block">
              {slide.title && <h3 className="text-sm font-bold">{slide.title}</h3>}
              {slide.description && <p className="text-xs text-neutral-400">{slide.description}</p>}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showZoom && (
            <>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={scale <= 1}
                className="rounded-full p-2 transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                <ZoomOutIcon size={20} />
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={scale >= 4}
                className="rounded-full p-2 transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                <ZoomInIcon size={20} />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={close}
            className="ml-2 rounded-full p-2 transition-colors hover:bg-white/10"
          >
            <XIcon size={24} />
          </button>
        </div>
      </div>

      <div className={`relative z-40 flex-1 overflow-hidden flex items-center justify-center transition-all duration-300 ease-out ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
        {slides.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="absolute left-4 z-50 hidden rounded-full bg-black/40 p-3 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:flex"
          >
            <ChevronLeftIcon size={32} />
          </button>
        )}

        {slide && (
          <div
            key={currentIndex}
            className={`absolute inset-0 flex items-center justify-center touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onClick={(e) => {
              if (e.target === e.currentTarget && dragOffset.x === 0 && dragOffset.y === 0) close()
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt || `Slide ${currentIndex + 1}`}
              className={`max-h-full max-w-full object-contain select-none pointer-events-none ${isDragging ? 'will-change-transform' : 'transition-transform duration-300 ease-out'}`}
              style={{ transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(${scale})` }}
              draggable={false}
              onDoubleClick={(e) => {
                e.stopPropagation()
                if (scale > 1) {
                  setScale(1)
                  setDragOffset({ x: 0, y: 0 })
                } else {
                  setScale(2)
                }
              }}
            />
          </div>
        )}

        {slides.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 z-50 hidden rounded-full bg-black/40 p-3 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:flex"
          >
            <ChevronRightIcon size={32} />
          </button>
        )}
      </div>

      {showThumbnails && slides.length > 1 && (
        <div 
          className={`relative z-50 h-24 w-full shrink-0 bg-black/50 p-4 overflow-x-auto flex items-center justify-center gap-2 transition-transform duration-300 delay-100 ${open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 max-w-full">
            {slides.map((s, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md transition-all ${idx === currentIndex ? 'ring-2 ring-primary-500 opacity-100 scale-110' : 'opacity-40 hover:opacity-100'}`}
              >
                <img src={s.src} alt="" className="h-full w-full object-cover" draggable={false} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return createPortal(
    slides.length > 0 ? portalContent : null,
    document.body
  )
}

export default Lightbox
