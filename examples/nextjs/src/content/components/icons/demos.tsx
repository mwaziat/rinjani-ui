import * as Fi from "react-icons/fi"
import * as Lu from "react-icons/lu"
import type { IconType } from "react-icons"

export const featherIcons = Object.entries(Fi)
  .filter(([name]) => name.startsWith("Fi"))
  .slice(0, 80) as [string, IconType][]

export const lucideIcons = Object.entries(Lu)
  .filter(([name]) => name.startsWith("Lu"))
  .slice(0, 80) as [string, IconType][]

export function BasicDemo() {
  const Icon = Fi.FiHeart

  return (
    <div className="flex items-center gap-3 py-1">
      <Icon size={22} className="text-primary-600" aria-hidden="true" />
      <span className="text-sm text-neutral-700">Favorite</span>
    </div>
  )
}

export function SizingDemo() {
  return (
    <div className="flex items-end gap-5 py-1">
      <Fi.FiStar size={16} className="text-neutral-500" aria-hidden="true" />
      <Fi.FiStar size={24} className="text-primary-600" aria-hidden="true" />
      <Fi.FiStar size={32} className="text-success-600" aria-hidden="true" />
    </div>
  )
}

export function IconGallery({ icons }: { icons: [string, IconType][] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-6">
      {icons.map(([name, Icon]) => (
        <div key={name} title={name} className="group min-w-0 border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Icon size={18} className="shrink-0 text-neutral-600 transition-colors group-hover:text-primary-600" aria-hidden="true" />
            <span className="truncate text-xs text-neutral-500 group-hover:text-primary-700">{name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
