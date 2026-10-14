export const iconsCodes = {
  basic: `import { FiHeart } from 'react-icons/fi'

export default function Example() {
  return (
    <div className="flex items-center gap-3">
      <FiHeart size={22} className="text-primary-600" aria-hidden="true" />
      <span>Favorite</span>
    </div>
  )
}`,
  sizing: `import { FiStar } from 'react-icons/fi'

export default function Example() {
  return (
    <div className="flex items-end gap-5">
      <FiStar size={16} className="text-neutral-500" />
      <FiStar size={24} className="text-primary-600" />
      <FiStar size={32} className="text-success-600" />
    </div>
  )
}`,
} as const
