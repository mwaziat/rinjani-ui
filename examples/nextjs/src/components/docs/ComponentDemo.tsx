"use client"

import React, { useState } from "react"
import { FiCode } from "react-icons/fi"
import { CodeBlock } from "./CodeBlock"

interface ComponentDemoProps {
  title?: string
  description?: string
  code: string
  rawCode: string
  children: React.ReactNode
  centered?: boolean
}

export function ComponentDemo({
  title,
  description,
  code,
  rawCode,
  children,
  centered = true,
}: ComponentDemoProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="mb-10">
      {title && (
        <h3 className="text-base font-semibold text-neutral-800 mb-1">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-neutral-500 mb-3">{description}</p>
      )}

      <div className="rounded-xl border border-neutral-200 overflow-hidden">
        <div
          className={`p-6 bg-white min-h-24 flex flex-wrap gap-3 ${
            centered ? "items-center justify-center" : "items-start justify-start"
          }`}
        >
          {children}
        </div>

        <div className="border-t border-neutral-200 px-4 py-2 bg-neutral-50 flex justify-end">
          <button
            onClick={() => setShowCode((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <FiCode size={13} />
            {showCode ? "Hide code" : "Show code"}
          </button>
        </div>

        {showCode && <CodeBlock html={code} source={rawCode} language="tsx" />}
      </div>
    </div>
  )
}
