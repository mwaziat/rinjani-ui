"use client"

import React, { useState } from "react"
import { Alert } from "rinjani-ui"

export function BasicDemo() {
  return (
    <div className="w-full space-y-3">
      <Alert title="Information" message="This is an informational alert." color="info" />
      <Alert title="Success" message="Your changes have been saved." color="success" />
      <Alert title="Warning" message="Please review before proceeding." color="warning" />
      <Alert title="Error" message="Something went wrong. Please try again." color="danger" />
    </div>
  )
}

export function VariantsDemo() {
  return (
    <div className="w-full space-y-3">
      <Alert title="Soft" message="Default variant." variant="soft" color="primary" />
      <Alert title="Filled" message="High emphasis." variant="filled" color="primary" />
      <Alert title="Outlined" message="Low emphasis." variant="outlined" color="primary" />
    </div>
  )
}

export function CloseableDemo() {
  const [alerts, setAlerts] = useState([
    { id: 1, title: "Closeable alert", message: "Click the X to dismiss.", color: "info" as const },
    { id: 2, title: "Another alert", message: "This one also closes.", color: "success" as const },
  ])
  return (
    <div className="w-full space-y-3">
      {alerts.map((a) => (
        <Alert
          key={a.id}
          title={a.title}
          message={a.message}
          color={a.color}
          action="close"
          onClose={() => setAlerts((prev) => prev.filter((x) => x.id !== a.id))}
        />
      ))}
      {alerts.length === 0 && (
        <p className="text-sm text-neutral-400 text-center">All alerts dismissed.</p>
      )}
    </div>
  )
}

export function MinimizeDemo() {
  return (
    <div className="w-full space-y-3">
      <Alert
        title="Minimizable alert"
        message="Click the chevron to collapse this alert."
        color="warning"
        action="minimize"
      />
    </div>
  )
}

export function AutoDismissDemo() {
  const [show, setShow] = useState(false)
  return (
    <div className="w-full space-y-3">
      <button
        className="text-sm px-3 py-1.5 rounded bg-primary-600 text-white hover:bg-primary-700"
        onClick={() => setShow(true)}
      >
        Show auto-dismiss (3s)
      </button>
      {show && (
        <Alert
          title="Auto-dismiss"
          message="This alert disappears after 3 seconds."
          color="success"
          duration={3000}
          onClose={() => setShow(false)}
        />
      )}
    </div>
  )
}
