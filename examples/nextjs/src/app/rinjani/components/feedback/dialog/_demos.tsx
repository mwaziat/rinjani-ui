"use client"

import React from "react"
import { Dialog, Button } from "rinjani-ui"

export function BasicDemo() {
  return (
    <Button
      variant="outlined"
      onClick={() =>
        Dialog.confirm({
          title: "Confirm action",
          message: "Are you sure you want to proceed?",
          onConfirm: () => console.log("confirmed"),
        })
      }
    >
      Open Dialog
    </Button>
  )
}

export function TypesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["success", "error", "warning", "info", "confirm"] as const).map((type) => (
        <Button
          key={type}
          variant="soft"
          size="sm"
          color={type === "error" ? "danger" : type === "confirm" ? "primary" : type}
          onClick={() => {
            if (type === "confirm") {
              Dialog.confirm({
                title: "Confirm",
                message: "This is a confirm dialog.",
              })
            } else {
              Dialog[type]({
                title: type.charAt(0).toUpperCase() + type.slice(1),
                message: `This is a ${type} dialog.`,
              })
            }
          }}
        >
          {type}
        </Button>
      ))}
    </div>
  )
}

export function CustomActionsDemo() {
  return (
    <Button
      variant="soft"
      color="danger"
      onClick={() =>
        Dialog.error({
          title: "Delete item",
          message: "This action cannot be undone. All associated data will be permanently removed.",
          actions: [
            {
              label: "Cancel",
              variant: "outlined",
              color: "neutral",
              onClick: (close) => close(),
            },
            {
              label: "Delete",
              variant: "filled",
              color: "danger",
              onClick: (close) => {
                console.log("deleted")
                close()
              },
            },
          ],
        })
      }
    >
      Delete with custom actions
    </Button>
  )
}
