"use client"

import { useState } from "react"
import { CodeBlock } from "./CodeBlock"

interface PackageManagerOption {
  name: string
  html: string
  source: string
}

interface PackageManagerTabsProps {
  options: PackageManagerOption[]
}

export function PackageManagerTabs({ options }: PackageManagerTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeOption = options[activeIndex] ?? options[0]

  if (!activeOption) return null

  return (
    <div>
      <div role="tablist" aria-label="Package manager" className="flex gap-5 border-b border-neutral-200">
        {options.map((option, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={option.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              className={`relative -mb-px px-1 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary-700 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary-600"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {option.name}
            </button>
          )
        })}
      </div>
      <CodeBlock html={activeOption.html} source={activeOption.source} language="sh" />
    </div>
  )
}
