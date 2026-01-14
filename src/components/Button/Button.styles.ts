import type { ButtonColor, ButtonSize, ButtonVariant } from './Button.types'

export const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

export const sizeStyles: Record<ButtonSize, string> = {
  '2xs': 'text-xs px-2 py-1',
  xs: 'text-xs px-2.5 py-1.5',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
  xl: 'text-base px-6 py-3',
  '2xl': 'text-lg px-7 py-3.5',
}

export const iconSizeMap: Record<ButtonSize, string> = {
  '2xs': 'text-xs',
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-lg',
  '2xl': 'text-xl',
}

export const buttonStyles: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  solid: {
    gray: 'bg-gray-500 text-white hover:bg-gray-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    teal: 'bg-teal-500 text-white hover:bg-teal-600',
    pink: 'bg-pink-500 text-white hover:bg-pink-600',
    purple: 'bg-purple-500 text-white hover:bg-purple-600',
    cyan: 'bg-cyan-500 text-white hover:bg-cyan-600',
    orange: 'bg-orange-500 text-white hover:bg-orange-600',
    yellow: 'bg-yellow-500 text-white hover:bg-yellow-600',
    indigo: 'bg-indigo-500 text-white hover:bg-indigo-600',
  },
  outline: {
    gray: 'border border-gray-500 text-gray-500 hover:bg-gray-100',
    red: 'border border-red-500 text-red-500 hover:bg-red-100',
    green: 'border border-green-500 text-green-500 hover:bg-green-100',
    blue: 'border border-blue-500 text-blue-500 hover:bg-blue-100',
    teal: 'border border-teal-500 text-teal-500 hover:bg-teal-100',
    pink: 'border border-pink-500 text-pink-500 hover:bg-pink-100',
    purple: 'border border-purple-500 text-purple-500 hover:bg-purple-100',
    cyan: 'border border-cyan-500 text-cyan-500 hover:bg-cyan-100',
    orange: 'border border-orange-500 text-orange-500 hover:bg-orange-100',
    yellow: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-100',
    indigo: 'border border-indigo-500 text-indigo-500 hover:bg-indigo-100',
  },
  surface: {
    gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    red: 'bg-red-100 text-red-800 hover:bg-red-200',
    green: 'bg-green-100 text-green-800 hover:bg-green-200',
    blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    teal: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
    pink: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    cyan: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
    orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  },
  subtle: {
    gray: 'bg-gray-50 text-gray-800 hover:bg-gray-100',
    red: 'bg-red-50 text-red-800 hover:bg-red-100',
    green: 'bg-green-50 text-green-800 hover:bg-green-100',
    blue: 'bg-blue-50 text-blue-800 hover:bg-blue-100',
    teal: 'bg-teal-50 text-teal-800 hover:bg-teal-100',
    pink: 'bg-pink-50 text-pink-800 hover:bg-pink-100',
    purple: 'bg-purple-50 text-purple-800 hover:bg-purple-100',
    cyan: 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100',
    orange: 'bg-orange-50 text-orange-800 hover:bg-orange-100',
    yellow: 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100',
    indigo: 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100',
  },
}
