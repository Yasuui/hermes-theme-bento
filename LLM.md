# hermes-theme-bento: Project Intelligence (Living Spec)

> **For Hermes Chief Architect, Claude Sonnet 4.6, and any future agents.**
> This is the single source of truth. Read it fully before any work. Update it when decisions are made.

## Core Vision (Humanized)

We are building a calm, powerful, and visually delightful **Tier-3 Bento Grid theme** for the Hermes agent dashboard ecosystem.

Think of it as the "operating system" layer for how agents present their world to humans — clean compartments, predictable layout, zero visual noise, and edits that feel intentional instead of disruptive.

The design philosophy:
- **Strict compartmentalization** — every piece of information lives in its own well-defined island.
- **Asymmetric but balanced** 4-column grid that feels modern (inspired by 2026 fintech dashboards and Bento patterns).
- **Never break the grid** on edit. All modifications happen in focused slide-overs or modals.
- **Subtle elegance** — neutral-50 background, neutral-900 text, crisp 2xl rounded corners, soft borders.
- **Production-grade from day one** — accessible, performant, well-documented, and welcoming to contributors.

This theme should feel premium yet lightweight, so other builders in the Hermes community can easily adopt, fork, or extend it.

## Architecture & Non-Negotiables

### Grid System
- `BentoLayout.tsx` implements a **strict 4-column CSS Grid** (use `grid-cols-4` + `auto-rows` with `grid-span` utilities or explicit spans).
- The five core islands must map exactly to these spans:
  1. **Profiles** — spans 1 column, 3 rows (vertical persona list)
  2. **Models Status** — 1×1 dense square (current active model + provider health)
  3. **Skills Manager** — 1 column, 2 rows (YAML skills + toggles)
  4. **Logs HUD** — 2 columns, 2 rows (syntax-highlighted live reasoning + tool calls)
  5. **MCP / Config** — 2 columns, 1 row (horizontal list of connected MCP servers)

**Rule:** Cards never overlap, never expand beyond their allocated grid area. The layout must remain pixel-perfect at common dashboard viewport sizes.

### Data & State
- Use `@hermes/dashboard-data-schema` (v18289 or latest compatible) as the single source of truth.
- Implement a clean `DashboardContext` (React Context + hooks) for global state.
- All islands are **presentational + interactive** but delegate heavy logic to context or schema.

### Edit Experience (Critical)
- "View" state always lives **on the card**.
- Any edit action (change system prompt, toggle skill, add MCP server, edit persona, etc.) **must** open a SlideOver sheet or accessible modal.
- The grid itself is sacred — never turn a card into an expanded editor.

### Theme & Styling
- Tailwind CSS v4 with `@theme` directive (no more tailwind.config.js if possible).
- Design tokens: neutral scale, generous spacing, focus rings, smooth transitions.
- Subtle borders and shadows that feel "islands on a calm sea".
- High-quality icons (lucide-react or heroicons — research current best lightweight option).

## The Five Islands — Detailed Spec

### 1. Profiles (1×3)
- Vertical scrollable list of agent personas.
- Each persona card: avatar, name, role/short description, status indicator.
- Click to select active persona.
- Edit button opens SlideOver with full persona editor (name, system prompt, avatar url, etc.).

### 2. Models Status (1×1)
- Dense, information-rich square.
- Shows: Current model name, provider (OpenAI, Anthropic, Grok, local, etc.), status (green/yellow/red), tokens used or latency if available.
- Subtle live-updating feel.
- Clicking opens SlideOver for model switching or settings.

### 3. Skills Manager (1×2)
- List of active YAML-defined skills.
- Each row: skill name, short desc, toggle switch (on/off).
- Add new skill or edit existing opens SlideOver.
- Changes should feel instant and reversible.

### 4. Logs HUD (2×2)
- The "mission control" panel.
- Syntax-highlighted ( Prism, shiki, or Tailwind-friendly highlighter) streaming log of reasoning steps, tool calls, and decisions.
- Auto-scrolls to latest.
- Filters (by type: reasoning / tool / error) and search.
- Copy button per entry or bulk.
- Beautiful dark-ish terminal aesthetic inside the island.

### 5. MCP / Config (2×1)
- Horizontal, chip-style list of connected Model Context Protocol servers.
- Each chip: name, status, quick disconnect.
- "+ Add Server" opens SlideOver form.
- Clean, scannable, not overwhelming.

## SlideOver Component
- Reusable, accessible (focus trap, escape key, ARIA).
- Smooth enter/exit animation (framer-motion recommended after research).
- Context-aware title and form fields based on which island triggered it.
- On save, updates context/schema and closes gracefully.

## Open Source & Quality Standards

We follow modern open-source hygiene so this project can grow with the community:

- **Conventional Commits** (feat:, fix:, docs:, chore:, refactor: etc.)
- **MIT License** (already added)
- High-quality `README.md` (living, with screenshots eventually)
- `CONTRIBUTING.md`, issue & PR templates
- Frequent small commits + pushes while working ("as you work, continually push edits for easy keep up")
- Visual verification on every major change using computer-use browser + screenshot review
- Accessibility first (WCAG-friendly where possible)
- Minimal, justified dependencies only

## Workflow Expectations for the Chief Architect

1. **Research Delegation (do this first, don't burn tokens on assumptions)**
   - Delegate or quickly research (2026 best practices):
     - Best current patterns for prompting Claude Sonnet 4.6 + computer-use for React + Tailwind v4 UI work
     - Recommended lightweight stack additions (modal lib, syntax highlighter, icons, state)
     - How to structure a small React component theme package for maximum reusability and Tailwind v4 compatibility (see @source directive patterns)
     - Current gold-standard for Bento / dashboard grid implementations
   - Document key decisions back into this LLM.md

2. **Repository & Board Setup**
   - Ensure this repo (https://github.com/Yasuui/hermes-theme-bento) is the working directory.
   - Create or use a GitHub Project board ("Hermes Bento Theme — Build") with clear columns: Backlog / In Progress / Review / Done.
   - Break the work into trackable issues or tasks.

3. **Scaffolding**
   - Generate `package.json`, `manifest.json` (with `layoutVariant: "bento"`)
   - Set up Tailwind v4 + `@theme` in `index.css`
   - Create folder structure
   - Add TypeScript, basic linting, dev server (Vite recommended for fast feedback)

4. **Component Implementation**
   - Build `BentoLayout.tsx` + the 5 islands + `DashboardContext` + `SlideOver`
   - Use schema types everywhere
   - Make it look production-ready (not placeholder)
   - Add subtle motion where it delights without hurting performance

5. **Polish & Documentation**
   - Update README with real screenshots / usage
   - Add CONTRIBUTING.md if missing
   - Ensure conventional commit history
   - Add basic tests or visual regression hooks if time allows

6. **Verification Loop (Computer-Use)**
   - Start dev server
   - Open browser to localhost
   - Visually inspect the 4-column grid at multiple sizes
   - Confirm no overlapping, good spacing, crisp corners, readable text
   - Take mental or actual screenshots and confirm against spec
   - Only proceed when it feels "premium and calm"

7. **Shipping**
   - Commit frequently with clear conventional messages
   - Push to origin/main often ("easy keep up")
   - When everything passes visual + functional QA, do a final clean commit + push
   - Celebrate — production-ready theme delivered

## Success Criteria

- The dashboard renders a perfect 4-col Bento grid with all 5 islands in correct spans.
- Edit actions never break the grid layout.
- SlideOver feels native and delightful.
- Code is clean, typed, and follows the spec in this file.
- Repo follows open-source best practices and is welcoming to contributors.
- Main branch stays in a shippable state at all times.

---

**This file is your anchor. Re-read it before every major step. Update it with new decisions.**

*Generated with care for the Hermes ecosystem — Rift & Barakah style.*