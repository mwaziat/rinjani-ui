"use client"

import { Button, Tooltip } from "rinjani-ui"

export function BasicDemo() {
  return (
    <Tooltip content="This is a tooltip" delay={0}>
      <Button variant="outlined">Hover me</Button>
    </Tooltip>
  )
}

export function PlacementsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4 py-8">
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip
          key={placement}
          content={`Placement: ${placement}`}
          placement={placement}
          delay={0}
        >
          <Button variant="soft" size="sm">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  )
}

export function ColorsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 py-2">
      {(["primary", "secondary", "success", "warning", "danger", "info", "neutral"] as const).map((color) => (
        <Tooltip key={color} content={color} color={color} delay={0}>
          <Button variant="soft" color={color} size="sm">{color}</Button>
        </Tooltip>
      ))}
    </div>
  )
}

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 py-2">
      <Tooltip content="Filled variant" variant="filled" color="primary" delay={0}>
        <Button variant="soft" color="primary" size="sm">Filled</Button>
      </Tooltip>
      <Tooltip content="Soft variant" variant="soft" color="primary" delay={0}>
        <Button variant="soft" color="primary" size="sm">Soft</Button>
      </Tooltip>
      <Tooltip content="Outlined variant" variant="outlined" color="primary" delay={0}>
        <Button variant="soft" color="primary" size="sm">Outlined</Button>
      </Tooltip>
    </div>
  )
}

export function NoArrowDemo() {
  return (
    <Tooltip content="No arrow on this one" showArrow={false} delay={0}>
      <Button variant="outlined" size="sm">No arrow</Button>
    </Tooltip>
  )
}

export function PillDemo() {
  return (
    <Tooltip content="Pill tooltip" isPill delay={0}>
      <Button variant="outlined" size="sm">Pill</Button>
    </Tooltip>
  )
}

export function RichContentDemo() {
  return (
    <Tooltip
      content={
        <div className="space-y-1">
          <p className="font-semibold text-white">Rich tooltip</p>
          <p className="text-xs text-neutral-300">Tooltips can contain any ReactNode content.</p>
        </div>
      }
      maxWidth="md"
      delay={0}
    >
      <Button variant="outlined" size="sm">Rich content</Button>
    </Tooltip>
  )
}
