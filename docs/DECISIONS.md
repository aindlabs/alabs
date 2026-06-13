# Architecture Decision Log

This file records **significant** technical and architectural decisions for A Labs,
in lightweight ADR (Architecture Decision Record) form. Each entry captures the
**context**, the **decision**, and its **consequences** so future maintainers
understand *why* the codebase looks the way it does — not just *what* it does.

> Add a new record for any decision that is expensive to reverse or that a future
> engineer might otherwise question (dependencies, patterns, conventions, trade-offs).
> Never edit a past decision's intent — supersede it with a new record instead.

---

## ADR-0001 — Tailwind v4, CSS-first design tokens

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** The scaffold ships Tailwind v4, which is CSS-first: there is no
`tailwind.config.js`. We need a single source of truth for the design system
(colors, radius, type, spacing) that both our own components and third-party
(shadcn/ui) components consume.

**Decision.** Declare all tokens as CSS custom properties in
`src/app/globals.css` and surface them to Tailwind via `@theme inline`. Use the
shadcn/ui variable contract (`--background`, `--primary`, `--border`, `--ring`,
…) so shadcn components render against our palette unmodified. Colors use OKLCH.

**Consequences.** Re-theming = editing one file. No JS config to keep in sync.
Trade-off: OKLCH + `color-mix` require modern browsers (Chrome 111+, Safari
16.4+) — acceptable, as that matches Tailwind v4's own baseline.

---

## ADR-0002 — shadcn/ui set up manually (no `shadcn init`)

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** `npx shadcn init` overwrites `globals.css` with its default neutral
theme, which would clobber our custom dark design system.

**Decision.** Hand-author `components.json` and the `cn` utility so
`npx shadcn add <component>` works on demand, while we retain full control of
`globals.css`. Components are pulled only when a feature needs them
(button + sheet were added for the header).

**Consequences.** Design tokens stay authoritative. Adding shadcn components
later is still one command. Requires our globals.css to keep honoring the shadcn
variable names (see ADR-0001).

---

## ADR-0003 — Dark-first theme with `.dark` mirror

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** The product brief mandates a dark, premium SaaS look. shadcn `dark:`
variants and a possible future theme toggle should still function.

**Decision.** Put the dark palette in `:root` (the default) and mirror it under
`.dark`. The root `<html>` carries the `dark` class explicitly.

**Consequences.** The site is dark out of the box; `dark:` utilities resolve
correctly; a light theme can be added later by populating `:root` light values
without restructuring.

---

## ADR-0004 — Config-driven content layer

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** The brief requires config-driven sections and zero duplicated
content. Navigation, footer, and services overlap.

**Decision.** Typed content models live in `src/types`; content lives in
`src/constants` (site identity/nav/footer) and `src/data` (service catalog).
Presentational components render from these. The footer's "Services" column is
*derived* from the service catalog rather than re-listed.

**Consequences.** Content edits happen in one typed place; nav and footer cannot
drift from the catalog. Components stay presentational and reusable.

---

## ADR-0005 — Composition primitives (`Section` / `Container` / `Heading`)

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** Many future sections will repeat width, gutters, vertical rhythm,
and heading styles. Duplicating these invites drift.

**Decision.** `Container` owns max-width + gutters; `Section` owns vertical
rhythm and composes `Container`; `Heading` decouples visual `size` from the
semantic tag (`as`) so document outline/accessibility is independent of
appearance. Variants are expressed with `class-variance-authority`.

**Consequences.** Sections compose primitives instead of re-declaring layout.
Spacing/width changes happen once. Slight indirection for newcomers — mitigated
by inline docs.

---

## ADR-0006 — `IconComponent` abstraction over `LucideIcon`

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** lucide-react v1+ removed brand marks (GitHub/LinkedIn/X). Typing
icons strictly as `LucideIcon` would couple content to one library and break on
custom SVGs.

**Decision.** Type icons as `IconComponent = ComponentType<SVGProps<SVGSVGElement>>`.
Lucide icons and hand-authored brand SVGs (`components/icons`) both satisfy it.

**Consequences.** Content config can mix icon sources freely; no dependency on
deprecated brand exports.

---

## ADR-0007 — Stricter TypeScript than `strict`

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** The guidelines demand strict TS and forbid `any`.

**Decision.** Enable `noUncheckedIndexedAccess`, `noImplicitOverride`,
`noFallthroughCasesInSwitch`, and `forceConsistentCasingInFileNames` on top of
`strict` (casing matters on the Windows dev environment).

**Consequences.** More compile-time safety; occasional explicit guards around
index access. Worth it for a codebase meant to live for years.

---

## ADR-0008 — Scaffold via temp folder (npm naming workaround)

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** The repo folder is `ALabs`; npm rejects package names with capitals,
so `create-next-app .` failed.

**Decision.** Scaffold into a temp subfolder (`a-labs-scaffold`), hoist files to
the root with no-clobber (protecting the existing `CLAUDE.md`/specs), then set
`package.json` name to `a-labs`.

**Consequences.** One-time setup quirk, documented here so the folder/package
name mismatch (`ALabs` dir vs `a-labs` package) isn't mistaken for an error.

---

## ADR-0009 — Documentation structure: one rules file, `docs/` for the rest

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** Behavioral rules were split across `CLAUDE.md`, `BeforeMajorTask.md`,
and `PROJECT.md`, and the repo root was cluttered with markdown — extra files to
track on every task.

**Decision.** Make `CLAUDE.md` the **single source of behavioral rules** (it is
auto-loaded and must stay at root); fold `BeforeMajorTask.md` and the generated
`AGENTS.md` into it. Move all reference docs under `docs/`
(`PROJECT.md`, `ARCHITECTURE.md`, `COMPONENTS.md`, `DECISIONS.md`), keeping only
`README.md` + `CHANGELOG.md` at root by convention. Establish a
"after every major milestone, update PROJECT/COMPONENTS/ARCHITECTURE docs" rule.

**Consequences.** One place to read process rules; a tidy root; reference docs
grouped and discoverable. Cost: docs must be kept current — enforced by the
maintenance rule in `CLAUDE.md`. The brief now lives at `docs/PROJECT.md`
(update references accordingly).

---

## ADR-0010 — Server sections with isolated motion islands

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** Landing-page sections need scroll-reveal animation (a client
concern via Framer Motion) but must remain server-rendered so their content is
in the initial HTML for SEO. Re-declaring motion props in every section would
also duplicate logic.

**Decision.** Keep section components as server components that render content
from `data/`/`constants/`, and isolate all animation in two client primitives —
`Reveal` (single element) and `RevealGroup` (stagger orchestrator) — which a
server section renders as children. Motion timing lives once in
`lib/animations.ts`; both islands honor `prefers-reduced-motion`. Section copy is
config-driven through `constants/sections.ts` + `SectionHeader`.

**Consequences.** Content ships in static HTML (verified: home prerenders fully
static) while interactions stay client-side; motion behavior changes in one
place. Slight indirection — a section's animated wrapper is a separate component
from its content.
