<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Public documentation and release notes

- The public documentation currently targets Rinjani UI `v1.0.1`. Keep the version in `src/app/rinjani/getting-started/changelog/changelog.ts` as the single source for the documentation release version.
- Keep changelog releases in descending order: `Unreleased` first, then the newest published release, then older releases.
- Do not invent release versions or dates. Keep a release marked `Unreleased` until the public release is actually published.
- Write release notes for users, not raw Git output. Summarize technical commits into clear English and group entries under `Added`, `Changed`, or `Fixed`.
- When publishing, align the root package version, changelog version and date, Git tag, npm version, and deployed documentation version.
- Add a new release entry instead of rewriting older release notes. Preserve published history once it is public.

## Component documentation

- Keep the canonical component documentation beside the component in `src/components/<Component>/index.en-US.md`.
- Structure each public component document as: purpose, when to use, examples, API, and FAQ.
- Keep the docs route aligned with that order: `When to use`, `Examples`, `API`, and `FAQ`.
- Store page demos, code snippets, and prop metadata outside the route page in `examples/nextjs/src/content/components/<component>/demos.tsx`, `codes.ts`, and `props.ts`.
- API tables must describe the public component props, their types, defaults, and behavior. Mention inherited native HTML props separately instead of duplicating the whole DOM API.
- Icon-only examples must include an accessible `aria-label`, and examples should use the same defaults and naming as the component implementation.
