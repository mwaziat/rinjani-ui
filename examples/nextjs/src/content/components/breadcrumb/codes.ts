export const breadcrumbCodes = {
  basic: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  return (
    <Breadcrumb
      paths={[
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/components' },
      ]}
      activeLabel="Breadcrumb"
      contained={false}
    />
  )
}`,

  colors: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Primary" color="primary" contained={false} />
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Success" color="success" contained={false} />
      <Breadcrumb paths={[{ label: 'Home', href: '/' }]} activeLabel="Danger" color="danger" contained={false} />
    </div>
  )
}`,

  contained: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  const paths = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
  ]

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb paths={paths} activeLabel="Filled" contained variant="filled" />
      <Breadcrumb paths={paths} activeLabel="Outlined" contained variant="outlined" />
      <Breadcrumb paths={paths} activeLabel="Soft" contained variant="soft" />
      <Breadcrumb paths={paths} activeLabel="Line" contained variant="line" />
    </div>
  )
}`,

  icons: `import { Breadcrumb } from 'rinjani-ui'
import { FiHome } from 'react-icons/fi'

export default function Example() {
  return (
    <Breadcrumb
      paths={[
        { label: 'Home', href: '/', icon: <FiHome size={14} /> },
        { label: 'Components', href: '/components' },
      ]}
      activeLabel="Breadcrumb"
      contained={false}
    />
  )
}`,

  separator: `import { Breadcrumb } from 'rinjani-ui'
import { FiChevronRight } from 'react-icons/fi'

export default function Example() {
  const paths = [{ label: 'Home', href: '/' }]

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb paths={paths} activeLabel="Slash" separator="/" contained={false} />
      <Breadcrumb paths={paths} activeLabel="Arrow" separator={<FiChevronRight size={14} />} contained={false} />
      <Breadcrumb paths={paths} activeLabel="Dot" separator="·" contained={false} />
    </div>
  )
}`,

  alignment: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  const paths = [
    { label: 'Home', href: '/' },
    { label: 'Room', href: '/room' },
  ]

  return (
    <Breadcrumb
      paths={paths}
      activeLabel="List"
      justify="end"
      currentPosition="Custom current position"
      rightContent={<button type="button">Actions</button>}
      contained={false}
    />
  )
}`,

  sizes: `import { Breadcrumb } from 'rinjani-ui'

export default function Example() {
  const paths = [{ label: 'Home', href: '/' }]

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb paths={paths} activeLabel="XSmall" size="xs" contained={false} />
      <Breadcrumb paths={paths} activeLabel="Small" size="sm" contained={false} />
      <Breadcrumb paths={paths} activeLabel="Medium" size="md" contained={false} />
      <Breadcrumb paths={paths} activeLabel="Large" size="lg" contained={false} />
    </div>
  )
}`,
} as const
