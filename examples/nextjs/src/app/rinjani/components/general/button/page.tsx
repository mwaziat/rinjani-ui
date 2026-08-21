import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { buttonProps, iconButtonProps } from "./_props"
import {
  BasicDemo,
  ColorsDemo,
  SizesDemo,
  WithIconsDemo,
  PillDemo,
  LoadingDemo,
  DisabledDemo,
  FullWidthDemo,
  IconButtonDemo,
} from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "colors", label: "Colors", depth: 2 as const },
  { id: "sizes", label: "Sizes", depth: 2 as const },
  { id: "with-icons", label: "With icons", depth: 2 as const },
  { id: "pill", label: "Pill shape", depth: 2 as const },
  { id: "loading", label: "Loading state", depth: 2 as const },
  { id: "disabled", label: "Disabled", depth: 2 as const },
  { id: "full-width", label: "Full width", depth: 2 as const },
  { id: "icon-button", label: "IconButton", depth: 2 as const },
  { id: "api-button", label: "Button API", depth: 2 as const },
  { id: "api-iconbutton", label: "IconButton API", depth: 2 as const },
]

const codes = {
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
      <Button size="xxs">XXSmall</Button>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
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

  loading: `import { Button } from 'rinjani-ui'
import { useState } from 'react'

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
      <IconButton icon={<FiSettings size={16} />} />
      <IconButton icon={<FiSave size={16} />} variant="outlined" />
      <IconButton icon={<FiTrash2 size={16} />} variant="soft" color="danger" />
      <IconButton icon={<FiPlus size={16} />} isPill />
      <IconButton icon={<FiDownload size={16} />} variant="soft" color="info" isPill />
    </div>
  )
}`,
}

export default async function ButtonPage() {
  const [
    basicHl,
    colorsHl,
    sizesHl,
    withIconsHl,
    pillHl,
    loadingHl,
    disabledHl,
    fullWidthHl,
    iconButtonHl,
  ] = await Promise.all([
    highlight(codes.basic),
    highlight(codes.colors),
    highlight(codes.sizes),
    highlight(codes.withIcons),
    highlight(codes.pill),
    highlight(codes.loading),
    highlight(codes.disabled),
    highlight(codes.fullWidth),
    highlight(codes.iconButton),
  ])

  return (
    <div className="flex gap-10 max-w-5xl mx-auto px-6 py-10 w-full">
      <div className="flex-1 min-w-0">
        <PageHeader
          category="General"
          title="Button"
          description="Triggers an action or event. Supports multiple variants, colors, sizes, and icon combinations."
        />

        <section id="basic" className="scroll-mt-24">
          <ComponentDemo
            title="Basic usage"
            description="Four variants cover most use cases: filled for primary actions, outlined for secondary, soft for subtle emphasis, and text for inline."
            code={basicHl}
            rawCode={codes.basic}
          >
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="colors" className="scroll-mt-24">
          <ComponentDemo
            title="Colors"
            description="All seven color tokens are available across every variant."
            code={colorsHl}
            rawCode={codes.colors}
          >
            <ColorsDemo />
          </ComponentDemo>
        </section>

        <section id="sizes" className="scroll-mt-24">
          <ComponentDemo
            title="Sizes"
            description="Six sizes from xxs to xl. The default is sm."
            code={sizesHl}
            rawCode={codes.sizes}
          >
            <SizesDemo />
          </ComponentDemo>
        </section>

        <section id="with-icons" className="scroll-mt-24">
          <ComponentDemo
            title="With icons"
            description="Use leftIcon or rightIcon to attach any ReactNode icon."
            code={withIconsHl}
            rawCode={codes.withIcons}
          >
            <WithIconsDemo />
          </ComponentDemo>
        </section>

        <section id="pill" className="scroll-mt-24">
          <ComponentDemo
            title="Pill shape"
            description="isPill applies fully rounded corners for a pill-style button."
            code={pillHl}
            rawCode={codes.pill}
          >
            <PillDemo />
          </ComponentDemo>
        </section>

        <section id="loading" className="scroll-mt-24">
          <ComponentDemo
            title="Loading state"
            description="isLoading shows a spinner and disables interaction. Useful for async actions."
            code={loadingHl}
            rawCode={codes.loading}
          >
            <LoadingDemo />
          </ComponentDemo>
        </section>

        <section id="disabled" className="scroll-mt-24">
          <ComponentDemo
            title="Disabled"
            description="Applies reduced opacity and removes pointer events."
            code={disabledHl}
            rawCode={codes.disabled}
          >
            <DisabledDemo />
          </ComponentDemo>
        </section>

        <section id="full-width" className="scroll-mt-24">
          <ComponentDemo
            title="Full width"
            description="fullWidth stretches the button to its parent container width."
            code={fullWidthHl}
            rawCode={codes.fullWidth}
            centered={false}
          >
            <div className="w-full">
              <FullWidthDemo />
            </div>
          </ComponentDemo>
        </section>

        <section id="icon-button" className="scroll-mt-24">
          <ComponentDemo
            title="IconButton"
            description="A square (or circular) button optimized for a single icon. Uses the same variant, color, and size props."
            code={iconButtonHl}
            rawCode={codes.iconButton}
          >
            <IconButtonDemo />
          </ComponentDemo>
        </section>

        <section id="api-button" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Button API</h2>
          <p className="text-sm text-neutral-500 mb-4">
            All standard HTML button attributes are also accepted via prop spreading.
          </p>
          <PropsTable props={buttonProps} />
        </section>

        <section id="api-iconbutton" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">IconButton API</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Extends the same variant, color, and size system as Button.
          </p>
          <PropsTable props={iconButtonProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
