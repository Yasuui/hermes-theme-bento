@AGENTS.md

# hermes-theme-bento

Premium dark bento grid dashboard built with Next.js 16, Tailwind CSS v4, shadcn/ui v4.

## Architecture

- **app/** — Next.js App Router pages and layout
- **components/ui/** — shadcn/ui primitives (button, etc.)
- **components/islands/** — Island components (layout, sidebar, slideover, bento-card)
- **lib/** — Utilities and context (dashboard-context, utils)
- **types/** — TypeScript type definitions

## Bento Grid
- 3-column responsive grid using Tailwind grid
- Card variants: `default`, `wide` (col-span-2), `tall` (row-span-2), `featured` (both)
- Dark premium theme with near-black base (#0a0a0f) and warm gold accents (#c8a45c)

## Layout
- `Layout` component wraps all pages with Sidebar + Header + SlideOver
- Header has breadcrumbs, theme toggle dropdown, and user avatar
- Sidebar responsive: overlay on mobile, collapsible on desktop
- SlideOver panel has focus trapping, escape key close, and ARIA modal attributes

## State Management
- `DashboardContext` via React context + useReducer (in lib/dashboard-context.tsx)
- Global state: sidebar toggle, slideover content, active view, theme (dark/light/system)
- Theme persists to localStorage, listens for system preference changes

## Key Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint

## Tailwind v4 Rules
- NO `@apply` directives — use utility classes directly in JSX
- NO `@theme` outside the `@theme inline {}` block in globals.css
- Theme tokens: bg-primary, bg-secondary, bg-card, accent-gold, text-primary, text-secondary, text-muted, border-subtle
