"use client"

import React, { useState } from "react"
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter, Button } from "rinjani-ui"

export function BasicDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Drawer title" subtitle="Optional subtitle" onClose={() => setOpen(false)} />
        <DrawerContent>
          <p className="text-sm text-neutral-600">Drawer body content goes here.</p>
        </DrawerContent>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export function PositionsDemo() {
  const [pos, setPos] = useState<"right" | "left" | "top" | "bottom" | null>(null)
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {(["right", "left", "top", "bottom"] as const).map((p) => (
          <Button key={p} variant="outlined" onClick={() => setPos(p)}>{p}</Button>
        ))}
      </div>
      <Drawer isOpen={pos !== null} onClose={() => setPos(null)} position={pos ?? "right"}>
        <DrawerHeader title={`Position: ${pos}`} onClose={() => setPos(null)} />
        <DrawerContent>
          <p className="text-sm text-neutral-600">Slides in from the {pos} edge.</p>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export function SizesDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "1/2" | null>(null)
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {(["sm", "md", "lg", "xl", "1/2"] as const).map((s) => (
          <Button key={s} variant="soft" size="sm" onClick={() => setSize(s)}>{s}</Button>
        ))}
      </div>
      <Drawer isOpen={size !== null} onClose={() => setSize(null)} size={size ?? "md"}>
        <DrawerHeader title={`Size: ${size}`} onClose={() => setSize(null)} />
        <DrawerContent>
          <p className="text-sm text-neutral-600">This drawer uses size="{size}".</p>
        </DrawerContent>
      </Drawer>
    </>
  )
}
