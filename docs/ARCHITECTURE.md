# Architecture

Architecture notes and folder-structure documentation for A Labs. Keep this file
current with the codebase — update it after every major milestone (see
[`../CLAUDE.md`](../CLAUDE.md)). The *why* behind specific choices lives in
[`DECISIONS.md`](DECISIONS.md).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict+)
- **Tailwind v4** — CSS-first, tokens in `globals.css` (no `tailwind.config.js`)
- **shadcn/ui** (Radix primitives) · **class-variance-authority** for variants
- **Framer Motion** for animation · **lucide-react** + custom brand SVGs for icons

## Layered architecture

Content flows in one direction, presentation is decoupled from data:

```
types/        →  contracts (no JSX)        ── the shapes
   ↑
data/         →  content collections       ── e.g. service catalog
constants/    →  app/site configuration    ── nav, footer, brand, CTA
   ↑
lib/          →  pure helpers (cn, seo, animation variants)
   ↑
components/   →  presentational UI          ── render config, hold no content
   ↑
app/          →  routes compose the above
```

**Rule of thumb:** content lives in `data/` + `constants/`, typed by `types/`,
and is *rendered* by `components/`. Components stay presentational and reusable;
adding/editing content never requires touching a component.

## Folder structure

```
e:/Code/AI/ALabs
├── CLAUDE.md               # single source of behavioral rules (auto-loaded)
├── CHANGELOG.md            # what changed
├── README.md               # entry point → links into docs/
├── components.json         # shadcn/ui config (on-demand component installs)
├── docs/
│   ├── PROJECT.md          # product brief / scope (authoritative)
│   ├── ARCHITECTURE.md     # this file
│   ├── COMPONENTS.md       # component inventory
│   └── DECISIONS.md        # architecture decision records
├── public/                 # static assets
└── src/
    ├── app/                # App Router: layout.tsx (shell), page.tsx, globals.css
    ├── components/
    │   ├── ui/             # reusable primitives + shadcn components
    │   ├── layout/         # header, footer, logo (the app shell)
    │   ├── icons/          # custom brand SVGs (IconComponent-compatible)
    │   └── sections/       # config-driven page sections (added per milestone)
    ├── constants/          # site config (brand, nav, footer, CTA)
    ├── data/               # content collections (e.g. services)
    ├── hooks/              # shared React hooks (added when needed)
    ├── lib/                # framework-agnostic helpers (cn, seo, animations)
    └── types/              # shared TypeScript content models
```

> Folders are created when first needed (`hooks/`, `sections/` will appear with
> the relevant milestone). Keep this tree updated as they land.

## Conventions

- **Imports** use the `@/*` alias (→ `src/`). Prefer barrels (`@/types`,
  `@/components/ui`); shadcn components are imported by their own path.
- **Server vs. client** — components are server components by default; add
  `"use client"` only when interactivity/browser APIs are required (e.g. the
  header's scroll state + mobile sheet).
- **Styling** uses design tokens via Tailwind utilities (`bg-background`,
  `text-primary`, …). Compose classes with `cn()`; never hardcode hex colors.
- **Variants** are expressed with `class-variance-authority`, not ad-hoc
  conditional class strings.
- **Animation** uses the shared variants in `lib/animations.ts`; do not
  re-declare motion timing inline.
- **SEO** — pages build metadata via `lib/seo.ts` (`buildMetadata`).

## Data flow example (footer "Services" column)

`data/services.ts` (catalog) → `constants/site.ts` derives the footer column from
it → `components/layout/footer.tsx` renders `siteConfig.footerColumns`. Adding a
service in one place propagates to the grid, the footer, and future service
routes — no duplication.
