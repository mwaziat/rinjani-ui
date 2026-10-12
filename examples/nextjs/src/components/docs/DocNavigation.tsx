import React from "react"
import Link from "next/link"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

export interface DocLink {
  href: string
  title: string
  description?: string
}

interface DocNavigationProps {
  previous?: DocLink
  next?: DocLink
  related?: DocLink[]
}

export function DocNavigation({ previous, next, related = [] }: DocNavigationProps) {
  return (
    <div className="mt-10 space-y-8">
      {(previous || next) && (
        <nav aria-label="Page navigation" className="grid border-y border-neutral-200 sm:grid-cols-2">
          {previous ? (
            <Link
              href={previous.href}
              className="group border-b border-neutral-200 py-4 sm:border-b-0 sm:border-r sm:pr-6"
            >
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                <FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
                Previous
              </span>
              <p className="mt-1 text-sm font-semibold text-neutral-800 group-hover:text-primary-600">
                {previous.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next && (
            <Link
              href={next.href}
              className="group py-4 text-right sm:pl-6"
            >
              <span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400">
                Next
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </span>
              <p className="mt-1 text-sm font-semibold text-neutral-800 group-hover:text-primary-600">
                {next.title}
              </p>
            </Link>
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section id="related-docs" className="scroll-mt-24">
          <h2 className="mb-3 text-lg font-semibold text-neutral-800">Related documentation</h2>
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group flex items-center justify-between gap-4 py-3">
                  <span>
                    <span className="block text-sm font-semibold text-neutral-800 group-hover:text-primary-600">
                      {item.title}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 block text-xs leading-5 text-neutral-500">{item.description}</span>
                    )}
                  </span>
                  <FiArrowRight className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
