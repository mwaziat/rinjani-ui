'use client'

import React, { useEffect, useState } from 'react'
import { dialogManager } from './dialog-manager'
import type { DialogItem } from './Dialog.types'
import { DialogModal } from './DialogModal'

export const DialogContainer: React.FC = () => {
  const [dialogs, setDialogs] = useState<DialogItem[]>([])

  useEffect(() => {
    return dialogManager.subscribe((newDialogs) => {
      setDialogs([...newDialogs])
      
      if (newDialogs.length > 0) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    })
  }, [])

  return (
    <>
      {dialogs.map((dialog) => (
        <DialogModal key={dialog.id} dialog={dialog} />
      ))}
    </>
  )
}
