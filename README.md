# Rinjani UI

A modern, customizable UI component library built with React and TailwindCSS. Designed for developers who want beautiful, accessible, and flexible UI components.

## Features

- Built with React 18+ and TypeScript
- Powered by TailwindCSS for styling
- Tree-shakable and optimized for production
- Accessible components following WCAG guidelines
- Highly customizable with extensive props
- Comprehensive documentation with Storybook

## Installation

### For Existing React Projects

If you already have a React project with TailwindCSS set up:

```bash
npm install rinjani-ui
```

Or with yarn:

```bash
yarn add rinjani-ui
```

Make sure you have these peer dependencies installed:

- `react: ^18.0.0 || ^19.0.0`
- `react-dom: ^18.0.0 || ^19.0.0`
- `tailwindcss: >=4.0.0`

### For New Projects

To create a new project with React, TailwindCSS, and Rinjani UI from scratch:

1. **Create a new React project:**
   ```bash
   npx create-react-app my-app
   cd my-app
   ```

2. **Install TailwindCSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Install Rinjani UI:**
   ```bash
   npm install rinjani-ui
   ```

4. **Configure TailwindCSS** (see the [Styling](#styling) section below for details)

## Quick Start

1. Import the component you need:

```tsx
import { Button } from 'rinjani-ui'
```

2. Use it in your React component:

```tsx
function App() {
  return (
    <Button color="blue" variant="solid" size="md">
      Click me
    </Button>
  )
}
```

3. Import the CSS file in your main entry point:

```tsx
import 'rinjani-ui/style.css'
```

## Components

### Button

A versatile button component with multiple variants, colors, and sizes.

```tsx
import { Button } from 'rinjani-ui'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="outline">Outline</Button>
<Button variant="surface">Surface</Button>

// With colors
<Button color="red">Danger</Button>
<Button color="green">Success</Button>

// With icons
<Button startIcon={<PlusIcon />}>Add Item</Button>

// Loading state
<Button isLoading>Saving...</Button>
```

For more details, see the [Button documentation](./src/components/Button/README.md).

## Styling

Rinjani UI uses TailwindCSS classes internally. For existing projects, update your `postcss.config.js` to include Rinjani UI in the content paths:

```js
module.exports = {
  plugins: {
    tailwindcss: {
      content: [
        // ... your existing content
        "./node_modules/rinjani-ui/dist/**/*.{js,ts,jsx,tsx}",
      ],
    },
    autoprefixer: {},
  },
}
```

**Note:** Rinjani UI requires TailwindCSS v4.0.0 or higher. If you're using an older version, please upgrade to ensure compatibility.

## Development

### Running Storybook

To see all components in action:

```bash
npm run storybook
```

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [Documentation](https://github.com/mwaziat/rinjani-ui#readme)
- [Issues](https://github.com/mwaziat/rinjani-ui/issues)
- [Discussions](https://github.com/mwaziat/rinjani-ui/discussions)

---

Built with love by [mwaziat](https://github.com/mwaziat)