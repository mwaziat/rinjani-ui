import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/index.css'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: !options.watch,
  minify: !options.watch,
  banner: {
    js: '"use client";',
  },
}));
