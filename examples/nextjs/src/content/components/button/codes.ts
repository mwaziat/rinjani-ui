export const buttonCodes = {
  basic: `import { Button } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex gap-3">
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="text">Text</Button>
    </div>
  )
}`,

  colors: `import { Button } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="info">Info</Button>
      <Button color="neutral">Neutral</Button>
    </div>
  )
}`,

  sizes: `import { Button } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xxs">Button XXS</Button>
      <Button size="xs">Button XS</Button>
      <Button size="sm">Button SM</Button>
      <Button size="md">Button MD</Button>
      <Button size="lg">Button LG</Button>
      <Button size="xl">Button XL</Button>
    </div>
  )
}`,

  withIcons: `import { Button } from 'rinjani-ui'
import { FiPlus, FiSave, FiDownload, FiTrash2 } from 'react-icons/fi'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button leftIcon={<FiPlus size={16} />}>Add Item</Button>
      <Button leftIcon={<FiSave size={16} />} variant="outlined">Save</Button>
      <Button rightIcon={<FiDownload size={16} />} variant="soft">Download</Button>
      <Button leftIcon={<FiTrash2 size={16} />} variant="soft" color="danger">Delete</Button>
    </div>
  )
}`,

  pill: `import { Button } from 'rinjani-ui'
import { FiPlus } from 'react-icons/fi'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button isPill>Filled Pill</Button>
      <Button isPill variant="outlined">Outlined Pill</Button>
      <Button isPill variant="soft" color="success">Success Pill</Button>
      <Button isPill leftIcon={<FiPlus size={16} />}>Add</Button>
    </div>
  )
}`,

  loading: `"use client"

import { useState } from 'react'
import { Button } from 'rinjani-ui'

export default function Example() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button isLoading>Loading</Button>
      <Button isLoading variant="outlined">Loading</Button>
      <Button isLoading={loading} onClick={handleClick}>
        {loading ? 'Saving...' : 'Click to load'}
      </Button>
    </div>
  )
}`,

  disabled: `import { Button } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outlined">Disabled</Button>
      <Button disabled variant="soft">Disabled</Button>
      <Button disabled variant="text">Disabled</Button>
    </div>
  )
}`,

  fullWidth: `import { Button } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="w-full flex flex-col gap-3">
      <Button fullWidth>Full Width Filled</Button>
      <Button fullWidth variant="outlined">Full Width Outlined</Button>
    </div>
  )
}`,

  iconButton: `import { IconButton } from 'rinjani-ui'
import { FiSettings, FiSave, FiTrash2, FiPlus, FiDownload } from 'react-icons/fi'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <IconButton icon={<FiSettings size={16} />} aria-label="Settings" />
      <IconButton icon={<FiSave size={16} />} variant="outlined" aria-label="Save" />
      <IconButton icon={<FiTrash2 size={16} />} variant="soft" color="danger" aria-label="Delete" />
      <IconButton icon={<FiPlus size={16} />} isPill aria-label="Add" />
      <IconButton icon={<FiDownload size={16} />} variant="soft" color="info" isPill aria-label="Download" />
    </div>
  )
}`,
} as const
