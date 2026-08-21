"use client"

import React from "react"
import { Card, CardHeader, CardContent, CardFooter, Button, Badge } from "rinjani-ui"
import { FiSettings } from "react-icons/fi"

export function BasicDemo() {
  return (
    <Card className="w-72">
      <CardHeader title="Card title" subtitle="A short description goes here" />
      <CardContent>
        <p className="text-sm text-neutral-600">
          This is the main content area of the card. You can put anything here.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
        <Button size="sm" variant="outlined">Cancel</Button>
      </CardFooter>
    </Card>
  )
}

export function HeaderActionsDemo() {
  return (
    <Card className="w-72">
      <CardHeader title="Server status" subtitle="Production environment">
        <Badge color="success" isPill leftIcon={<span className="w-1.5 h-1.5 rounded-full bg-success-500 inline-block" />}>Online</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">All systems operational.</p>
      </CardContent>
    </Card>
  )
}

export function WithIconDemo() {
  return (
    <Card className="w-72">
      <CardHeader title="Settings" subtitle="Manage your preferences" icon={<FiSettings size={18} className="text-primary-600" />} />
      <CardContent>
        <p className="text-sm text-neutral-600">Configure your account settings here.</p>
      </CardContent>
    </Card>
  )
}

export function NoPaddingDemo() {
  return (
    <Card className="w-72" noPadding>
      <div className="h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-t-xl" />
      <div className="p-4">
        <p className="text-sm font-semibold text-neutral-800">Edge-to-edge image</p>
        <p className="text-sm text-neutral-500 mt-1">noPadding lets content touch the card borders.</p>
      </div>
    </Card>
  )
}

export function ContentOnlyDemo() {
  return (
    <Card className="w-72">
      <CardContent>
        <p className="text-sm text-neutral-600">
          A minimal card with only CardContent. No header or footer required.
        </p>
      </CardContent>
    </Card>
  )
}
