"use client"

import React from "react"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardMedia,
  ImageIcon,
  SettingsIcon,
} from "rinjani-ui"

const cardClassName = "w-full max-w-xl"

export function BasicDemo() {
  return (
    <Card className={cardClassName}>
      <CardHeader title="Project summary" subtitle="Updated a few minutes ago" />
      <CardContent>
        <p className="text-sm leading-6 text-neutral-600">
          Keep related content together in a single surface with an optional action area.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outlined">Cancel</Button>
        <Button size="sm">View project</Button>
      </CardFooter>
    </Card>
  )
}

export function HeaderActionsDemo() {
  return (
    <Card className={cardClassName}>
      <CardHeader title="Server status" subtitle="Production environment">
        <Badge color="success" isPill>Online</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-neutral-600">All systems are operational.</p>
      </CardContent>
    </Card>
  )
}

export function WithIconDemo() {
  return (
    <Card className={cardClassName}>
      <CardHeader
        title="Settings"
        subtitle="Manage your preferences"
        icon={<SettingsIcon size={20} className="text-primary-600" />}
      />
      <CardContent>
        <p className="text-sm leading-6 text-neutral-600">Configure account and notification settings here.</p>
      </CardContent>
    </Card>
  )
}

export function NoPaddingDemo() {
  return (
    <Card className={cardClassName} noPadding>
      <CardMedia height={160} className="flex items-center justify-center bg-primary-50 text-primary-600">
        <ImageIcon size={42} />
      </CardMedia>
      <div className="p-6">
        <CardHeader title="Edge-to-edge media" subtitle="CardMedia with noPadding" className="mb-4!" />
        <CardContent>
          <p className="text-sm leading-6 text-neutral-600">
            Use <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs">noPadding</code> when media should touch the card edges.
          </p>
        </CardContent>
      </div>
    </Card>
  )
}

export function ContentOnlyDemo() {
  return (
    <Card className={cardClassName}>
      <CardContent>
        <p className="text-sm leading-6 text-neutral-600">
          CardContent can be used on its own when a header or footer is not needed.
        </p>
      </CardContent>
    </Card>
  )
}
