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
- 4-column responsive grid using Tailwind grid (xl:grid-cols-4)
- Card variants: `default` (1col), `wide` (col-span-2), `tall` (row-span-2), `featured` (2col x 2row)
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

## Islands (components/islands/)
Each island is a self-contained component wrapping `BentoCard` with theme-aware styling.

| Island | Variant | Description |
|--------|---------|-------------|
| `profiles-island.tsx` | default | Profile selector with avatars, status indicators (online/offline/busy), quick switcher with arrow key navigation |
| `models-island.tsx` | tall | Model catalog with provider badges (OpenAI/Anthropic/Google/Meta), context length, pricing, favorite toggle |
| `skills-island.tsx` | featured | Skill grid with category filters (All/Coding/Writing/Research/Data), install status badges, keyboard nav |
| `logs-hud.tsx` | wide | Real-time log stream with level filtering (All/Info/Warn/Error/Debug), expandable details, auto-scroll |
| `mcp-island.tsx` | wide | MCP server status display with connection indicators, capability tags, expandable server details |

### Island Patterns
- All islands use `'use client'` directive
- Keyboard accessible: Tab/Enter/Escape/Arrow keys for navigation
- Include loading states (skeleton pulse animation) and empty states (icon + message)
- Focus visible ring: `focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none`
- Use theme CSS variables throughout (no hardcoded colors)
- Props interfaces exported for external data binding

## Key Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint

## Tailwind v4 Rules
- NO `@apply` directives — use utility classes directly in JSX
- NO `@theme` outside the `@theme inline {}` block in globals.css
- Theme tokens: bg-primary, bg-secondary, bg-card, accent-gold, text-primary, text-secondary, text-muted, border-subtle

## Recent Polish (T10)
- Staggered animations: BentoCard uses `animate-in fade-in` with `animationDelay: ${index * 60}ms`
- Focus management: `focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none` on all interactive elements
- Responsive padding: `p-3` on mobile (sm:), `p-4` on desktop
- Loading/empty/error states: all 5 islands have polished skeleton cards, centered empty icons, error alerts with role='alert'
- Mobile-first: grid stacks to single column on sm, expands to 2–4 columns on larger screens

## Accessibility (WCAG 2.1 AA)
- All islands: keyboard navigation (Tab, Arrow keys, Enter/Space, Escape)
- Focus traps on SlideOver panel
- ARIA labels, roles, and live region announcements
- Skip-to-content link at top of Layout
- Touch targets: min-h-10 min-w-10 throughout
