# Contributing to hermes-theme-bento

Thank you for your interest in contributing! This project aims to be a welcoming, high-quality open-source theme for the Hermes ecosystem.

## Our Standards

- We follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, etc.)
- Code should be clean, typed (TypeScript), and well-commented where helpful.
- UI changes must pass visual QA (no overlapping elements, good spacing, consistent with Bento philosophy).
- We prioritize accessibility and performance.

## Getting Started

1. Fork the repo and clone your fork
2. `npm install`
3. `npm run dev` to start the preview server
4. Make your changes
5. Test visually in browser
6. Commit with conventional message
7. Push and open a Pull Request

## Pull Request Process

- Keep PRs focused and reasonably sized.
- Update `LLM.md` if you make architectural decisions.
- Include screenshots or descriptions of visual changes.
- Be patient and kind in reviews — we're all building this together.

## Code Style

- Tailwind v4 first (use `@theme` and utility classes)
- Prefer composition and small reusable components
- Use the `DashboardContext` for shared state
- Run linters/formatters before committing (we'll add them soon)

## Questions?

Open an issue or reach out in the Hermes community channels.

We appreciate every contribution, big or small. Let's make agent dashboards beautiful and calm together!