---
category: General
title: Card
description: Group related content and actions in a structured surface.
---

# Card

Use Card to group related content and actions in a clear, elevated surface. Compose it with `CardHeader`, `CardContent`, `CardMedia`, and `CardFooter` when the content benefits from a visible structure.

## When to use

Use Card when content belongs together but needs separation from the surrounding page.

- Use `CardHeader` for a title, supporting context, an icon, or a status element.
- Use `CardContent` for the primary body content.
- Use `CardFooter` for actions that apply to the card.
- Use `CardMedia` with `noPadding` when media should touch the card edges.
- Use `CardContent` alone for a simple content surface without a header or footer.

Card is a container, not a replacement for page layout. Avoid nesting cards unless each surface represents a distinct level of information.

## Examples

### Basic usage

```tsx
import { Button, Card, CardContent, CardFooter, CardHeader } from "rinjani-ui"

export default function Example() {
  return (
    <Card>
      <CardHeader title="Project summary" subtitle="Updated a few minutes ago" />
      <CardContent>
        <p>Keep related content together in one surface.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View project</Button>
      </CardFooter>
    </Card>
  )
}
```

### Header actions

Pass children to `CardHeader` to place a Badge or another compact action beside the title.

### With an icon

Use the `icon` prop when an icon reinforces the meaning of the card title.

### Edge-to-edge media

Set `noPadding` on Card and provide `CardMedia` when an image or custom media should touch the card edges.

### Content only

Use `CardContent` without a header or footer for a minimal content surface.

## API

### Card props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Content inside the card. |
| `noPadding` | `boolean` | `false` | Removes default body padding. |
| `className` | `string` | — | Additional classes for the card container. |

### CardHeader props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Main headline. |
| `subtitle` | `string` | — | Supporting text below the title. |
| `icon` | `ReactNode` | — | Icon displayed before the title. |
| `children` | `ReactNode` | — | Custom content beside the title. |
| `className` | `string` | — | Additional classes for the header. |

### CardContent props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Primary card body content. |
| `className` | `string` | — | Additional classes for the content area. |

### CardMedia props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `image` | `string` | — | Image URL rendered in the media area. |
| `src` | `string` | — | Alias for `image`. |
| `alt` | `string` | `""` | Alternative text for the image. |
| `height` | `number \| string` | — | Fixed media height. |
| `objectFit` | `"cover" \| "contain" \| "fill" \| "none" \| "scale-down"` | `"cover"` | Controls image fitting. |
| `children` | `ReactNode` | — | Custom media content. |
| `className` | `string` | — | Additional classes for the media area. |

### CardFooter props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Footer content, typically actions. |
| `className` | `string` | — | Additional classes for the footer. |

## FAQ

### Should every Card have a header and footer?

No. Use only the subcomponents that match the content structure. `CardContent` can be used by itself.

### When should I use noPadding?

Use `noPadding` when media, tables, or another edge-to-edge block should touch the card boundary. Add padding inside the content that follows it when needed.

### Can I put actions in CardHeader?

Yes. Pass a Badge, Button, or another compact element as CardHeader children when it belongs beside the title.
