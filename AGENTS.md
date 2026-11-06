# VrajOS — Agent Notes

## Documentation source: Context7

Context7 MCP is verified working in this workspace (resolved + queried 2026-11-06).
Use it for any library-, framework-, SDK-, API-, or CLI-dependent work before
writing code. Do not rely on memory for API signatures or setup steps.

Pinned library IDs for this project:

| Library        | Context7 ID                        | Notes |
| -------------- | ---------------------------------- | ----- |
| React          | `/reactjs/react.dev`               | Official docs. React 19 (createRoot, hooks). |
| TypeScript     | `/microsoft/typescript-website`    | Official handbook/tsconfig reference. |
| Vite           | `/vitejs/vite`                     | Official repo docs (config, env, build). |
| Tailwind CSS   | `/tailwindlabs/tailwindcss.com`    | v4 CSS-first docs (`@theme`, `@custom-variant`). |

Workflow: `resolve-library-id` (when the ID above does not cover the library or a
version matters) → `query-docs` with one concept per call → implement to match the
retrieved syntax.

## Stack baseline (from Context7)

- **React**: single `createRoot` at startup, strict-mode safe effects with cleanup,
  `useTransition` for non-blocking updates.
- **TypeScript**: `"moduleResolution": "bundler"`, `"noEmit": true`,
  `"verbatimModuleSyntax": true`, `"jsx": "react-jsx"`, `"strict": true`.
- **Vite**: `defineConfig`, `loadEnv(mode, process.cwd(), '')` for env in config,
  `import.meta.env` typed in `src/vite-env.d.ts` (no imports in that file).
- **Tailwind v4**: `@tailwindcss/vite` plugin + `@import "tailwindcss";`,
  design tokens via `@theme`, dark mode via `@custom-variant dark`.
