<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Next.js App Router project under `src/app`. The home page is still an empty stub; `public/images` already holds the design assets. UI primitives are shadcn/ui on Base UI, styled with Tailwind v4.

## Commands

- `npm run dev` — Turbopack dev server on http://localhost:3000. A server may already be running: `.next/dev/lock` records its pid/port, so reuse it instead of starting another.
- `npm run build` — production build; the final verification step.
- `npm run lint` — runs bare `eslint` over the repo. To check one file: `npx eslint src/app/page.tsx`.
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script.
- No tests, test runner, or CI exist. Don't invent test commands.

## Framework gotchas (from `next.config.ts`)

- `cacheComponents` and `partialPrefetching` are enabled. Legacy route segment configs (`dynamic`, `revalidate`, `fetchCache`, `dynamicParams`, `runtime`) are removed — don't export them. Cache with `"use cache"` plus `cacheLife()` from `next/cache`; wrap uncached/runtime data in `<Suspense>`. See `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`.
- With Partial Prefetching, `<Link>` prefetches the route's shared App Shell rather than per-link pages. For instant navigations, URL data (`params`/`searchParams`) must sit behind `<Suspense>`; see `node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md`.
- `reactCompiler` is enabled: components are auto-memoized and must stay pure with unconditional hooks. Don't add `useMemo`/`useCallback` by reflex.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme tokens live in `src/app/globals.css` (`@theme inline`, `:root`, `.dark`). The `@tailwindcss/turbopack` loader is wired in `next.config.ts`.
- Route prop types are generated globals: use `PageProps<'/route'>` / `LayoutProps<'/'>` instead of hand-writing `params`/`searchParams` types. `next-env.d.ts` is generated and gitignored — don't edit it; rerun dev/build if route types are stale.

## shadcn/ui

- Style is `base-nova`, built on **Base UI** (`@base-ui/react`), not Radix. Compose with `render={<Component />}`; there is no `asChild`.
- Import `cn` from the `cn` package (`import { cn } from "cn"`), matching `src/components/ui/*`. `@/lib/utils` only re-exports it; `cn` replaces `clsx` + `tailwind-merge`, so don't add those.
- Add or refresh primitives with `npx shadcn add <name>`; aliases in `components.json` put them in `src/components/ui`.
- `shadcn` is a runtime dependency because `src/app/globals.css` imports `shadcn/tailwind.css`; don't uninstall it as a CLI-only tool.

## Layout

- `src/app` — routes, root layout, global styles
- `src/components/ui` — shadcn primitives, imported by path (no barrel file)
- `src/lib` — utilities
- `public/images` — supplied design assets
