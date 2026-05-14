# CLAUDE.md — Focused Instructions for Claude Code

> **This file is automatically read by Claude Code at the start of every session.**
> It provides tactical, project-specific guidance so you can work with maximum focus and minimal distraction.
> Keep this file concise. Update it when patterns stabilize.

## Project Snapshot
- **Name:** hermes-theme-bento
- **Goal:** Tier-3 Bento Grid dashboard theme for Hermes-agent (schema v18289)
- **Stack:** React + TypeScript + Tailwind CSS v4 (@theme directive) + @hermes/dashboard-data-schema
- **Key Constraint:** Strict 4-column asymmetric grid. **Never break the grid** on any edit.
- **Edit Pattern:** All modifications happen in SlideOver / modal. View state stays on the cards.

## Core Rules (Non-Negotiable)
- Always start by reading the relevant sections of `LLM.md` for architecture, grid spans, and island specs.
- Use the existing `DashboardContext` for all shared state.
- Tailwind v4 first. Prefer utilities and `@theme` tokens over custom CSS.
- TypeScript strict. Prefer small, focused components.
- Minimal dependencies. Justify any new package.
- Accessibility & keyboard support where it makes sense for dashboard islands.
- **Visual QA is mandatory** after layout or styling changes: open browser, check grid integrity, spacing, no overlaps, crisp corners.

## When Working on This Codebase
1. **Understand first** — Re-read the island specs and grid rules in LLM.md before editing any component.
2. **Plan the change** — Think in terms of the 5 islands + SlideOver. Describe the minimal diff needed.
3. **Implement cleanly** — Follow existing patterns. Use context for data.
4. **Verify visually** — Start dev server if needed, inspect in browser via computer-use. Confirm the 4-col grid remains perfect.
5. **Commit discipline** — Use conventional commit messages. Push frequently when working autonomously.

## Common Commands (once scaffolded)
- `npm run dev` — Start the preview server
- `npm run build` — Production build check
- `npm run typecheck` or `tsc --noEmit` — Type safety

(These will be updated as the project evolves. Use `/init` or ask if unsure.)

## What to Avoid
- Expanding cards or breaking the Bento grid layout
- Adding heavy dependencies without strong justification
- Assuming data shapes — always reference the schema via imports from `@hermes/dashboard-data-schema`
- Long inline styles or fighting Tailwind v4

## SlideOver & Edit Flow
- Trigger SlideOver from any island for edits.
- Make the sheet feel native and calm (good animation, clear save/cancel, focus management).
- On successful save, update context and close cleanly.

## For Hermes-Agent Orchestration
- When Hermes delegates coding work to you (Claude Code), treat this file + LLM.md as your combined context.
- Focus on one island or one clear task per step when possible.
- Report progress clearly and push commits often.

## Style & Quality Bar
- Code should feel premium and calm, matching the Bento philosophy.
- Clean, readable, well-typed.
- Production-ready from the first commit that touches UI.

If something is unclear, re-read LLM.md sections on the specific island or grid rules before proceeding. Ask for clarification only when truly blocked.

**Stay focused. Respect the grid. Deliver calm, high-quality components.**