---
category: General
title: Breadcrumb
description: Show the user's current location within a hierarchy of pages.
---

# Breadcrumb

Use Breadcrumb to show the user's current location within a hierarchy of pages.

## When to use

Use Breadcrumb when a page belongs to a multi-level navigation structure and users may need to return to a parent level.

- Keep previous levels clickable through `paths`.
- Keep the current page in `activeLabel` and do not make it a link.
- Use `contained={false}` for a lightweight navigation trail.
- Use `contained` with a variant when the trail needs a distinct surface.
- Use a clear separator and avoid long, deeply nested trails.

Breadcrumb is navigation, not a replacement for the main navigation or page title.

## Examples

### Basic usage

```tsx
import { Breadcrumb } from "rinjani-ui"

export default function Example() {
  return (
    <Breadcrumb
      paths={[
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
      ]}
      activeLabel="Breadcrumb"
      contained={false}
    />
  )
}
```

### Contained variants

Use `contained` with `filled`, `outlined`, `soft`, or `line` to give the breadcrumb a visible surface.

### Icons and custom separators

Add an icon to a path or use `separator` to replace the default chevron. Icons should reinforce the hierarchy and not replace the text labels.

### Alignment and custom content

Use `justify` to align the heading and trail. Use `currentPosition` for a subtitle and `rightContent` for a contextual action.

### Sizes

Breadcrumb supports `xxs`, `xs`, `sm`, `md`, `lg`, and `xl`. The default size is `md`.

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `activeLabel` | `string` | — | Current, non-clickable page label. |
| `paths` | `BreadcrumbPath[]` | — | Previous path nodes. Each item has a `label` and `href`. |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info" \| "neutral"` | `"primary"` | Color for the active item and link hover states. |
| `variant` | `"filled" \| "outlined" \| "soft" \| "text" \| "line"` | `"line"` | Visual style used when the breadcrumb is contained. |
| `size` | `"xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Font size and spacing of the trail. |
| `justify` | `"between" \| "start" \| "end"` | `"between"` | Horizontal alignment of the heading and trail. |
| `contained` | `boolean` | `true` | Wraps the breadcrumb in a styled container. |
| `separator` | `ReactNode` | `ChevronRightIcon` | Element displayed between path nodes. |
| `activeIcon` | `ReactNode` | — | Icon rendered beside the active label. |
| `currentPosition` | `ReactNode \| null` | `"Current Position"` | Subtitle below the active label. Pass `null` to hide it. |
| `rightContent` | `ReactNode` | — | Content rendered after the breadcrumb trail. |
| `className` | `string` | `""` | Additional classes for the root container. |

### BreadcrumbPath

| Property | Type | Description |
| --- | --- | --- |
| `label` | `string` | Text shown for the path node. |
| `href` | `string` | URL opened when the path node is selected. |
| `icon` | `ReactNode` | Optional icon shown beside the label. |

## FAQ

### Should the current page be clickable?

No. Keep the current page in `activeLabel` as plain text. Only previous levels in `paths` should be links.

### When should I use contained?

Use `contained={false}` for a lightweight trail inside an existing layout. Use `contained` when the breadcrumb needs its own visual surface or should be separated from surrounding content.

### How many levels should a breadcrumb contain?

Include only meaningful parent levels. If the hierarchy becomes too long, simplify the labels or provide another navigation pattern rather than letting the trail wrap unpredictably.
