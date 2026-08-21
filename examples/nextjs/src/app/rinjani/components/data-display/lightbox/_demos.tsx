"use client"

import React, { useState } from "react"
import { Lightbox, Button } from "rinjani-ui"

const slides = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    alt: "Mountain landscape",
    title: "Alpine Vista",
    description: "A stunning view of the alpine mountains.",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    alt: "Forest path",
    title: "Forest Path",
    description: "A serene walk through the forest.",
  },
  {
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
    alt: "Sunset over lake",
    title: "Lake Sunset",
    description: "Golden hour at the lake.",
  },
]

export function BasicDemo() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setOpen(true) }}
            className="overflow-hidden rounded-lg border border-neutral-200 hover:border-primary-400 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.src} alt={slide.alt} className="w-28 h-20 object-cover" />
          </button>
        ))}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} />
    </>
  )
}

export function AutoplayDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Autoplay Gallery</Button>
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} autoplay autoplayDuration={2000} />
    </>
  )
}

export function NoThumbnailsDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>No Thumbnails</Button>
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} showThumbnails={false} />
    </>
  )
}
