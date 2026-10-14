export const drawerCodes = {
  basic: `import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerFooter, DrawerHeader } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Drawer title" subtitle="Optional subtitle" onClose={() => setOpen(false)} />
        <DrawerContent>
          <p>Drawer body content goes here.</p>
        </DrawerContent>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}`,
  positions: `import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerHeader } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open from the left</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} position="left">
        <DrawerHeader title="Left drawer" onClose={() => setOpen(false)} />
        <DrawerContent>Drawer content</DrawerContent>
      </Drawer>
    </>
  )
}`,
  sizes: `import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerHeader } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open full drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} size="full">
        <DrawerHeader title="Full drawer" onClose={() => setOpen(false)} />
        <DrawerContent>Drawer content</DrawerContent>
      </Drawer>
    </>
  )
}`,
  scrollable: `import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerFooter, DrawerHeader } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open scrollable drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Activity" onClose={() => setOpen(false)} />
        <DrawerContent>
          {Array.from({ length: 10 }, (_, index) => (
            <p key={index}>Activity {index + 1}</p>
          ))}
        </DrawerContent>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}`,
  customHeader: `import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerFooter } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open custom header</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex items-start justify-between border-b px-6 py-4">
          <div>
            <p>Workspace</p>
            <h3>Custom header</h3>
          </div>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
        <DrawerContent>Custom drawer content</DrawerContent>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}`,
  customFooter: `import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerHeader } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open custom footer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Custom footer" onClose={() => setOpen(false)} />
        <DrawerContent>Drawer content</DrawerContent>
        <div className="flex items-center justify-between border-t px-6 py-4">
          <span>Unsaved changes</span>
          <div>
            <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}`,
  backdrop: `import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerHeader } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Close from outside" onClose={() => setOpen(false)} />
        <DrawerContent>Click the backdrop to close the drawer.</DrawerContent>
      </Drawer>
    </>
  )
}`,
  nonDismissibleBackdrop: `import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerFooter, DrawerHeader } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open protected drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} closeOnBackdrop={false}>
        <DrawerHeader title="Explicit close only" onClose={() => setOpen(false)} />
        <DrawerContent>Clicking the backdrop does not close this drawer.</DrawerContent>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Close drawer</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}`,
} as const
