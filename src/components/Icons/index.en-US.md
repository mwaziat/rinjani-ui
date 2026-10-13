# Icons

Rinjani UI does not bundle an icon library. The examples use [`react-icons`](https://react-icons.github.io/react-icons/) for iconography, including Feather icons from `react-icons/fi` and Lucide icons from `react-icons/lu`.

## When to use

Use icons to reinforce a visible label, communicate a familiar action, or make compact controls easier to scan. Keep a text label for important actions and mark decorative icons with `aria-hidden="true"`.

## Installation

Install `react-icons` in your application when you use the icon examples. See the [official react-icons documentation](https://react-icons.github.io/react-icons/) for the full catalog:

```bash
npm install react-icons
```

## Usage

```tsx
import { FiHeart } from 'react-icons/fi'

export default function Example() {
  return <FiHeart size={22} className="text-primary-600" aria-hidden="true" />
}
```

## API

Each imported icon is a React component. It accepts the common `react-icons` props listed in the documentation API table, plus standard SVG attributes.

## FAQ

### Which icon sets are used in the examples?

The examples use Feather and Lucide icons. `react-icons` provides both sets and many others with the same component pattern.

### Should an icon have a text label?

Use a visible label for important or unfamiliar actions. A decorative icon next to a label should use `aria-hidden="true"`.
