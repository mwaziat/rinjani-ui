import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { lightboxProps } from "./_props"
import { BasicDemo, AutoplayDemo, NoThumbnailsDemo } from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "autoplay", label: "Autoplay", depth: 2 as const },
  { id: "no-thumbnails", label: "No thumbnails", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { Lightbox } from 'rinjani-ui'
import { useState } from 'react'

const slides = [
  { src: '/image1.jpg', alt: 'Image 1', title: 'Title', description: 'Description' },
  { src: '/image2.jpg', alt: 'Image 2' },
]

export default function Example() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  return (
    <>
      <button onClick={() => { setIndex(0); setOpen(true) }}>Open Gallery</button>
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} />
    </>
  )
}`,
  autoplay: `<Lightbox
  open={open}
  close={() => setOpen(false)}
  slides={slides}
  autoplay
  autoplayDuration={2000}
/>`,
  noThumbnails: `<Lightbox open={open} close={() => setOpen(false)} slides={slides} showThumbnails={false} />`,
}

export default async function LightboxPage() {
  const [basicHl, autoplayHl, noThumbnailsHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.autoplay, "tsx"),
    highlight(codes.noThumbnails, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Data Display"
          title="Lightbox"
          description="Full-screen image gallery with thumbnails, zoom, autoplay, drag navigation, and loop support."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <p className="text-sm text-neutral-500 mb-4">Click a thumbnail to open at that index.</p>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="autoplay" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Autoplay</h2>
          <ComponentDemo code={autoplayHl} rawCode={codes.autoplay}>
            <AutoplayDemo />
          </ComponentDemo>
        </section>

        <section id="no-thumbnails" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">No thumbnails</h2>
          <ComponentDemo code={noThumbnailsHl} rawCode={codes.noThumbnails}>
            <NoThumbnailsDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <PropsTable props={lightboxProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
