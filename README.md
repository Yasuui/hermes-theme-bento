# hermes-theme-bento

> A beautiful, compartmentalized **Bento Grid** dashboard theme for the Hermes Agent ecosystem.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19+-blue?logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**hermes-theme-bento** is a Tier-3 theme package that brings a modern, financial-operating-system-inspired Bento layout to Hermes dashboards. It uses strict 4-column asymmetric grid compartmentalization, subtle borders, and crisp interactions — all while staying fully compatible with `@hermes/dashboard-data-schema`.

Built for clarity, focus, and delightful developer & agent experience.

## ✨ Core Vision

We believe agent dashboards should feel like calm, organized command centers — not chaotic walls of cards. This theme enforces **rigid spatial rules** so every "island" has its place, edits happen in focused slide-overs (never breaking the grid), and the whole experience stays predictable and beautiful.

Inspired by 2026 Bento patterns seen in modern fintech and productivity tools.

## 🧩 The Five UI Islands

| Island              | Grid Span | Purpose                                      | Key Interactions                  |
|---------------------|-----------|----------------------------------------------|-----------------------------------|
| **Profiles**        | 1×3       | Vertical list of agent personas              | Select, quick edit via sheet     |
| **Models Status**   | 1×1       | Dense square — active model + provider       | View only (or edit in sheet)     |
| **Skills Manager**  | 1×2       | Active YAML skills with toggles              | Toggle on/off, edit skill        |
| **Logs HUD**        | 2×2       | Syntax-highlighted streaming reasoning log   | Live tail, filter, copy          |
| **MCP / Config**    | 2×1       | Connected Model Context Protocol servers     | Horizontal chips, add/remove     |

All "Edit" actions open a beautiful **SlideOver** or modal. The grid never expands or breaks.

## 🚀 Quick Start

### For Hermes Users

This theme is designed to be dropped into your Hermes instance. Once published or linked:

```bash
# Example (when integrated)
npm install @hermes/theme-bento
# or copy the theme folder into your Hermes themes directory
```

Then select **Bento** as your active dashboard theme in Hermes settings.

### For Developers & Contributors

```bash
git clone https://github.com/Yasuui/hermes-theme-bento.git
cd hermes-theme-bento
npm install
npm run dev
```

Open http://localhost:5173 (or your Vite port) to see the living dashboard preview.

## 🛠 Tech Stack & Decisions

- **React** (latest) + TypeScript
- **Tailwind CSS v4** — using the new `@theme` directive and CSS-first configuration
- **@hermes/dashboard-data-schema** — single source of truth for all data shapes
- **Global DashboardContext** — clean state management without prop drilling
- **SlideOver.tsx** — reusable, accessible edit surface
- Minimal, high-quality dependencies only (we research before adding anything)

We prioritize:
- Performance & small bundle
- Accessibility (keyboard, screen reader, ARIA)
- Strict visual QA on every change
- Conventional commits + clean Git history

## 📁 Recommended Project Structure

```
hermes-theme-bento/
├── src/
│   ├── components/
│   │   ├── islands/          # The five core islands
│   │   │   ├── Profiles.tsx
│   │   │   ├── ModelsStatus.tsx
│   │   │   ├── SkillsManager.tsx
│   │   │   ├── LogsHUD.tsx
│   │   │   └── MCPConfig.tsx
│   │   ├── BentoLayout.tsx   # The 4-col grid orchestrator
│   │   └── SlideOver.tsx
│   ├── context/
│   │   └── DashboardContext.tsx
│   └── styles/
│       └── index.css         # Tailwind v4 + theme tokens
├── manifest.json             # Hermes theme manifest (layoutVariant: "bento")
├── package.json
├── tsconfig.json
├── .github/
│   └── ISSUE_TEMPLATE/
├── CONTRIBUTING.md
├── README.md
└── LLM.md                    # Living project intelligence for agents
```

## 🤝 Contributing

We welcome contributions from the Hermes community and beyond!

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- How to set up your local environment
- Coding standards & Tailwind v4 patterns
- How to submit PRs
- Our visual QA expectations

We use **conventional commits** and keep the main branch production-ready at all times.

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- The Hermes team and the broader agent tooling community
- Inspiration from modern Bento dashboard patterns in fintech OSes
- Built with care by the Rift & Barakah crews (and friends)

---

**Let's build the calmest, most powerful agent dashboards together.**

> Maintained with ❤️ by the open-source community. PRs, issues, and feedback always appreciated.