export const tooltipCodes = {
  basic: `import { Button, Tooltip } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip content="This is a tooltip">
      <Button variant="outlined">Hover me</Button>
    </Tooltip>
  )
}`,
  placements: `import { Button, Tooltip } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip content="Top" placement="top">
        <Button size="sm">top</Button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <Button size="sm">bottom</Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button size="sm">left</Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button size="sm">right</Button>
      </Tooltip>
    </div>
  )
}`,
  colors: `import { Button, Tooltip } from 'rinjani-ui'

const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral']

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <Tooltip key={color} content={color} color={color}>
          <Button size="sm" color={color} variant="soft">{color}</Button>
        </Tooltip>
      ))}
    </div>
  )
}`,
  variants: `import { Button, Tooltip } from 'rinjani-ui'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tooltip content="Filled variant" variant="filled" color="primary">
        <Button size="sm" color="primary" variant="soft">Filled</Button>
      </Tooltip>
      <Tooltip content="Soft variant" variant="soft" color="primary">
        <Button size="sm" color="primary" variant="soft">Soft</Button>
      </Tooltip>
      <Tooltip content="Outlined variant" variant="outlined" color="primary">
        <Button size="sm" color="primary" variant="soft">Outlined</Button>
      </Tooltip>
    </div>
  )
}`,
  noArrow: `import { Button, Tooltip } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip content="No arrow" showArrow={false}>
      <Button variant="outlined" size="sm">No arrow</Button>
    </Tooltip>
  )
}`,
  pill: `import { Button, Tooltip } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip content="Pill tooltip" isPill>
      <Button variant="outlined" size="sm">Pill</Button>
    </Tooltip>
  )
}`,
  rich: `import { Button, Tooltip } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip
      content={
        <div className="space-y-1">
          <p className="font-semibold text-white">Rich tooltip</p>
          <p className="text-xs text-neutral-300">Tooltips can contain any ReactNode content.</p>
        </div>
      }
      maxWidth="md"
    >
      <Button variant="outlined" size="sm">Rich content</Button>
    </Tooltip>
  )
}`,
} as const
