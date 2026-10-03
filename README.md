# Rinjani UI

[![npm version](https://badge.fury.io/js/rinjani-ui.svg)](https://badge.fury.io/js/rinjani-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, customizable UI component library built with React and TailwindCSS v4. Designed for developers who want beautiful, accessible, and flexible UI components.

## Features

- Built with React 18+ and TypeScript
- Powered by native **TailwindCSS v4** for styling
- A growing collection of **18+ production-ready components** (Forms, Buttons, Modals, Tabs, etc.)
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

For a Tailwind CSS v4 application, also install the PostCSS integration if your framework does not already provide it:

```bash
npm install -D tailwindcss @tailwindcss/postcss
```

> **Important:** Rinjani UI is not a runtime CSS system. Its React components use Tailwind utility classes, so those classes must be compiled by a Tailwind pipeline. The application should own that pipeline.

## Quick Start

There are two supported modes. Choose one mode for an application; do not combine them.

### Mode A: Integrate with the application's Tailwind pipeline (recommended)

Use this mode when the application already uses Tailwind CSS. Tailwind should be imported exactly once by the application.

For a Next.js application with `src/app/globals.css`:

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "rinjani-ui/theme.css";
```


`rinjani-ui/theme.css` provides the default Rinjani color tokens and the precompiled utility classes used by Rinjani components. The application does not need to reference `node_modules` or calculate a relative `@source` path.

Your application's own Tailwind compiler still processes its source files and any additional classes used in your application. Rinjani's internal utility classes are already included in `theme.css`, so they do not depend on the consuming application's source scan.

You only need to add an application-level `@theme` block when you want to override or extend the defaults. You do not need to copy the complete Rinjani palette into your application.

Then import only the application's global stylesheet in the Next.js layout:

```tsx
import "./globals.css";
import { DialogContainer, ToastContainer } from "rinjani-ui";
```

If you use dialogs or toasts, mount their containers once inside the layout, usually below `{children}`:

```tsx
<body>
  {children}
  <DialogContainer />
  <ToastContainer />
</body>
```

Do **not** also add `import "rinjani-ui/style.css"` in this mode. Use `import "rinjani-ui/theme.css"` for the default tokens. Do not put `@import "tailwindcss"` in multiple global CSS files either; merge the files or keep one Tailwind entry point and place additional `@theme`/custom CSS below it.

### Mode B: Standalone Rinjani stylesheet

Use this mode only when the application does not run its own Tailwind compiler. Import the package stylesheet once:

```tsx
import "rinjani-ui/style.css";
```

Do not import `tailwindcss` separately in this mode. This stylesheet is self-contained for Rinjani components, but it is not the right integration mode when the application also needs to compile its own Tailwind utility classes.

### Import and use a component

```tsx
import { Button } from "rinjani-ui"

function App() {
  return (
    <Button color="primary" variant="filled" size="md">
      Click me
    </Button>
  )
}
```

### Why styles can conflict

`rinjani-ui/style.css` contains a standalone Tailwind theme/utilities pipeline and Rinjani's default theme tokens. Importing it together with the application's own `@import "tailwindcss"` runs overlapping global CSS layers more than once. This can cause Preflight resets, theme variables, utility order, or color tokens to override each other. In an existing Tailwind application, import `rinjani-ui/theme.css` instead; it contains the default tokens and precompiled Rinjani utilities without adding a second Preflight/base reset. Rinjani components are not isolated in a CSS shadow root and do not have a separate CSS lifecycle.

The React containers (`DialogContainer` and `ToastContainer`) do have their own client-side React lifecycle, but their visual styles still come from the application's Tailwind build in Mode A.
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
- **Forms**: Comprehensive, accessible form inputs including `InputField`, `Select`, `Autocomplete`, `Checkbox`, `Radio`, `Switch`, and `MultiTagInput`.

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

### DataTable sorting

Sorting is optional. Mark only the columns that may be sorted with `sortable: true`, then provide a `sorting` configuration. A sort value is an array so multiple columns can be sorted together. The first item has the highest priority. Multiple sorting is enabled by default; use `multiple: false` when only one column may be active.

```tsx
import { DataTable } from 'rinjani-ui'

const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
    sortable: true,
  },
  {
    header: 'Created',
    accessorKey: 'createdAt',
    sortable: true,
    // Optional backend/database field name.
    sortKey: 'created_at',
    type: 'date',
  },
]

<DataTable
  data={users}
  columns={columns}
  sorting={{
    mode: 'local',
    defaultState: [
      { key: 'name', direction: 'asc' },
      { key: 'created_at', direction: 'desc' },
    ],
  }}
/>
```

Click another sortable column header to add it as a secondary sort. The cycle for each column is `asc → desc → none`. With `multiple: false`, clicking another column replaces the current sort.

For API/database sorting, use controlled state and `mode: 'server'`. Rinjani UI does not call the API itself; it reports the requested sort order to the parent component.

```tsx
import { useState } from 'react'
import type { SortState } from 'rinjani-ui'

const [sortState, setSortState] = useState<SortState[]>([])

<DataTable
  data={users}
  columns={columns}
  sorting={{
    mode: 'server',
    state: sortState,
    onSortChange: (nextSort) => {
      setSortState(nextSort)
      // Fetch again using nextSort, for example:
      // GET /users?sort[0][key]=created_at&sort[0][direction]=desc
    },
  }}
/>
```

The same `sorting` API is available on `EditDataTable`. Local sorting preserves edited rows by their `rowKey`; server sorting lets the parent fetch a new ordered page. When pagination is server-controlled, reset the page to `1` when the sort state changes.

## Theming & Customization

The default Rinjani palette is provided by `rinjani-ui/theme.css`; consumers do not need to copy the full palette or register a `node_modules` path. Import it once in the application stylesheet, then override only the tokens that need to be different.
```css
@import "tailwindcss";
@import "rinjani-ui/theme.css";

@theme {
  --color-primary-500: #0d9488;
  --color-primary-600: #0f766e;
  --color-primary-700: #115e59;
}
```

The application-level theme block is optional. Any token you define there overrides the corresponding Rinjani default while all other defaults remain available.

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
