# Changelog

All notable changes to A Labs are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project aims to
adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Update this file as part of each meaningful change. Group entries under
> `Added` / `Changed` / `Fixed` / `Removed`. Architectural rationale lives in
> [`docs/DECISIONS.md`](docs/DECISIONS.md); this file tracks *what* changed.

## [Unreleased]

### Added

- **Continuous integration** — GitHub Actions workflow (`.github/workflows/ci.yml`)
  running lint + type-check + build on every push to `main` and every pull
  request, with run cancellation for superseded commits. Deployment (CD) is
  delegated to the host's Git integration (see ADR-0013).
- **Social share images** — dynamic Open Graph + Twitter images via `next/og`,
  driven by a single branded renderer (`lib/og.tsx`): home, `/services`, and
  per-service `/services/[slug]` (statically generated). Twitter images
  re-export the Open Graph image. Completes the metadata/JSON-LD/sitemap SEO set.
- **Service routes** — `/services` index and statically-generated
  `/services/[slug]` detail pages (`generateStaticParams` + per-route
  `generateMetadata`, `dynamicParams = false`, `notFound()` for unknown slugs)
  with breadcrumb, highlights, and related services.
- **SEO infrastructure** — `app/sitemap.ts` (home + service routes) and
  `app/robots.ts`; JSON-LD structured data (`lib/structured-data.ts` builders +
  a reusable `JsonLd` component): Organization + WebSite on the home page,
  Service on each detail page.
- **ServiceGrid** — shared staggered grid of `ServiceCard`s, reused by the
  landing section, the services index, and the "other services" block.
- Service cards now link to their detail page (accessible stretched-link
  pattern via an optional `href` on `FeatureCard`).
- `Service.overview` — longer copy for detail pages.

### Added (landing page)

- **Landing page** — config-driven sections composed on the home page in nav
  order: `Hero` (the page `<h1>`), `Services` (grid from the catalog), `About`
  (intro + stats + engineering values), `Process` (`#work`), and `Cta`
  (`#contact`). Nav anchors now resolve to real sections.
- **Reusable section building blocks** — `Reveal`/`RevealGroup` scroll-motion
  islands (reduced-motion aware), `SectionHeader`, `FeatureCard`, `ServiceCard`,
  and the `IconBadge` primitive. shadcn `card` added on demand.
- **Content** — `data/process.ts`, `data/stats.ts`, `data/values.ts`,
  `constants/sections.ts` (section copy), and the `Stat` / `ProcessStep` /
  `Value` / `SectionContent` models.

### Fixed

- **Cross-platform lockfile** — regenerated `package-lock.json` so `npm ci`
  succeeds on Linux (CI + Cloudflare). The Windows-generated lockfile was
  missing optional wasm subtree entries (`@emnapi/*`, `@napi-rs/wasm-runtime`)
  that `npm ci` validates for all platforms, breaking the build.
- Home page `<title>`/`og:title` now use the descriptive default
  ("A Labs — Software Engineering & IT Consulting") instead of being overridden
  to just "A Labs" by the metadata spread order.

### Added (foundation)

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
- **Project docs** — architecture decision log (`docs/DECISIONS.md`),
  architecture + folder-structure notes (`docs/ARCHITECTURE.md`), component
  inventory (`docs/COMPONENTS.md`), and this changelog.
- **Line-ending policy** — `.gitattributes` normalizing the repo to LF.

### Changed

- Set the production `url` to `https://alabs.ceo-alabs.workers.dev` (Cloudflare
  Workers deploy). Drives metadata, canonical links, sitemap, robots, and OG
  image URLs from one place.
- Strengthened `tsconfig.json` beyond `strict` (`noUncheckedIndexedAccess`,
  `noImplicitOverride`, `noFallthroughCasesInSwitch`,
  `forceConsistentCasingInFileNames`).
- **Restructured documentation** — consolidated all behavioral rules into a
  single `CLAUDE.md`, moved the product brief to `docs/PROJECT.md`, and rewrote
  `README.md` as a project entry point. Added a "after every major milestone"
  doc-maintenance rule.

### Removed

- Default create-next-app placeholder assets (`public/*.svg`).
- `BeforeMajorTask.md` (folded into `CLAUDE.md`) and the generated `AGENTS.md`
  (its Next.js caution folded into `CLAUDE.md`).
