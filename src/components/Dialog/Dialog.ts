import { dialogManager } from './dialog-manager'
import type { DialogOptions } from './Dialog.types'

const createDialog = (type: DialogOptions['type']) => (options: DialogOptions | string): string => {
  const opts = typeof options === 'string' ? { message: options } : options
  return dialogManager.add({ ...opts, type: type || opts.type || 'default' })
}

/**
 * A utility object to imperatively trigger dialog modals from anywhere in your application.
 * 
 * Note: Requires `<DialogContainer />` to be mounted somewhere high in your React tree 
 * (typically in `App.tsx` or your layout).
 * 
 * @example
 * ```tsx
 * // Simple confirmation
 * Dialog.confirm({
 *   title: 'Delete Item?',
 *   message: 'Are you sure you want to delete this? This cannot be undone.',
 *   confirmText: 'Delete',
 *   onConfirm: () => handleDelete()
 * })
 * ```
 */
export const Dialog = {
  show: createDialog('default'),
  confirm: (options: DialogOptions | string): string => {
    const opts = typeof options === 'string' ? { message: options } : options
    return dialogManager.add({ ...opts, type: 'confirm', showCancel: true })
  },
  success: createDialog('success'),
  error: createDialog('error'),
  warning: createDialog('warning'),
  info: createDialog('info'),
  dismiss: (id: string): void => dialogManager.remove(id)
}
