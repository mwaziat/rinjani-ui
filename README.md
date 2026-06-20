# Rinjani UI

[![npm version](https://badge.fury.io/js/rinjani-ui.svg)](https://badge.fury.io/js/rinjani-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, customizable UI component library built with React and TailwindCSS v4. Designed for developers who want beautiful, accessible, and flexible UI components.

## Features

- Built with React 18+ and TypeScript
- Powered by native **TailwindCSS v4** for styling
- A growing collection of **12+ production-ready components** (Buttons, Badges, Tabs, Dialogs, etc.)
- Tree-shakable and optimized for performance
- Accessible components following WCAG guidelines
- Highly customizable using modern `@theme` CSS variables
- **Icon Agnostic**: Bring your own icons! (We highly recommend `lucide-react` or `react-icons`)
- Comprehensive documentation with Storybook

## Philosophy

Rinjani UI was born out of a desire for extreme performance and simplicity. While there are many incredible, feature-rich UI libraries in the ecosystem (which we deeply respect and draw inspiration from), pairing them with modern, server-first frameworks can sometimes lead to heavier bundle sizes or complex runtime CSS overhead.

Our core philosophy is to **minimize dependencies and maximize performance**. 
By building components strictly with pure **React** and native **Tailwind CSS**, we eliminate the need for heavy CSS-in-JS engines or massive library footprints. While complex components may occasionally require tiny, specialized utilities, our commitment remains to keep Rinjani UI as lightweight, transparent, and blazing fast as possible.

## Installation

You can install Rinjani UI using npm, yarn, or pnpm.

```bash
npm install rinjani-ui
```

Make sure you have these peer dependencies installed:
- `react: ^18.0.0 || ^19.0.0`
- `react-dom: ^18.0.0 || ^19.0.0`
- `tailwindcss: >=4.0.0`
- `@tailwindcss/postcss: >=4.0.0`

## Quick Start

The most efficient way to use Rinjani UI is to let your project's Tailwind compiler automatically detect the components.

1. **Automatic Method (Recommended):**
   Tell your Tailwind to scan Rinjani UI components so the styles merge perfectly with your app.

   **For Tailwind v4:**
   Add this to your main CSS file:
   ```css
   @import "tailwindcss";
   @source "../node_modules/rinjani-ui";
   ```

   **For Tailwind v3:**
   Add this to your `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: [
       // ... your other paths
       "./node_modules/rinjani-ui/dist/**/*.{js,mjs,cjs}",
     ],
   }
   ```

2. **Fallback Method (Optional):**
   If the styles don't seem to apply, or if you are not using Tailwind CSS in your project, you can simply import our pre-compiled CSS in your root file (e.g., `main.tsx` or `layout.tsx`):

   ```tsx
   import 'rinjani-ui/dist/index.css'
   ```

3. Import the component you need and use it:

```tsx
import { Button } from 'rinjani-ui'

function App() {
  return (
    <Button color="primary" variant="filled" size="md">
      Click me
    </Button>
  )
}
```

## Available Components

Rinjani UI has grown from a simple Button library into a comprehensive UI kit. Here are the components currently available:

- **Button & IconButton**: Versatile buttons with multiple variants, colors, and sizes.
- **Badge**: Tiny labels for numbers or statuses.
- **Tooltip**: Helpful popovers for extra context.
- **Alert**: Banners for important messages.
- **Toast**: Unobtrusive notifications.
- **Tabs**: Tabbed interfaces with support for icons and various alignments.
- **Dialog & Modal**: Accessible overlays for critical actions.
- **Drawer**: Slide-out panels for navigation or forms.
- **Dropdown**: Floating menus for actions or selections.
- **Breadcrumb**: Navigation trails for deep architectures.
- **Lightbox**: Beautiful image galleries and carousels.

## Component Examples

### Button

```tsx
import { Button } from 'rinjani-ui'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="outlined">Outline</Button>
<Button variant="soft">Soft</Button>

// With colors
<Button color="danger">Danger</Button>
<Button color="success">Success</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Loading state
<Button isLoading>Saving...</Button>
```

## Theming & Customization

Rinjani UI is built fully upon **TailwindCSS v4** architecture. This means you don't need a bulky `tailwind.config.js` to override styles.

You can easily customize and manipulate the color themes by defining a `@theme` block in your main CSS file (where you import Tailwind).

Here is the exact structure you need to use to override Rinjani UI's default color palette:

```css
@import "tailwindcss";

@theme {
  /* Primary Colors */
  --color-primary-50: #f6faf2;
  --color-primary-100: #ebf5e3;
  --color-primary-200: #d8ebca;
  --color-primary-300: #b9db9f;
  --color-primary-400: #93c56b;
  --color-primary-500: #6cb33f;
  --color-primary-600: #55912f;
  --color-primary-700: #427028;
  --color-primary-800: #375924;
  --color-primary-900: #304d22;
  --color-primary-950: #172b0f;

  /* Secondary Colors */
  --color-secondary-50: #f1f7fd;
  --color-secondary-100: #e0eef9;
  --color-secondary-200: #badcf2;
  --color-secondary-300: #7ebce7;
  --color-secondary-400: #389ad6;
  --color-secondary-500: #005daa;
  --color-secondary-600: #006eb5;
  --color-secondary-700: #005893;
  --color-secondary-800: #044b7a;
  --color-secondary-900: #093f66;
  --color-secondary-950: #062844;

  /* Success Colors */
  --color-success-50: #ecfdf5;
  --color-success-100: #d1fae5;
  --color-success-200: #a7f3d0;
  --color-success-300: #6ee7b7;
  --color-success-400: #34d399;
  --color-success-500: #10b981;
  --color-success-600: #059669;
  --color-success-700: #047857;
  --color-success-800: #065f46;
  --color-success-900: #064e3b;

  /* Warning Colors */
  --color-warning-50: #fffbeb;
  --color-warning-100: #fef3c7;
  --color-warning-200: #fde68a;
  --color-warning-300: #fcd34d;
  --color-warning-400: #fbbf24;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  --color-warning-700: #b45309;
  --color-warning-800: #92400e;
  --color-warning-900: #78350f;

  /* Danger Colors */
  --color-danger-50: #fef2f2;
  --color-danger-100: #fee2e2;
  --color-danger-200: #fecaca;
  --color-danger-300: #fca5a5;
  --color-danger-400: #f87171;
  --color-danger-500: #ef4444;
  --color-danger-600: #dc2626;
  --color-danger-700: #b91c1c;
  --color-danger-800: #991b1b;
  --color-danger-900: #7f1d1d;

  /* Info Colors */
  --color-info-50: #f0f9ff;
  --color-info-100: #e0f2fe;
  --color-info-200: #bae6fd;
  --color-info-300: #7dd3fc;
  --color-info-400: #38bdf8;
  --color-info-500: #0ea5e9;
  --color-info-600: #0284c7;
  --color-info-700: #0369a1;
  --color-info-800: #075985;
  --color-info-900: #0c4a6e;

  /* Neutral Colors */
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #020617;
}
```

Simply replace the hex codes above with your own brand colors, and all Rinjani UI components (Buttons, Badges, Tabs, etc.) will automatically adapt to your new theme!

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

## Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Rinjani UI stands on the shoulders of giants. We would like to express our deep gratitude to the following projects and their creators:

- **[Material UI](https://mui.com/) & [Ant Design](https://ant.design/)**: Their robust component architecture, design principles, and comprehensive API designs served as the primary inspiration for many of the UI structures found in this library.
- **[Toastr](https://github.com/CodeSeven/toastr) & [SweetAlert](https://sweetalert2.github.io/)**: Their iconic approach to user feedback, notifications, and interactive alerts deeply inspired our implementation of the Toast, Alert, and Dialog components.
- **[Yet Another React Lightbox](https://yet-another-react-lightbox.com/)**: Our Lightbox component was heavily inspired by their brilliant and performant implementation of image galleries in React.

## Support

- [Documentation](https://github.com/mwaziat/rinjani-ui#readme)
- [Issues](https://github.com/mwaziat/rinjani-ui/issues)

---

Built with love by [mwaziat](https://github.com/mwaziat)