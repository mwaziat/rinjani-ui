import React from "react"
import { DocNavigation } from "@/components/docs/DocNavigation"
import { PageHeader } from "@/components/docs/PageHeader"
import { TableOfContents } from "@/components/docs/TableOfContents"
import { releases as publicReleases, type ChangeType } from "./changelog"

const tocItems = publicReleases.map((release) => ({
  id: `v${release.version.replace(/\./g, "-")}`,
  label: `v${release.version}`,
  depth: 2 as const,
}))

tocItems.push({ id: "related-docs", label: "Related documentation", depth: 2 as const })

const typeColors: Record<ChangeType, string> = {
  added: "bg-success-100 text-success-700",
  changed: "bg-warning-100 text-warning-700",
  fixed: "bg-info-100 text-info-700",
}

export default function ChangelogPage() {
  return (
    <div className="flex w-full gap-10 px-6 py-10">
      <div className="min-w-0 flex-1">
        <PageHeader
          category="Getting Started"
          title="Changelog"
          description="A record of all notable changes to Rinjani UI."
        />

        <div className="mt-10 space-y-12">
          {publicReleases.map((release) => (
            <section key={release.version} id={`v${release.version.replace(/\./g, "-")}`} className="scroll-mt-24">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">v{release.version}</h2>
                <span className="text-sm text-neutral-400">{release.date}</span>
              </div>
              <p className="mb-5 text-sm leading-6 text-neutral-600">{release.summary}</p>
              <ul className="space-y-2">
                {release.entries.map((entry, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className={`mt-0.5 shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${typeColors[entry.type]}`}>
                      {entry.type}
                    </span>
                    <span>{entry.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <DocNavigation
          previous={{ href: "/rinjani/getting-started/theming", title: "Theming" }}
          next={{ href: "/rinjani/components/general/button", title: "Button" }}
          related={[
            {
              href: "/rinjani/getting-started/overview",
              title: "Overview",
              description: "Learn how the library is structured.",
            },
            {
              href: "/rinjani/getting-started/installation",
              title: "Installation",
              description: "Add Rinjani UI to your project.",
            },
            {
              href: "/rinjani/getting-started/theming",
              title: "Theming",
              description: "Customize tokens and color scales.",
            },
            {
              href: "/rinjani/components/data-display/data-table",
              title: "DataTable",
              description: "Explore a component with practical data features.",
            },
          ]}
        />
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
