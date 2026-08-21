"use client"

import React, { useState } from "react"
import { Modal, ModalHeader, ModalContent, ModalFooter, Button } from "rinjani-ui"

export function BasicDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Modal title" subtitle="Optional subtitle" onClose={() => setOpen(false)} />
        <ModalContent>
          <p className="text-sm text-neutral-600">
            Modal body content goes here. You can put forms, images, or any other content.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export function SizesDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "2xl" | null>(null)
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {(["sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
          <Button key={s} variant="soft" size="sm" onClick={() => setSize(s)}>{s}</Button>
        ))}
      </div>
      <Modal isOpen={size !== null} onClose={() => setSize(null)} size={size ?? "md"}>
        <ModalHeader title={`Size: ${size}`} onClose={() => setSize(null)} />
        <ModalContent>
          <p className="text-sm text-neutral-600">This modal uses size="{size}".</p>
        </ModalContent>
      </Modal>
    </>
  )
}

export function ScrollModeDemo() {
  const [mode, setMode] = useState<"dialog" | "content" | null>(null)
  return (
    <>
      <div className="flex gap-3">
        <Button variant="outlined" onClick={() => setMode("dialog")}>dialog scroll</Button>
        <Button variant="outlined" onClick={() => setMode("content")}>content scroll</Button>
      </div>
      <Modal isOpen={mode !== null} onClose={() => setMode(null)} scrollMode={mode ?? "dialog"} size="sm">
        <ModalHeader title={`scrollMode: ${mode}`} onClose={() => setMode(null)} />
        <ModalContent>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="text-sm text-neutral-600 mb-2">Line {i + 1} of content to demonstrate scrolling.</p>
          ))}
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setMode(null)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
