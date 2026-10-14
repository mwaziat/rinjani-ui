---
category: General
title: Badge
description: Use Badge to display compact status, category, or metadata labels.
---

# Badge

Use Badge to display compact status, category, or metadata labels.

## When to use

Use a badge to show short, non-interactive information next to content.

- Use `soft` for the default status or category label.
- Use `filled` when the label needs stronger emphasis.
- Use `outlined` when the label should remain light on the page.
- Use `text` when the label needs the smallest visual footprint.
- Use `isPill` for statuses, filters, or compact chips.

Badge is not an action. Use Button when the user needs to click, submit, or change something.

## Examples

### Basic usage

```tsx
import { Badge } from "rinjani-ui"

export default function Example() {
  return <Badge color="success">Active</Badge>
}
```

### Status indicators

Combine `color="success"`, `color="warning"`, or `color="danger"` with `variant="soft"` and `isPill` to create compact status indicators.

### Icons

Use `leftIcon` or `rightIcon` when the icon adds meaning to the label. Keep the label visible so the status remains understandable without relying on color or the icon alone.

### Sizes

Badge uses the Rinjani size scale: `xxs`, `xs`, `sm`, `md`, `lg`, and `xl`. The default size is `sm`.

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"filled" \| "outlined" \| "soft" \| "text"` | `"soft"` | Visual style of the badge. |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info" \| "neutral"` | `"primary"` | Color theme applied to the badge. |
| `size` | `"xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Controls padding, font size, and overall height. |
| `isPill` | `boolean` | `false` | Applies fully rounded corners. |
| `leftIcon` | `ReactNode` | — | Renders an icon before the badge text. |
| `rightIcon` | `ReactNode` | — | Renders an icon after the badge text. |
| `children` | `ReactNode` | — | Text or content displayed inside the badge. |

Badge also accepts standard HTML `div` attributes, including `className`, `id`, `data-*`, and `aria-*` attributes.

## FAQ

### Is Badge interactive?

No. Badge is a non-interactive label. Use Button or another interactive component when the user needs to perform an action.

### Which variant should I use for a status?

Start with `soft` because it keeps the status visible without overpowering the surrounding content. Use `filled` only when the status needs stronger emphasis.

### When should I use `isPill`?

Use `isPill` for compact statuses, tags, filters, and other labels where the fully rounded shape communicates a small, self-contained value.
