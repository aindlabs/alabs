# Changelog

All notable changes to A Labs are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project aims to
adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Update this file as part of each meaningful change. Group entries under
> `Added` / `Changed` / `Fixed` / `Removed`. Architectural rationale lives in
> [`docs/DECISIONS.md`](docs/DECISIONS.md); this file tracks *what* changed.

## [Unreleased]

### Added

- **Project foundation** — Next.js 16 (App Router) + React 19 + TypeScript
  (strict) + Tailwind v4, scaffolded into the repo root.
- **Design system** — OKLCH dark-first design tokens in `globals.css` (color
  roles, radius/type/spacing scales), shadcn/ui-compatible variable contract,
  and a `prefers-reduced-motion` accessibility guard.
- **Utilities** — `cn` class-merge helper, shared Framer Motion variants
  (`lib/animations.ts`), and a centralized SEO metadata factory (`lib/seo.ts`).
- **Content layer** — typed content models (`types/`), config-driven site
  config (`constants/site.ts`), and a service catalog (`data/services.ts`); the
  footer's Services column is derived from the catalog.
- **UI primitives** — `Container`, `Section`, and typography (`Heading`,
  `Eyebrow`, `Lead`) built with `class-variance-authority`.
- **shadcn/ui components** — `button` and `sheet` (Radix-backed, accessible)
  added on demand for the header.
- **Brand icons** — inline GitHub / LinkedIn / X SVGs (lucide v1 dropped brand
  marks).
- **Layout shell** — config-driven `Header` (sticky, scroll-aware, accessible
  mobile sheet) and `Footer`, plus a `Logo` component.
- **App wiring** — root layout with Geist fonts, config-driven SEO metadata,
  dark theme, and the header/footer shell; a foundation placeholder home page.
- **Project docs** — architecture decision log (`docs/DECISIONS.md`) and this
  changelog.

### Changed

- Strengthened `tsconfig.json` beyond `strict` (`noUncheckedIndexedAccess`,
  `noImplicitOverride`, `noFallthroughCasesInSwitch`,
  `forceConsistentCasingInFileNames`).

### Removed

- Default create-next-app placeholder assets (`public/*.svg`).
