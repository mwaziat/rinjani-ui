import React from "react"
import { PageHeader } from "@/components/docs/PageHeader"
import { TableOfContents } from "@/components/docs/TableOfContents"

const tocItems = [
  { id: "v1-0-0", label: "v1.0.0", depth: 2 as const },
]

interface ChangeEntry {
  type: "added" | "changed" | "fixed"
  text: string
}

interface Release {
  version: string
  date: string
  entries: ChangeEntry[]
}

const releases: Release[] = [
  {
    version: "1.0.0",
    date: "2025-01-01",
    entries: [
      { type: "added", text: "Initial release with 20+ components" },
      { type: "added", text: "Button, IconButton with 4 variants, 7 colors, 6 sizes" },
      { type: "added", text: "Badge with pill support and left/right icons" },
      { type: "added", text: "Breadcrumb with contained mode and custom separator" },
      { type: "added", text: "Card with Header, Content, Footer sub-components" },
      { type: "added", text: "Tooltip with floating-ui positioning and arrow" },
      { type: "added", text: "Dropdown with Dropdown.List and Dropdown.Item composition" },
      { type: "added", text: "Tabs with vertical placement and fullWidth alignment" },
      { type: "added", text: "Drawer with 4 positions and percentage sizes" },
      { type: "added", text: "Tree with drag-and-drop, async loading, and node actions" },
      { type: "added", text: "Alert with close/minimize actions and auto-dismiss duration" },
      { type: "added", text: "Dialog — imperative API via useDialog hook" },
      { type: "added", text: "Toast — imperative API via useToast hook, 8 placements" },
      { type: "added", text: "Modal with scroll modes and backdrop close" },
      { type: "added", text: "DataTable with sorting, pagination, row selection, expandable rows" },
      { type: "added", text: "EditDataTable with inline cell editing and save/cancel toolbar" },
      { type: "added", text: "Panel (PanelLayout) with collapsible sidebar and navbar" },
      { type: "added", text: "Lightbox with thumbnails, zoom, autoplay, and drag navigation" },
      { type: "added", text: "InputField with floating label, password toggle, multiline, currency format" },
      { type: "added", text: "Select and SelectMultiple with clearable and floating label" },
      { type: "added", text: "Autocomplete with add-item mode" },
      { type: "added", text: "Checkbox and Radio group components" },
      { type: "added", text: "Switch with label placement options" },
      { type: "added", text: "DatePicker with adapter pattern (native Date, Day.js, Moment)" },
      { type: "added", text: "Dropzone with grid layout, file previews, and validation" },
      { type: "added", text: "Full TypeScript definitions for every component" },
      { type: "added", text: "CSS custom property tokens for easy theming" },
    ],
  },
]

const typeColors: Record<ChangeEntry["type"], string> = {
  added: "bg-success-100 text-success-700",
  changed: "bg-warning-100 text-warning-700",
  fixed: "bg-info-100 text-info-700",
}

export default function ChangelogPage() {
  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Getting Started"
          title="Changelog"
          description="A record of all notable changes to Rinjani UI."
        />

        <div className="mt-10 space-y-12">
          {releases.map((release) => (
            <section key={release.version} id={`v${release.version.replace(/\./g, "-")}`} className="scroll-mt-24">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">v{release.version}</h2>
                <span className="text-sm text-neutral-400">{release.date}</span>
              </div>
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
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
