# hermes-theme-bento — Project Tracker

**Goal:** Build a production-ready, open source Bento Grid dashboard theme for the Hermes Agent community. Clean design, excellent accessibility, and proper OSS practices.

**Quality Standards:**
- Clean, premium dark UI with gold accents
- WCAG 2.1 AA accessibility minimum
- Proper open source structure (README, LICENSE, CONTRIBUTING)
- TypeScript strict mode, well-documented APIs
- Secure, maintainable, community-friendly codebase

**Current Phase:** T7 — Project Reset & Final Architecture
**Status:** Scaffold complete. Builder resuming architecture work (theme tokens, DashboardContext, CLAUDE.md setup).

---

## Kanban Pipeline

| Task | Title | Assignee | Status | Dependencies |
|------|-------|----------|--------|-------------|
| T7 | Project Reset & Final Architecture | builder | ready | — |
| T8 | Core Layout, DashboardContext & SlideOver | builder | todo | T7 |
| T9 | Build the 5 UI Islands | builder | todo | T8 |
| T10 | Design Polish, Accessibility & Visual QA | builder | todo | T9 |
| T11 | Documentation, README & Open Source Standards | builder | todo | T10 |
| T12 | Final Review, Security & Release Prep | reviewer | todo | T11 |

**Chain:** T7 → T8 → T9 → T10 → T11 → T12

---

## Tech Stack
- **Framework:** Next.js 16.2.6 (App Router)
- **React:** 19.2.4
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Language:** TypeScript 5 (strict mode)
- **Linting:** ESLint 9 + `eslint-config-next`
- **Package Manager:** npm
- **Git:** Initialized with `.gitignore`

## Architecture Overview (Target)

```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Dashboard with Bento Grid
├── globals.css             # Theme tokens + Tailwind
components/
├── ui/                     # shadcn/ui primitives
├── islands/                # The 5 functional islands
│   ├── ProfilesIsland.tsx
│   ├── ModelsIsland.tsx
│   ├── SkillsIsland.tsx
│   ├── LogsIsland.tsx
│   └── McpIsland.tsx
├── layout/                 # Shell components
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── SlideOver.tsx
└── providers/
    └── DashboardContext.tsx
lib/
├── utils.ts
└── constants.ts
types/
└── index.ts
```

## Rules
1. **Hermes orchestrates → Claude Code builds.** The builder delegates all component coding to Claude Code in print mode (`claude -p`).
2. **Builder focuses on:** architecture decisions, code review, integration, git commits.
3. **Work in stages.** Commit and push after each task. No long-running uncommitted work.
4. **Context efficiency.** Load only files needed for the current sub-task.
5. **Accessibility first.** WCAG 2.1 AA from day one, not bolted on later.

---

## Community Context

This project is being built as a reference implementation for the Hermes Agent ecosystem. It should demonstrate:
- How to build a premium React dashboard with Hermes + Claude Code
- Proper multi-agent delegation (Chief plans → Builder executes via Claude Code)
- Clean TypeScript patterns for UI components
- Open source best practices for AI-assisted projects

