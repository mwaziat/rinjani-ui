'use client'

import React from 'react'
import { AlertCircleIcon } from '../../Icons'
import type { SwitchProps } from './Switch.types'
import { sizeClasses, colorClasses, focusClasses, placementClasses } from './Switch.styles'

/**
 * A toggle switch component used to switch between two states (e.g., on/off, enable/disable).
 * 
 * Best used for settings or preferences that take immediate effect when toggled.
 * 
 * @example
 * ```tsx
 * const [notifications, setNotifications] = useState(true)
 * 
 * return (
 *   <Switch 
 *     label="Enable Email Notifications"
 *     checked={notifications}
 *     onChange={setNotifications}
 *     color="success"
 *   />
 * )
 * ```
 */
export const Switch = ({
  checked,
  onChange,
  label,
  name,
  size = 'md',
  color = 'primary',
  error,
  required,
  className = '',
  disabled = false,
  readOnly = false,
  labelPlacement = 'right',
}: SwitchProps) => {
  const handleToggle = () => {
    if (disabled || readOnly) return
    onChange(!checked)
  }

  const activeColor = checked ? colorClasses[color] : 'bg-neutral-300'
  const activeTranslate = checked ? sizeClasses[size].translate : 'translate-x-0'

  return (
    <div className={`flex flex-col ${className}`}>
      <label className={`flex w-fit gap-3 ${placementClasses[labelPlacement]} ${(disabled || readOnly) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
        <div className="relative inline-flex items-center shrink-0">
          <input
            type="checkbox"
            className="peer sr-only"
            name={name}
            checked={checked}
            disabled={disabled}
            aria-readonly={readOnly}
            onChange={handleToggle}
          />
          <div
            className={`
              transition-colors duration-200 ease-in-out rounded-full 
              ${sizeClasses[size].track} 
              ${activeColor}
              ${error ? 'ring-2 ring-danger-500/50' : `peer-focus:ring-2 ${focusClasses[color]}`}
            `}
          >
            <div
              className={`
                absolute top-[2px] left-[2px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out
                ${sizeClasses[size].thumb}
                ${activeTranslate}
              `}
            />
          </div>
        </div>
        {label && (
          <span className={`${sizeClasses[size].label} font-medium text-neutral-800 select-none`}>
            {label} {required && <span className="text-danger-500 ml-0.5">*</span>}
          </span>
        )}
      </label>

      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase text-danger-500 tracking-wider pl-1">
          <AlertCircleIcon size={12} />
          {error}
        </div>
      )}
    </div>
  )
}

export default Switch
