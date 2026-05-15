# Hermes Theme Bento — Premium AI Dashboard for Hermes Agent

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

**A premium, open-source dashboard theme built for the Hermes Agent community.**

[Quick Start](#-quick-start) · [Architecture](./ARCHITECTURE.md) · [Contributing](./CONTRIBUTING.md) · [Changelog](./CHANGELOG.md)

</div>

---

Hermes Theme Bento is a reference dashboard UI for agents built on the Hermes ecosystem. It brings together five interactive islands — Profiles, Models, Skills, Logs HUD, and MCP — into a cohesive bento grid layout that looks great out of the box and is built to be extended. Whether you're building a personal agent interface or exploring what a production Hermes setup might look like, this is a solid starting point.

---

## ✨ Key Features

- **5 functional UI Islands** — Profiles selector, Models catalog, Skills browser, real-time Logs HUD, and MCP server status, each self-contained and ready to wire up to real data
- **Premium dark theme** — Near-black base (`#0a0a0f`) with warm gold accents (`#c8a45c`), plus full light and system theme support with localStorage persistence
- **Full keyboard accessibility** — WCAG 2.1 AA compliant; every island supports Tab, Arrow key, Enter/Space, and Escape navigation with visible focus rings throughout
- **Responsive and mobile-first** — Collapsible sidebar, adaptive bento grid (1–4 columns), and a focus-trapped SlideOver panel that works seamlessly on any screen size
- **Built with Next.js 15, React 19, and Tailwind CSS v4** — Modern stack, App Router, no legacy patterns
- **Component-driven architecture** — Islands wrap a shared `BentoCard` primitive and export typed Props interfaces, making them easy to drop into any React app

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/NousResearch/hermes-theme-bento.git
cd hermes-theme-bento

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you'll see the dashboard running locally.

---

## 📖 Using with Hermes

This dashboard is designed as a **reference UI for Hermes agents** — a visual layer you can adapt for your own agent projects. It doesn't ship with a backend, but each island is wired to accept real data via props.

**Connecting your agent context:**

The `DashboardContext` (in `lib/dashboard-context.tsx`) manages global state via `useReducer`. You can dispatch actions from anywhere to update the active profile, selected model, or open the SlideOver with dynamic content.

```tsx
import { useDashboard } from '@/lib/dashboard-context';

const { dispatch } = useDashboard();

// Switch the active Hermes profile
dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'models' });
```

**Wiring islands to live data:**

Each island exports its Props interface, so you can pass in your own profiles, model lists, skill registries, or log streams:

```tsx
import ProfilesIsland from '@/components/islands/profiles-island';

<ProfilesIsland
  profiles={myHermesProfiles}
  onProfileChange={(p) => agent.switchProfile(p.id)}
/>
```

**Skills integration:** The Skills island accepts a `skills` prop with category metadata. Map your Hermes skill registry directly to the `Skill[]` type in `types/index.ts`.

For more on the Hermes ecosystem, refer to the [Hermes documentation](https://github.com/NousResearch/hermes-agent).

---

## 🏗️ Local Development

```bash
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

**File structure at a glance:**

```
app/                        # Next.js App Router pages and root layout
components/
  islands/                  # The 5 dashboard islands + shared BentoCard
    bento-card.tsx          # Reusable card wrapper (variant: default/wide/tall/featured)
    layout.tsx              # Shell: header, sidebar, SlideOver
    profiles-island.tsx
    models-island.tsx
    skills-island.tsx
    logs-hud.tsx
    mcp-island.tsx
  ui/                       # shadcn/ui primitives (button, etc.)
lib/
  dashboard-context.tsx     # Global state (useReducer + Context)
  utils.ts                  # Utility functions
types/
  index.ts                  # TypeScript definitions for all island data shapes
```

---

## 🎨 Design Philosophy

**Premium dark aesthetic.** The theme is built around a near-black background (`#0a0a0f`) with warm gold accents (`#c8a45c`) that give it a refined, intentional look — not just "dark mode." Light theme and system preference are supported as first-class options.

**Accessibility first.** Every interactive element has a visible focus ring, ARIA roles, and keyboard support. The SlideOver traps focus correctly and restores it on close. Screen reader announcements are in place for dynamic content. This isn't bolted on — it's part of the grid from the start.

**Component-driven islands.** Each island is fully self-contained, wraps the same `BentoCard` base, and exports typed Props. You can take one island, drop it into a different project, and it works. No hidden global dependencies.

---

## 📝 Contributing

Contributions are welcome and appreciated. Please read the [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) before opening a PR.

We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```
feat: add theme analyzer island
fix: correct sidebar z-index on mobile
docs: clarify Hermes integration example
```

When in doubt about code style, run `npm run lint` — ESLint will catch most things. Keep islands self-contained and avoid adding abstractions that aren't needed for the immediate task.

---

## 📄 License

[MIT](./LICENSE) © Nous Research
