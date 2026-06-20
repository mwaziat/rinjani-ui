import type { DialogItem, DialogOptions } from './Dialog.types'

type Listener = (dialogs: DialogItem[]) => void

let dialogs: DialogItem[] = []
let listeners: Listener[] = []

export const dialogManager = {
  add: (options: DialogOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const dialog: DialogItem = { ...options, id }
    dialogs = [...dialogs, dialog]
    dialogManager.notify()
    return id
  },
  remove: (id: string) => {
    dialogs = dialogs.filter((d) => d.id !== id)
    dialogManager.notify()
  },
  subscribe: (listener: Listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  notify: () => {
    listeners.forEach((l) => l(dialogs))
  }
}
