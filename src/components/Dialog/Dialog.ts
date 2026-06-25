import { dialogManager } from './dialog-manager'
import type { DialogOptions } from './Dialog.types'

const createDialog = (type: DialogOptions['type']) => (options: DialogOptions | string): string => {
  const opts = typeof options === 'string' ? { message: options } : options
  return dialogManager.add({ ...opts, type: type || opts.type || 'default' })
}

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
