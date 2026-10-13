# Drawer

## When to use

Use Drawer for secondary content that should remain available without leaving the current page. It works well for navigation, filters, settings, and detail views.

## Usage

```tsx
import { useState } from 'react'
import { Button, Drawer, DrawerContent, DrawerFooter, DrawerHeader } from 'rinjani-ui'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader title="Drawer title" subtitle="Optional subtitle" onClose={() => setOpen(false)} />
        <DrawerContent>Drawer content</DrawerContent>
        <DrawerFooter>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

Drawer renders in a portal and locks the page scroll while open.

`Drawer` is controlled by `isOpen` and `onClose`. By default, clicking the shaded backdrop calls `onClose`; set `closeOnBackdrop={false}` when the panel must only close from an explicit control.

`DrawerContent` is the scrollable area. `DrawerHeader` and `DrawerFooter` are optional layout helpers: the header and footer stay fixed while the content scrolls. You can replace either helper with any custom React content when the default layout does not fit your use case.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `isOpen` | Controls visibility. | `boolean` | — |
| `onClose` | Handles close requests. | `() => void` | — |
| `closeOnBackdrop` | Allows the shaded backdrop to call `onClose`. | `boolean` | `true` |
| `children` | Drawer content. | `ReactNode` | — |
| `position` | Opening edge. | `"left" \| "right" \| "top" \| "bottom"` | `"right"` |
| `size` | Panel width, or height for top and bottom drawers. | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "1/4" \| "1/3" \| "1/2" \| "2/3" \| "3/4" \| "full"` | `"md"` |
| `className` | Additional panel classes. | `string` | `""` |

### DrawerHeader

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `title` | Main heading displayed in the header. | `string` | — |
| `subtitle` | Supporting text below the title. | `string` | — |
| `onClose` | Handler for the header close button. | `() => void` | — |

### DrawerContent

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `children` | Scrollable drawer body. | `ReactNode` | — |
| `className` | Additional content classes. | `string` | `""` |

### DrawerFooter

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `children` | Actions or supporting content pinned to the footer. | `ReactNode` | — |
| `className` | Additional footer classes. | `string` | `""` |
