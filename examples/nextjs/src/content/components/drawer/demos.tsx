"use client"

import { useState } from "react"
import { Button, Drawer, DrawerContent, DrawerFooter, DrawerHeader } from "rinjani-ui"

export function BasicDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Drawer title" subtitle="Optional subtitle" onClose={() => setOpen(false)} />
        <DrawerContent>
          <p className="text-sm leading-6 text-neutral-600">Drawer body content goes here.</p>
        </DrawerContent>
        <DrawerFooter>
          <Button size="sm" onClick={() => setOpen(false)}>Confirm</Button>
          <Button size="sm" variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export function PositionsDemo() {
  const [position, setPosition] = useState<"right" | "left" | "top" | "bottom" | null>(null)

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {(["right", "left", "top", "bottom"] as const).map((item) => (
          <Button key={item} size="sm" variant="outlined" onClick={() => setPosition(item)}>{item}</Button>
        ))}
      </div>
      <Drawer isOpen={position !== null} onClose={() => setPosition(null)} position={position ?? "right"}>
        <DrawerHeader title={`Position: ${position}`} onClose={() => setPosition(null)} />
        <DrawerContent>
          <p className="text-sm leading-6 text-neutral-600">This drawer slides in from the {position} edge.</p>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export function SizesDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "1/2" | "full" | null>(null)

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {(["sm", "md", "lg", "xl", "1/2", "full"] as const).map((item) => (
          <Button key={item} size="sm" variant="soft" onClick={() => setSize(item)}>{item}</Button>
        ))}
      </div>
      <Drawer isOpen={size !== null} onClose={() => setSize(null)} size={size ?? "md"}>
        <DrawerHeader title={`Size: ${size}`} onClose={() => setSize(null)} />
        <DrawerContent>
          <p className="text-sm leading-6 text-neutral-600">This drawer uses size="{size}".</p>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export function ScrollableContentDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open scrollable drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} size="md">
        <DrawerHeader title="Activity" subtitle="Scrollable content" onClose={() => setOpen(false)} />
        <DrawerContent>
          <div className="space-y-4">
            <p className="text-sm leading-6 text-neutral-600">
              The header and footer stay in place while this content area scrolls.
            </p>
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="border-b border-neutral-100 pb-3 last:border-0">
                <p className="text-sm font-medium text-neutral-800">Activity {index + 1}</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  Supporting content for the scrollable DrawerContent area.
                </p>
              </div>
            ))}
          </div>
        </DrawerContent>
        <DrawerFooter>
          <Button size="sm" variant="outlined" onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export function CustomHeaderDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open custom header</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex shrink-0 items-start justify-between border-b border-neutral-100 px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary-600">Workspace</p>
            <h3 className="mt-1 text-base font-semibold text-neutral-900">Custom header</h3>
            <p className="mt-1 text-xs text-neutral-500">Any React content can be used here.</p>
          </div>
          <Button size="sm" variant="outlined" onClick={() => setOpen(false)}>Close</Button>
        </div>
        <DrawerContent>
          <p className="text-sm leading-6 text-neutral-600">
            Use a custom header when the standard DrawerHeader layout is not enough for your workflow.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <Button size="sm" onClick={() => setOpen(false)}>Save changes</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export function CustomFooterDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open custom footer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Custom footer" onClose={() => setOpen(false)} />
        <DrawerContent>
          <p className="text-sm leading-6 text-neutral-600">
            Replace DrawerFooter when the actions need a custom layout or extra supporting content.
          </p>
        </DrawerContent>
        <div className="flex shrink-0 items-center justify-between border-t border-neutral-100 px-6 py-4">
          <p className="text-xs text-neutral-500">Unsaved changes</p>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="text" color="neutral" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export function BackdropCloseDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dismissible drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Close from outside" onClose={() => setOpen(false)} />
        <DrawerContent>
          <p className="text-sm leading-6 text-neutral-600">
            Click the shaded area outside this panel to call onClose and dismiss the drawer.
          </p>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export function NonDismissibleBackdropDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open protected drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} closeOnBackdrop={false}>
        <DrawerHeader title="Explicit close only" onClose={() => setOpen(false)} />
        <DrawerContent>
          <p className="text-sm leading-6 text-neutral-600">
            Clicking the shaded area does nothing. Close this drawer with the header button or the action below.
          </p>
        </DrawerContent>
        <DrawerFooter>
          <Button size="sm" onClick={() => setOpen(false)}>Close drawer</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
