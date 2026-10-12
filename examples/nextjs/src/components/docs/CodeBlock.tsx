"use client"

import { useState } from "react"
import { FiCheck, FiCopy } from "react-icons/fi"

interface CodeBlockProps {
  html: string
  source: string
  language: string
}

export function CodeBlock({ html, source, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copySource() {
    if (!navigator.clipboard) return

    await navigator.clipboard.writeText(source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-2">
        <span className="rounded bg-white/10 px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-white/60">
          {language}
        </span>
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy code"}
          title={copied ? "Copied" : "Copy code"}
          onClick={copySource}
          className="pointer-events-auto translate-y-1 rounded-md border border-white/10 bg-white/10 p-2 text-white/65 opacity-0 shadow-sm transition duration-150 hover:bg-white/15 hover:text-white focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 group-hover:translate-y-0 group-hover:opacity-100"
        >
          {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
