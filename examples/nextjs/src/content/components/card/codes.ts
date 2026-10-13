export const cardCodes = {
  basic: `import { Button, Card, CardContent, CardFooter, CardHeader } from "rinjani-ui"

export default function Example() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader title="Project summary" subtitle="Updated a few minutes ago" />
      <CardContent>
        <p className="text-sm text-neutral-600">Keep related content together in one surface.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outlined">Cancel</Button>
        <Button size="sm">View project</Button>
      </CardFooter>
    </Card>
  )
}`,

  headerActions: `import { Badge, Card, CardContent, CardHeader } from "rinjani-ui"

export default function Example() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader title="Server status" subtitle="Production environment">
        <Badge color="success" isPill>Online</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">All systems are operational.</p>
      </CardContent>
    </Card>
  )
}`,

  withIcon: `import { Card, CardContent, CardHeader, SettingsIcon } from "rinjani-ui"

export default function Example() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader
        title="Settings"
        subtitle="Manage your preferences"
        icon={<SettingsIcon size={20} className="text-primary-600" />}
      />
      <CardContent>
        <p className="text-sm text-neutral-600">Configure account settings here.</p>
      </CardContent>
    </Card>
  )
}`,

  noPadding: `import { Card, CardContent, CardHeader, CardMedia, ImageIcon } from "rinjani-ui"

export default function Example() {
  return (
    <Card className="w-full max-w-xl" noPadding>
      <CardMedia height={160} className="flex items-center justify-center bg-primary-50 text-primary-600">
        <ImageIcon size={42} />
      </CardMedia>
      <div className="p-6">
        <CardHeader title="Edge-to-edge media" subtitle="CardMedia with noPadding" />
        <CardContent>
          <p className="text-sm text-neutral-600">Media can touch the card edges.</p>
        </CardContent>
      </div>
    </Card>
  )
}`,

  contentOnly: `import { Card, CardContent } from "rinjani-ui"

export default function Example() {
  return (
    <Card className="w-full max-w-xl">
      <CardContent>
        <p className="text-sm text-neutral-600">CardContent can be used without a header or footer.</p>
      </CardContent>
    </Card>
  )
}`,
} as const
