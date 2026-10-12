---
category: General
title: Button
description: Use Button to trigger an action, submit a form, or represent a clear next step.
---

# Button

Use Button to trigger an action, submit a form, or represent a clear next step.

## When to use

Use a button when the user needs to perform an action in the current context.

- Use `filled` for the primary action in a section.
- Use `outlined` for a secondary action.
- Use `soft` for a low-emphasis action that still needs a visible surface.
- Use `text` for tertiary or inline actions.
- Use `danger` for destructive actions such as deleting or removing data.
- Use `isLoading` while an async action is being processed.

Prefer one primary button per section. Use a text link instead when the action navigates to another page and does not change the current state.

## Examples

### Basic usage

```tsx
import { Button } from "rinjani-ui"

export default function Example() {
  return (
    <div className="flex gap-3">
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="text">Text</Button>
    </div>
  )
}
```

### Colors and variants

Use `color` with a variant to communicate intent. For example, pair `danger` with `soft` for a destructive action that should not dominate the page.

### Sizes

Button uses the Rinjani eight-point size scale: `xxs`, `xs`, `sm`, `md`, `lg`, and `xl`. The default size is `sm`.

### Icons

Use `leftIcon` or `rightIcon` when the icon reinforces the action. Keep the label visible when the action is not universally recognizable.

### Loading and disabled states

Use `isLoading` for an action that is currently being processed. Use `disabled` when the action is unavailable, rather than temporarily busy.

### IconButton

Use `IconButton` for a familiar icon-only action. Always provide an accessible `aria-label`.

## API

### Button props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"filled" \| "outlined" \| "soft" \| "text"` | `"filled"` | Visual style of the button. |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info" \| "neutral"` | `"primary"` | Color theme applied to the selected variant. |
| `size` | `"xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Controls height, padding, font size, and icon scale. |
| `isLoading` | `boolean` | `false` | Shows a spinner and disables interaction. |
| `leftIcon` | `ReactNode` | — | Renders an icon before the label. |
| `rightIcon` | `ReactNode` | — | Renders an icon after the label. |
| `fullWidth` | `boolean` | `false` | Expands the button to the width of its parent. |
| `isPill` | `boolean` | `false` | Applies fully rounded corners. |
| `disabled` | `boolean` | `false` | Disables the button and prevents interaction. |

Button also accepts standard HTML button attributes, including `type`, `name`, `value`, `onClick`, and `aria-*` attributes.

### IconButton props

`IconButton` uses the same `variant`, `color`, `size`, `isLoading`, `isPill`, and `disabled` props as Button.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | — | Icon rendered inside the button. |
| `variant` | `"filled" \| "outlined" \| "soft" \| "text"` | `"filled"` | Visual style of the button. |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info" \| "neutral"` | `"primary"` | Color theme applied to the selected variant. |
| `size` | `"xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"` | Controls the button dimensions and icon size. |
| `isLoading` | `boolean` | `false` | Shows a spinner and disables interaction. |
| `isPill` | `boolean` | `false` | Makes the button circular. |

## FAQ

### Which variant should I use?

Start with `filled` for the main action, `outlined` for a secondary action, `soft` for subtle emphasis, and `text` for a low-priority inline action.

### When should I use `isLoading` instead of `disabled`?

Use `isLoading` when the action is in progress. Use `disabled` when the action is not currently available.

### Should an IconButton have visible text?

IconButton is intended for icon-only actions. Add an `aria-label` that describes the action so it remains accessible to assistive technologies.
