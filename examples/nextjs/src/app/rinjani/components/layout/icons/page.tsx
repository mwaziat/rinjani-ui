import React from "react"
import { PageHeader } from "@/components/docs/PageHeader"
import { TableOfContents } from "@/components/docs/TableOfContents"
import * as Fi from "react-icons/fi"
import * as Lu from "react-icons/lu"

const tocItems = [
  { id: "feather", label: "Feather (Fi)", depth: 2 as const },
  { id: "lucide", label: "Lucide (Lu)", depth: 2 as const },
]

const fiIcons = Object.entries(Fi).filter(([name]) => name.startsWith("Fi")).slice(0, 80)
const luIcons = Object.entries(Lu).filter(([name]) => name.startsWith("Lu")).slice(0, 80)

export default function IconsPage() {
  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 py-8 px-2">
        <PageHeader
          category="Layout"
          title="Icons"
          description="Rinjani UI uses react-icons, giving you access to Feather (Fi) and Lucide (Lu) icon sets out of the box."
        />

        <div className="mt-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-600">
          Import icons directly from <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-neutral-200 font-mono">react-icons/fi</code> or{" "}
          <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-neutral-200 font-mono">react-icons/lu</code>.
          All icon components accept a <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-neutral-200 font-mono">size</code> prop and inherit the current text color.
        </div>

        <section id="feather" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Feather Icons (Fi)</h2>
          <p className="text-sm text-neutral-500 mb-4">Showing first 80 of available Feather icons.</p>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
            {fiIcons.map(([name, Icon]) => {
              const IconComponent = Icon as React.ElementType
              return (
                <div key={name} className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-neutral-100 hover:border-primary-200 hover:bg-primary-50 transition-colors group" title={name}>
                  <IconComponent size={20} className="text-neutral-600 group-hover:text-primary-600" />
                  <span className="text-xs text-neutral-400 text-center leading-tight truncate w-full text-center">{name}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section id="lucide" className="scroll-mt-24 mt-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-1">Lucide Icons (Lu)</h2>
          <p className="text-sm text-neutral-500 mb-4">Showing first 80 of available Lucide icons.</p>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3">
            {luIcons.map(([name, Icon]) => {
              const IconComponent = Icon as React.ElementType
              return (
                <div key={name} className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-neutral-100 hover:border-primary-200 hover:bg-primary-50 transition-colors group" title={name}>
                  <IconComponent size={20} className="text-neutral-600 group-hover:text-primary-600" />
                  <span className="text-xs text-neutral-400 text-center leading-tight truncate w-full text-center">{name}</span>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  )
}
