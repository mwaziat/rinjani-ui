"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

export interface TocItem {
  id: string
  label: string
  depth?: 2 | 3
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "0px 0px -60% 0px" }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <aside className="sticky top-24 z-20 hidden h-fit w-52 shrink-0 self-start xl:block">
      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.depth === 3 ? "0.75rem" : 0 }}
          >
            <Link
              href={`#${item.id}`}
              className={`block text-sm transition-colors leading-snug ${
                activeId === item.id
                  ? "text-primary-600 font-medium"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
