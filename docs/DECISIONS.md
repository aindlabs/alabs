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

---

## ADR-0011 — Statically-generated content routes + JSON-LD

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** Each service needs its own indexable page, plus site-wide crawl
infrastructure (sitemap, robots, structured data). Service content already lives
in `data/services.ts`.

**Decision.** Drive `/services/[slug]` from the catalog via
`generateStaticParams` (SSG) + `generateMetadata`, with `dynamicParams = false`
so only known slugs render and anything else 404s. Generate `sitemap.ts`/
`robots.ts` from the same catalog. Emit schema.org JSON-LD from typed builders
in `lib/structured-data.ts` via a reusable `<JsonLd>` component (Organization +
WebSite on home, Service on detail). Service cards link to detail pages using
the stretched-link pattern (optional `href` on `FeatureCard`).

**Consequences.** Adding a service propagates to its page, the index, the
sitemap, the footer, and cross-links automatically — one source of truth. All
pages prerender as static HTML (verified). Trade-off: `dynamicParams = false`
means new slugs require a rebuild — acceptable for a marketing site. JSON-LD is
typed as a record (schema.org `@`-keys don't map cleanly to a TS interface).

---

## ADR-0012 — Social images via one renderer + file convention

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** Pages needed Open Graph / Twitter share images. Hand-made images
would drift from the brand and require manual upkeep per page.

**Decision.** Generate images at build with `next/og` using the
`opengraph-image`/`twitter-image` file convention, all delegating to a single
branded renderer (`lib/og.tsx`, `renderOgImage({ eyebrow, title })`).
`twitter-image` re-exports its sibling `opengraph-image` (note: `dynamicParams`
and `generateStaticParams` must be declared locally — Next can't statically
parse them when re-exported). Per-service images use `generateStaticParams` +
`dynamicParams = false` to mirror the page routes. Colors are plain hex
approximations of the OKLCH tokens (Satori doesn't parse OKLCH); the default
Satori font is used (no font fetch).

**Consequences.** Every page gets a consistent, on-brand share image with zero
manual asset work; image copy updates with the content. Images prerender to PNG
(verified). Trade-off: Satori is not a full browser — layouts use flexbox-only
CSS and a hex palette rather than the live design tokens.

---

## ADR-0013 — CI on GitHub Actions, CD via host Git integration

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** The project needs automated quality checks and deployment. The
repo is intended to be public, and the site is commercial (consulting business).

**Decision.** Use **GitHub Actions** for CI — lint + type-check + build on every
push to `main` and every PR (free and unlimited for public repos). Delegate
**CD** to the hosting platform's native Git integration (auto-deploy `main`,
preview URLs per PR) rather than a deploy workflow, so no deploy secrets live in
the repo. Recommended host: **Cloudflare Pages** (free tier permits commercial
use, unlimited bandwidth, free subdomain + custom domain) — Vercel's free Hobby
plan forbids commercial use, and Netlify's free tier caps bandwidth and pauses
on overage.

**Consequences.** PRs are gated by the same checks we run locally; deploys need
no in-repo secrets and come with preview environments. Host choice stays
flexible (the CI is host-agnostic). Note: the production URL must be set in
`constants/site.ts` once the deploy domain is known (drives metadata, canonical,
sitemap, and OG image URLs).

---

## ADR-0014 — Deploy to Cloudflare Workers via committed OpenNext config

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** Cloudflare Workers runs Next.js through the OpenNext adapter. With
no Cloudflare config in the repo, Cloudflare's build pipeline auto-ran the
OpenNext migration on every build and generated an inconsistent worker name —
deploying `alabs` but binding `WORKER_SELF_REFERENCE` to a non-existent
`a-labs` (the `package.json` name) — which failed the deploy.

**Decision.** Commit the OpenNext setup explicitly: `wrangler.jsonc` (Worker
**`alabs`**, matching the live `alabs.ceo-alabs.workers.dev` URL, with a matching
self-reference binding), `open-next.config.ts` (no R2 cache — the site is
static/SSG, no ISR), `initOpenNextCloudflareForDev()` in `next.config.ts`, and
`@opennextjs/cloudflare` + `wrangler` as dependencies. Cloudflare's **build
command** becomes `npm run cf-build` (`opennextjs-cloudflare build`) and the
**deploy command** stays `npx wrangler deploy`, which now reads the committed
config. Regenerated the lockfile cleanly so the Linux `workerd` binary is
recorded (the cross-platform `npm ci` requirement from ADR context).

**Consequences.** Deploys are deterministic and reviewable in-repo; the worker
name and URL are stable. CI (`next build`) stays separate from the heavier
Cloudflare bundling (`opennextjs-cloudflare build`). Trade-off: dependency
weight grows (wrangler/workerd), and dependency changes now require a clean
lockfile regenerate to keep all platform binaries recorded.

---

## ADR-0015 — Contact form via server action + Resend (no SDK)

- **Date:** 2026-06-14
- **Status:** Accepted

**Context.** The site needed a real lead-capture form. The deploy runs on
Cloudflare Workers (OpenNext), there is no custom domain yet, and we want to
avoid leaking secrets to the client or adding heavy dependencies.

**Decision.** Post the form to a Next.js **server action** (`app/contact/actions.ts`)
so the email API key stays server-side. Deliver mail by calling **Resend's REST
API with `fetch`** (no SDK — lighter on the Worker), configured via env
(`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`); Resend's
`onboarding@resend.dev` sender works without a verified domain. Validation is
typed and hand-rolled (`lib/contact/validation.ts`) rather than adding a schema
library for three fields. Spam is filtered with a honeypot field; client state
uses React 19 `useActionState`. Form field primitives (`Input`/`Textarea`/`Label`)
are hand-authored to stay dependency-free and on-theme.

**Consequences.** Lead capture works once two env vars are set, with no domain
required; secrets never reach the browser; the Worker bundle stays small. The
form degrades gracefully (shows a direct-email fallback) when unconfigured or on
send failure. Trade-offs: the honeypot is weaker than a CAPTCHA (Cloudflare
Turnstile is the planned upgrade), and hand-rolled validation must be kept in
sync with the form fields.
