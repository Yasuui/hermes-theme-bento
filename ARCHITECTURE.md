# Architecture

## Overview

Bento Dashboard is a **React single-page application** built on Next.js 16's App Router with a client-side state management pattern. It uses a modular "island" architecture where each UI section is a self-contained component that wraps a shared `BentoCard` primitive.

## Design Decisions

### 1. Client-Side Rendering (CSR)

All components use the `'use client'` directive. The dashboard is rendered entirely client-side because:

- **Interactive state** — Theme toggling, sidebar collapse, slideover panels, filter selections, keyboard navigation
- **DOM manipulation** — Focus trapping, scroll management, localStorage persistence
- **Performance** — The dashboard is a UI shell, not a content-heavy page; CSR eliminates the server render cost

### 2. State Management: Context + useReducer

We chose React Context with `useReducer` over external state libraries (Zustand, Redux) because:

- **Small surface area** — Only 6 action types: TOGGLE_SIDEBAR, SET_SIDEBAR, OPEN_SLIDEOVER, CLOSE_SLIDEOVER, SET_VIEW, SET_THEME
- **Colocated** — The reducer and context live in a single file (`lib/dashboard-context.tsx`) with zero boilerplate
- **No external deps** — Avoids adding a state management library for this scale

**Trade-off:** Context re-renders all consumers on any state change. For this dashboard's scope (single page, ~8 components consuming context), the performance cost is negligible. If the app grows beyond ~50 consumers, consider splitting context or adopting Zustand.

### 3. Bento Grid (CSS Grid)

The bento layout uses **Tailwind's responsive grid utilities** rather than a custom grid library:

```tsx
// 4-column desktop → 1-column mobile
className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
```

Card variants are handled via CSS classes, not JavaScript:

| Variant | Classes |
|---------|---------|
| `default` | `col-span-1 row-span-1` |
| `wide` | `col-span-1 sm:col-span-2 row-span-1` |
| `tall` | `col-span-1 row-span-1 sm:row-span-2` |
| `featured` | `col-span-1 sm:col-span-2 row-span-1 sm:row-span-2` |

**Why CSS Grid over Masonry?** CSS Grid gives us deterministic card placement that works with the island pattern. True masonry would require absolute positioning or a JS library, adding complexity without visual benefit for our 4-column layout.

### 4. Tailwind CSS v4 — No @apply

We follow Tailwind v4's recommendation: **no `@apply` directives** — all styles are utility classes in JSX. This keeps the CSS bundle lean and makes component styles visible at the usage site. Theme tokens are defined in `@theme inline {}` in `globals.css`:

```css
@theme inline {
  --color-bg-primary: #0a0a0f;
  --color-bg-card: #12121a;
  --color-accent-gold: #c8a45c;
  /* ... */
}
```

### 5. Accessibility-First Design

Every interactive component follows WCAG 2.1 AA:

- **Skip-to-content link** — First tab stop on the page
- **ARIA roles** — `role="listbox"`, `role="tablist"`, `role="dialog"`, `aria-modal`, `aria-expanded`, etc.
- **Focus management** — SlideOver traps focus and restores it on close
- **Keyboard navigation** — Arrow keys for list navigation, Escape to close/modals
- **Color contrast** — All text meets 4.5:1 ratio against backgrounds
- **Reduced motion** — Animations respect `prefers-reduced-motion`

### 6. Theme System

The theme system supports three modes: `dark`, `light`, and `system` (follows OS preference).

- Theme is persisted to `localStorage` (`bento-theme` key)
- On mount, saved theme is restored
- In `system` mode, a `matchMedia` listener applies light/dark dynamically
- Theme class is applied to `<html>` (`.dark` or `.light` base class)
- CSS variables in each theme class control all component colors

## Component Tree

```
<html>
  <DashboardProvider>                    [Context + useReducer]
    <body>
      <Layout>                           [Shell component]
        ├── <Sidebar>                    [Responsive nav]
        │   ├── Logo
        │   ├── Nav Items (4)
        │   └── Collapse Toggle
        ├── <main>
        │   ├── <Header>
        │   │   ├── Breadcrumbs
        │   │   ├── ThemeToggle (dropdown)
        │   │   └── Avatar
        │   └── Bento Grid
        │       ├── <BentoCard> x N
        │       ├── <ProfilesIsland>
        │       ├── <ModelsIsland>
        │       ├── <SkillsIsland>
        │       ├── <LogsHud>
        │       └── <McpIsland>
        └── <Slideover>                  [Modal panel]
```

## Data Flow

```
DashboardProvider (useReducer)
    │
    ├── state.sidebarOpen  ────── Sidebar
    ├── state.slideover   ────── Slideover
    ├── state.activeView  ────── Layout (breadcrumbs) + Sidebar
    ├── state.theme       ────── Layout (ThemeToggle) + <html>
    │
    └── Actions:
        ├── TOGGLE_SIDEBAR / SET_SIDEBAR
        ├── OPEN_SLIDEOVER / CLOSE_SLIDEOVER
        ├── SET_VIEW
        └── SET_THEME
```

## Island Component Pattern

Every island follows the same internal structure:

1. **Props interface** — Exported for external data binding
2. **Default sample data** — Self-contained demo data for standalone preview
3. **Loading state** — Skeleton animation (pulse effect)
4. **Empty state** — Icon + message + optional CTA
5. **Error state** — Warning icon + error message (where applicable)
6. **Keyboard navigation** — Arrow keys, Tab, Enter, Escape
7. **Main render** — Data-driven content wrapped in `BentoCard`

## Future Considerations

- **Server Components** — Non-interactive islands (stat cards) could be Server Components for smaller JS bundles
- **Suspense Boundaries** — Each island could be a Suspense boundary for streaming/loading
- **URL-based routing** — Active view state could sync to URL search params
- **Animation library** — Framer Motion for richer transitions if interaction complexity grows
