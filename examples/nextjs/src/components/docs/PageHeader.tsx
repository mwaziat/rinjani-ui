import React from "react"
import Link from "next/link"

interface PageHeaderProps {
  category?: string
  categoryHref?: string
  title: string
  description: string
  badge?: string
}

export function PageHeader({
  category,
  categoryHref,
  title,
  description,
  badge,
}: PageHeaderProps) {
  return (
    <div className="mb-10">
      {category && (
        <div className="mb-2">
          {categoryHref ? (
            <Link
              href={categoryHref}
              className="text-xs font-semibold uppercase tracking-wider text-primary-500 hover:text-primary-700 transition-colors"
            >
              {category}
            </Link>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-500">
              {category}
            </span>
          )}
        </div>
      )}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-neutral-900">{title}</h1>
        {badge && (
          <span className="text-xs font-semibold bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-base text-neutral-500 max-w-2xl">{description}</p>
    </div>
  )
}
