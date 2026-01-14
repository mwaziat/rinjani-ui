import type { ButtonColor, ButtonVariant } from './Button.types'
import { buttonStyles } from './Button.styles'

export function getButtonStyles(
  color: ButtonColor,
  variant: ButtonVariant,
  disabled?: boolean
) {
  if (disabled) {
    return 'bg-gray-200 text-gray-400 cursor-not-allowed'
  }

  return buttonStyles[variant][color]
}
