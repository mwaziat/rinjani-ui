# Button

Reusable button component.

## Usage

```tsx
import { Button } from '@/components/Button'

<Button>Save</Button>
```

## Variants

```tsx
<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="surface">Surface</Button>
<Button variant="subtle">Subtle</Button>
```

## Colors

```tsx
<Button color="blue">Blue</Button>
<Button color="red">Red</Button>
```

## Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Icons

```tsx
<Button startIcon={<Icon />}>Add</Button>
```

Icon menerima ReactElement, bebas library apa pun.

## Loading

```tsx
<Button isLoading>Saving</Button>
```

## Props

| prop | type | default |
|----|----|----|
| variant | ButtonVariant | solid |
| color | ButtonColor | blue |
| size | ButtonSize | md |
| startIcon | ReactElement | - |
| endIcon | ReactElement | - |
| isLoading | boolean | false |
