import React from "react"
import { highlight } from "@/lib/highlight"
import { ComponentDemo } from "@/components/docs/ComponentDemo"
import { PropsTable } from "@/components/docs/PropsTable"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { PageHeader } from "@/components/docs/PageHeader"
import { inputFieldProps } from "./_props"
import {
  BasicDemo, VariantsDemo, FloatingLabelDemo, WithIconsDemo,
  PasswordDemo, MultilineDemo, ErrorDemo, CurrencyDemo,
} from "./_demos"

const tocItems = [
  { id: "basic", label: "Basic usage", depth: 2 as const },
  { id: "variants", label: "Variants", depth: 2 as const },
  { id: "floating", label: "Floating label", depth: 2 as const },
  { id: "icons", label: "With icons", depth: 2 as const },
  { id: "password", label: "Password", depth: 2 as const },
  { id: "multiline", label: "Multiline", depth: 2 as const },
  { id: "currency", label: "Currency format", depth: 2 as const },
  { id: "error", label: "Error state", depth: 2 as const },
  { id: "api", label: "API", depth: 2 as const },
]

const codes = {
  basic: `import { InputField } from 'rinjani-ui'
import { useState } from 'react'

export default function Example() {
  const [value, setValue] = useState('')
  return (
    <InputField
      label="Full name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your name"
    />
  )
}`,
  variants: `<InputField label="Outlined" variant="outlined" placeholder="outlined" />
<InputField label="Filled" variant="filled" placeholder="filled" />
<InputField label="Line" variant="line" placeholder="line" />`,
  floating: `<InputField label="Email address" floating />
<InputField label="Password" floating isPassword />`,
  icons: `import { FiSearch, FiMail } from 'react-icons/fi'

<InputField label="Search" leftIcon={<FiSearch size={16} />} placeholder="Search..." />
<InputField label="Email" leftIcon={<FiMail size={16} />} placeholder="you@example.com" />`,
  password: `<InputField label="Password" isPassword placeholder="Enter password" />`,
  multiline: `<InputField label="Bio" isMultiline rows={4} placeholder="Tell us about yourself..." />`,
  currency: `<InputField label="Amount" format="currency" currency="USD" locale="en-US" placeholder="0.00" />`,
  error: `<InputField label="Email" error="Please enter a valid email address." />`,
}

export default async function InputFieldPage() {
  const [basicHl, variantsHl, floatingHl, iconsHl, passwordHl, multilineHl, currencyHl, errorHl] = await Promise.all([
    highlight(codes.basic, "tsx"),
    highlight(codes.variants, "tsx"),
    highlight(codes.floating, "tsx"),
    highlight(codes.icons, "tsx"),
    highlight(codes.password, "tsx"),
    highlight(codes.multiline, "tsx"),
    highlight(codes.currency, "tsx"),
    highlight(codes.error, "tsx"),
  ])

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Form"
          title="InputField"
          description="Versatile text input supporting floating labels, icons, password toggle, multiline mode, and currency formatting."
        />

        <section id="basic" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Basic usage</h2>
          <ComponentDemo code={basicHl} rawCode={codes.basic}>
            <BasicDemo />
          </ComponentDemo>
        </section>

        <section id="variants" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Variants</h2>
          <ComponentDemo code={variantsHl} rawCode={codes.variants}>
            <VariantsDemo />
          </ComponentDemo>
        </section>

        <section id="floating" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Floating label</h2>
          <ComponentDemo code={floatingHl} rawCode={codes.floating}>
            <FloatingLabelDemo />
          </ComponentDemo>
        </section>

        <section id="icons" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">With icons</h2>
          <ComponentDemo code={iconsHl} rawCode={codes.icons}>
            <WithIconsDemo />
          </ComponentDemo>
        </section>

        <section id="password" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Password</h2>
          <ComponentDemo code={passwordHl} rawCode={codes.password}>
            <PasswordDemo />
          </ComponentDemo>
        </section>

        <section id="multiline" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Multiline</h2>
          <ComponentDemo code={multilineHl} rawCode={codes.multiline}>
            <MultilineDemo />
          </ComponentDemo>
        </section>

        <section id="currency" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Currency format</h2>
          <ComponentDemo code={currencyHl} rawCode={codes.currency}>
            <CurrencyDemo />
          </ComponentDemo>
        </section>

        <section id="error" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Error state</h2>
          <ComponentDemo code={errorHl} rawCode={codes.error}>
            <ErrorDemo />
          </ComponentDemo>
        </section>

        <section id="api" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">API</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Also accepts all standard HTML input and textarea attributes.
          </p>
          <PropsTable props={inputFieldProps} />
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
