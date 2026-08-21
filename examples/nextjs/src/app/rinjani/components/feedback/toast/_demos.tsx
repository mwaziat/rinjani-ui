"use client"

import React from "react"
import { Toast, Button } from "rinjani-ui"

export function BasicDemo() {
  return (
    <Button
      variant="outlined"
      onClick={() => Toast.success("Action completed successfully.")}
    >
      Show Toast
    </Button>
  )
}

export function TypesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["success", "error", "warning", "info", "default"] as const).map((type) => (
        <Button
          key={type}
          variant="soft"
          size="sm"
          onClick={() => (type === "default" ? Toast.show : Toast[type])({ message: `This is a ${type} toast.`, title: type })}
        >
          {type}
        </Button>
      ))}
    </div>
  )
}

export function PlacementsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center"] as const).map((placement) => (
        <Button
          key={placement}
          variant="soft"
          size="sm"
          onClick={() => Toast.info({ message: placement, placement })}
        >
          {placement}
        </Button>
      ))}
    </div>
  )
}

export function PersistentDemo() {
  return (
    <Button
      variant="outlined"
      color="warning"
      onClick={() =>
        Toast.warning({
          title: "Persistent toast",
          message: "This toast stays until manually closed.",
          duration: 0,
        })
      }
    >
      Persistent (duration: 0)
    </Button>
  )
}
