# Contributing to Hermes Theme Bento

Thank you for taking the time to contribute. Hermes is a community-driven project and every contribution — whether it's a bug report, a design suggestion, or a pull request — genuinely matters.

We want this to be a welcoming space for everyone, regardless of experience level. If you're new to open source, this is a great place to start.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Workflow](#workflow)
- [Code Standards](#code-standards)
- [Testing & Verification](#testing--verification)
- [Commit Conventions](#commit-conventions)
- [Design Philosophy](#design-philosophy)
- [Pull Request Expectations](#pull-request-expectations)
- [Questions & Help](#questions--help)
- [License](#license)

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- A GitHub account

### Local Setup

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/hermes-theme-bento.git
cd hermes-theme-bento

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be running at `http://localhost:3000`.

---

## Workflow

We follow a standard fork-and-PR workflow.

```
main (protected)
  └── your-fork/feature/your-feature-name
```

### Step by Step

1. **Fork** the repo on GitHub.
2. **Create a branch** from `main` with a descriptive name:
   ```bash
   git checkout -b feature/add-notifications-island
   # or
   git checkout -b fix/sidebar-focus-trap
   ```
3. **Make your changes.** Keep commits focused and atomic.
4. **Verify** your changes pass all checks (see [Testing & Verification](#testing--verification)).
5. **Push** to your fork:
   ```bash
   git push origin feature/add-notifications-island
   ```
6. **Open a Pull Request** against the `main` branch of this repository.

Please do not push directly to `main`. All changes go through PR review.

---

## Code Standards

### TypeScript

- Strict mode is enabled — all code must type-check cleanly with `tsc --noEmit`.
- Prefer explicit return types on exported functions and component props.
- Export prop interfaces alongside each component for external data binding.
- Avoid `any`. Use `unknown` where a type is genuinely unknown, then narrow it.

### React & Next.js

- All interactive components must include `'use client'` at the top.
- Islands are self-contained — each wraps `BentoCard` and manages its own local state.
- Global state lives in `DashboardContext` via `useReducer`. Don't introduce a new state library without prior discussion.
- This project uses a Next.js version with breaking changes from older releases — read the guide in `node_modules/next/dist/docs/` before writing routing or rendering code.

### Styling

- **Tailwind CSS v4** — no `@apply` directives, no inline `style` props unless absolutely necessary.
- Use theme CSS variables (`bg-card`, `accent-gold`, `text-muted`, etc.) — never hardcode color values.
- The grid system is 4-column (`xl:grid-cols-4`). Card size is declared via variant (`default`, `wide`, `tall`, `featured`).
- Use `cn()` from `@/lib/utils` for conditional class merging.

### Linting & Formatting

- ESLint is configured — run `npm run lint` and resolve all warnings before submitting.
- Prettier is the formatter. Run it before committing:
  ```bash
  npx prettier --write .
  ```
- No unused imports, no `console.log` left in production code.

---

## Testing & Verification

Before opening a PR, run the full verification suite:

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build (must succeed with zero errors)
npm run build
```

All three must pass cleanly. A PR that fails the build will not be reviewed until it's fixed.

If you're adding a new island or interactive component, manually verify:

- Keyboard navigation works end-to-end (Tab, Enter, Escape, arrow keys where applicable).
- The component renders correctly in both **dark** and **light** themes.
- Loading and empty states are handled gracefully.
- No layout shift on first render.
- ARIA roles and labels are present and correct.

---

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <short summary>
```

**Types:**

| Type | When to use |
|------|-------------|
| `feat` | New feature or island |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code restructuring without behavior change |
| `a11y` | Accessibility improvements |
| `chore` | Build system, deps, tooling |

**Examples:**

```
feat(islands): add notifications island with real-time badge
fix(sidebar): restore focus to trigger element after close
a11y(skills-island): add aria-live region for filter results
docs: expand island patterns in CLAUDE.md
chore: upgrade lucide-react to v1.18
```

Keep the summary under 72 characters. Use the commit body to explain *why*, not *what*.

---

## Design Philosophy

Every contribution should uphold these principles.

### Accessibility First

Keyboard navigation is not an afterthought — it's a requirement. Every interactive element must be reachable and operable via keyboard alone. Use `focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none` for focus indicators. Provide ARIA labels, roles, and live regions where needed. Target WCAG 2.1 AA as the baseline.

### Dark Theme as the Primary Canvas

The dark premium aesthetic (`#0a0a0f` base, `#c8a45c` gold accents) is the product's core identity. Design decisions should reinforce depth and contrast, not flatten them. Light theme support is important — dark is the default.

### Keyboard-First Interaction

Islands support arrow key navigation, Enter to activate, and Escape to dismiss. New interactive components should follow the same patterns established in the existing islands. Consistency beats novelty.

### Intentional Minimalism

Don't add features, abstractions, or cleanup beyond what the task requires. A bug fix is a bug fix. An island is an island. Three similar lines of JSX is better than a premature abstraction. Keep scope tight.

---

## Pull Request Expectations

A good PR:

- Has a clear title following commit conventions.
- Includes a brief description: what changed and why.
- Is scoped to one concern — don't mix a feature with a refactor in the same PR.
- Passes all build and lint checks.
- Has been visually verified in the browser (dark + light theme).
- References any related issue with `Closes #123` or `Relates to #123`.

**Review turnaround:** We aim to review PRs within 48–72 hours. If you haven't heard back after a week, feel free to leave a comment to request a review.

**Feedback:** Reviews are about the code, not the contributor. We give direct, constructive feedback — and we expect the same in return. Disagreements are welcome; disrespect is not.

---

## Questions & Help

Stuck? Not sure how to approach something? We'd love to help.

- **GitHub Discussions** — open a discussion for design questions, feature ideas, or anything that isn't a bug report.
- **GitHub Issues** — for bugs, unexpected behavior, or clear feature requests.
- **Hermes Community Discord** — join us at `discord.gg/hermes-theme` for real-time conversation, feedback, and collaboration.

No question is too small. We were all beginners once.

---

## License

By contributing to Hermes Theme Bento, you agree that your contributions will be licensed under the [MIT License](./LICENSE) that covers this project.
