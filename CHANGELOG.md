# Changelog

All notable changes to the Bento Dashboard theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-05-14

### Added

- **Bento Grid Dashboard** — 4-column responsive CSS Grid layout with card variants:
  `default` (1×1), `wide` (2×1), `tall` (1×2), `featured` (2×2)
- **BentoCard component** — Reusable card wrapper with hover effects, gold accent line,
  staggered entry animations (`60ms * index`), and theme-aware styling
- **DashboardContext** — Global state via React Context + `useReducer` managing:
  sidebar toggle, slideover content, active view, and theme (dark/light/system)
- **Responsive Layout** — Mobile-first design with collapsible sidebar
  (overlay on mobile, static on desktop with collapse toggle)
- **Sidebar** — Navigation with 4 items (Overview, Analytics, Activity, Settings),
  active state indicators, mobile overlay backdrop, and keyboard navigation
- **SlideOver Panel** — Accessible modal with focus trapping, Escape key close,
  focus restoration, ARIA `dialog`/`modal` attributes, and backdrop overlay
- **Header** — Breadcrumbs, theme toggle dropdown (dark/light/system), and user avatar
- **Theme System** — Three modes with `localStorage` persistence,
  system preference listener (`matchMedia`), and CSS variable color tokens
- **Premier Dark Theme** — Near-black base (`#0a0a0f`), warm gold accents (`#c8a45c`),
  subtle border tokens, and gradient hover effects
- **Light Theme** — Clean light variant with matching color tokens

#### Islands

- **Profiles Island** — Profile selector with avatars, status indicators
  (online/offline/busy), arrow key navigation, loading skeleton, and empty state
- **Models Island** — AI model catalog with provider badges (OpenAI/Anthropic/Google/Meta),
  context length, pricing, favorite toggle, keyboard navigation, and loading/empty states
- **Skills Island** — Skill grid with category filters (All/Coding/Writing/Research/Data),
  install status badges, 2-column responsive grid, keyboard navigation, error state,
  and loading skeleton
- **Logs HUD** — Real-time log stream with level filtering (All/Info/Warn/Error/Debug),
  expandable metadata details, auto-scroll, Escape to collapse all,
  and loading/empty states
- **MCP Island** — MCP server status display with connection indicators
  (connected/disconnected/connecting), type badges (local/cloud/database),
  capability tags with semantic colors, expandable server details,
  loading skeleton, and empty state with CTA

#### Accessibility

- Skip-to-content link (visually hidden, first tab stop)
- ARIA roles throughout: `listbox`, `tablist`, `option`, `dialog`, `alert`,
  `listitem`, `navigation`, `breadcrumb`
- Focus-visible ring on all interactive elements (`focus-visible:ring-accent-gold`)
- Keyboard navigation in all islands with arrow keys, tab trapping, and Escape
- Theme toggle respects `prefers-color-scheme`
- WCAG 2.1 AA color contrast across all text and interactive elements

#### Infrastructure

- Next.js 16.2.6 with App Router
- Tailwind CSS v4 with `@theme inline` tokens
- TypeScript 5 with strict mode
- ESLint 9 + Prettier configuration
- shadcn/ui v4 base primitives (Button)
- Lucide React v1.16 icons
- Geist font via `next/font`
- Responsive grid: 1-col (mobile) → 2-col (sm) → 3-col (lg) → 4-col (xl)
