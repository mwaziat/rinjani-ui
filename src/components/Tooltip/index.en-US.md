# Tooltip

## When to use

Use Tooltip for short, supplementary information that appears when a user hovers over or focuses a control. It should clarify an unfamiliar action without replacing the control's visible label.

## Usage

```tsx
import { Button, Tooltip } from 'rinjani-ui'

export default function Example() {
  return (
    <Tooltip content="This is a tooltip">
      <Button variant="outlined">Hover me</Button>
    </Tooltip>
  )
}
```

The tooltip is positioned with a portal and can choose the side with the most available viewport space when `placement="auto"`. Its arrow follows the resolved placement and uses the selected color and variant.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `content` | Text or React content displayed in the tooltip. | `ReactNode` | — |
| `children` | Element that triggers the tooltip on hover or focus. | `ReactNode` | — |
| `anchorRef` | Optional positioning anchor. | `RefObject<HTMLElement>` | — |
| `placement` | Preferred tooltip position. | `TooltipPlacement` | `"auto"` |
| `color` | Color scale for the tooltip and arrow. | `TooltipColor` | `"neutral"` |
| `variant` | Bubble style. | `"filled" \| "outlined" \| "soft"` | `"filled"` |
| `size` | Padding and text size. | `TooltipSize` | `"sm"` |
| `showArrow` | Whether to render the directional arrow. | `boolean` | `true` |
| `offset` | Distance from the trigger in pixels. | `number` | `8` |
| `isPill` | Use fully rounded corners. | `boolean` | `false` |
| `delay` | Open delay in milliseconds. | `number` | `200` |
| `maxWidth` | Maximum width before wrapping. | `TooltipMaxWidth` | — |
| `triggerClassName` | Classes for the trigger wrapper. | `string` | `""` |
| `className` | Classes for the tooltip bubble. | `string` | `""` |

## FAQ

### Why does the tooltip move with `auto` placement?

`auto` selects the placement with the least viewport overflow. The arrow is aligned to the trigger after that placement is resolved.

### Does Tooltip support keyboard users?

Yes. The tooltip opens on focus as well as pointer hover.
